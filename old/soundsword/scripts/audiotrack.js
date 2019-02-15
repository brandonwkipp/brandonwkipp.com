var context = null;
var contextCurrentTime = 0;
var trackCurrentTime = 0;
var trackStartTime = 0;
var trackCache = {};

function AudioTrack() {
    this.appliedEffects = [];
    this.bufferSource = null;
    this.buffers = [];
    this.channels = 1;
    this.color = null;
    this.comments =  null;
    this.context = null;
    this.currentTime = 0;
    this.id = null;
    this.isLoaded = 0;
    this.isPlaying = 0;
    this.loop = null;
    this.meterL = null;
    this.meterR = null;
    this.muted = 0;
    this.muteNode = null;
    this.muteStatus = 0;
    this.order = null;
    this.output = null;
    this.panNode = null;
    this.pan = 0;
    this.selectedClips = [];
    this.selectedStatus = 0;
    this.splitter = null;
    this.soloStatus = 0;
    this.status = 1;
    this.trackName = null;
    this.type = 'Audio';
    this.volumeNode = null;
    this.volume = 1;
    this.volumeFaderVal = 1;
    this.waveforms = [];

    return this;
};
AudioTrack.prototype.applyAllEffects = function() {
    var self = this;
    if(!this.isLoaded) return;

    if(!this.meterL || this.meterL == null || $.isEmptyObject(this.meterL)) {
        this.meterL = context.createAnalyser();
        this.meterL.smoothingTimeConstant = 1;
        this.meterL.fftSize = 2048;
    }
    if(this.channels > 1) {
        if(!this.meterR || this.meterR == null || $.isEmptyObject(this.meterR)) {
            this.meterR = context.createAnalyser();
            this.meterR.smoothingTimeConstant = 1;
            this.meterR.fftSize = 2048;
        }
    }
    if(!this.splitter || this.splitter == null || $.isEmptyObject(this.splitter)) {
        this.splitter = context.createChannelSplitter(2);
    }

    if(this.isPlaying) { this.disconnect(); }
    var hasEffects = false;
    var effects = [];
    var allEffects = this.appliedEffects;

    for(var key in allEffects) {
        if(!allEffects.hasOwnProperty(key)) continue;

        var effectByKey = null;
        var effectKey = Object.keys(allEffects[key])[0];
        if(!allEffects[key].hasOwnProperty(effectKey)) continue;
        effectByKey = allEffects[key][effectKey];

        var effect = effectByKey.effect;
        effects[key] = effect;
    }
    var previousEffect;
    var currentEffect;
    var runCount = 1;

    for (var effect in effects)
    {
        if (!effects.hasOwnProperty(effect)) continue;

        hasEffects = true;
        var node = effects[effect];
        previousEffect = currentEffect;
        currentEffect = node;

        if(Array.isArray(currentEffect))
        {
            var input = currentEffect[0];
            var output = currentEffect[1];
            if(runCount == 1)
            {
                for(var i = 0; i < this.buffers.length; i++)
                {
                    if(typeof this.buffers[i].connect == 'function')
                    {
                        this.buffers[i].connect(input);
                        currentEffect = output;
                        runCount++;
                    }
                }
            }else {
                previousEffect.connect(input);
                currentEffect = output;
            }
        }else
        {
            if(runCount == 1)
            {
                for(var i = 0; i < this.buffers.length; i++)
                {
                    if(typeof this.buffers[i].connect == 'function') { this.buffers[i].connect(currentEffect); }
                    runCount++;
                }
            }
            if(previousEffect != null) { previousEffect.connect(currentEffect); }
        }
    }
    if(currentEffect != null)
    {
        currentEffect.connect(this.panNode);
        this.panNode.connect(this.volumeNode);
        this.volumeNode.connect(this.muteNode);
        this.muteNode.connect(context.destination);

        this.volumeNode.connect(this.splitter);
        this.splitter.connect(this.meterL,0,0);
        if(this.channels > 1) { this.splitter.connect(this.meterR,1,0); }
    }
    if(!hasEffects)
    {
        for(var i = 0; i < this.buffers.length; i++)
        {
            if(typeof this.buffers[i].connect == 'function') this.buffers[i].connect(this.panNode);
        }
        this.panNode.connect(this.volumeNode);
        this.volumeNode.connect(this.muteNode);
        this.muteNode.connect(context.destination);

        this.volumeNode.connect(this.splitter);
        this.splitter.connect(this.meterL,0,0);
        if(this.channels > 1)
        {
            this.splitter.connect(this.meterR,1,0);
        }
    }
    window.requestAnimationFrame(self.getLevels.bind(this));

    bufferSourceCopy = null;

    return this;
};
AudioTrack.prototype.applyEffect = function(key, object) {
    this.removeEffect(key);

    var temp = {};
    temp[key] = object;

    this.appliedEffects.push(temp);

    this.applyAllEffects();

    return this;
};
AudioTrack.prototype.changeWaveformColor = function(clip, invert) {
    var cL = document.getElementById('track' + this.id + 'Clip' + clip + 'WaveformL');
    var cR = document.getElementById('track' + this.id + 'Clip' + clip + 'WaveformR');

    var waveformCacheItem = collection.waveformCache[this.waveforms[clip].clipPath];

    if(waveformCacheItem.hasOwnProperty('left'))
    {
        var ctx1 = cL.getContext('2d');
        ctx1.translate(0, -55/2); //centers where the line drawing starts horizontally
        var imageL = new Image();
        imageL.src = waveformCacheItem.left;

        canvas_buffer = document.createElement('canvas');
        canvas_buffer.width = this.waveforms[clip].waveformLength;
        canvas_buffer.height = 55;
        bx = canvas_buffer.getContext('2d');

        // fill offscreen buffer with the tint color
        if(!invert) { bx.fillStyle = palette[this.color].foreground; }
        else { bx.fillStyle = palette[this.color].background; }
        bx.fillRect(0,0,this.waveforms[clip].waveformLength,55);

        // destination atop makes a result with an alpha channel identical to fg, but with all pixels retaining their original color *as far as I can tell*
        bx.globalCompositeOperation = "destination-atop";
        bx.drawImage(imageL,0,0);

        // to tint the image, draw it first
        ctx1.drawImage(imageL,0,0);

        //then set the global alpha to the amound that you want to tint it, and draw the buffer directly on top of it.
        ctx1.globalAlpha = 1;
        ctx1.drawImage(canvas_buffer,0,0);
        ctx1.translate(0, 55/2);
    }
    if(waveformCacheItem.hasOwnProperty('right'))
    {
        var ctx2 = cR.getContext('2d');
        ctx2.translate(0, -55/2);
        var imageR = new Image();
        imageR.src = waveformCacheItem.right;

        canvas_buffer = document.createElement('canvas');
        canvas_buffer.width = this.waveforms[clip].waveformLength;
        canvas_buffer.height = 55;
        bx = canvas_buffer.getContext('2d');

        // fill offscreen buffer with the tint color
        if(!invert) { bx.fillStyle = palette[this.color].foreground; }
        else { bx.fillStyle = palette[this.color].background; }
        bx.fillRect(0,0,this.waveforms[clip].waveformLength,55);

        // destination atop makes a result with an alpha channel identical to fg, but with all pixels retaining their original color *as far as I can tell*
        bx.globalCompositeOperation = "destination-atop";
        bx.drawImage(imageR,0,0);

        // to tint the image, draw it first
        ctx2.drawImage(imageR,0,0);

        //then set the global alpha to the amound that you want to tint it, and draw the buffer directly on top of it.
        ctx2.globalAlpha = 1;
        ctx2.drawImage(canvas_buffer,0,0);
        ctx2.translate(0, 55/2);
    }
    if(!invert)
    {
        $('#track' + this.id + 'Clip' + clip + 'Background').css('background', palette[this.color].background);
        $('#editNamePlate' + this.id + 'Color').css('background', palette[this.color].foreground);
    }else
    {
        $('#track' + this.id + 'Clip' + clip + 'Background').css('background', palette[this.color].foreground);
    }
};
AudioTrack.prototype.changeTrackColor = function(color) {
    this.color = color;
    for(var i = 0; i < this.waveforms.length; i++)
    {
        this.changeWaveformColor(i, false);
    }
}
AudioTrack.prototype.clearTrack = function() {
    this.appliedEffects = [];
    this.bufferSource = null;
    this.currentTime = 0;
    this.data = null;
    this.duration = 0;
    this.isLoaded = 0;
    this.isPlaying = 0;
    this.loop = null;
    this.output = null;
    this.path = null;
    this.selectedStatus = 0;
    this.splitter = null;
    this.status = 1;
    this.waveformLength = null;
}
AudioTrack.prototype.disconnect = function() {
    if(this.buffers != null)
    {
        for(var i = 0; i < this.buffers.length; i++)
        {
            if(typeof this.buffers[i].disconnect == 'function')
            {
                this.buffers[i].disconnect();
            }
        }
    }
    if (this.panNode != null) this.panNode.disconnect();
    if (this.volumeNode != null) this.volumeNode.disconnect();
    if (this.muteNode != null) this.muteNode.disconnect();
    if (this.splitter != null) this.splitter.disconnect();
    if (this.meterL != null) this.meterL.disconnect();

    if(this.channels > 1)
    {
        this.meterR.disconnect();
    }
    this.meterScriptL = null;
    this.meterScriptR = null;
};
AudioTrack.prototype.getClipByTime = function() {
    for(var i = 0; i < this.waveforms.length; i++)
    {
        var a = collection.selectionStart,
            b = collection.selectionEnd,
            c = this.waveforms[i].positionStart,
            d = this.waveforms[i].positionEnd;

        if((a <= c && b >= d) || (a <= c && b > c))
        {
            this.waveforms[i].clipSelect = true;
        }else if((a < d && b >= d) || (a > c && b < d))
        {
            this.waveforms[i].clipSelect = true;
        }else
        {
            this.waveforms[i].clipSelect = false;
        }
    }
}
AudioTrack.prototype.getEffectByKey = function(key) {
    for(var effect in this.appliedEffects)
    {
        if (this.appliedEffects.hasOwnProperty(effect) && this.appliedEffects[effect].hasOwnProperty(key))
        {
            return this.appliedEffects[effect][key];
        }
    }
    return null;
};
AudioTrack.prototype.getLevels = function() {
    if(parseFloat(collection.playScroller.style.left) >= this.waveforms[0].positionStart)
    {
        switch(this.channels)
        {
            case 1:
                this.getLevelsL();
            break;
            case 2:
                this.getLevelsL();
                this.getLevelsR();
            break;
            default:
            break;
        }
    }
    this.loop = window.requestAnimationFrame(this.getLevels.bind(this));
}
AudioTrack.prototype.getLevelsL = function() {
    var l = new Float32Array(1024);
    this.meterL.getFloatTimeDomainData(l);

    var sum = 0;
    var rms = 0;
    var decibelL = 0;

    for(var i = 0; i < l.length; i = i + 2)
    {
        sum += l[i] * l[i];
    }
    rms = Math.sqrt(sum / (l.length / 4));
    decibelL = (20 * Math.log10(rms) + 3.01);

    //2.42718446601942 is product of canvas total height/max number of dB, converts dB range to canvas range
    drawLevels(this,'L',(collection.meterHeight + (decibelL * 2.5)));

    /*var tools = document.getElementById('tools');
    if(tools != null) {
        tools.innerHTML = decibelL;
    }*/
};
AudioTrack.prototype.getLevelsR = function() {
    var r = new Float32Array(1024);
    this.meterR.getFloatTimeDomainData(r);

    var sum = 0;
    var rms = 0;
    var decibelR = 0;

    for(var i = 0; i < r.length; i = i + 2)
    {
        sum += r[i] * r[i];
    }
    rms = Math.sqrt(sum / (r.length / 4));
    decibelR = (20 * Math.log10(rms) + 3.01);

    //2.42718446601942 is product of canvas total height/max number of dB, converts dB range to canvas range
    drawLevels(this,'R',(collection.meterHeight + (decibelR * 2.5)));
};
AudioTrack.prototype.highlightClip = function() {
    for(var i = 0; i < this.waveforms.length; i++)
    {
        if(this.waveforms[i].clipSelect)
        {
            this.changeWaveformColor(i, true);
        }
    }
}

AudioTrack.prototype.initFromClip = function(clip, fn) {
    this.channels = clip.data.numberOfChannels;
    this.color = "blue";
    this.trackName = clip.title;
    var clipProperties = {
        clipStart: 0,
        clipEnd: clip.data.duration,
        clipPath: clip.path,
        offset: 0,
        positionStart: 0,
        positionEnd: clip.waveformLength,
        title: clip.title,
        waveformLength: clip.waveformLength
    }
    this.waveforms.push(clipProperties);

    this.panNode = context.createStereoPanner();
    if(this.pan == null || this.pan == 'undefined') { this.pan = 0; }
    this.panNode.pan.value = this.pan;
    this.volumeNode = context.createGain();
    if(this.volume == null || this.volume == 'undefined') { this.volume = 1; }
    this.volumeNode.gain.value = this.volume;
    this.muteNode = context.createGain();
    this.splitter = context.createChannelSplitter(2);
    this.meterL = context.createAnalyser();
    if(this.channels > 1)
    {
        this.meterR = context.createAnalyser();
    }
    this.meterScript = null;

    if (fn) fn(this);
    return this;
};
AudioTrack.prototype.initFromObject = function(obj) {
    var self = this;
    for(var key in this)
    {
        if(obj.hasOwnProperty(key))
        {
            this[key] = obj[key];
            if(key == 'appliedEffects')
            {
                this.appliedEffects = [];
                for(var effect in obj[key])
                {
                    if(obj[key].hasOwnProperty(effect))
                    {
                        var tempEffect = obj[key][effect];
                        var tempEffectKey = Object.keys(tempEffect)[0];
                        var tempEffectObject = tempEffect[tempEffectKey];

                        var effectType = ("key" in tempEffectObject) ? tempEffectObject.key : '';

                        if (effectType.indexOf('distortion') > -1)
                        {
                            tempEffectObject = Object.create(DistortionEffect).init(tempEffectObject.effectCurve, tempEffectObject.gain, tempEffectObject.setting);
                        }
                        else if (effectType.indexOf('delay') > -1)
                        {
                            tempEffectObject = Object.create(DelayEffect).init(tempEffectObject.value);
                        }
                        else if (effectType.indexOf('equalizer') > -1)
                        {
                            var array = [
                                [tempEffectObject.lowQValue,tempEffectObject.lowFrequencyValue,tempEffectObject.lowGainValue],
                                [tempEffectObject.lowMidQValue,tempEffectObject.lowMidFrequencyValue,tempEffectObject.lowMidGainValue],
                                [tempEffectObject.midQValue,tempEffectObject.midFrequencyValue,tempEffectObject.midGainValue],
                                [tempEffectObject.highMidQValue,tempEffectObject.highMidFrequencyValue,tempEffectObject.highMidGainValue],
                                [tempEffectObject.highQValue,tempEffectObject.highFrequencyValue,tempEffectObject.highGainValue]
                            ];
                            tempEffectObject = Object.create(EqualizerEffect).init(array);
                        }
                        else if (effectType.indexOf('tremolo') > -1)
                        {
                            tempEffectObject = Object.create(TremoloEffect).init(tempEffectObject.gainValue, tempEffectObject.frequencyValue);
                        }
                        else if (effectType.indexOf('ringmod') > -1)
                        {
                            tempEffectObject = Object.create(RingModEffect).init(tempEffectObject.gainValue, tempEffectObject.frequencyValue);
                        }
                        this.applyEffect(tempEffectKey, tempEffectObject);
                    }
                }
            }
        }
    }
    this.panNode = context.createStereoPanner();
    if(this.pan == null || this.pan == 'undefined') this.pan = 0;
    this.panNode.pan.value = this.pan;

    this.volumeNode = context.createGain();
    if(this.volume == null || this.volume == 'undefined') this.volume = 1;
    this.volumeNode.gain.value = this.volume;

    this.muteNode = context.createGain();

    if(this.muteStatus == null || this.muteStatus == 'undefined') this.muteStatus = 0;
    if(this.muted == null || this.muted == 'undefined') this.muted = 0;
    if(this.muteStatus && this.muted) this.muteNode.gain.value = 0;

    this.volumeNode.gain.value = this.volume;
    this.splitter = context.createChannelSplitter(2);
    this.meterL = context.createAnalyser();
    if(this.channels > 1)
    {
        this.meterR = context.createAnalyser();
    }
    this.meterScript = null;

    if(this.color == null || this.color == 'undefined') this.color = 'blue';

    AudioEvents.fireEvent('addMixTrackComponent', [this]);
    AudioEvents.fireEvent('addEditTrackComponent', [this]);
    AudioEvents.fireEvent('resizeMeters', [this]);

    return this;
};
AudioTrack.prototype.initEmpty = function(id, channels, type) {
    this.channels = channels;
    this.id = id;
    this.panNode = context.createStereoPanner();
    this.trackName = 'Audio 1';
    this.volumeNode = context.createGain();
    return this;
};
AudioTrack.prototype.mute = function(solo) {
    if(!this.muteStatus) {
        this.muteStatus = 1;
        if(solo == 'undefined' || !solo) {
            updateMute(this.id, this.muteStatus);
            this.muted = 1;
        }
        this.muteNode.gain.value = 0;
    }else {
        if(collection.soloedTracks) {
            if(!this.soloStatus) {
                if($('#track' + this.id + 'EditMuteButton').hasClass('muted') && $('#track' + this.id + 'MixMuteButton').hasClass('muted')) {
                    updateMute(this.id, !this.muteStatus);
                    this.muted = 0;
                }else {
                    updateMute(this.id, this.muteStatus);
                    this.muted = 1;
                }
            }else {
                this.muteStatus = 0;
                updateMute(this.id, this.muteStatus,1);
                this.muted = 0;
                this.muteNode.gain.value = 1;
            }
        }else {
            this.muteStatus = 0;
            if(!($('#track' + this.id + 'EditMuteButton').hasClass('unmuted')) && !($('#track' + this.id + 'MixMuteButton').hasClass('unmuted'))) {
                updateMute(this.id, this.muteStatus);
                this.muted = 0;
            }
            this.muteNode.gain.value = 1;
        }
    }
};
AudioTrack.prototype.pause = function() {
    this.stop();
};
AudioTrack.prototype.play = function() {
    /*clip start/end

    where to start playback (in seconds) inside the actual music file

    */

    /*position start/end

    position of the waveform relative to timeline

    */

    /*offset

    describes how offset waveforms are

    */

    var self = this;
    if(!this.isLoaded || this.status == 0) return;

    this.buffers = [];
    if(!collection.select)
    {
        for(var i = 0; i < this.waveforms.length; i++)
        {
            var wave = context.createBufferSource();
            var clip = clipList.getClipByPath(this.waveforms[i].clipPath)
            wave.buffer = clip.data;
            wave.clipStart = this.waveforms[i].clipStart;
            wave.clipEnd = this.waveforms[i].clipEnd;
            wave.offset = this.waveforms[i].offset;
            wave.positionStart = this.waveforms[i].positionStart;
            wave.positionEnd = this.waveforms[i].positionEnd;
            this.buffers.push(wave);
        }

        this.applyAllEffects();

        for(var i = 0; i < this.buffers.length; i++)
        {
            var startTime, when;
            //console.log('(' + this.buffers[i].positionStart + ' - ' + collection.scrollOffset + ')/45)' + ' + ' + context.currentTime);
            if(collection.scrollOffset)
            {
                startTime = ((this.buffers[i].positionStart - collection.scrollOffset)/45) + context.currentTime;
            }else
            {
                startTime = ((this.buffers[i].positionStart - parseFloat(collection.trackScroller.style.left))/45) + context.currentTime;
            }
            if(startTime < 0) startTime = 0;

            if(collection.scrollOffset)
            {
                if(collection.scrollOffset > this.buffers[i].positionStart)
                {
                    when = ((collection.scrollOffset - this.buffers[i].positionStart)/45) + this.buffers[i].clipStart;
                }else
                {
                    when = 0 + this.buffers[i].clipStart;
                }
            }else
            {
                if(parseFloat(collection.trackScroller.style.left) > this.buffers[i].positionStart)
                {
                    when = ((parseFloat(collection.trackScroller.style.left) - this.buffers[i].positionStart)/45) + this.buffers[i].clipStart;
                }else
                {
                    when = 0 + this.buffers[i].clipStart;
                }
            }

            this.buffers[i].start(startTime, when);
        }
    }else
    {
        this.getClipByTime();

        for(var i = 0; i < this.waveforms.length; i++)
        {
            if(this.waveforms[i].clipSelect)
            {
                var wave = context.createBufferSource();
                var clip = clipList.getClipByPath(this.waveforms[i].clipPath)
                wave.buffer = clip.data;
                wave.clipStart = this.waveforms[i].clipStart;
                wave.clipEnd = this.waveforms[i].clipEnd;
                wave.offset = this.waveforms[i].offset;
                wave.positionStart = this.waveforms[i].positionStart;
                wave.positionEnd = this.waveforms[i].positionEnd;
                this.buffers.push(wave);
            }
        }
        this.applyAllEffects();

        for(var i = 0; i < this.buffers.length; i++)
        {
            var startTime = (this.buffers[i].positionStart - collection.selectionStart)/45;
            if(startTime >= 0)
            {
                this.buffers[i].start((startTime + context.currentTime), (this.buffers[i].clipStart), ((collection.selectionEnd - collection.selectionStart)/45));
            }else
            {
                startTime = (collection.selectionStart - this.buffers[i].positionStart)/45;
                this.buffers[i].start(0, (startTime + this.buffers[i].clipStart), ((collection.selectionEnd - collection.selectionStart)/45));
            }
        }
    }
    this.isPlaying = 1;
};
AudioTrack.prototype.removeAllEffects = function(fn) {
    this.appliedEffects = [];
    this.applyAllEffects();

    if (fn) fn();
};
AudioTrack.prototype.removeEffect = function(key) {
    for (var effect in this.appliedEffects)
    {
        if (this.appliedEffects.hasOwnProperty(effect) && this.appliedEffects[effect].hasOwnProperty(key))
        {
            delete this.appliedEffects[effect][key];
            break;
        }
    }
    // reindex effects
    var tempEffects = [];
    for (var e in this.appliedEffects)
    {
        if (Object.keys(this.appliedEffects[e]).length > 0)
        {
            tempEffects.push(this.appliedEffects[e]);
        }
    }
    this.appliedEffects = tempEffects;
    this.applyAllEffects();
};
AudioTrack.prototype.rename = function() {
    var self = this;
    renameMenu(this);
    document.getElementById('ok').addEventListener('click', function() {
        self.trackName = document.getElementById('trackName').value;
        $(document).trigger('updateTrackName', [self]);
        document.getElementById('renameMenu').remove();
        overlayOpen = false;
    });
};
AudioTrack.prototype.solo = function() {
    if (!this.soloStatus)
    {
        this.soloStatus = 1;
        updateSolo(this.id, this.soloStatus);
        collection.soloedTracks++;
    }else
    {
        this.soloStatus = 0;
        updateSolo(this.id, this.soloStatus);
        collection.soloedTracks--;
    }
    collection.trackSolo();
};
AudioTrack.prototype.stop = function() {
    if(this.isPlaying) { this.disconnect(); }
    if(this.buffers != null && !$.isEmptyObject(this.buffers))
    {
        for(var i = 0; i < this.buffers.length; i++)
        {
            this.buffers[i].stop(context.currentTime);
        }
    }
    window.cancelAnimationFrame(this.loop);
    resetLevels(this.id, 'L');
    resetLevels(this.id, 'R');
    this.isPlaying = 0;
};
AudioTrack.prototype.updateEffects = function() {
    /*for(var effect in this.appliedEffects)
    {
        if(this.appliedEffects.hasOwnProperty(effect))
        {
            var key = Object.keys(this.appliedEffects[effect]);
            if(this.appliedEffects[effect][key].type == 'time')
            {
                this.appliedEffects[effect][key].update();
            }
        }
    }*/
};
AudioTrack.prototype.updateVolume = function(val, init) {
    if (!this.volumeNode || this.volumeNode == null) {
        this.volumeNode = context.createGain();
    }
    this.volumeFaderVal = val;
    if(!init)
    {
        this.volume = 1e-3 * Math.exp(6.908 * val);
    }
    this.volumeNode.gain.value = this.volume;

    var slider = document.getElementById("track" + this.id + "Fader");
    var thumb = document.getElementById("track" + this.id + "SliderThumb");
    var track = document.getElementById("track" + this.id + "SliderTrack");

    var trackHeight = window.getComputedStyle(track).height;
    var pc = this.volumeFaderVal/(slider.max - slider.min); /* the percentage slider value */
    var thumbHeight = window.getComputedStyle(thumb).height; /* must match the thumb size in your css */
    var tracksize = parseFloat(trackHeight) - parseFloat(thumbHeight);
    thumb.style.top = ((1 - pc) * tracksize) + "px";
}


function DebugAudioTrack() { console.log('HERE'); AudioTrack.apply(this); }
DebugAudioTrack.prototype = new AudioTrack();
DebugAudioTrack.prototype.applyAllEffects = function() {
    console.log('applyAllEffects (debug)');
    return AudioTrack.prototype.applyAllEffects.apply(this);
};
DebugAudioTrack.prototype.applyEffect = function(key, object) {
    console.log('applyEffect (debug)');
    console.log(key, object);
    return AudioTrack.prototype.applyEffect.apply(this, [key, object]);
};
DebugAudioTrack.prototype.clearTrack = function() {
    console.log('clearTrack (debug)');
    return AudioTrack.prototype.disconnect.apply(this);
};
DebugAudioTrack.prototype.disconnect = function() {
    console.log('disconnect (debug)');
    return AudioTrack.prototype.disconnect.apply(this);
};
DebugAudioTrack.prototype.getEffectByKey = function(key) {
    console.log('getEffectByKey (debug)');
    console.log(key);
    return AudioTrack.prototype.getEffectByKey.apply(this, [key]);
};
DebugAudioTrack.prototype.getLevelsL = function() {
    console.log('getLevelsL (debug)');
    return AudioTrack.prototype.getLevelsL.apply(this);
};
DebugAudioTrack.prototype.getLevelsR = function() {
    console.log('getLevelsR (debug)');
    return AudioTrack.prototype.getLevelsR.apply(this);
};
DebugAudioTrack.prototype.initEmpty = function(id, channels, type) {
    console.log('initEmpty (debug)');
    console.log(id, channels, type);
    return AudioTrack.prototype.initEmpty.apply(this, [id, channels, type]);
};
DebugAudioTrack.prototype.initFromClip = function(obj, fn) {
    console.log('initFromClip (debug)');
    console.log(obj);
    return AudioTrack.prototype.initFromClip.apply(this, [obj, fn]);
};
DebugAudioTrack.prototype.initFromObject = function(obj) {
    console.log('initFromObject (debug)');
    console.log(obj);
    return AudioTrack.prototype.initFromObject.apply(this, [obj]);
};
DebugAudioTrack.prototype.load = function(fn) {
    console.log('load (debug)');
    console.log(fn);
    return AudioTrack.prototype.load.apply(this, [fn]);
};
DebugAudioTrack.prototype.mute = function(solo) {
    console.log('mute (debug)');
    console.log(solo);
    return AudioTrack.prototype.mute.apply(this, [solo]);
};
DebugAudioTrack.prototype.pause = function() {
    console.log('pause (debug)');
    return AudioTrack.prototype.pause.apply(this);
};
DebugAudioTrack.prototype.play = function() {
    console.log('play (debug)');
    return AudioTrack.prototype.play.apply(this);
};
DebugAudioTrack.prototype.removeAllEffects = function(fn) {
    console.log('removeAllEffects (debug)');
    console.log(fn);
    return AudioTrack.prototype.removeAllEffects.apply(this, [fn]);
};
DebugAudioTrack.prototype.removeEffect = function(key) {
    console.log('removeEffect (debug)');
    console.log(key);
    return AudioTrack.prototype.removeEffect.apply(this, [key]);
};
DebugAudioTrack.prototype.rename = function() {
    console.log('rename (debug)');
    return AudioTrack.prototype.rename.apply(this);
};
DebugAudioTrack.prototype.solo = function() {
    console.log('solo (debug)');
    return AudioTrack.prototype.solo.apply(this);
};
DebugAudioTrack.prototype.stop = function() {
    console.log('stop (debug)');
    return AudioTrack.prototype.stop.apply(this);
};
DebugAudioTrack.prototype.updateEffects = function() {
    console.log('updateEffects (debug)');
    return AudioTrack.prototype.updateEffects.apply(this);
};
DebugAudioTrack.prototype.updateVolume = function(val) {
    console.log('updateVolume (debug)');
    console.log(val);
    return AudioTrack.prototype.updateVolume.apply(this, [val]);
};
