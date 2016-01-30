"use strict";

/*
 * Victim Object
 */

gameSheets.victimAssets = new Array();
gameSheets.victimAssets[0] = { URL:'assets/drawings/sheep_animation.png', name:'sheep', scale:{x : 0.1, y : 0.1}, };
gameSheets.victimAssets[1] = { URL:'assets/drawings/bunny_animation.png', name:'bunny', scale:{x : 0.1, y : 0.1} };
gameSheets.victimAssets[2] = { URL:'assets/drawings/cat_animation.png', name:'cat', scale:{x : 0.1, y : 0.1} };
gameSheets.victimAssets[3] = { URL:'assets/drawings/businessman_animation.png', name:'businessman', scale:{x : 0.1, y : 0.1}, };
gameSheets.victimAssets[4] = { URL:'assets/drawings/teenager_animation.png', name:'teenager', scale:{x : 0.1, y : 0.1} };
gameSheets.victimAssets[5] = { URL:'assets/drawings/old_man_animation.png', name:'old_man', scale:{x : 0.1, y : 0.1} };

function Victim(hit) {
  this.hit = hit;
  this.carContact = false;
  this.hitVictim = null;
  this.animals = [ "sheep", "bunny", "cat"];
  this.people = [ "businessman", "teenager", "old_man"];
  this.sets = [this.animals, this.people];
  this.sprites;
  this.spriteCount = 0;
  this.blockCollisionGroup;
  this.lastSpawn;

  this.init = function (blockCollisionGroup) {
    this.sprites = new Array();
    this.blockCollisionGroup = blockCollisionGroup;
    this.lastSpawn = 7000;

    this.spawnThing(this.animals);

    this.myText = game.add.text(20, 40, "hello!!", fontAssets.counterFontStyle);
    this.myText.fixedToCamera = true;
  };

  this.spawnThing = function(names) {

    for(var t = 0; t<names.length; t++)
    {
      var i = this.spriteCount++;
      this.sprites[i] = game.add.sprite(250 + t * 60, this.lastSpawn, names[t]);
      this.sprites[i].scale.x = 0.1;
      this.sprites[i].scale.y = 0.1;
      game.physics.p2.enable(this.sprites[i], false);
      this.sprites[i].body.setCircle(16);
      //this.sprites[i].body.debug = true;
      this.sprites[i].body.mass = 10;
      this.sprites[i].body.setCollisionGroup(this.blockCollisionGroup);
      this.sprites[i].body.collides([this.blockCollisionGroup]);
      this.sprites[i].sprite_collides = false;
      this.sprites[i].father = this;
      this.sprites[i].victim = names[t];
      this.sprites[i].body.onBeginContact.add(this.on_sprite_begin_contact, this.sprites[i]);
      this.sprites[i].body.onEndContact.add(this.on_sprite_end_contact, this.sprites[i]);
      this.sprites[i].body.kinematic = false;
      this.sprites[i].body.static = true;
      //this.sprites[i].body.angularVelocity = Math.random() * 3;
      //this.sprites[i].body.thrust(Math.random() * 50000);
    }
    this.lastSpawn-=500;
  }

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

    this.frame = 1;
//    this.body.y -= 500;
//    this.body.x = 200 + Math.random() * 400;

    // Remove the collision
    this.body.setCollisionGroup(0);
    this.body.velocity = 0;
    // Invoke the callback called hit() on the object called this.hit
    this.father.hit.hit(this.father.hit);

    if(Math.random()>0.5) this.father.spawnThing(this.father.animals);
    else this.father.spawnThing(this.father.people);
  };

  this.on_sprite_end_contact = function(body_a, body_b, c, d, e) {
  };

};


