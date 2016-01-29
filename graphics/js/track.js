/*
 * Car Object
 */

"use strict"

var trackAssets = { URL:'assets/drawings/road_1.png', name:'track' };

function Track(width, height) {
    this.width = width;
    this.height = height;
    this.acceleration = 300;
    this.drag = 0.9;
    this.maxVelocity = 300;
    this.angularVelocity = 5;
    this.trackSprite;

    this.init = function () {
        this.trackSprite = game.add.tileSprite(0, 0, 20000, 20000, trackAssets.name);

//        this.trackSprite.anchor.set(0.5, 0.5); 
//        this.trackSprite.scale.x = 0.25;
//        this.trackSprite.scale.y = 0.25;
//        this.trackSprite.rotation = 1.0;
    };

};
