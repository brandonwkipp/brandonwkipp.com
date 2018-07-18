function addPlugin(location, type, trackId, showWindow) {
    showWindow = (showWindow == undefined) ? true : showWindow;

    if(document.getElementById('plugin_' + location) == null) {
        $('#plugins').append('<div id="plugin_' + location + '">');
        if(showWindow)
        {
            pluginSwitch(trackId, location, type);
        }
    }else if(showWindow) {
        pluginSwitch(trackId, location, type);
    }

    $('#plugin_' + location).draggable();
    var plateHTML = '<div class="pluginContainer"><div id="' + location + 'Bypass"class="bypassDiv" onclick="AudioEvents.fireEvent(\'showPluginMenu\', [this,' + location + '])">&bull;</div>';
    plateHTML += '<div id="' + location + 'PluginPlate" class="pluginName" onclick="AudioEvents.fireEvent(\'showPluginWindow\', [event,' + location + '])">' + type + '</div></div>';

    document.getElementById(location).innerHTML = plateHTML;
}
function pluginSwitch(trackId, location, type) {
    switch(type) {
        case 'Delay':
            var track = collection.getTrackById(trackId);
            var effect = track.getEffectByKey(location);

            document.getElementById('plugin_' + location).className = 'default_window ui-widget-content delay-plugin';
            var pluginHTML = '<div class="title-bar"><div class="title">delay</div><button id="bypass' + location + '" class="bypassButton" onclick="AudioEvents.fireEvent(\'bypassPlugin\', [\'' + location + '\', event])">Bypass</button>';
            pluginHTML += '<canvas id="delay' + location + '"class="close close-button" width="17px" height="17px" onclick="$(\'#plugin_' + location + '\').hide()">';
            pluginHTML += '</canvas></div><div id="' + location + 'DelayParameters">';
            pluginHTML += '<div class="delay-row"><text class="delay-text">GAIN</text>';
            pluginHTML += '<div id="' + location + 'DelayGainDisplay" class="delay-display">' + (effect.outputValue*100) + '%</div>';
            pluginHTML += '<input id="' + location + 'DelayGainInput" class="delay-fader" type="range" min="0" max="1" step=".01" value="' + effect.outputValue + '" oninput="delayGain(' + trackId + ',\'' + location + '\',this.value)"></input></div>';
            pluginHTML += '<div class="delay-row"><text class="delay-text">MIX</text>';
            pluginHTML += '<div id="' + location + 'DelayMixDisplay" class="delay-display">' + effect.mixValue + '%</div>';
            pluginHTML += '<input id="' + location + 'DelayMixInput" class="delay-fader" type="range" min="0" max="100" step="1" value="' + effect.mixValue + '" oninput="delayMix(' + trackId + ',\'' + location + '\',this.value)"></input></div>';
            pluginHTML += '<div class="delay-row"><text class="delay-text">LPF</text>';
            pluginHTML += '<div id="' + location + 'DelayLPFDisplay" class="delay-display">' + effect.lpfValue + ' Hz</div>';
            pluginHTML += '<input id="' + location + 'DelayLPFInput" class="delay-fader" type="range" min="20" max="20000" step="1" value="' + effect.lpfValue + '" oninput="delayLPF(' + trackId + ',\'' + location + '\',this.value)"></input></div>';
            pluginHTML += '<div class="delay-row"><text class="delay-text">HPF</text>';
            pluginHTML += '<div id="' + location + 'DelayHPFDisplay" class="delay-display">' + effect.hpfValue + ' Hz</div>';
            pluginHTML += '<input id="' + location + 'DelayHPFInput" class="delay-fader" type="range" min="20" max="20000" step="1" value="' + effect.hpfValue + '" oninput="delayHPF(' + trackId + ',\'' + location + '\',this.value)"></input></div>';
            pluginHTML += '<div class="delay-row"><text class="delay-text">DELAY</text>';
            pluginHTML += '<div id="' + location + 'DelayTimeDisplay" class="delay-display">' + (effect.delayValue*1000).toFixed(1) + ' ms</div>';
            pluginHTML += '<input id="' + location + 'DelayTimeInput" class="delay-fader" type="range" min="0" max="3" step=".001" value="' + effect.delayValue + '" oninput="delayTime(' + trackId + ',\'' + location + '\',this.value)"></input></div>';
            pluginHTML += '<div class="delay-row"><text class="delay-text">FEEDBACK</text>';
            pluginHTML += '<div id="' + location + 'DelayFeedbackDisplay" class="delay-display">' + effect.feedbackValue + '%</div>';
            pluginHTML += '<input id="' + location + 'DelayFeedbackInput" class="delay-fader" type="range" min="0" max="100 step="1" value="' + effect.feedbackValue + '" oninput="delayFeedback(' + trackId + ',\'' + location + '\',this.value)"></input></div>';
            pluginHTML += '<div class="delay-buttons">';
            pluginHTML += '<img class="delay-note" src="images/delay_whole.png" onclick="updateDelayNote(\'' + trackId + '\',\'' + location + '\',\'whole\')"/>';
            pluginHTML += '<img class="delay-note" src="images/delay_half.png" onclick="updateDelayNote(\'' + trackId + '\',\'' + location + '\',\'half\')"/>';
            pluginHTML += '<img class="delay-note" src="images/delay_quarter.png" onclick="updateDelayNote(\'' + trackId + '\',\'' + location + '\',\'quarter\')"/>';
            pluginHTML += '<img class="delay-note" src="images/delay_eighth.png" onclick="updateDelayNote(\'' + trackId + '\',\'' + location + '\',\'eighth\')"/></div></div>';
            document.getElementById('plugin_' + location).innerHTML = pluginHTML;
            drawCloseButton('delay' + location);
        break;
        case 'Distortion':
            document.getElementById('plugin_' + location).className = 'default_window ui-widget-content distortion_plugin';
            var pluginHTML = '<div class="title-bar"><div class="title">distortion</div>';
            pluginHTML += '<button id="bypass' + location + '" class="bypassButton" onclick="AudioEvents.fireEvent(\'bypassPlugin\', [\'' + location + '\', event])">Bypass</button>';
            pluginHTML += '<canvas id="distortion' + location + '" class="close close-button" width="17px" height="17px" onclick="$(\'#plugin_' + location + '\').hide()">';
            pluginHTML += '</canvas></div><div class="distortion_parameters">';
            pluginHTML += '<select class="distortion-list" onchange="updateAlgorithm(\'' + location + '\',\'' + trackId + '\', this.value)">';
            pluginHTML += '<option>1</option><option>2</option><option>3</option><option>4</option><option>5</option>';
            pluginHTML += '<option>6</option><option>7</option><option>8</option><option>9</option><option>10</option>';
            pluginHTML += '<option>11</option><option>12</option><option>13</option><option>14</option><option>15</option>';
            pluginHTML += '<option>16</option>'
            pluginHTML += '</select><select class="distortion-list" onchange="updateCurveType(\'' + location + '\',\'' + trackId + '\', this.value)">';
            pluginHTML += '<option>1</option><option>2</option><option>3</option><option>4</option><option>5</option>';
            pluginHTML += '<option>6</option><option>7</option><option>8</option><option>9</option><option>10</option>';
            pluginHTML += '</select>';
            pluginHTML += '<div id="' + location + 'KnobContainer" class="distortion_knob"></div></div>';
            document.getElementById('plugin_' + location).innerHTML = pluginHTML;
            drawCloseButton('distortion' + location);

            var track = collection.getTrackById(trackId);
            if(track != null)
            {
                var effect = track.getEffectByKey(location);
                if(effect != null)
                {
                    var array = {
                        diameter: 60,
                        containerId: location + 'KnobContainer',
                        effectId: location,
                        id: trackId,
                        knobId: location + 'Knob',
                        value: effect.effectCurve/2,
                        onLeftTurn: function(value) {
                            updateCurveLevel(this.id, this.effectId, value);
                        },
                        onRightTurn: function(value) {
                            updateCurveLevel(this.id, this.effectId, value);
                        }
                    }
                    location.knob = new Knob(array);
                }
            }
        break;
        case 'Equalizer':
            var track = collection.getTrackById(trackId);
            if(track != null)
            {
                var effect = track.getEffectByKey(location);
            }

            document.getElementById('plugin_' + location).className = 'eq_window ui-widget-content eq_plugin';
            var pluginHTML = '<div class="title-bar"><div class="title">equalizer</div>';
            pluginHTML += '<button id="bypass' + location + '" class="bypassButton" onclick="AudioEvents.fireEvent(\'bypassPlugin\', [\'' + location + '\', event])">Bypass</button>';
            pluginHTML += '<canvas id="equalizer' + location + '" class="close close-button" width="17px" height="17px" onclick="$(\'#plugin_' + location + '\').hide()"></canvas></div>';
            pluginHTML += '<div class="eq_parameters"><div class="eq_lowKnobs eq_knobs">';
            pluginHTML += '<div id="' + location + 'QLowKnobContainer"><input id="' + location + 'QLowInput" type="number" class="eq_inputs" value="' + effect.lowQValue + '"/></div>';
            pluginHTML += '<div id="' + location + 'FrequencyLowKnobContainer"><input id="' + location + 'FrequencyLowInput" type="number" class="eq_inputs" value="' + effect.lowFrequencyValue + '"/></div>';
            pluginHTML += '<div id="' + location + 'GainLowKnobContainer"><input id="' + location + 'GainLowInput" type="number" class="eq_inputs" value="' + effect.lowGainValue + '"/></div>';
            pluginHTML += '</div><div class="eq_lowMidKnobs eq_knobs">';
            pluginHTML += '<div id="' + location + 'QLowMidKnobContainer"><input id="' + location + 'QLowMidInput" type="number" class="eq_inputs" value="' + effect.lowMidQValue + '"/></div>';
            pluginHTML += '<div id="' + location + 'FrequencyLowMidKnobContainer"><input id="' + location + 'FrequencyLowMidInput" type="number" class="eq_inputs" value="' + effect.lowMidFrequencyValue + '"/></div>';
            pluginHTML += '<div id="' + location + 'GainLowMidKnobContainer"><input id="' + location + 'GainLowMidInput" type="number" class="eq_inputs" value="' + effect.lowMidGainValue + '"/></div>';
            pluginHTML += '</div><div class="eq_midKnobs eq_knobs">';
            pluginHTML += '<div id="' + location + 'QMidKnobContainer"><input id="' + location + 'QMidInput" type="number" class="eq_inputs" value="' + effect.midQValue + '"/></div>';
            pluginHTML += '<div id="' + location + 'FrequencyMidKnobContainer"><input id="' + location + 'FrequencyMidInput" type="number" class="eq_inputs" value="' + effect.midFrequencyValue + '"/></div>';
            pluginHTML += '<div id="' + location + 'GainMidKnobContainer"><input id="' + location + 'GainMidInput" type="number" class="eq_inputs" value="' + effect.midGainValue + '"/></div>';
            pluginHTML += '</div><div class="eq_highMidKnobs eq_knobs">';
            pluginHTML += '<div id="' + location + 'QHighMidKnobContainer"><input id="' + location + 'QHighMidInput" type="number" class="eq_inputs" value="' + effect.highMidQValue + '"/></div>';
            pluginHTML += '<div id="' + location + 'FrequencyHighMidKnobContainer"><input id="' + location + 'FrequencyHighMidInput" type="number" class="eq_inputs" value="' + effect.highMidFrequencyValue + '"/></div>';
            pluginHTML += '<div id="' + location + 'GainHighMidKnobContainer"><input id="' + location + 'GainHighMidInput" type="number" class="eq_inputs" value="' + effect.highMidGainValue + '"/></div>';
            pluginHTML += '</div><div class="eq_highKnobs eq_knobs">';
            pluginHTML += '<div id="' + location + 'QHighKnobContainer"><input id="' + location + 'QHighInput" type="number" class="eq_inputs" value="' + effect.highQValue + '"/></div>';
            pluginHTML += '<div id="' + location + 'FrequencyHighKnobContainer"><input id="' + location + 'FrequencyHighInput" type="number" class="eq_inputs" value="' + effect.highFrequencyValue + '"/></div>';
            pluginHTML += '<div id="' + location + 'GainHighKnobContainer"><input id="' + location + 'GainHighInput" type="number" class="eq_inputs" value="' + effect.highGainValue + '"/></div></div>';
            document.getElementById('plugin_' + location).innerHTML = pluginHTML;
            drawCloseButton('equalizer' + location);

            var parameterArray = [
                ['QLowKnobContainer','QLowInput','QLowKnob',10,1,5,'lowQValue','low'],
                ['QLowMidKnobContainer','QLowMidInput','QLowMidKnob',10,1,5,'lowMidQValue','lowMid'],
                ['QMidKnobContainer','QMidInput','QMidKnob',10,1,5,'midQValue','mid'],
                ['QHighMidKnobContainer','QHighMidInput','QHighMidKnob',10,1,5,'highMidQValue','highMid'],
                ['QHighKnobContainer','QHighInput','QHighKnob',10,1,5,'highQValue','high'],
                ['FrequencyLowKnobContainer','FrequencyLowInput','FrequencyLowKnob',500,20,100,'lowFrequencyValue','low'],
                ['FrequencyLowMidKnobContainer','FrequencyLowMidInput','FrequencyLowMidKnob',1000,20,200,'lowMidFrequencyValue','lowMid'],
                ['FrequencyMidKnobContainer','FrequencyMidInput','FrequencyMidKnob',6000,500,1000,'midFrequencyValue','mid'],
                ['FrequencyHighMidKnobContainer','FrequencyHighMidInput','FrequencyHighMidKnob',20000,750,2000,'highMidFrequencyValue','highMid'],
                ['FrequencyHighKnobContainer','FrequencyHighInput','FrequencyHighKnob',20000,1000,6000,'highFrequencyValue','high'],
                ['GainLowKnobContainer','GainLowInput','GainLowKnob',40,-40,0,'lowGainValue','low'],
                ['GainLowMidKnobContainer','GainLowMidInput','GainLowMidKnob',40,-40,0,'lowMidGainValue','lowMid'],
                ['GainMidKnobContainer','GainMidInput','GainMidKnob',40,-40,0,'midGainValue','mid'],
                ['GainHighMidKnobContainer','GainHighMidInput','GainHighMidKnob',40,-40,0,'highMidGainValue','highMid'],
                ['GainHighKnobContainer','GainHighInput','GainHighKnob',40,-40,0,'highGainValue','high']
            ];

            function createKnob(array) {
                let property = array[6];
                let parameter = array[7];
                var left, right, center;

                if(i < 5)
                {
                    left = function(value) { updateEqQ(this.id, this.effectId, property, parameter, this.input, value); }
                    right = function(value) { updateEqQ(this.id, this.effectId, property, parameter, this.input, value); }
                    center = function(value) { updateEqQ(this.id, this.effectId, property, parameter, this.input, value); }
                }else if(i >= 5 && i < 10)
                {
                    left = function(value) { updateEqFrequency(this.id, this.effectId, property, parameter, this.input, value, this.min, this.max); }
                    right = function(value) { updateEqFrequency(this.id, this.effectId, property, parameter, this.input, value, this.min, this.max); }
                    center = function(value) { updateEqFrequency(this.id, this.effectId, property, parameter, this.input, value, this.min, this.max); }
                }else if(i >= 10)
                {
                    left = function(value) { updateEqGain(this.id, this.effectId, property, parameter, this.input, value); }
                    right = function(value) { updateEqGain(this.id, this.effectId, property, parameter, this.input, value); }
                    center = function(value) { updateEqGain(this.id, this.effectId, property, parameter, this.input, value); }
                }

                var knobArray = {
                    diameter: 30,
                    containerId: location + array[0],
                    effectId: location,
                    id: trackId,
                    input: array[1],
                    knobId: location + array[2],
                    max: array[3],
                    min: array[4],
                    defaultValue: array[5],
                    value: array[6],
                    orientation: 'centered',
                    onLeftTurn: left,
                    onRightTurn: right,
                    onCenter: center
                }
                effect[array[2]] = new Knob(knobArray);
            }
            if(effect != null)
            {
                var i = 0;
                while(i < 15)
                {
                    createKnob(parameterArray[i])
                    i++;
                }
            }
        break;
        case 'Reverb':
            document.getElementById('plugin_' + location).className = 'default_window ui-widget-content reverb_plugin';
            document.getElementById('plugin_' + location).innerHTML = '<button class="close" onclick="$(\'#plugin_' + location + '\').hide()">x</button><button class="bypassButton" onclick="bypassPlugin(event)">Bypass</button><div id="reverb_parameters></div>';
        break;
        case 'Ring Mod':
            document.getElementById('plugin_' + location).className = 'default_window ui-widget-content ringMod_plugin';
            document.getElementById('plugin_' + location).innerHTML = '<button class="close" onclick="$(\'#plugin_' + location + '\').hide()">x</button><button class="bypassButton" onclick="bypassPlugin(event)">Bypass</button><div class="ringMod_parameters"><input id="ringModFreq" type="range" min="20" max="3000" step="1" oninput="updateRingModFrequency(\'' + trackId + '\',\'' + location + '\', this.value)"></input></div>';
            document.getElementById('ringModFreq').value = 20;
        break;
        case 'Tremolo':
            document.getElementById('plugin_' + location).className = 'default_window ui-widget-content tremolo_plugin';
            var pluginHTML = '<div class="title-bar"><div class="title">tremolo</div>';
            pluginHTML += '<button id="bypass' + location + '" class="bypassButton" onclick="AudioEvents.fireEvent(\'bypassPlugin\', [\'' + location + '\', event])">Bypass</button>';
            pluginHTML += '<canvas id="tremolo' + location + '" class="close close-button" width="17px" height="17px" onclick="$(\'#plugin_' + location + '\').hide()">';
            pluginHTML += '</canvas></div><div class="tremolo_parameters"><span class="tremolo-labels">Speed</span>';
            pluginHTML += '<input class="tremoloFreq" type="range" min=".25" max="8.5" step=".005" oninput="updateTremoloFrequency(\'' + trackId + '\',\'' + location + '\', this.value)">';
            pluginHTML += '</input><br/><span class="tremolo-labels">Gain</span>';
            pluginHTML += '<input class="tremoloGain" type="range" min="0" max="1" step=".005" oninput="updateTremoloGain(\'' + trackId + '\',\'' + location + '\', this.value)">';
            pluginHTML += '</input></div><div class="tremoloButtons">';
            pluginHTML += '<canvas id="trem_sine" class="trem_button" width="40px" height="40px" onclick="updateTremoloWaveform(\'' + trackId + '\',\'' + location + '\', \'sine\')"></canvas>';
            pluginHTML += '<canvas id="trem_square" class="trem_button" width="40px" height="40px" onclick="updateTremoloWaveform(\'' + trackId + '\',\'' + location + '\', \'square\')"></canvas>';
            pluginHTML += '<canvas id="trem_saw" class="trem_button" width="40px" height="40px" onclick="updateTremoloWaveform(\'' + trackId + '\',\'' + location + '\', \'saw\')"></canvas>';
            pluginHTML += '<canvas id="trem_triangle" class="trem_button" width="40px" height="40px" onclick="updateTremoloWaveform(\'' + trackId + '\',\'' + location + '\', \'triangle\')"></canvas></div>';
            document.getElementById('plugin_' + location).innerHTML = pluginHTML;
            drawCloseButton('tremolo' + location);
            tremCanvas('sine', 0);
        break;
    }
}
function removePlugin(location, trackId) {
    var pluginId = document.getElementById(location);
    if(pluginId.hasChildNodes()) {
        pluginId.innerHTML = '';
        var dataTrack = pluginId.getAttribute('data-track-id');
        document.getElementById('plugin_' + pluginId.id).remove();
        var track = collection.getTrackById(dataTrack);
        if (track != null) {
            track.removeEffect(location);
        }
    }
    $('#pluginMenu').remove();
}
function menu(e) {
    var clickID = 0;
    var plugins = document.querySelectorAll('.plugin');
    var list = document.querySelectorAll('.list');
    var parent = document.getElementById('pluginMenu');
    for(var i = 0; i < list.length; i++) {
        if(e.target == list[i]) {
            clickID = 0;
            break;
        }
    }
    for(var i = 0; i < plugins.length; i++) {
        if(e.target == plugins[i]) {
            if(e.target.innerHTML != "") {
                clickID = 0;
            }else {
                clickID = 1;
            }
            break;
        }
    }
    if(parent) {
        var child = parent.children;
        for(var i = 0; i < child.length; i++) {
            if(e.target == parent || e.target == child[i]) {
                clickID = 2;
                break;
            }
        }
    }
    switch(clickID) {
        case 0:
            $('#pluginMenu').remove();
        break;
        case 1:
            document.getElementById('pluginList').style.visibility = 'hidden';
        break;
        default:
        break;
    }
    document.body.removeEventListener('mousedown', menu);
}
function recallMenu(location, x, y) {
    var trackId = document.getElementById(location).getAttribute('data-track-id');
    var overlayHTML = '<div id="pluginMenu" style="left:' + (x - 105) + 'px; top:' + (y + 15) + 'px">';
    overlayHTML += '<div id="noInserts" class="menuRow">no insert</div><div id="menuPlugins" class="menuRow">';
    overlayHTML += '<span>plugins</span><ul id="pluginList"></ul></div></div>';

    var pluginListHTML = '<li class="distortion" onmousedown="add_distortion(\'' + location + '\', ' + trackId + ')">';
    pluginListHTML += '<span class="list"> &nbsp; &nbsp; &nbsp; Distortion</span></li>';
    pluginListHTML += '<li class="delay" onmousedown="add_delay(\'' + location + '\', ' + trackId + ')">';
    pluginListHTML += '<span class="list"> &nbsp; &nbsp; &nbsp; Delay</span></li>';
    pluginListHTML += '<li class="eq" onmousedown="add_eq(\'' + location + '\', ' + trackId + ')">';
    pluginListHTML += '<span class="list"> &nbsp; &nbsp; &nbsp; EQ</span></li>';
    pluginListHTML += '<li class="reverb" onmousedown="add_reverb(\'' + location + '\')">';
    pluginListHTML += '<span class="list"> &nbsp; &nbsp; &nbsp; Reverb</span></li>';
    pluginListHTML += '<li class="ringMod" onmousedown="add_ringMod(\'' + location + '\', ' + trackId + ')">';
    pluginListHTML += '<span class="list"> &nbsp; &nbsp; &nbsp; Ring Mod</span></li>';
    pluginListHTML += '<li class="tremolo" onmousedown="add_tremolo(\'' + location + '\', ' + trackId + ')">';
    pluginListHTML += '<span class="list"> &nbsp; &nbsp; &nbsp; Tremolo</span></li>';

    document.getElementById('overlay').innerHTML = overlayHTML;
    document.getElementById('pluginList').innerHTML = pluginListHTML;

    document.getElementById('noInserts').addEventListener('click', function() {
        removePlugin(location, trackId);
    });
    document.getElementById('noInserts').addEventListener('mouseover', function() {
        document.getElementById('pluginList').style.visibility = 'hidden';
    });
    document.getElementById('menuPlugins').addEventListener('mouseover', function() {
        document.getElementById('pluginList').style.visibility = 'visible';
    });
    document.body.addEventListener('mousedown', menu, false);
}

function add_delay(location, trackId) {
    var track = collection.getTrackById(trackId);
    if (track != null) {
        track.applyEffect(location, Object.create(DelayEffect).init());
    }
    addPlugin(location, 'Delay', trackId);
}
function add_distortion(location, trackId) {
    var track = collection.getTrackById(trackId);
    if (track != null)
    {
        track.applyEffect(location, Object.create(DistortionEffect).init(0,1,4));
    }
    addPlugin(location, 'Distortion', trackId);
}
function add_eq(location, trackId) {
    var track = collection.getTrackById(trackId);
    if (track != null)
    {
        var array = [
            [5,100,0],
            [5,200,0],
            [5,1000,0],
            [5,2000,0],
            [5,6000,0]
        ];

        track.applyEffect(location, Object.create(EqualizerEffect).init(array));
    }
    addPlugin(location, 'Equalizer', trackId);
}
function add_reverb(location, trackId) {
    reverb = context.createConvolver();

    addPlugin(location, 'Reverb', trackId);
}
function add_ringMod(location, trackId) {
    var track = collection.getTrackById(trackId);
    if (track != null) {
        track.applyEffect(location, Object.create(RingModEffect).init(0.01, 20));
    }
    addPlugin(location, 'Ring Mod', trackId);
}
function add_tremolo(location, trackId) {
    var track = collection.getTrackById(trackId);
    if (track != null) {
        track.applyEffect(location, Object.create(TremoloEffect).init(0.01, 3.0));
    }
    addPlugin(location,'Tremolo', trackId);
}
