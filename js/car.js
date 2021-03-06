"use strict";
/*
 * Car Object
 */

gameAssets.carAssets = new Array();
gameAssets.carAssets[0] = { URL:'assets/drawings/car.png', name:'car' };

function Car(gameProperties) {
  this.gameProperties = gameProperties;
  this.acceleration = 3;
  this.angularVelocity = 2;
  this.carSprite;
  this.inMotion;

  this.init = function (blockCollisionGroup) {
    this.carSprite = game.add.sprite(
        this.gameProperties.gameWidth * 0.5,
        this.gameProperties.gameHeight - 200 ,
        gameAssets.carAssets[0].name);

    this.carSprite.anchor.set(0.5, 0.5); 
    this.carSprite.scale.x = 0.25;
    this.carSprite.scale.y = 0.25;
    game.physics.p2.enable(this.carSprite, false);
    this.carSprite.body.setCollisionGroup(blockCollisionGroup);
    this.carSprite.body.collides([blockCollisionGroup]);
    this.carSprite.body.damping = 0.1;
    this.carSprite.body.mass = 0.0001;

    //this.carSprite.body.debug = true;

    // Make the camera follow the Car while keeping it at the bottom of the screen.
    game.camera.follow(this.carSprite, Phaser.Camera.FOLLOW_TOPDOWN);
    game.camera.deadzone = new Phaser.Rectangle(0, gameProperties.screenHeight*0.9, 
        gameProperties.screenWidth, 0);


    this.explosion = game.add.sprite(400, 300, 'explosion');
    this.explosion.animations.add('explode', [0, 1, 2, 3, 4, 5, 6, 7], 10, false);
    this.explosion.anchor.set(0.5, 0.5); 
    this.explosion.scale.x = this.explosion.scale.y = 0.50;
    this.explosion.alpha = 0;

    this.reset();
  };

  this.reset = function() {
    this.setInMotion(false);
    this.carSprite.body.angularVelocity = 0;
    this.carSprite.body.rotation = 0;
    this.carSprite.body.x = this.gameProperties.gameWidth * 0.5
    this.carSprite.body.y = this.gameProperties.gameHeight - 200 ;
    this.explosionAnimation = null;
  };

    this.neutral = function() {
        this.carSprite.bringToTop();
        this.explosion.bringToTop();
    this.carSprite.body.angularVelocity = 0;
    this.carSprite.body.thrust(this.acceleration*0.001);
    this.carSprite.body.moveBackward(-500);
    var maxRot = 0.05;
    if(this.carSprite.body.rotation>maxRot) this.carSprite.body.rotation = maxRot;
    if(this.carSprite.body.rotation<-maxRot) this.carSprite.body.rotation = -maxRot;
    if(this.carSprite.body.x<250) this.carSprite.body.x = 250;
    if(this.carSprite.body.x>560) this.carSprite.body.x = 560;

    // Wrap the car for the next loop
    // TODO: fine tune this
    if(this.carSprite.body.y<gameProperties.screenHeight*0.8) this.carSprite.body.y = this.gameProperties.gameHeight - 200;

    this.explosion.x = this.carSprite.body.x;
    this.explosion.y = this.carSprite.body.y;
  };

  this.left = function() {
      this.carSprite.body.angularVelocity = -this.angularVelocity;
      this.carSprite.body.moveLeft(400);
  };

  this.right = function() {
    this.carSprite.body.angularVelocity = this.angularVelocity;
      this.carSprite.body.moveRight(400);
  };

  this.setInMotion = function(inMotion) {
    this.inMotion = inMotion;
    if(false==inMotion)
    {
      this.explosionAnimation = this.explosion.animations.play('explode');
      this.explosion.alpha = 1;
    }
    else
    {
      this.explosion.alpha = 0;
    }
  };

  this.updateAnimation = function()
  {
    if(this.explosionAnimation!=null)
    {
      if(this.explosionAnimation.isFinished)
      {
        this.explosionAnimation = null;
        this.explosion.alpha = 0;
      }
    }
  }

};

