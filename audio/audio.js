var context;
var bufferLoader;

window.addEventListener('load', init, false);

function init() {
    
    try {
        // Fix up for prefixing
        window.AudioContext = window.AudioContext||window.webkitAudioContext;
        context = new AudioContext();

    }
    catch(e) {
        alert('Web Audio API is not supported in this browser');
        return;
    }
    bufferLoader = new BufferLoader(context,
                                    ['assets/xfade1-2.ogg',
                                     'assets/xfade2-2.ogg'], finishedLoading);
    bufferLoader.load();
}

var gains = []
var tracks = []
function finishedLoading(bufferList) {
    for (i = 0; i < bufferList.length; ++i) {

        tracks.push(context.createBufferSource());
        gains.push(context.createGain());
        
        tracks[i].buffer = bufferList[i];    
        tracks[i].connect(gains[i]);
        gains[i].connect(context.destination);
        
        log("track "+ (i+1) +
            " duration: " + tracks[i].buffer.duration +
            " length: " + tracks[i].buffer.length);
    }
       
    log('loading finished');
}

function startMusic() {
    log('start');

    startTime = context.currentTime + 0.02
    for (i = 0; i < tracks.length; ++i) {
        tracks[i].loop=true;
        tracks[i].start(startTime);
        gains[i].gain.setValueAtTime(0.0, startTime);
        gains[i].gain.linearRampToValueAtTime(1.0, startTime+1.0);
    }
}

var audioConfigs = [[1.0, 0.00001],
                    [0.5, 0.5],
                    [0.000001, 1.0]];
var switchTime = 0.5;

function switchConfig(audioConfig, time) {
    time = context.currentTime + time;
    for (i = 0; i < gains.length; ++i) {
        gains[i].gain.linearRampToValueAtTime(audioConfig[i], time);
    }
}

// ---- Helper functions ----

function error(msg) {
    //document.getElementById("error").innerHTML = "<font color=\"red\">" + msg + "</font>";
    log("<font color=\"red\">" + msg + "</font>");
}

function log(msg) {
    //document.getElementById("log").innerHTML = msg + "<br/>" + document.getElementById("log").innerHTML;
    document.getElementById("log").innerHTML += "<br/>"+msg;
}

function info(msg) {
    document.getElementById("info").innerHTML = msg;
}
