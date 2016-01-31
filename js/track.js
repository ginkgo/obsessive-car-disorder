"use strict";
/*
 * Track Object
 */

gameAssets.trackAssets = new Array();
gameAssets.trackAssets[0] = { URL:'assets/drawings/road_1.png', name:'track' };
gameAssets.trackAssets[1] = { URL:'assets/drawings/grass.png', name:'grass' };
gameAssets.trackAssets[2] = { URL:'assets/drawings/finish_gate_top.png', name:'finish_top' };
gameAssets.trackAssets[3] = { URL:'assets/drawings/finish_gate_bottom.png', name:'finish_bottom' };

function Track(gameProperties) {
  this.gameProperties = gameProperties;
  this.grassSprite;
  this.trackSprite;

  this.init = function () {
    this.grassSprite = game.add.tileSprite(0, 0, this.gameProperties.gameWidth, this.gameProperties.gameHeight, gameAssets.trackAssets[1].name);
    this.trackSprite = game.add.tileSprite(165, 0, 650, gameProperties.gameHeight, gameAssets.trackAssets[0].name);
    this.trackSprite.scale.x = 0.75;
    this.finishSpriteTop = game.add.sprite(165, 0, gameAssets.trackAssets[2].name);
    this.finishSpriteTop.scale.x = 0.75;
    this.finishSpriteBottom = game.add.sprite(165, 0, gameAssets.trackAssets[3].name);
    this.finishSpriteBottom.scale.x = 0.75;

    this.reset();
  };

  this.showFinishingAt = function(y) {
    this.finishSpriteTop.y = y;
    this.finishSpriteTop.alpha = 1;
    this.finishSpriteBottom.y = y;
    this.finishSpriteBottom.alpha = 1;
  }

  this.reset = function() {
    this.finishSpriteTop.alpha = 0;
    this.finishSpriteBottom.alpha = 0;
  }
};
