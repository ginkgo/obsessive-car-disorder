"use strict";
/*
 * Main Obsessive Car Disorder Game
 */

var gameProperties = { screenWidth: 800, screenHeight: 600, gameWidth: 800, gameHeight: 8000, };

var fontAssets = {
counterFontStyle:{font: '20px Arial', fill: '#FFFFFF', align: 'center'},
};

var gameAssets = new Object();
var gameSheets = new Object();

var gameState = function(game){
  this.key_left;
  this.key_right;
  this.key_thrust;
  this.key_space;
  this.car;
  this.score;
  this.sequence;
};

gameState.prototype = {
preload: function () {
          for(var obj in gameAssets)
          {
            for(var ast = 0; ast < gameAssets[obj].length; ast++)
            {
              game.load.image(gameAssets[obj][ast].name, gameAssets[obj][ast].URL);
            }
          }
          for(var obj in gameSheets)
          {
            for(var ast = 0; ast < gameSheets[obj].length; ast++)
            {
              game.load.spritesheet(gameSheets[obj][ast].name, gameSheets[obj][ast].URL, 500, 500);
            }
          }
         },

create: function () {
          game.world.setBounds(0, 0, gameProperties.gameWidth, gameProperties.gameHeight);
          game.physics.startSystem(Phaser.Physics.P2JS);
          game.physics.p2.gravity.y = 0;
          var blockCollisionGroup = game.physics.p2.createCollisionGroup();
          game.physics.p2.updateBoundsCollisionGroup();

          this.track = new Track(gameProperties);
          this.track.init();

          this.car = new Car(gameProperties);
          this.car.init(blockCollisionGroup);

          this.myText = game.add.text(20, 10, "hello!!", fontAssets.counterFontStyle);
          this.myText.fixedToCamera = true;

          this.ball = new Victim(this);
          this.ball.init(blockCollisionGroup);

          this.key_left = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
          this.key_right = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
          this.key_thrust = game.input.keyboard.addKey(Phaser.Keyboard.UP);
          this.key_space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

          this.score = 0;
          this.sequence = new Sequence();
        },

update: function () {
          this.myText.text = "Score: " + this.score;

          this.car.neutral();
          if (this.key_left.isDown) {
            this.car.left();
            this.ball.left();
          } else if (this.key_right.isDown) {
            this.car.right();
            this.ball.right();
          }

          if (this.key_thrust.isDown) {
            this.car.accelerate();
            this.myText.text = "Go!";
          }

          if (this.key_space.isDown) {
            this.myText.text = "Fire!!!";
            this.ball.update();
          }
        },

render: function() {
          //game.debug.text(game.time.suggestedFps, 32, 32);
          //game.debug.text(game.time.physicsElapsed, 32, 32);
          //game.debug.body(this.car.shipSprite);
          //game.debug.bodyInfo(this.car.shipSprite, 16, 24);

          game.debug.body(this.ball);
        },

hit: function() {
      this.score = this.score+=1;
    },

};

var game = new Phaser.Game(
    gameProperties.screenWidth, 
    gameProperties.screenHeight, 
    Phaser.AUTO, 
    'gameDiv');
game.state.add("OCD", gameState);
game.state.start("OCD");
