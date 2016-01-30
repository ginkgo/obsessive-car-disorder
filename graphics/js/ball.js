/*
 * Ball Object
 */

"use strict"

var ballAssets = { URL:'assets/drawings/ball.png', name:'ball' };

function Ball() {
  this.acceleration = 500;
  this.drag = 0.9;
  this.maxVelocity = 500;
  this.angularVelocity = 5;
  this.wheel;

  this.init = function (blockCollisionGroup) {
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
  };

  this.neutral = function() {
  };

  this.left = function() {
    this.wheel.body.angularVelocity = -10;
  };

  this.right = function() {
    this.wheel.body.angularVelocity = 10;
  };

  this.update = function() {
    if(this.wheel.wheel_collides) {
      this.wheel.body.velocity.y -= 50;
    }
  };

  this.on_wheel_begin_contact = function(a, b, c, d, e) {
    this.wheel.wheel_collides = true;
  };

  this.on_wheel_end_contact = function(a, b, c, d, e) {
    this.wheel.wheel_collides = false;
  };

};


