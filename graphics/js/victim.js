"use strict";

/*
 * Victim Object
 */

gameAssets.victimAssets = new Array();
gameAssets.victimAssets[0] = { URL:'assets/drawings/sheep.png', name:'sheep', scale:{x : 0.07, y : 0.07} };
gameAssets.victimAssets[1] = { URL:'assets/drawings/dead_sheep.png', name:'sheep_dead', scale:{x : 0.07, y : 0.07} };
gameAssets.victimAssets[2] = { URL:'assets/drawings/bunny.png', name:'bunny', scale:{x : 0.07, y : 0.07} };
gameAssets.victimAssets[3] = { URL:'assets/drawings/dead_bunny.png', name:'bunny_dead', scale:{x : 0.07, y : 0.07} };
gameAssets.victimAssets[4] = { URL:'assets/drawings/cat.png', name:'cat', scale:{x : 0.07, y : 0.07} };
gameAssets.victimAssets[5] = { URL:'assets/drawings/dead_cat.png', name:'cat_dead', scale:{x : 0.07, y : 0.07} };

function Victim(hit) {
  this.hit = hit;
  this.sprite;
  this.carContact = false;
  this.hitVictim = null;

  this.init = function (blockCollisionGroup) {
    this.sprite = new Array();
    for(var i = 0; i<gameAssets.victimAssets.length; i++)
    {
      this.sprite[i] = game.add.sprite(300, 7000, gameAssets.victimAssets[i].name);
      this.sprite[i].scale.x = gameAssets.victimAssets[i].scale.x;
      this.sprite[i].scale.y = gameAssets.victimAssets[i].scale.y;
      game.physics.p2.enable(this.sprite, false);
      this.sprite[i].body.setCircle(16);
      //this.sprite[i].body.debug = true;
      this.sprite[i].body.mass = 10;
      this.sprite[i].body.setCollisionGroup(blockCollisionGroup);
      this.sprite[i].body.collides([blockCollisionGroup]);
      this.sprite[i].sprite_collides = false;
      this.sprite[i].father = this;
      this.sprite[i].victim = gameAssets.victimAssets[i].name;
      this.sprite[i].body.onBeginContact.add(this.on_sprite_begin_contact, this.sprite[i]);
      this.sprite[i].body.onEndContact.add(this.on_sprite_end_contact, this.sprite[i]);
      this.sprite[i].body.x = 250 + i * 60;
      //this.sprite[i].body.angularVelocity = Math.random() * 3;
      //this.sprite[i].body.thrust(Math.random() * 50000);
    }

    this.myText = game.add.text(20, 40, "hello!!", fontAssets.counterFontStyle);
    this.myText.fixedToCamera = true;
  };

  this.neutral = function() {
  };

  this.left = function() {
  };

  this.right = function() {
  };

  this.update = function() {
  };

  this.on_sprite_begin_contact = function(body_a, body_b, c, d, e) {
    this.father.myText.text += "\nkilled: " + this.victim;

    this.body.y -= 500;
    this.body.x = 200 + Math.random() * 400;
    // Invoke the callback called hit() on the object called this.hit
    this.father.hit.hit(this.father.hit);
  };

  this.on_sprite_end_contact = function(body_a, body_b, c, d, e) {
  };

};


