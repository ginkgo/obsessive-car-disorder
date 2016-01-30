/*
 * Car Object
 */

"use strict"

var carAssets = { URL:'assets/drawings/car.png', name:'car' };

function Car(width, height) {
    this.startX = width * 0.5;
    this.startY = height * 0.5;
    this.acceleration = 500;
    this.drag = 0.9;
    this.maxVelocity = 500;
    this.angularVelocity = 5;
    this.carSprite;

    this.init = function (blockCollisionGroup) {
        //this.carSprite = game.add.sprite(this.startX, this.startY, carAssets.name);
        this.carSprite = game.add.sprite(this.startX, 5000, carAssets.name);
        this.carSprite.anchor.set(0.5, 0.5); 

        this.carSprite.scale.x = 0.25;
        this.carSprite.scale.y = 0.25;
        game.physics.p2.enable(this.carSprite, false);
        this.carSprite.rotation = 1.0;
//        this.carSprite.body.debug = true;
        this.carSprite.body.setCollisionGroup(blockCollisionGroup);
        this.carSprite.body.collides([blockCollisionGroup]);
        this.carSprite.body.damping = this.drag;

        game.camera.follow(this.carSprite);
        game.camera.deadzone = new Phaser.Rectangle(0, 450, 800, 50);

    };

    this.neutral = function() {
        this.carSprite.body.angularVelocity = 0;
//        this.carSprite.body.velocity = 0;
        this.carSprite.body.thrust(this.acceleration);
	if(this.carSprite.rotation>0.5) this.carSprite.rotation = 0.5;
	if(this.carSprite.rotation<-0.5) this.carSprite.rotation = -0.5;
    };

    this.left = function() {
        this.carSprite.body.angularVelocity = -this.angularVelocity;
    };

    this.right = function() {
        this.carSprite.body.angularVelocity = this.angularVelocity;
    };

    this.accelerate = function() {
//        this.carSprite.body.thrust(this.acceleration);
//debugger
    };

};

