/*
 * Main Obsessive Car Disorder Game
 */

"use strict"

var gameProperties = {
    screenWidth: 800,
    screenHeight: 600,
    gameWidth: 800,
    gameHeight: 5000,
};

var fontAssets = {
    counterFontStyle:{font: '20px Arial', fill: '#FFFFFF', align: 'center'},
};

var gameState = function(game){
    this.key_left;
    this.key_right;
    this.key_thrust;
    this.key_fire;
    this.car;
};

gameState.prototype = {
    preload: function () {
        game.load.image(carAssets.name, carAssets.URL);
        game.load.image(trackAssets.name, trackAssets.URL);
    },
    
    create: function () {
        game.world.setBounds(0, 0, gameProperties.gameWidth, gameProperties.gameHeight);
        game.physics.startSystem(Phaser.Physics.P2JS);
        game.physics.p2.gravity.y = 0;
        var blockCollisionGroup = game.physics.p2.createCollisionGroup();
        game.physics.p2.updateBoundsCollisionGroup();

	this.track = new Track(gameProperties.screenWidth, gameProperties.screenHeight);
	this.track.init();

	this.car = new Car(gameProperties.screenWidth, gameProperties.screenHeight);
	this.car.init(blockCollisionGroup);

        this.myText = game.add.text(20, 10, "hello!!", fontAssets.counterFontStyle);
	this.wheel = game.add.sprite(64, 64);
	game.physics.p2.enable(this.wheel, false);
	this.wheel.body.setCircle(16);
	this.wheel.body.debug = true;
	this.wheel.body.mass = 10;
        this.wheel.body.setCollisionGroup(blockCollisionGroup);
        this.wheel.body.collides([blockCollisionGroup]);
	this.wheel.wheel_collides = false;
	this.wheel.body.onBeginContact.add(this.on_wheel_begin_contact, this, 0, 0, 0);
	this.wheel.body.onEndContact.add(this.on_wheel_end_contact, this, 0, 0, 0);

        this.initKeyboard();
    },

    update: function () {
       this.checkPlayerInput();
    },

    on_wheel_begin_contact: function(a, b, c, d, e) {
        this.wheel.wheel_collides = true;
    },

    on_wheel_end_contact: function(a, b, c, d, e) {
        this.wheel.wheel_collides = false;
    },

    initKeyboard: function () {
        this.key_left = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        this.key_right = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        this.key_thrust = game.input.keyboard.addKey(Phaser.Keyboard.UP);
        this.key_fire = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    },

    checkPlayerInput: function () {
        this.myText.text = "...";

	this.car.neutral();
        if (this.key_left.isDown) {
            this.car.left();
            this.wheel.body.angularVelocity = -10;
        } else if (this.key_right.isDown) {
            this.car.right();
            this.wheel.body.angularVelocity = 10;
        }

        if (this.key_thrust.isDown) {
            this.car.accelerate();
            this.myText.text = "Go!";
        }

        if (this.key_fire.isDown) {
            this.myText.text = "Fire!!!";
            if(this.wheel.wheel_collides) {
                this.wheel.body.velocity.y -= 50;
            }
//debugger

            game.camera.x++;
        }
    },

    render: function() {
//        game.debug.text(game.time.suggestedFps, 32, 32);
//        game.debug.text(game.time.physicsElapsed, 32, 32);
//        game.debug.body(this.car.shipSprite);
//        game.debug.bodyInfo(this.car.shipSprite, 16, 24);

          game.debug.body(this.wheel);
    }
};

var game = new Phaser.Game(gameProperties.screenWidth, gameProperties.screenHeight, Phaser.AUTO, 'gameDiv');
game.state.add("OCD", gameState);
game.state.start("OCD");
