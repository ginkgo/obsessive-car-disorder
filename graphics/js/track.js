"use strict";
/*
 * Track Object
 */

var trackAssets = { URL:'assets/drawings/road_1.png', name:'track' };
var grassAssets = { URL:'assets/drawings/grass.png', name:'grass' };

function Track(gameProperties) {
  this.gameProperties = gameProperties;
  this.grassSprite;
  this.trackSprite;

  this.init = function () {
    this.grassSprite = game.add.tileSprite(0, 0, this.gameProperties.gameWidth, this.gameProperties.gameHeight, grassAssets.name);
    this.trackSprite = game.add.tileSprite(165, 0, 650, gameProperties.gameHeight, trackAssets.name);

    this.trackSprite.scale.x = 0.75;
  };

};
