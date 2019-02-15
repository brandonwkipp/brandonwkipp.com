function resizeCanvasButtons() {
    var control_width = 1366;
    var width = parseFloat(window.getComputedStyle(document.body).getPropertyValue('width'));
    var width_ratio = width/control_width;

    macmiller = width_ratio;

    var canvases = document.querySelectorAll('.canvas-button');

    for(var i = 0; i < canvases.length; i++)
    {
        canvases[i].style.height = (width_ratio * 34) + 'px';
        canvases[i].style.width = (width_ratio * 34) + 'px';
    }

}
function drawTrimmer() {
    var c = document.getElementById('trimmer');
    var ctx1 = c.getContext('2d');
    var ctx2 = c.getContext('2d');
    var ctx3 = c.getContext('2d');

    ctx1.beginPath();
    ctx1.moveTo(7,10);
    ctx1.lineTo(16,10);
    ctx1.lineTo(16,24);
    ctx1.lineTo(7,24);
    ctx1.stroke();

    ctx2.beginPath();
    ctx2.moveTo(25,15);
    ctx2.lineTo(19,15);
    ctx2.lineTo(19,19);
    ctx2.lineTo(25,19);
    ctx2.lineTo(25,22);
    ctx2.lineTo(30,17);
    ctx2.lineTo(25,12);
    ctx2.lineTo(25,15);
    ctx2.strokeStyle = 'rgb(30,32,31)';
    ctx2.stroke();
    ctx2.fillStyle = 'rgb(30,32,31)';
    ctx2.fill();

    ctx3.fillStyle = '#FFF';
    ctx3.fillRect(7,11,8,12);
}
function drawSelector() {
    var c = document.getElementById('selector');
    var ctx1 = c.getContext('2d');
    var ctx2 = c.getContext('2d');
    var ctx3 = c.getContext('2d');
    var ctx4 = c.getContext('2d');

    ctx1.beginPath();
    ctx1.fillRect(13,3,8,28);

    ctx2.beginPath();
    ctx2.moveTo(5,5);
    ctx2.lineTo(8.5,17);
    ctx2.lineTo(11,7);
    ctx2.lineTo(14,17);
    ctx2.lineTo(11,27);
    ctx2.lineTo(8.5,18);
    ctx2.lineTo(5,29);
    ctx2.lineTo(5,5);
    ctx2.stroke();
    ctx2.fill();

    ctx3.beginPath();
    ctx3.moveTo(20,17);
    ctx3.lineTo(23,9);
    ctx3.lineTo(25,16);
    ctx3.lineTo(27,10);
    ctx3.lineTo(30,17);
    ctx3.lineTo(27,24);
    ctx3.lineTo(25,18);
    ctx3.lineTo(23,25);
    ctx3.lineTo(21,17);
    ctx3.stroke();
    ctx3.fill();

    ctx4.beginPath();
    ctx4.moveTo(14,11);
    ctx4.lineTo(15,15);
    ctx4.lineTo(17,8);
    ctx4.lineTo(19,15);
    ctx4.lineTo(20,11);
    ctx4.lineTo(20,21);
    ctx4.lineTo(19,17);
    ctx4.lineTo(17,24);
    ctx4.lineTo(15,17);
    ctx4.lineTo(14,21);
    ctx4.lineTo(14,11);
    ctx4.strokeStyle = '#FFF';
    ctx4.stroke();
    ctx4.fillStyle = '#FFF';
    ctx4.fill();
}
function drawGrabber() {
    var c = document.getElementById('grabber');
    var ctx1 = c.getContext('2d');

    ctx1.beginPath();
    ctx1.moveTo(14,25);
    ctx1.lineTo(6,15);

    ctx1.arc(7,13,1,(.8*Math.PI),(1.9*Math.PI), false);

    ctx1.moveTo(8,13);
    ctx1.lineTo(12,17);
    ctx1.moveTo(12,16);
    ctx1.lineTo(10,7);

    ctx1.arc(11,7,.75,(1*Math.PI),(1.9*Math.PI), false);

    ctx1.moveTo(12.5,7);
    ctx1.lineTo(14,14);
    ctx1.moveTo(15,15);
    ctx1.lineTo(15,7);

    ctx1.arc(16.5,6,1.5,(1*Math.PI),(2*Math.PI), false);

    //middle
    ctx1.moveTo(18,6);
    ctx1.lineTo(18,15);
    ctx1.moveTo(19,14);
    ctx1.lineTo(21,6);

    ctx1.arc(22,6.5,.75,(1.1*Math.PI),(2.3*Math.PI), false);

    ctx1.moveTo(23.5,7);
    ctx1.lineTo(21,15);

    ctx1.moveTo(21,16);
    ctx1.lineTo(24,11);

    ctx1.arc(25,12,1.5,(1.2*Math.PI),(2.2*Math.PI), false);

    ctx1.moveTo(26,13);
    ctx1.lineTo(20,25);
    ctx1.lineTo(14,25);

    ctx1.lineWidth = .5;
    ctx1.stroke();
    //ctx1.fillStyle = '#FFF';
    //ctx1.fill();
}
function drawCloseButton(location) {
    var c = document.getElementById(location);
    var ctx1 = c.getContext('2d');
    ctx1.beginPath();
    ctx1.arc(8.5,8.5,5,0,2*Math.PI);
    ctx1.fillStyle = 'rgb(255,63,69)';
    ctx1.fill();
}
function drawLogo() {
    var c = document.getElementById('logo');
    var ctx1 = c.getContext('2d');
    var ctx2 = c.getContext('2d');
    var ctx3 = c.getContext('2d');
    var ctx4 = c.getContext('2d');
    var ctx5 = c.getContext('2d');
    var ctx6 = c.getContext('2d');

    ctx1.beginPath();
    ctx1.moveTo(27.5,13);
    ctx1.lineTo(145,13);
    ctx1.lineTo(145,31);
    ctx1.lineTo(27.5,31);
    ctx1.lineTo(27.5,24);
    ctx1.lineTo(35.5,24);
    ctx1.lineTo(35.5,20);
    ctx1.lineTo(27.5,20);
    ctx1.lineTo(27.5,13);

    ctx1.strokeStyle = 'rgb(255,224,126)';
    ctx1.stroke();
    ctx1.fillStyle = 'rgb(222,174,64)';
    ctx1.fill();
    ctx1.closePath();

    ctx2.beginPath();
    ctx2.moveTo(146,9);
    ctx2.lineTo(146,36);
    ctx2.strokeStyle = 'rgb(70,70,70)';
    ctx2.stroke();
    ctx2.closePath();

    ctx3.beginPath();
    ctx3.moveTo(147,17);
    ctx3.lineTo(160,17);
    ctx3.lineTo(160,27);
    ctx3.lineTo(147,27);
    ctx3.strokeStyle = 'rgb(122,77,40)';
    ctx3.stroke();
    ctx3.fillStyle = 'rgb(122,77,40)';
    ctx3.fill();

    ctx4.beginPath();
    ctx4.arc(168,23,6, .2, 1.4 * Math.PI, true);
    ctx4.moveTo(167,24);
    ctx4.arc(167,24,7, .1, .85 * Math.PI, false);
    ctx4.moveTo(168,17);
    ctx4.lineTo(160,17);
    ctx4.lineTo(160,27);
    ctx4.lineTo(167,24);
    ctx4.lineTo(174,24);
    ctx4.lineTo(168,17);
    ctx4.strokeStyle = 'rgb(122,77,40)';
    ctx4.stroke();
    ctx4.fillStyle = 'rgb(122,77,40)';
    ctx4.fill();
    ctx4.closePath();

    ctx5.beginPath();
    ctx5.arc(168,24,2, 0, 2 * Math.PI, false);
    ctx5.stroke();
    ctx5.fillStyle = 'rgb(222,174,64)';
    ctx5.fill();
    ctx5.closePath();

    ctx6.fillStyle = 'black';
    ctx6.font = '600 1em Courier';
    ctx6.fillText('SoundSword', 40, 27);
}
function updateMute(trackId, muteStatus, solo) {
    var mixMuteButton = document.getElementById('track' + trackId + 'MixMuteButton');
    var editMuteButton = document.getElementById('track' + trackId + 'EditMuteButton');
    var mixMuteClassName = '';
    var editMuteClassName = '';

    if(muteStatus && (solo == 'undefined' || !solo)) {
        mixMuteClassName = 'muted new-mix-button mix-mute';
        editMuteClassName = 'muted new-edit-button edit-mute';
    }else {
        mixMuteClassName = 'unmuted new-mix-button mix-mute';
        editMuteClassName = 'unmuted new-edit-button edit-mute';
    }

    if (mixMuteButton != null) mixMuteButton.className = mixMuteClassName;
    if (editMuteButton != null) editMuteButton.className = editMuteClassName;
}
function updateSolo(trackId, soloStatus) {
    if(soloStatus){
        document.getElementById('track' + trackId + 'MixSoloButton').className = 'soloed new-mix-button mix-solo';
        document.getElementById('track' + trackId + 'EditSoloButton').className = 'soloed new-edit-button edit-solo';
    }else {
        document.getElementById('track' + trackId + 'MixSoloButton').className = 'unsoloed new-mix-button mix-solo';
        document.getElementById('track' + trackId + 'EditSoloButton').className = 'unsoloed new-edit-button edit-solo';
    }
}
var currentLevels = {};
function drawLevels(track, channel, level) {
    if(!currentLevels.hasOwnProperty(track.id))
    {
        currentLevels[track.id] = {};
    }
    currentLevels[track.id][channel] = level;

    if(channel === 'L')
    {
        var canvasL = document.getElementById('track' + track.id + 'LevelsCanvasL');
        if(canvasL != null)
        {
            var ctxL = canvasL.getContext('2d');
            ctxL.clearRect(0, 0, ctxL.canvas.width, ctxL.canvas.height);
            ctxL.fillStyle = 'rgb(93,181,71)';
            ctxL.fillRect(0, ctxL.canvas.height, ctxL.canvas.width, -level);
            //console.log(track.id + ': ' + level);
        }
    }
    if(channel === 'R')
    {
        var canvasR = document.getElementById('track' + track.id + 'LevelsCanvasR');
        if(canvasR != null)
        {
            var ctxR = canvasR.getContext('2d');
            ctxR.clearRect(0, 0, ctxR.canvas.width, ctxR.canvas.height);
            ctxR.fillStyle = 'rgb(93,181,71)';
            ctxR.fillRect(0, ctxR.canvas.height, ctxR.canvas.width, -level);
        }
    }
}
//plugins
function delayCanvas(note) {
    delayCanvasClear = false;
    if(delayCanvasClear) {
        delay1.clearRect(0,0,20,20);
        delay2.clearRect(0,0,20,20);
    }
    var c = document.getElementById('delayQuarter');
    var delay1 = c.getContext('2d');
    var stem1 = c.getContext('2d');
    delay1.beginPath();
    delay1.arc(11,17,3,0,(2 * Math.PI));
    delay1.lineWidth = 1.5;
    delay1.rotate(50*Math.PI/180);
    delay1.setTransform(1,-1,0,.5,0,0);
    delay1.closePath();
    delay1.stroke();
    delay1.fill();

    stem1.beginPath();
    stem1.moveTo(14,30);
    stem1.lineTo(14,60);
    stem1.lineWidth = 1;
    stem1.stroke();

    var c = document.getElementById('delayEighth');
    var delay2 = c.getContext('2d');
    var stem2 = c.getContext('2d');
    delay2.beginPath();
    delay2.arc(11,17,3,0,(2 * Math.PI));
    delay2.lineWidth = 1.5;
    delay2.rotate(50*Math.PI/180);
    delay2.setTransform(1,-1,0,.5,0,0);
    delay2.closePath();
    delay2.stroke();

    stem2.beginPath();
    stem2.moveTo(14,30);
    stem2.lineTo(14,60);
    stem2.lineWidth = 1;
    stem2.stroke();

    delayCanvasClear = true;
}
function delayNote(location) {
    var noteValue = location.id.toString();
    switch(noteValue) {
        case 'quarter':
        delay.delayTime = 60/(currentTempo/4);
        delayCanvas('quarter');
        break;
        case 'eighth':
        delay.delayTime = 60/(currentTempo/8);
        delayCanvas('eighth');
        break;
    }
}
function resetLevels(trackId, channel) {
    var track = collection.getTrackById(trackId);

    for(var i = 0; i < track.waveforms.length; i++)
    {
        if(parseFloat(collection.playScroller.style.left) >= track.waveforms[i].positionStart)
        {
            var channelCanvas = document.getElementById('track' + trackId + 'LevelsCanvas' + channel);
            if (channelCanvas != null)
            {
                var channelContext = channelCanvas.getContext('2d');

                if (currentLevels.hasOwnProperty(trackId))
                {
                    var currentLevel = currentLevels[trackId][channel];
                    var levelRInterval = setInterval(function() {
                        currentLevel = (currentLevel - 2);
                        channelContext.clearRect(0,0,collection.meterWidth,collection.meterHeight);
                        channelContext.fillRect(0,collection.meterHeight,collection.meterWidth, -currentLevel);

                        if (currentLevel <= 0)
                        {
                            clearInterval(levelRInterval);
                        }
                    }, .01);
                }
                else
                {
                    channelContext.clearRect(0,0,collection.meterWidth,collection.meterHeight);
                }
            }
        }
    }
}
function tremCanvas(waveform,canvasClear) {
    if(canvasClear) {
        ctx1.clearRect(0,0,20,20);
        ctx2.clearRect(0,0,20,20);
        ctx3.clearRect(0,0,20,20);
        ctx4.clearRect(0,0,20,20);
    }
    var c = document.getElementById('trem_sine');
    ctx1 = c.getContext('2d');
    ctx1.beginPath();
    ctx1.moveTo(3,14);
    ctx1.quadraticCurveTo(7,-6,10,12);
    ctx1.quadraticCurveTo(14,22,16,5);
    ctx1.lineWidth = 2.5;
    if(waveform == 'sine') {
        ctx1.strokeStyle = 'rgb(41,122,214)';
    }else {
        ctx1.strokeStyle = 'rgb(20,61,107)';
    }
    ctx1.stroke();

    var c = document.getElementById('trem_square');
    ctx2 = c.getContext('2d');
    ctx2.beginPath();
    ctx2.moveTo(3,17);
    ctx2.lineTo(3,4);
    ctx2.lineTo(10,4);
    ctx2.lineTo(10,16);
    ctx2.lineTo(17,16);
    ctx2.lineTo(17,3);
    ctx2.lineWidth = 2.5;
    if(waveform == 'square') {
        ctx2.strokeStyle = 'rgb(182,18,16)';
    }else {
        ctx2.strokeStyle = 'rgb(73,7,6)';
    }
    ctx2.stroke();

    var c = document.getElementById('trem_saw');
    ctx3 = c.getContext('2d');
    ctx3.beginPath();
    ctx3.moveTo(17,16);
    ctx3.lineTo(17,4);
    ctx3.lineTo(4,16);
    ctx3.lineWidth = 2.5;
    if(waveform == 'saw') {
        ctx3.strokeStyle = 'rgb(157,226,35)';
    }else {
        ctx3.strokeStyle = 'rgb(50,72,11)';
    }
    ctx3.stroke();

    var c = document.getElementById('trem_triangle');
    ctx4 = c.getContext('2d');
    ctx4.beginPath();
    ctx4.moveTo(3,17);
    ctx4.lineTo(10,5);
    ctx4.lineTo(17,17);
    ctx4.lineWidth = 2.5;
    if(waveform == 'triangle') {
        ctx4.strokeStyle = 'rgb(212,123,28)';
    }else {
        ctx4.strokeStyle = 'rgb(85,49,11)';
    }
    ctx4.stroke();

    canvasClear = true;
}
