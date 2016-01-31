"use strict";

/*
 * Victim Object
 */

gameSheets.victimAssets = new Array();
gameSheets.victimAssets[ 0] = { URL:'assets/drawings/sheep_animation.png', name:'sheep', scale:{x : 0.1, y : 0.1}, };
gameSheets.victimAssets[ 1] = { URL:'assets/drawings/bunny_animation.png', name:'bunny', scale:{x : 0.1, y : 0.1} };
gameSheets.victimAssets[ 2] = { URL:'assets/drawings/cat_animation.png', name:'cat', scale:{x : 0.1, y : 0.1} };
gameSheets.victimAssets[ 3] = { URL:'assets/drawings/snake_animation.png', name:'snake', scale:{x : 0.1, y : 0.1} };
gameSheets.victimAssets[ 4] = { URL:'assets/drawings/businessman_animation.png', name:'businessman', scale:{x : 0.1, y : 0.1}, };
gameSheets.victimAssets[ 5] = { URL:'assets/drawings/teenager_animation.png', name:'teenager', scale:{x : 0.1, y : 0.1} };
gameSheets.victimAssets[ 6] = { URL:'assets/drawings/old_man_animation.png', name:'old_man', scale:{x : 0.1, y : 0.1} };
gameSheets.victimAssets[ 7] = { URL:'assets/drawings/old_woman_animation.png', name:'old_woman', scale:{x : 0.1, y : 0.1} };
gameSheets.victimAssets[ 8] = { URL:'assets/drawings/red_gate_animation.png', name:'red', scale:{x : 0.1, y : 0.1}, };
gameSheets.victimAssets[ 9] = { URL:'assets/drawings/green_gate_animation.png', name:'green', scale:{x : 0.1, y : 0.1} };
gameSheets.victimAssets[10] = { URL:'assets/drawings/blue_gate_animation.png', name:'blue', scale:{x : 0.1, y : 0.1} };
gameSheets.victimAssets[11] = { URL:'assets/drawings/yellow_gate_animation.png', name:'yellow', scale:{x : 0.1, y : 0.1} };

function Victim(hit) {
  this.hit = hit;
  this.carContact = false;
  this.hitVictim = null;
  this.sets = [this.animals, this.people, this.gates];
  this.chosen = ["", "", ""];
  this.sprites;
  this.spriteCount = 0;
  this.blockCollisionGroup;
  this.lastSpawn;
  this.easierDifficulty = 600.0;
  this.difficultyFactor = this.easierDifficulty;

  this.init = function (blockCollisionGroup) {
    this.sprites = new Array();
    this.blockCollisionGroup = blockCollisionGroup;
    this.reset(0);
  };

  this.reset = function (level)
  {
    this.chosen = ["", "", ""];

    this.animals = [ "sheep", "bunny", "cat", "snake"];
    this.people = [ "businessman", "teenager", "old_man", "old_woman"];
    this.gates = [ "red", "green", "blue", "yellow"];

    // Remove one random element from each of the 3 sets
    this.animals.splice(Math.floor((this.animals.length) * Math.random()), 1);
    this.people.splice(Math.floor((this.people.length) * Math.random()), 1);
    this.gates.splice(Math.floor((this.gates.length) * Math.random()), 1);

    for(var v = 0; v < this.spriteCount; v++)
    {
        if(this.sprites[v]!=undefined)
        {
          this.sprites[v].alpha = 0;
          game.world.remove(this.sprites[v]);
          this.sprites[v].kill();
          this.sprites[v].destroy();
          delete this.sprites[v];
        }
    }

    this.lastSpawn = gameProperties.gameHeight - this.easierDifficulty;

    this.spawnThing(this.animals);

    this.difficultyFactor = this.easierDifficulty - level * 50.0;
  }

  this.spawnThing = function(names) {
    var namesPermutation = new Array();

    var namesLen = names.length;
    for(var t = 0; t<namesLen; t++)
    {
      var pos = Math.floor((names.length) * Math.random());
      namesPermutation[t] = names.splice(pos, 1)[0];
    }

    for(var t = 0; t<namesLen; t++)
    {
      names.push(namesPermutation[t]);
    }

    for(var t = 0; t<namesLen; t++)
    {
      var i = this.spriteCount++;
      this.sprites[i] = game.add.sprite(270 + t * 130, this.lastSpawn, names[t]);
      this.sprites[i].scale.x = 0.2;
      this.sprites[i].scale.y = 0.2;
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
    this.lastSpawn-=this.difficultyFactor;
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
    this.frame = 1;

    var found = [
      this.father.animals.indexOf(this.victim) > -1,
      this.father.people.indexOf(this.victim) > -1,
      this.father.gates.indexOf(this.victim) > -1 ];

    var score = 0;

    for(var i = 0; i<found.length; i++)
    {
      if(found[i])
      {
        if(this.father.chosen[i].length == 0 )
        {
          this.father.chosen[i]= this.victim;
        }
        else if (0 == this.father.chosen[i].localeCompare(this.victim))
        {
          score = 1;
        }
        else
        {
          score = -1;
        }
      }
    }

    // Remove the collision
    this.body.setCollisionGroup(0);
    this.body.velocity = 0;
    // Invoke the callback called hit() on the object called this.hit
    this.father.hit.hit(score);

    if(Math.random()>0.66) this.father.spawnThing(this.father.animals);
    if(Math.random()>0.66) this.father.spawnThing(this.father.people);
    else this.father.spawnThing(this.father.gates);
  };

  this.on_sprite_end_contact = function(body_a, body_b, c, d, e) {
  };

};


