/*
 * Car Object
 */

"use strict"

var carAssets = { URL:'assets/drawings/car.png', name:'car' };

function Car(gameProperties) {
  this.gameProperties = gameProperties;
  this.acceleration = 500;
  this.drag = 0.9;
  this.maxVelocity = 500;
  this.angularVelocity = 5;
  this.carSprite;

  this.init = function (blockCollisionGroup) {
    this.carSprite = game.add.sprite(
        this.gameProperties.gameWidth * 0.5,
        this.gameProperties.gameHeight - 200 ,
        carAssets.name);

    this.carSprite.anchor.set(0.5, 0.5); 
    this.carSprite.scale.x = 0.25;
    this.carSprite.scale.y = 0.25;
    game.physics.p2.enable(this.carSprite, false);
    this.carSprite.rotation = 1.0;
    this.carSprite.body.setCollisionGroup(blockCollisionGroup);
    this.carSprite.body.collides([blockCollisionGroup]);
    this.carSprite.body.damping = this.drag;

    //this.carSprite.body.debug = true;

    // Make the camera follow the Car while keeping it at the bottom of the screen.
    game.camera.follow(this.carSprite);
    game.camera.deadzone = new Phaser.Rectangle(0, gameProperties.screenHeight*0.8, 
        gameProperties.screenWidth, gameProperties.screenHeight*0.1);
  };

  this.neutral = function() {
    this.carSprite.body.angularVelocity = 0;
    //this.carSprite.body.velocity = 0;
    this.carSprite.body.thrust(this.acceleration);
    if(this.carSprite.body.rotation>0.5) this.carSprite.body.rotation = 0.5;
    if(this.carSprite.body.rotation<-0.5) this.carSprite.body.rotation = -0.5;

    // Wrap the car for the next loop
    //if(this.carSprite.body.y<100) this.carSprite.body.y = 4000;
  };

  this.left = function() {
    this.carSprite.body.angularVelocity = -this.angularVelocity;
  };

  this.right = function() {
    this.carSprite.body.angularVelocity = this.angularVelocity;
  };

  this.accelerate = function() {
    //this.carSprite.body.thrust(this.acceleration);
    //debugger
  };

};

