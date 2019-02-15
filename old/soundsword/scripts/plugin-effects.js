var DelayEffect = {
    bypass: false,
    effect: null,
    type: 'freq',
    delayValue: 0,
    init: function() {
        this.key = 'delay';
        this.delayValue = 0;
        this.delay = context.createDelay();
        this.dry = context.createGain();
        this.dry.gain.value = 1;
        this.effect = context.createGain();
        this.effect.gain.value = 1;
        this.feedbackValue = 0;
        this.feedback = context.createGain();
        this.feedback.gain.value = this.feedbackValue;
        this.hpfValue = 20;
        this.hpf = context.createBiquadFilter();
        this.hpf.type = 'highpass';
        this.hpf.frequency.value = this.hpfValue;
        this.input = context.createGain();
        this.input.gain.value = 1;
        this.lpfValue = 20000;
        this.lpf = context.createBiquadFilter();
        this.lpf.type = 'lowpass';
        this.lpf.frequency.value = this.lpfValue;
        this.mixValue = 50;
        this.outputValue = 1;
        this.output = context.createGain();
        this.output.gain.value = this.outputValue;
        this.wet = context.createGain();
        this.wet.gain.value = .5;

        this.delayValue = (currentTempo/60)/4;
        this.delay.delayTime.value = this.delayValue;

        this.input.connect(this.dry);
        this.dry.connect(this.output);
        this.input.connect(this.wet);
        this.wet.connect(this.delay);
        this.delay.connect(this.feedback);
        this.feedback.connect(this.delay);
        this.delay.connect(this.lpf);
        this.lpf.connect(this.hpf);
        this.hpf.connect(this.output);

        this.effect = [
            this.input,
            this.output
        ];

        return this;
    }
};
var DistortionEffect = {
    bypass: false,
    curveType: 1,
    effect: null,
    effectCurve: 0,
    knob: null,
    setting: 4,
    type: 'freq',
    init: function(curve,gain,setting) {
        this.key = 'distortion';
        this.effect = context.createWaveShaper();
        this.effectCurve = curve;
        this.gainValue = gain;
        this.setting = setting;
        this.effect.curve = makeDistortionCurve(this.effectCurve, this.setting, this.curveType);
        this.volume = context.createGain();

        return this;
    }
};
var EqualizerEffect = {
    bypass: false,
    effect: null,
    type: 'freq',
    init: function(array) {
        this.key = 'equalizer';

        this.input = context.createGain();
        this.input.gain.value = 1;
        this.output = context.createGain();
        this.output.gain.value = 1;

        this.low = context.createBiquadFilter();
        this.lowFrequencyValue = array[0][1];
        this.low.frequency.value = this.lowFrequencyValue;
        this.lowGainValue = array[0][2];
        this.low.gain.value = this.lowGainValue;
        this.low.type = 'peaking';
        this.lowQValue = array[0][0];
        this.low.Q.value = this.lowQValue;

        this.lowMid = context.createBiquadFilter();
        this.lowMidFrequencyValue = array[1][1];
        this.lowMid.frequency.value = this.lowMidFrequencyValue;
        this.lowMidGainValue = array[1][2];
        this.lowMid.gain.value = this.lowMidGainValue;
        this.lowMid.type = 'peaking';
        this.lowMidQValue = array[1][0];
        this.lowMid.Q.value = 5;

        this.mid = context.createBiquadFilter();
        this.midFrequencyValue = array[2][1];
        this.mid.frequency.value = this.midFrequencyValue;
        this.midGainValue = array[2][2];
        this.mid.gain.value = this.midGainValue;
        this.mid.type = 'peaking';
        this.midQValue = array[2][0];
        this.mid.Q.value = this.midQValue;

        this.highMid = context.createBiquadFilter();
        this.highMidFrequencyValue = array[3][1];
        this.highMid.frequency.value = this.highMidFrequencyValue;
        this.highMidGainValue = array[3][2];
        this.highMid.gain.value = this.highMidGainValue;
        this.highMid.type = 'peaking';
        this.highMidQValue = array[3][0];
        this.highMid.Q.value = this.highMidQValue;

        this.high = context.createBiquadFilter();
        this.highFrequencyValue = array[4][1];
        this.high.frequency.value = this.highFrequencyValue;
        this.highGainValue = array[4][2];
        this.high.gain.value = this.highGainValue;
        this.high.type = 'peaking';
        this.highQValue = array[4][0];
        this.high.Q.value = this.highQValue;

        this.input.connect(this.low);
        this.low.connect(this.lowMid);
        this.lowMid.connect(this.mid);
        this.mid.connect(this.highMid);
        this.highMid.connect(this.high);
        this.high.connect(this.output);

        this.effect = [
            this.input,
            this.output
        ]

        return this;
    }
};
var RingModEffect = {
    bypass: false,
    effect: null,
    type: 'freq',
    oscillator: null,
    gainValue: 0,
    frequencyValue: 0,
    init: function(gainValue, frequencyValue) {
        this.key = 'ringmod';
        this.gainValue = gainValue;
        this.frequencyValue = frequencyValue;

        this.effect = context.createGain();
        this.effect.gain.value = gainValue;

        this.oscillator = context.createOscillator();
        this.oscillator.frequency.value = frequencyValue;
        this.oscillator.type = 'triangle';
        this.oscillator.start();

        this.oscillator.connect(this.effect.gain);

        return this;
    }
};
var TremoloEffect = {
    bypass: false,
    effect: null,
    type: 'freq',
    oscillator: null,
    gainValue: 0,
    frequencyValue: 0,
    init: function(gainValue, frequencyValue) {
        this.key = 'tremolo';
        this.gainValue = gainValue;
        this.frequencyValue = frequencyValue;

        this.effect = context.createGain();
        this.effect.gain.value = gainValue;

        this.oscillator = context.createOscillator();
        this.oscillator.frequency.value = frequencyValue;
        this.oscillator.type = 'sine';
        this.oscillator.start();

        this.oscillator.connect(this.effect.gain);

        return this;
    }
};
//Delay Plugin
function delayGain(trackId, effectId, value) {
    var track = collection.getTrackById(trackId);
    var effect = track.getEffectByKey(effectId);

    effect.outputValue = value;
    effect.output.gain.value = effect.outputValue;
    document.getElementById(effectId + 'DelayGainDisplay').innerHTML = (effect.outputValue*100).toFixed(0) + '%';
}
function delayMix(trackId, effectId, value) {
    var track = collection.getTrackById(trackId);
    var effect = track.getEffectByKey(effectId);
    effect.mixValue = value;
    effect.dry.gain.value = (100 - effect.mixValue)/100;
    effect.wet.gain.value = effect.mixValue/100;
    document.getElementById(effectId + 'DelayMixDisplay').innerHTML = effect.mixValue + '%';
}
function delayHPF(trackId, effectId, value) {
    var track = collection.getTrackById(trackId);
    var effect = track.getEffectByKey(effectId);
    effect.hpfValue = value;
    effect.hpf.frequency.value = effect.hpfValue;
    document.getElementById(effectId + 'DelayHPFDisplay').innerHTML = effect.hpfValue + ' Hz';
}
function delayLPF(trackId, effectId, value) {
    var track = collection.getTrackById(trackId);
    var effect = track.getEffectByKey(effectId);
    effect.lpfValue = value;
    effect.lpf.frequency.value = effect.lpfValue;
    document.getElementById(effectId + 'DelayLPFDisplay').innerHTML = effect.lpfValue + ' Hz';
}
function delayTime(trackId, effectId, value) {
    var track = collection.getTrackById(trackId);
    var effect = track.getEffectByKey(effectId);
    effect.delayValue = value;
    effect.delay.delayTime.value = effect.delayValue;
    document.getElementById(effectId + 'DelayTimeDisplay').innerHTML = (effect.delayValue*1000).toFixed(1) + ' ms';
}
function delayFeedback(trackId, effectId, value) {
    var track = collection.getTrackById(trackId);
    var effect = track.getEffectByKey(effectId);
    effect.feedbackValue = value;
    effect.feedback.gain.value = effect.feedbackValue/100;
    document.getElementById(effectId + 'DelayFeedbackDisplay').innerHTML = effect.feedbackValue + '%';
}
function updateDelayNote(trackId, effectId, note) {
    var track = collection.getTrackById(trackId);
    var effect = track.getEffectByKey(effectId);

    switch(note)
    {
        case 'whole':
            effect.delayValue = collection.tempo/60;
        break;
        case 'half':
            effect.delayValue = (collection.tempo/60)/2;
        break;
        case 'quarter':
            effect.delayValue = (collection.tempo/60)/4;
        break;
        case 'eighth':
            effect.delayValue = (collection.tempo/60)/8;
        break;
        default:
        break;
    }
    effect.delay.delayTime.value = effect.delayValue;
    document.getElementById(effectId + 'DelayTimeDisplay').innerHTML = (effect.delayValue*1000).toFixed(1) + ' ms';

}
//Distortion Plugin
function applyDistortion(effectId, trackId, key) {
    var track = collection.getTrackById(trackId);
    var effect = track.getEffectByKey(effectId);
    updateAlgorithm(effectId, trackId, key);
}
function updateAlgorithm(effectId, trackId, setting) {
    var track = collection.getTrackById(trackId);
    if (track != null) {
        var effect = track.getEffectByKey(effectId);
        if (effect != null)
        {
            effect.setting = parseInt(setting);
            effect.effect.curve = makeDistortionCurve(effect.effectCurve, effect.setting, effect.curveType);
        }
    }
}
function updateCurveLevel(trackId, effectId, curve) {
    var track = collection.getTrackById(trackId);
    if (track != null) {
        var effect = track.getEffectByKey(effectId);
        if (effect != null)
        {
            effect.effectCurve = curve * 2;
            effect.effect.curve = makeDistortionCurve(effect.effectCurve, effect.setting, effect.curveType);
        }
    }
}
function updateCurveType(effectId, trackId, curveType) {
    var track = collection.getTrackById(trackId);
    if (track != null) {
        var effect = track.getEffectByKey(effectId);
        if (effect != null)
        {
            effect.curveType = parseInt(curveType);
            effect.effect.curve = makeDistortionCurve(effect.effectCurve, effect.setting, effect.curveType);
        }
    }
}
function makeDistortionCurve(amount, setting, type) {
    var d = (typeof setting === 'number') ? setting : 4;
    var k = typeof amount === 'number' ? amount : 50;
    var curveType = (typeof type === 'number') ? type : 1;
    var n_samples = 44100;
    var curve = new Float32Array(n_samples);
    var x;
    for(var i = 0; i < n_samples; i++) {
        switch(d) {
            case 1:
                x = Math.asin(Math.abs(i * 2 / n_samples - 1) * Math.PI * 2);
            break;
            case 2:
                x = Math.tan(Math.abs(i * 2 / n_samples - 1) * Math.PI * 2);
            break;
            case 3:
                x = Math.log(Math.sin(Math.abs(i * 2 / n_samples - 1) * Math.PI * 2));
            break;
            //nice distortion
            case 4:
                x = Math.sin(i * 2 / n_samples - 1);
            break;
            //white noise, not good
            case 5:
                x = Math.sin(Math.random() * Math.PI * 2);
            break;
            case 6:
                x = (1)*Math.sin(Math.abs(i * 2 / n_samples - 1) * Math.PI * 2);
            break;
            case 7:
                x = 1/(i * 2 / n_samples - 1);
            break;
            case 8:
                x = Math.pow((i * 2 / n_samples - 1), 2);
            break;
            //multiplied by golden ratio == good
            case 9:
                x = 1.61803398875 * (i * 2 / n_samples - 1);
            break;
            //divided by golden ratio == good
            case 10:
                x = (i * 2 / n_samples - 1)/1.61803398875;
            break;
            //golden ratio divided by x
            case 11:
                x = 1.61803398875/(i * 2 / n_samples - 1);
            break;
            //just like 9
            case 12:
                x = Math.sin(1.61803398875 * (i * 2 / n_samples - 1));
            break;
            // doesnt work
            case 13:
                x = Math.sign(i) * ((1 - Math.E) * Math.abs(i));
            break;
            // v fuzzy and v loud
            case 14:
                x = Math.pow((i * 2 / n_samples - 1), 1.61803398875);
            break;
            case 15:
                x = (i * 2 / n_samples - 1);
            break;
            case 16:
                x = Math.pow(i,3);
            break;
        }
        switch(curveType)
        {
            case 1:
                curve[i] = ( 3 + k ) * x * 20 * (Math.PI / 180) / ( Math.PI + k * Math.abs(x) );
            break;
            case 2:
                curve[i] = ( Math.PI + k ) * x * (1/6) / ( Math.PI + k * Math.abs(x) );
            break;
            case 3:
                curve[i] = 1.61803398875 * (k + 1) * x * .5 / (Math.PI + k * Math.abs(x) );
            break;
            case 4:
                //static volume
                curve[i] = ( k * ( 2 * i ) * x + 1) / ( Math.PI + k );
            break;
            case 5:
                /*if(-1 > x < 1)
                {
                    curve[i] = (x * Math.abs(x)) * (1 - Math.pow(Math.E, (Math.pow(-x,2) / Math.abs(x)) )) * (k/100);
                }else {
                    curve[i] = Math.sign(x) * (1 - Math.pow(Math.E, -Math.abs(x))) * (k/100);
                }*/
                if(x < 0)
                {
                    curve[i] = (1 - Math.exp(-x)) * k;
                }else {
                    curve[i] = (-1 + Math.exp(x)) * k;
                }
            break;
            case 6:
                curve[i] = x * (Math.abs(x) + k) / (Math.pow(x,2) + (k - 1) * Math.abs(x) + 1);
            break;
            case 7:
                curve[i] = (1 + k) * x / (1 + k * Math.abs(x));
            break;
            //case 8:
                //ricky's curve
            //    curve[i] = Math.pow(i,3);
            //break;
        }
    }
    //curve[21400] = 100000000000;
    return curve;
}
//Eq Plugin
function updateEqQ(trackId, effectId, property, parameter, input, value) {
    var track = collection.getTrackById(trackId);
    if (track != null) {
        var effect = track.getEffectByKey(effectId);
        if (effect != null)
        {
            effect[property] = value;
            effect[parameter].Q.value = effect[property];
            document.getElementById(effectId + input).value = value;
        }
    }
}
function updateEqFrequency(trackId, effectId, property, parameter, input, value, min, max) {
    var track = collection.getTrackById(trackId);
    if (track != null) {
        var effect = track.getEffectByKey(effectId);
        if (effect != null)
        {
            effect[property] = value;
            effect[parameter].frequency.value = effect[property];
            document.getElementById(effectId + input).value = value;
        }
    }
}
function updateEqGain(trackId, effectId, property, parameter, input, value) {
    var track = collection.getTrackById(trackId);
    if (track != null) {
        var effect = track.getEffectByKey(effectId);
        if (effect != null)
        {
            effect[property] = value;
            effect[parameter].gain.value = effect[property];
            document.getElementById(effectId + input).value = value;
        }
    }
}
//Ring Mod Plugin
function updateRingModFrequency(trackId, effectId, value) {
    var track = collection.getTrackById(trackId);
    if (track != null) {
        var effect = track.getEffectByKey(effectId);
        if (effect != null)
        {
            effect.frequencyValue = value;
            effect.oscillator.frequency.value = effect.frequencyValue;
        }
    }
    ringOsc.frequency.value = value;
}

//tremolo
function updateTremoloFrequency(trackId, effectId, value) {
    var track = collection.getTrackById(trackId);
    if (track != null) {
        var effect = track.getEffectByKey(effectId);
        if (effect != null)
        {
            effect.frequencyValue = value;
            effect.oscillator.frequency.value = effect.frequencyValue;
        }
    }
}
function updateTremoloGain(trackId, effectId, value) {
    var track = collection.getTrackById(trackId);
    if (track != null) {
        var effect = track.getEffectByKey(effectId);
        if (effect != null)
        {
            effect.gainValue = value;
            effect.effect.gain.value = effect.gainValue;
        }
    }
}
function updateTremoloWaveform(trackId, effectId, waveform) {
    var track = collection.getTrackById(trackId);
    if (track != null) {
        var effect = track.getEffectByKey(effectId);
        if (effect != null)
        {
            switch(waveform) {
                case 'sine':
                effect.oscillator.type = 'sine';
                tremCanvas('sine',1);
                break;
                case 'square':
                effect.oscillator.type = 'square';
                tremCanvas('square',1);
                break;
                case 'saw':
                effect.oscillator.type = 'sawtooth';
                tremCanvas('saw',1);
                break;
                case 'triangle':
                effect.oscillator.type = 'triangle';
                tremCanvas('triangle',1);
                break;
            }
        }
    }
}
