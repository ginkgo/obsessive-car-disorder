/*
 * Track Object
 */

"use strict"

var trackAssets = { URL:'assets/drawings/road_1.png', name:'track' };

function Track(gameProperties) {
  this.gameProperties = gameProperties;
  this.trackSprite;

  this.init = function () {
    this.trackSprite = game.add.tileSprite(50, 0, 650, gameProperties.gameHeight, trackAssets.name);

    //this.trackSprite.anchor.set(0.5, 0.5); 
    //this.trackSprite.scale.x = 0.25;
    //this.trackSprite.scale.y = 0.25;
    //this.trackSprite.rotation = 1.0;
  };

};
