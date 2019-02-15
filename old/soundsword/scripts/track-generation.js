function generateEditTrackComponent(track) {
    var soloClass = track.soloStatus ? 'soloed new-edit-button edit-solo' : 'unsoloed new-edit-button edit-solo';
    var muteClass = (track.muteStatus && track.muted) ? 'muted new-edit-button edit-mute' : 'unmuted new-edit-button edit-mute';

    var html = '<div id="editTrack' + track.id + 'NamePlate" class="editNamePlates">';
    html += '<div id="editNamePlate' + track.id + 'Color" class="editNamePlateColor" ondblclick="colorMenu(' + track.id + ')"></div>';
    html +='<div id="track' + track.id + 'EditName" class="trackName" onclick="AudioEvents.fireEvent(\'selectTrack\',[' + track.id + ',event])" oncontextmenu="AudioEvents.fireEvent(\'trackContext\', [' + track.id + ', event])">' + track.trackName + '</div>';
    html += '<div class="editRow"><button id="track' + track.id + 'EditSoloButton" class="' +  soloClass + '" onclick="AudioEvents.fireEvent(\'soloTrack\', [' + track.id + '])">S</button>';
    html += '<button id="track' + track.id + 'EditMuteButton" class="' + muteClass + '" onclick="AudioEvents.fireEvent(\'muteTrack\', [' + track.id + '])">M</button></div></div>';

    var editTrack = '<div class="track" id="trackTimeline' + track.id + '" ondrop="AudioEvents.fireEvent(\'drop\', [' + track.id + ', event])" ondragover="AudioEvents.fireEvent(\'allowDrop\', [event])">';
    editTrack +='<div id="track' + track.id + 'measures" class="trackMeasures ' + collection.tool + '" draggable="true" onmousedown="AudioEvents.fireEvent(\'toolCheck\', [' + track.id + ',event])" ondragstart="AudioEvents.fireEvent(\'drag\',[' + track.id + ',event])" ondrag="AudioEvents.fireEvent(\'dragging\', [' + track.id + ',event])" ondragend="AudioEvents.fireEvent(\'removeGrabs\',[])" onclick="AudioEvents.fireEvent(\'removeGrabs\')"></div><div id="track' + track.id + 'Clips"></div>';

    $('#editNamePlates').append(html);

    $('#waveforms_timeline').append(editTrack);

    for(var i = 0; i < track.waveforms.length; i++)
    {
        var clip = '<div id="track' + track.id + 'Clip' + i + '" class="clips ' + collection.tool + '" style="width:' + (track.waveforms[i].waveformLength - track.waveforms[i].clipStart) + 'px;left:' + track.waveforms[i].positionStart + 'px;" draggable="true" ondragstart="AudioEvents.fireEvent(\'drag\',[' + track.id + ',event,' + i + '])" ondrag="AudioEvents.fireEvent(\'dragging\', [' + track.id + ',event,' + i + '])" ondragend="AudioEvents.fireEvent(\'removeGrabs\')" onmousedown="AudioEvents.fireEvent(\'toolCheck\', [' + track.id + ',event,' + i + '])" onclick="AudioEvents.fireEvent(\'removeGrabs\')"><div id="track' + track.id + 'Clip' + i + 'Background" class="waveformBackground" style="width:' + track.waveforms[i].waveformLength + 'px;left:' + track.waveforms[i].offset + 'px;background:' +  palette[track.color].background + ';"></div>';

        if(track.waveforms[i].offset == track.waveforms[i].positionStart)
        {
            clip += '<div id="track' + track.id + 'Clip' + i + 'Waveforms" class="waveforms" style="width:' + track.waveforms[i].waveformLength + 'px;left:' + track.waveforms[i].positionStart + 'px;">';
            clip += '<canvas id="track' + track.id + 'Clip' + i + 'WaveformL" class="track' + track.id + ' waveformL topWaveform" width="' + track.waveforms[i].waveformLength + '" height="55px"></canvas>';
            clip += '<canvas id="track' + track.id + 'Clip' + i + 'WaveformR" class="track' + track.id + ' waveformR topWaveform" width="' + track.waveforms[i].waveformLength + '" height="55px"></canvas></div></div></div>';
        }else
        {
            clip += '<div id="track' + track.id + 'Clip' + i + 'Waveforms" class="waveforms" style="width:' + track.waveforms[i].waveformLength + 'px;left:' + track.waveforms[i].offset + 'px;">';
            clip += '<canvas id="track' + track.id + 'Clip' + i + 'WaveformL" class="track' + track.id + ' waveformL topWaveform" style="left:' + ((track.waveforms[i].positionStart + track.waveforms[i].offset)*-1) + 'px;" width="' + track.waveforms[i].waveformLength + '" height="55px"></canvas>';
            clip += '<canvas id="track' + track.id + 'Clip' + i + 'WaveformR" class="track' + track.id + ' waveformR topWaveform" style="left:' + ((track.waveforms[i].positionStart + track.waveforms[i].offset)*-1) + 'px;" width="' + track.waveforms[i].waveformLength + '" height="55px"></canvas></div></div></div>';
        }
        $('#track' + track.id + 'Clips').append(clip);
    }

    generateEditCanvases(track);

    for(var i = 0; i < 120; i++) {
        document.getElementById('track' + track.id + 'measures').innerHTML += '<div class="measure"><div class="measureMark"></div><div class="quarterMark"></div><div class="quarterMark"></div><div class="quarterMark"></div></div>';
    }

}
function generateEditCanvases(track) {
    for(var i = 0; i < track.waveforms.length; i++)
    {
        var clip = clipList.getClipByPath(track.waveforms[i].clipPath);
        if(clip.data)
        {
            var cL = document.getElementById('track' + track.id + 'Clip' + i + 'WaveformL');
            var cR = document.getElementById('track' + track.id + 'Clip' + i + 'WaveformR');

            if(collection.waveformCache.hasOwnProperty(clip.path))
            {
                var waveformCacheItem = collection.waveformCache[clip.path];

                if(waveformCacheItem.hasOwnProperty('left'))
                {
                    var self = this;
                    var ctx1 = cL.getContext('2d');
                    var imageL = new Image();
                    imageL.onload = function() {
                        ctx1.drawImage(imageL, 0, 0);
                        track.changeTrackColor(track.color);
                    };
                    imageL.src = waveformCacheItem.left;

                }

                if(waveformCacheItem.hasOwnProperty('right'))
                {
                    var ctx2 = cR.getContext('2d');
                    var imageR = new Image();
                    imageR.onload = function() {
                        ctx2.drawImage(imageR, 0, 0);
                        track.changeTrackColor(track.color);
                    };
                    imageR.src = waveformCacheItem.right;
                }
            }
            else
            {
                //buffer hasnt loaded
                var left = clip.data.getChannelData(0);

                var ctx1 = cL.getContext('2d');
                ctx1.strokeStyle = palette[track.color].foreground;
                ctx1.translate(0, 55/2); //centers where the line drawing starts horizontally

                for(var j = 0; j < left.length; j += 200) {
                    var x1 = Math.floor(clip.waveformLength * j / left.length); //first parameter affects the length of the drawn waveform #ZOOM
                    var y1 = left[j] * 55/2;

                    ctx1.beginPath();
                    ctx1.moveTo(x1, 0);
                    ctx1.lineTo(x1 + 1, y1);
                    ctx1.stroke();
                }
                if(clip.data.numberOfChannels > 1)
                {
                    var right = clip.data.getChannelData(1);

                    var ctx2 = cR.getContext('2d');
                    ctx2.strokeStyle = palette[track.color].foreground;
                    ctx2.translate(0, 55/2); //centers where the line drawing starts horizontally

                    for(var j = 0; j < right.length; j += 200) {
                        var x2 = Math.floor(clip.waveformLength * j / right.length); //first parameter affects the length of the drawn waveform #ZOOM
                        var y2 = right[j] * 55/2;

                        ctx2.beginPath();
                        ctx2.moveTo(x2, 0);
                        ctx2.lineTo(x2 + 1, y2);
                        ctx2.stroke();
                    }
                }
                switch(clip.data.numberOfChannels)
                {
                    case 1:
                        collection.waveformCache[clip.path] = {
                            left: ctx1.canvas.toDataURL()
                        };
                    break;
                    case 2:
                        collection.waveformCache[clip.path] = {
                            left: ctx1.canvas.toDataURL(),
                            right: ctx2.canvas.toDataURL()
                        };
                    break;
                    default:
                    break;
                }
            }
        }
    }
}
function generateMixTrackComponent(track) {
    var html = '<div class="mixChannel" id="mixChannel' + track.id + '" oncontextmenu="AudioEvents.fireEvent(\'trackContext\', [' + track.id + ',event])">';

    // plugin slots
    html += generatePluginSlots(track, 10);

    // group id
    html += '<div class="faderWindow"><div class="groupID">no group</div>';

    // pan components
    html += generateTrackPanComponents(track);

    // track buttons
    html += generateTrackButtonComponents(track);

    // track volume
    html += generateTrackVolumeSliderComponent(track);

    // track levels
    html += generateTrackLevelsComponent(track);

    // track nameplate
    var nameplateId = 'track' + track.id + 'MixName';
    html += '<div id="' + nameplateId + '" class="mixNamePlates" onclick="AudioEvents.fireEvent(\'selectTrack\',[' + track.id + ',event])">' + track.trackName + '</div>';
    html += '<div id="mixNamePlate' + track.id + 'Color" class="mixNamePlateColor"></div>';
    html += '</div></div>'; // end of faderWindow and mixChannel divs

    $(html).appendTo('#mix').ready(function() {
        collection.addTrack(track);
        for(t in track.appliedEffects)
        {
            var trackObj = track.appliedEffects[t];
            var pluginSlotId = Object.keys(trackObj);
            trackObj = trackObj[pluginSlotId];
            if("key" in trackObj)
            {
                var pluginType = null;
                switch(trackObj.key)
                {
                    case 'delay':
                        pluginType = 'Delay';
                        break;
                    case 'distortion':
                        pluginType = 'Distortion';
                        break;
                    case 'equalizer':
                        pluginType = 'Equalizer';
                        break;
                    case 'ringmod':
                        pluginType = 'Ring Mod';
                        break;
                    case 'tremolo':
                        pluginType = 'Tremolo';
                        break;
                }
                addPlugin(pluginSlotId, pluginType, track.id, true);
            }
        }

        var knobDimension = window.getComputedStyle(document.getElementById('track' + track.id + 'PanKnobContainer')).getPropertyValue('height');
        $('#track' + track.id + 'PanKnobContainer').css('width', knobDimension);
        generateMixKnobs(track, knobDimension);

        document.getElementById('track' + track.id + 'Fader').step = (document.getElementById('track' + track.id + 'SliderTrack').getBoundingClientRect().height / 144000);
        track.updateVolume(track.volumeFaderVal, true);
    });
}

function generatePluginSlots(track, slotCount) {
    slotCount = (typeof slotCount !== 'undefined') ? slotCount : 1;

    var html = '<div class="flyout-menu">';


    for (var i = 1; i <= slotCount; i++)
    {
        var pluginSlotId = 'track' + track.id + 'PluginSlot' + i;
        html += '<div id="' + pluginSlotId + '" class="plugin" onclick="AudioEvents.fireEvent(\'showPluginMenu\', [this,' + track.id + '])" data-track-id="' + track.id + '"></div>';
    }
    html += '</div>';

    return html;
}

function generateTrackPanComponents(track) {
    var panKnobId = 'track' + track.id + 'PanKnob';
    var panLeftArrowId = 'track' + track.id + 'LeftArrow';
    var panRightArrowId = 'track' + track.id + 'RightArrow';
    var panLevelId = 'track' + track.id + 'PanLevel';
    var display = Math.floor(Math.abs(track.pan * 100));

    // pan knob
    var html = '<div id="' + panKnobId + 'Container" class="panKnob"></div>';

    // pan display
    html += '<div class="panDisplay"><div class="panText">pan</div>';
    html += '<div class="pan"><span id="' + panLeftArrowId + '" class="panArrow">&#9654;</span>';
    html += '<span id="' + panLevelId + '" class="panLevel">' + display + '</span>';
    html += '<span id="' + panRightArrowId + '" class="panArrow">&#9664;</span></div></div>';

    return html;
}

function generateTrackButtonComponents(track) {
    var soloClass = track.soloStatus ? 'soloed new-mix-button mix-solo' : 'unsoloed new-mix-button mix-solo';
    var muteClass = (track.muteStatus && track.muted) ? 'muted new-mix-button mix-mute' : 'unmuted new-mix-button mix-mute';

    // mix row 2
    var soloButtonId = 'track' + track.id + 'MixSoloButton';
    var muteButtonId = 'track' + track.id + 'MixMuteButton';

    var html = '<div class="mixRow">';
    html += '<button id="' + soloButtonId + '" class="' + soloClass + '" onclick="AudioEvents.fireEvent(\'soloTrack\', [' + track.id + '])">S</button>';
    html += '<button id="' + muteButtonId + '" class="' + muteClass + '" onclick="AudioEvents.fireEvent(\'muteTrack\', [' + track.id + '])">M</button>';
    html += '</div>'; // end of trackButtons div
    return html;
}

function generateTrackVolumeSliderComponent(track) {
    var faderId = 'track' + track.id + 'Fader';
    var faderVal = track.volumeFaderVal;

    //step is derived from (x/y) where x is fader height and y is increments of fader
    var faderHTML = '<div class="volume">';
    faderHTML += '<div id="track' + track.id + 'SliderTrack" class="slider-track"></div><div id="track' + track.id + 'SliderThumb" class="slider-thumb"></div>';
    faderHTML += '<input id="' + faderId + '" class="slider-vertical fader" type="range" min="0" max="1" value="' + faderVal + '" orient="vertical" oninput="AudioEvents.fireEvent(\'volumeChange\', [' + track.id + ', this.value])" /></div>';
    return faderHTML;
}

function generateTrackLevelsComponent(track) {
    var levelsId = 'track' + track.id + 'Levels';
    var levelsHTML = '<div id="' + levelsId + '" class="levels">';
    levelsHTML += '<div id="' + levelsId + 'L" class="level level-left">';
    levelsHTML += '<div class="black"></div><div class="red"></div><div class="yellow"></div><div class="green"></div>';
    levelsHTML += '<canvas id="' + levelsId + 'CanvasL" class="level-canvas" height="" width=""></canvas></div>';
    levelsHTML += '<div id="' + levelsId + 'R" class="level level-right">';
    levelsHTML += '<div class="black"></div><div class="red"></div><div class="yellow"></div><div class="green"></div>';
    levelsHTML += '<canvas id="' + levelsId + 'CanvasR" class="level-canvas"></canvas></div>';
    levelsHTML += '</div>';
    return levelsHTML;
}

function generateMixKnobs(track, knobDimension) {
    var array = {
        diameter: Math.floor(parseFloat(knobDimension)),
        containerId: 'track' + track.id + 'PanKnobContainer',
        id: track.id,
        knobId: 'track' + track.id + 'PanKnob',
        value: track.pan * 100,
        min: -100,
        orientation: 'centered',
        xAxis: false,
        onLeftTurn: function(value) {
            var t = collection.getTrackById(this.id);
            t.pan = value/100;
            t.panNode.pan.value = t.pan;
             if(value == 0) {
                document.getElementById('track' + this.id + "LeftArrow").innerHTML = "&#9654;";
                document.getElementById('track' + this.id + "RightArrow").innerHTML = "&#9664;";
            }else if(value < 0) {
                document.getElementById('track' + this.id + "LeftArrow").innerHTML = "&#9664;";
                document.getElementById('track' + this.id + "RightArrow").innerHTML = "&nbsp";
            }else if(value > 0) {
                document.getElementById('track' + this.id + "LeftArrow").innerHTML = "&nbsp";
                document.getElementById('track' + this.id + "RightArrow").innerHTML = "&#9654;";
            }
            document.getElementById('track' + this.id + 'PanLevel').innerHTML = Math.abs(this.knobValue);
        },
        onRightTurn: function(value) {
            var t = collection.getTrackById(this.id);
            t.pan = value/100;
            t.panNode.pan.value = t.pan;
             if(value == 0) {
                document.getElementById('track' + this.id + "LeftArrow").innerHTML = "&#9654;";
                document.getElementById('track' + this.id + "RightArrow").innerHTML = "&#9664;";
            }else if(value < 0) {
                document.getElementById('track' + this.id + "LeftArrow").innerHTML = "&#9664;";
                document.getElementById('track' + this.id + "RightArrow").innerHTML = "&nbsp";
            }else if(value > 0) {
                document.getElementById('track' + this.id + "LeftArrow").innerHTML = "&nbsp";
                document.getElementById('track' + this.id + "RightArrow").innerHTML = "&#9654;";
            }
            document.getElementById('track' + this.id + 'PanLevel').innerHTML = Math.abs(this.knobValue);
        },
        onReset: function(value) {
            var t = collection.getTrackById(this.id);
            t.pan = value/100;
            t.panNode.pan.value = t.pan;
            document.getElementById('track' + this.id + "LeftArrow").innerHTML = "&#9654;";
            document.getElementById('track' + this.id + "RightArrow").innerHTML = "&#9664;";
            document.getElementById('track' + this.id + 'PanLevel').innerHTML = Math.abs(this.knobValue);
        }
    }
    track.knob = new Knob(array);
}
