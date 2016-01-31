"use strict";
/*
 * Audio manager
 */

var context;
var bufferLoader;

function AudioInterface(intro, tracks, soundBanks) {
  this.type = "audioInterface";
  this.soundsInitialized = false;
  this.tracksInitialized = false;

  this.gains = [];
  this.tracks = [];
  this.introTrack = null; // handled separately

  this.startTime = 0.0;

  this.sounds = [];
  this.soundGainNode = null;

  this.audioConfigs = [[1,0,0,0],
    [0,1,0,0],
    [0,0,1,0],
    [0,0,0,1]];
  this.switchTime = 1.0;


  this.init = function(intro,tracks,soundBanks) {
    try {
      // Fix up for prefixing
      window.AudioContext = window.AudioContext||window.webkitAudioContext;
      this.context = new AudioContext();
    }
    catch(e) {
      alert('Web Audio API is not supported in this browser');
      return;
    }

    var trackList = tracks.concat([intro]);
    this.bankIndex = [];
    var soundList = [];
    var i = 0;
    for (var bank of soundBanks) {
      var index = [];
      for (var sound of bank) {
        index.push(i++);
        soundList.push(sound);
      }
      this.bankIndex.push(index);
    }

    self = this;
    var trackLoader = new BufferLoader(this.context, trackList,
        function(bufferList){self.finishedLoadingTracks(bufferList)});
    var soundLoader = new BufferLoader(this.context, soundList,
        function(bufferList){self.finishedLoadingSounds(bufferList)});

    trackLoader.load();
    soundLoader.load();
  }

  this.init(intro,tracks,soundBanks);

  this.startMusic = function () {
    this.startTime = this.context.currentTime + 0.02;
    this.introTrack.loop=false;
    this.introTrack.start(this.startTime);
    var introLength = this.introTrack.buffer.duration;
    this.startTime += introLength;

    // Queue starting of the loops ~100ms before playback
    self = this;
    window.setTimeout(function(){self.startLoops()}, introLength * 1000.0 - 100.0);
    this.switchConfig(this.audioConfigs[0], this.switchTime);
  }

  this.startLoops = function() {
    for (var track of this.tracks) {
      track.loop=true;
      track.start(this.startTime);
    }
  }

  this.switchConfig = function(audioConfig, duration) {
    var startTime = this.context.currentTime;

    for (var i = 0; i < this.gains.length; ++i) {
      var start = this.gains[i].gain.value;
      var end = audioConfig[i];

      this.gains[i].gain.setValueAtTime(start,startTime);
      this.gains[i].gain.linearRampToValueAtTime(end, startTime + duration);
    }
  }

  this.finishedLoadingTracks = function(bufferList) {
    // Intro
    this.introTrack = this.context.createBufferSource();
    this.introTrack.buffer = bufferList[bufferList.length-1];

    for (var i = 0; i < bufferList.length-1; ++i) {
      this.tracks.push(this.context.createBufferSource());
      this.gains.push(this.context.createGain());

      this.tracks[i].buffer = bufferList[i];
      this.tracks[i].connect(this.gains[i]);
      this.gains[i].connect(this.context.destination);
      this.gains[i].gain.setValueAtTime(0.0, 0.0);
    }

    this.introTrack.connect(this.gains[0]);

    this.tracksInitialized = true;
    this.startMusic();
  }

  this.finishedLoadingSounds = function(bufferList)
  {
    for (var buffer of bufferList) {
      this.sounds.push(buffer);
    }
    this.soundGainNode = this.context.createGain();
    this.soundGainNode.gain.setValueAtTime(3.0,0.0);
    this.soundGainNode.connect(this.context.destination);

    this.soundsInitialized = true;
  }

  this.playSound = function(bank)
  {
    if(this.soundsInitialized == true)
    {
      var sound = this.sounds[randomElement(this.bankIndex[bank])];
      var sourceNode = this.context.createBufferSource();
      sourceNode.buffer = sound;
      sourceNode.connect(this.soundGainNode);
      sourceNode.start(0.0);
    }
  }

  this.setSoundVolume = function(volume)
  {
    this.soundGainNode.setValueAtTime(volume, this.context.currentTime);
  }

  this.isReady = function() {
    return this.soundsInitialized && this.tracksInitialized;
  }
}


function randomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}
