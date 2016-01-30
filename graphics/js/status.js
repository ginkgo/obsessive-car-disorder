"use strict";
/*
 * Game status
 */
function clear_error() {
    //document.getElementById("error").innerHTML = "";
}

function error(msg) {
    //document.getElementById("error").innerHTML = "<font color=\"red\">" + msg + "</font>";
    log("<font color=\"red\">" + msg + "</font>");
}

function log(msg) {
    //document.getElementById("log").innerHTML = msg + "<br/>" + document.getElementById("log").innerHTML;
}

function info(msg) {
    //document.getElementById("info").innerHTML = msg;
}

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

  this.print = function () {
    var option_str = "";
    for (var i = 0; i < this.options.length; ++i) {            
      option_str += this.options[i] + " "
    }
    if (this.chosen != null) {
      info("Current option: " + option_str);
    } else {
      info("<font color=\"green\">New option: " + option_str + "</font>");
    }
  };

  this.choose = function (pick) {
    if (this.chosen == null) {
      this.chosen = pick;
    } else if (this.chosen != pick) {
      return false;
    }
    return true;
  };

  this.isValid = function(option) {
    return contains(this.options,option);
  };
}

function Sequence () {

  this.pickColor = function(color) {
    clear_error();
    if (this.currChoice().isValid(color))
    {
      this.currChoice().choose(color);
      log("Picked " + color);

      this.index++;
      if (this.index >= this.choices.length) {
        this.index = 0;
        if (randint(5)==0) {
          this.newChoice();
        }
        log("<br/>--new round--<br>");
      }
      this.currChoice().print();
    }
    else
    {
      error("Not an option!");
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
  this.currChoice().print();
}
