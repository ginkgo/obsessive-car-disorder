/*
 * Car Object
 */


var carAssets = { URL:'assets/car.png', name:'car' };

function Car(width, height) {
    this.startX = width * 0.5;
    this.startY = height * 0.5;
    this.acceleration = 200;
    this.drag = 0.2;
    this.maxVelocity = 300;
    this.angularVelocity = 5;
    this.shipSprite;

    this.init = function (blockCollisionGroup) {
        this.shipSprite = game.add.sprite(this.startX, this.startY, carAssets.name);
        this.shipSprite.anchor.set(0.5, 0.5); 

        game.physics.p2.enable(this.shipSprite, false);
        this.shipSprite.rotation = 1.0;
        this.shipSprite.body.debug = true;
        this.shipSprite.body.setCollisionGroup(blockCollisionGroup);
        this.shipSprite.body.collides([blockCollisionGroup]);

//        this.car.shipSprite.body.damping = car.drag;
/*
        this.car.shipSprite.body.maxVelocity.set(car.maxVelocity);
	this.car.shipSprite.body.collideWorldBounds = true;
*/
//        this.car.shipSprite.scale = [4,4];

    };

    this.neutral = function() {
        this.shipSprite.body.angularVelocity = 0;
        this.shipSprite.body.velocity = 0;
    };

    this.left = function() {
        this.shipSprite.body.angularVelocity = -this.angularVelocity;
    };

    this.right = function() {
        this.shipSprite.body.angularVelocity = this.angularVelocity;
    };

    this.accelerate = function() {
        // Rotate the sprite before and after the thrust since the bitmap is horizontal...
        this.shipSprite.body.angle += 90;
        this.shipSprite.body.thrust(this.acceleration);
        this.shipSprite.body.angle -= 90;

    };

};


