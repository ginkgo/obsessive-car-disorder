
function clear_error() {
    document.getElementById("error").innerHTML = "";
}

function error(msg) {
    document.getElementById("error").innerHTML = "<font color=\"red\">" + msg + "</font>";
}

function log(msg) {
    document.getElementById("log").innerHTML += "<br/>" + msg;
}

function info(msg) {
    document.getElementById("info").innerHTML = msg;
}

function getRandomSubarray(arr, size) {
    var shuffled = arr.slice(0), i = arr.length, temp, index;
    while (i--) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(0, size);
}

function contains(arr, elem) {
    return (arr.lastIndexOf(elem) > 0);
}

function Choice (previous_choices) {
    this.type = "choice";    
    this.option_pool = ["red", "green", "blue", "yellow", "cyan", "magenta"];
    this.chosen = null;
    this.options = getRandomSubarray(this.option_pool, 3);

    this.print = function () {
        option_str = "";
        for (i = 0; i < this.options.length; ++i) {            
            option_str += this.options[i] + " "
        }
        info("Current options: " + option_str);
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
            log("Picked " + color);

            this.index++;
            if (this.index >= this.choices.length) {
                this.index = 0;
                this.newChoice();
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
    this.options = ["red", "green"];
    this.choices = [];
    this.index = 0;
    
    this.newChoice();
    this.currChoice().print();

}

var sequence = new Sequence();

