"use strict";
/*
 * Game status
 */

function randint(i) {
    return Math.floor((i + 1) * Math.random());
}

function getRandomSubarray(arr, size) {
    var shuffled = arr.slice(0), i = arr.length, temp, index;
    while (i--) {
        index = randint(i);
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(0, size);
}

function Choice (previous_choices) {
  this.type = "choice";    
  this.option_pool = ["sheep", "bunny", "cat", ];
  this.chosen = null;
  this.options = getRandomSubarray(this.option_pool, 3);

  function contains (arr, elem) {
    return (arr.lastIndexOf(elem) >= 0);
  };

  this.choose = function (pick) {
    if (this.chosen == null) {
      this.chosen = pick;
    } else if (this.chosen != pick) {
      return false;
    }
    return true;
  };
}

function Sequence () {
  this.pickColor = function(color) {
      this.currChoice().choose(color);

      this.index++;
      if (this.index >= this.choices.length) {
        this.index = 0;
        if (randint(5)==0) {
          this.newChoice();
        }
      }
  };

  this.currChoice = function() {
    return this.choices[this.index]
  };

  this.newChoice = function() {
    this.choices.push(new Choice(this.choices));
  };

  this.type = "sequence";
  this.choices = [];
  this.index = 0;

  this.newChoice();
}
