
function Sequence (type) {
    this.type = "sequence";
    this.option_pool = ["red", "green", "blue", "yellow", "cyan", "magenta"];
    this.options = ["red", "green"];

    this.pickColor = function(color) {
        document.getElementById("log").innerHTML += "<br\>Picked " + color;
    };

    this.printCurrentOptions = function() {
        document.getElementById("current_options").innerHTML = "Current options: "
        for (i = 0; i < this.options.length; ++i) {
            document.getElementById("current_options").innerHTML += this.options[i] + " "
        }
    };
}

var sequence = new Sequence();

sequence.printCurrentOptions();
