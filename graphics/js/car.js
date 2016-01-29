/*
 * Car Object
 */


var carAssets = { URL:'assets/drawings/car.png', name:'car' };

function Car(width, height) {
    this.startX = width * 0.5;
    this.startY = height * 0.5;
    this.acceleration = 200;
    this.drag = 0.5;
    this.maxVelocity = 300;
    this.angularVelocity = 5;
    this.carSprite;

    this.init = function (blockCollisionGroup) {
        this.carSprite = game.add.sprite(this.startX, this.startY, carAssets.name);
        this.carSprite.anchor.set(0.5, 0.5); 

        game.physics.p2.enable(this.carSprite, false);
        this.carSprite.rotation = 1.0;
        this.carSprite.body.debug = true;
        this.carSprite.body.setCollisionGroup(blockCollisionGroup);
        this.carSprite.body.collides([blockCollisionGroup]);
        this.carSprite.body.damping = this.drag;
/*
debugger;
        this.car.carSprite.body.maxVelocity.set(car.maxVelocity);
	this.car.carSprite.body.collideWorldBounds = true;
*/
        this.carSprite.scale.x = 1;
        this.carSprite.scale.y = 1;

    };

    this.neutral = function() {
        this.carSprite.body.angularVelocity = 0;
        this.carSprite.body.velocity = 0;
    };

    this.left = function() {
        this.carSprite.body.angularVelocity = -this.angularVelocity;
    };

    this.right = function() {
        this.carSprite.body.angularVelocity = this.angularVelocity;
    };

    this.accelerate = function() {
        // Rotate the sprite before and after the thrust since the bitmap is horizontal...
        this.carSprite.body.angle += 90;
        this.carSprite.body.thrust(this.acceleration);
        this.carSprite.body.angle -= 90;

    };

};


