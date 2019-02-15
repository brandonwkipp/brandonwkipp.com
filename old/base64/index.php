<?php

?>
<!DOCTYPE html>
<html>
<head>
    <title>Base64</title>
    <script src="base64-binary.js"></script>
</head>
<body>
<div id="start-button" style="width:50px;height:50px;background:blue;" onclick="ctrl_setup()">control</div>
<hr/>
<div style="width:50px;height:50px;background:green;border-radius:100%;" onclick="ctrl1.start()">1</div>
<div style="width:50px;height:50px;background:green;border-radius:100%;" onclick="ctrl2.start()">2</div>
<div style="width:50px;height:50px;background:green;border-radius:100%;" onclick="ctrl3.start()">3</div>
<br/>
<div id="start-button" style="width:50px;height:50px;background:red;" onclick="base_setup()">base64</div>
<hr/>
<div style="width:50px;height:50px;background:pink;border-radius:100%;" onclick="base1.start()">4</div>
<div style="width:50px;height:50px;background:pink;border-radius:100%;" onclick="base2.start()">5</div>
<div style="width:50px;height:50px;background:pink;border-radius:100%;" onclick="base3.start()">6</div>
<br/>

<script>

if (typeof AudioContext !== "undefined") {
    var context = new AudioContext();
} else if (typeof webkitAudioContext !== "undefined") {
    var context = new webkitAudioContext();
} else {
    throw new Error('AudioContext not supported. :(');
}

var ctrl_count = 0;
var base_count = 0;
var base_str = [];
var base_array = [];
var bufferArray = [];
var urlArray = [];

function start() {
    source.connect(context.destination);
    source.start();
}

function ctrl_setup() {
    ctrl_startTime = context.currentTime;
    ctrl1 = context.createBufferSource();
    ctrl2 = context.createBufferSource();
    ctrl3 = context.createBufferSource();

    ctrl1.connect(context.destination);
    ctrl2.connect(context.destination);
    ctrl3.connect(context.destination);

    bufferArray = [ctrl1, ctrl2, ctrl3];
    urlArray = ['chrom.wav', 'ivy.mp3', 'vocals.wav'];

    ctrl_load(urlArray[ctrl_count], bufferArray[ctrl_count]);
}

function ctrl_load(url, buffer) {
    console.log(url, buffer)
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'arraybuffer';
    xhr.onload = function() {
        if (xhr.status == 200)
        {
            context.decodeAudioData(xhr.response, function onSuccess(data) {
                buffer.buffer = data;
                if(ctrl_count == 2)
                {
                    console.log('Total time (ctrl): ' + (context.currentTime - ctrl_startTime));
                }else {
                    ctrl_count++;
                    ctrl_load(urlArray[ctrl_count], bufferArray[ctrl_count]);
                }

            }, function onFailure() {
                console.log('context.decodeAudioData failed for ' + urlArray[i]);
            });
        }
    }
    xhr.send();
}

function base_setup() {
    base_startTime = context.currentTime;
    base1 = context.createBufferSource();
    base2 = context.createBufferSource();
    base3 = context.createBufferSource();

    base1.connect(context.destination);
    base2.connect(context.destination);
    base3.connect(context.destination);

    /*var xhr = new XMLHttpRequest();
    xhr.open('GET', 'strings/test.txt', true);
    xhr.responseType = 'text';
    xhr.onload = function() {
        if (xhr.status == 200)
        {
            console.log('xhr load time: ' + (context.currentTime - base_startTime));
            baseFile = xhr.response;
            base_str = baseFile.split("|");
            base_array = [base1, base2, base3];

            base_load(base_str[base_count], base_array[base_count]);
        }
    }
    xhr.send();*/

    //console.log('xhr load time: ' + (context.currentTime - base_startTime));
    baseFile = '<?php echo $test ?>';
    base_str = baseFile.split("|");
    base_array = [base1, base2, base3];

    base_load(base_str[base_count], base_array[base_count]);

}

function base_load(string, buffer) {
    var load = context.currentTime;
    var b64 = Base64Binary.decodeArrayBuffer(string);
    context.decodeAudioData(b64, function(data) {
        buffer.buffer = data;
        if(base_count == 2)
        {
            console.log('Total time (base): ' + (context.currentTime - base_startTime));
        }else {
            base_count++;
            console.log('load done: ' + (context.currentTime - load));
            base_load(base_str[base_count], base_array[base_count]);
        }
    }, function(error) {
        console.error("decodeAudioData error", error);
    });
}
console.log('loaded');
</script>
</body>
</html>
