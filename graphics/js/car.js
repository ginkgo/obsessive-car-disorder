"use strict";
/*
 * Car Object
 */

var carAssets = { URL:'assets/drawings/car.png', name:'car' };

function Car(gameProperties) {
  this.gameProperties = gameProperties;
  this.acceleration = 500;
  this.drag = 0.8;
  this.angularVelocity = 3;
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
    game.camera.follow(this.carSprite, Phaser.Camera.FOLLOW_TOPDOWN);
    game.camera.deadzone = new Phaser.Rectangle(0, gameProperties.screenHeight*0.8, 
        gameProperties.screenWidth, 0);
  };

  this.neutral = function() {
    this.carSprite.body.angularVelocity = 0;
    this.carSprite.body.thrust(this.acceleration);
    if(this.carSprite.body.rotation>0.5) this.carSprite.body.rotation = 0.5;
    if(this.carSprite.body.rotation<-0.5) this.carSprite.body.rotation = -0.5;
    if(this.carSprite.body.x<250) this.carSprite.body.x = 250;
    if(this.carSprite.body.x>560) this.carSprite.body.x = 560;

    // Wrap the car for the next loop
    //TODO: align track and car height first 
    //if(this.carSprite.body.y<gameProperties.screenHeight*0.8) this.carSprite.body.y = 950;
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

