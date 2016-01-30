/*
 * Victim Object
 */

"use strict"

var ballAssets = { URL:'assets/drawings/ball.png', name:'ball' };

function Victim(hit) {
  this.hit = hit;

  this.init = function (blockCollisionGroup) {
    this.sprite = game.add.sprite(300, 7000);
    game.physics.p2.enable(this.sprite, false);
    this.sprite.body.setCircle(16);
    this.sprite.body.debug = true;
    this.sprite.body.mass = 10;
    this.sprite.body.setCollisionGroup(blockCollisionGroup);
    this.sprite.body.collides([blockCollisionGroup]);
    this.sprite.sprite_collides = false;
    this.sprite.body.onBeginContact.add(this.on_sprite_begin_contact, this, 0, 0, 0);
    this.sprite.body.onEndContact.add(this.on_sprite_end_contact, this, 0, 0, 0);
  };

  this.neutral = function() {
  };

  this.left = function() {
    this.sprite.body.angularVelocity = -10;
  };

  this.right = function() {
    this.sprite.body.angularVelocity = 10;
  };

  this.update = function() {
    if(this.sprite.sprite_collides) {
      this.sprite.body.velocity.y -= 50;
    }
  };

  this.on_sprite_begin_contact = function(a, b, c, d, e) {
    this.sprite.sprite_collides = true;

    this.sprite.body.y -= 500;
    this.sprite.body.x = 200 + Math.random() * 400;

    // Invoke the callback called hit() on the object called this.hit
    this.hit.hit(this.hit);
  };

  this.on_sprite_end_contact = function(a, b, c, d, e) {
    this.sprite.sprite_collides = false;
  };

};


