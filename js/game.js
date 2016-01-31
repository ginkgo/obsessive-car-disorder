"use strict";
/*
 * Main Obsessive Car Disorder Game
 */

var gameProperties = { screenWidth: 800, screenHeight: 600, gameWidth: 800, gameHeight: 80000, };

var fontAssets = { counterFontStyle:{font: '30px Arial', fill: '#FFFFFF', align: 'center'},
  gameOverFontStyle:{font: '60px Arial', fill: '#FF0000', align: 'center'}, };

var gameAssets = new Object();
var gameSheets = new Object();

gameAssets.UIAssets = new Array();
gameAssets.UIAssets[0] = { URL:'assets/drawings/heart.png', name:'heart' };
gameAssets.UIAssets[1] = { URL:'assets/drawings/game_over_text.png', name:'game_over' };

var gameState = function(game){
  this.key_left;
  this.key_right;
  this.key_thrust;
  this.key_space;
  this.car;
  this.score;
  this.hiscore;
  this.sequence;
  this.lives;
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

           game.load.spritesheet("explosion", "assets/drawings/explosion_animation.png", 300, 300);
         },

create: function () {
          this.hearts = new Array();
          this.lives = 5;

          game.world.setBounds(0, 0, gameProperties.gameWidth, gameProperties.gameHeight);
          game.physics.startSystem(Phaser.Physics.P2JS);
          game.physics.p2.gravity.y = 0;
          var blockCollisionGroup = game.physics.p2.createCollisionGroup();
          game.physics.p2.updateBoundsCollisionGroup();

          this.track = new Track(gameProperties);
          this.track.init();

          for (var i = 0; i<this.lives; i++)
          {
            this.hearts[i] = game.add.sprite( 25*(i+1), 100 , gameAssets.UIAssets[0].name);
            this.hearts[i].fixedToCamera = true;
            this.hearts[i].anchor.set(0.5, 0.5); 
            this.hearts[i].scale.x = this.hearts[i].scale.y = 0.1;
          }

          this.car = new Car(gameProperties);
          this.car.init(blockCollisionGroup);
          this.car.setInMotion(true);

          this.scoreText = game.add.text(20, 10, "", fontAssets.counterFontStyle);
          this.scoreText.fixedToCamera = true;

    this.hiscoreText = game.add.text(658, 10, "", fontAssets.counterFontStyle);
    this.hiscoreText.fixedToCamera = true;

          this.gameOverText = game.add.sprite(
              gameProperties.screenWidth/2, 
              gameProperties.screenHeight/2, 
              gameAssets.UIAssets[1].name);
          this.gameOverText.fixedToCamera = true;
          this.gameOverText.anchor.set(0.5, 0.5); 
          this.gameOverText.alpha = 0;



          this.victims = new Victim(this);
          this.victims.init(blockCollisionGroup);

          this.key_left = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
          this.key_right = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
          this.key_thrust = game.input.keyboard.addKey(Phaser.Keyboard.UP);
          this.key_space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    this.score = 0;
    this.hiscore = 0;
          this.sequence = new Sequence();

          this.audioInterface = new AudioInterface(  'assets/audio/intro.ogg',
              ['assets/audio/part1.ogg',
              'assets/audio/part2.ogg',
              'assets/audio/part3.ogg',
              'assets/audio/intense.ogg'],
              [['assets/audio/correct1.ogg',
              'assets/audio/correct2.ogg',
               'assets/audio/correct3.ogg'],
               ['assets/audio/wrong.ogg'],
              ['assets/audio/boom.ogg']]);
          this.gameOverDelay = null;
          this.winningDelay = null;

          this.level = 0;
        },

reset: function() {
         this.gameOverDelay = null;
         this.winningDelay = null;
         this.car.reset();
         this.track.reset();
         this.victims.reset(this.level);
         this.score = 0;
         this.lives = 5;

         for (var i = 0; i<this.lives; i++)
         {
           this.hearts[i].alpha = 1;
         }

         this.gameOverText.alpha = 0;
         this.car.setInMotion(true);
       },

update: function () {
          if(this.audioInterface.soundsInitialized==false ||
              this.audioInterface.tracksInitialized==false)
          { /* We are waiting for audio to load */
            this.scoreText.text = "Loading...";
          }
          else if( this.gameOverDelay != null)
          { /* We are in game over mode and should sleep a moment */
            var delay = 5000; /* 5 secs */
            if(new Date().getTime() > this.gameOverDelay + delay)
            {
              this.level = 0;
              this.reset();
            }
          }
          else
          { /* We are playing */
            if( this.winningDelay != null)
            { /* We won the game: let's wait a moment before increase the difficulty */
              var delay = 5000; /* 5 secs */
              if(new Date().getTime() > this.winningDelay + delay)
              {
                  this.level++;
                  var lives = this.lives;
                  this.reset()0;
                  this.lives = lives+1;
              }
            }

            this.scoreText.text = "" + this.score;
            this.hiscoreText.text = "HISCORE\n" + this.hiscore;

            this.car.neutral();
            if (this.key_left.isDown) {
              this.car.left();
            } else if (this.key_right.isDown) {
              this.car.right();
            }
              this.track.finishSpriteTop.bringToTop();
              
            if (this.key_thrust.isDown) {
            }

            if (this.key_space.isDown) {
              this.victims.update();
            }
          }
        },

render: function() {
          //game.debug.text(game.time.suggestedFps, 32, 32);
          //game.debug.text(game.time.physicsElapsed, 32, 32);
          //game.debug.body(this.car.shipSprite);
          //game.debug.bodyInfo(this.car.shipSprite, 16, 24);
        },

    hit: function(score) {
        if(this.lives>0)
        {
            if(this.score<0) this.score = 0;

            if(score>0)
            {
                this.audioInterface.playSound(0);
                this.score += 2;
            }
            if(score<0 && this.lives>0)
            {
                this.lives--;
                this.hearts[this.lives].alpha = 0;
                this.audioInterface.playSound(1);
            }
            if(this.lives == 0) {
                this.car.setInMotion(false);
                this.gameOverText.alpha = 1;
                this.gameOverText.bringToTop();
                this.gameOverDelay = new Date().getTime();
                this.audioInterface.playSound(2);  
            }
            if(this.score > 20) {
                if( this.winningDelay == null)
                {
                    /* Win the game and increase the level. */
                    this.track.showFinishingAt(this.car.carSprite.body.y - 1200);
                    this.winningDelay = new Date().getTime();
                }
            }

            if (this.score > this.hiscore) { this.hiscore = this.score; }
            
            if (this.audioInterface.isIntroOver()) {
                var switchTime = 0.25;
                if (this.lives <= 1) {
                    this.audioInterface.switchConfig([0,0,0,1], switchTime);
                }
                else if (this.lives <= 2) {
                    this.audioInterface.switchConfig([0,0,1,0], switchTime);
                }
                else if (this.lives <= 3) {
                    this.audioInterface.switchConfig([0,1,0,0], switchTime);
                }
                else {
                    this.audioInterface.switchConfig([1,0,0,0], switchTime);
                }
            }
        }
    }

};

var game = new Phaser.Game(
    gameProperties.screenWidth, 
    gameProperties.screenHeight, 
    Phaser.AUTO, 
    'gameDiv');
game.state.add("OCD", gameState);
game.state.start("OCD");
