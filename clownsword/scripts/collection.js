function TrackCollection() {
    this.click = 0;
    this.dragStart = 0;
    this.dragPosition = 0;
    this.isPlaying = false;
    this.loop = null;
    this.meter = [4,4];
    this.meterHeight = null;
    this.meterWidth = null;
    this.mode = 'slip';
    this.modes = ['shuffle','spot','slip','grid'];
    this.playScroller = null;
    this.select = false;
    this.selectionStart = 0;
    this.selectionEnd = 0;
    this.scrollOffset = 0;
    this.scrollerMoved = null;
    this.selectedTracks = [];
    this.soloedTracks = 0;
    this.tempo = 120;
    this.tool = 'selector';
    this.tools = ['trimmer','selector','grabber','scrubber','pencil'];
    this.tracks = [];
    this.trackScroller = null;
    this.waveformCache = {};

    return this;
}
TrackCollection.prototype.addTrack = function(track) {
    if (typeof track === 'object')
    {
        this.tracks.push(track);
    }
};
TrackCollection.prototype.blinkScroller = function() {
    this.loop = setInterval(function() {
        $('#trackScroller').toggle();
    }, 700);
};
TrackCollection.prototype.clearBlinkScroller = function() {
    clearInterval(this.loop);
};
TrackCollection.prototype.dataSwitch = function(newTrackId, oldTrackId) {
    var newTrack = collection.getTrackById(newTrackId);
    var oldTrack = collection.getTrackById(oldTrackId);

    if(newTrack != null && oldTrack != null)
    {
        newTrack.bufferSource = oldTrack.bufferSource;
        newTrack.data = oldTrack.data;
        newTrack.duration = oldTrack.duration;
        newTrack.isLoaded = oldTrack.isLoaded;
        newTrack.isPlaying = oldTrack.isPlaying;
        newTrack.path = oldTrack.path;
        newTrack.waveformLength = oldTrack.waveformLength;

        oldTrack.clearTrack();
    }
}
TrackCollection.prototype.getTrackById = function(trackId) {
    for (var i = 0; i < this.tracks.length; i++)
    {
        if (this.tracks[i].id == trackId)
        {
            return this.tracks[i];
        }
    }

    return null;
};
TrackCollection.prototype.gridModulus = function(value, callback) {
    if(this.mode == 'grid')
    {
        var modulus = value % this.measureLength;
        value -= modulus;
        //if (modulus > 11.25) newLeft += 22.5;
        return value;
    }
}
TrackCollection.prototype.loadAll = function(callback) {
    callback = callback || function() {};

    var self = this;
    var currentTrackLoaded = false;
    var loadAudioInterval;
    var loadAudioTimeout;

    var start = context.currentTime;//new Date().getTime();

    function loadAudio(currentTrackIndex, skipLoad) {
        clearInterval(loadAudioInterval);
        clearTimeout(loadAudioTimeout);

        if(currentTrackIndex == self.tracks.length)
        {
            var end = context.currentTime; //new Date().getTime();
            console.log('All tracks loaded!');
            console.log('Execution time: ' + (end - start) + 's');

            if(self.tracks.length > 0)
            {
                self.trackScroller.className = 'visible';
                self.blinkScroller();
            }
            return;
        }
        if(currentTrackLoaded)
        {
            currentTrackLoaded = false;
            loadAudioTimeout = setTimeout(function() { loadAudio(currentTrackIndex, false); }, 100);
        }
        else if(!skipLoad)
        {
            var track = self.tracks[currentTrackIndex];
            currentTrackIndex++;
            currentTrackLoaded = true;
            callback(track);
            loadAudio(currentTrackIndex, false);
            if(track.isLoaded)
            {
                AudioEvents.fireEvent('addTrack', [track]);
            }else
            {
                return;
            }

            if(currentTrackIndex < self.tracks.length)
            {
                loadAudioInterval = setInterval(function() { loadAudio(currentTrackIndex, true); }, 100);
            }
        }
    }
    loadAudio(0, false);
};
TrackCollection.prototype.loadFromProject = function(projectId, callback) {
    loadSave('Initializing SoundSword', 'Loading tracks and settings...');
    this.playScroller = document.getElementById('playScroller');
    this.trackScroller = document.getElementById('trackScroller');

    var self = this;
    callback = callback || function() {};
    $.get('scripts/load-project.php', { id: projectId }, function(data) {
        data = JSON.parse(data);
        loadSave('Initializing SoundSword', 'Loading tempo map...');
        if(data.hasOwnProperty('tempo') && data.tempo != null)
        {
            currentTempo = data.tempo.toFixed(4);
            beatsperminute = currentTempo;
            $('#bpm').val(currentTempo);
            self.tempo = parseFloat(currentTempo);
        }
        loadSave('Initializing SoundSword', 'Drawing waveforms...');
        if(data.hasOwnProperty('waveformCache') && data.waveformCache != null)
        {
            self.waveformCache = data.waveformCache;

        }
        loadSave('Initializing SoundSword', 'Creating tracks...');
        if(!data.status || !data.hasOwnProperty('tracks'))
        {
            callback(self);
            return;
        }
        var storedTracks = JSON.parse(data.tracks);
        if (storedTracks != null)
        {
            for (var i = 0; i < storedTracks.length; i++)
            {
                var track = storedTracks[i];
                track.isLoaded = 0;
                track.isPlaying = 0;
                track.status = 1;

                var tmp = (isDebugEnabled ? new DebugAudioTrack() : new AudioTrack());
                tmp.initFromObject(track);
                if(track.soloStatus) { self.soloedTracks++; }
            }
        }
        callback(self);
    });
};
TrackCollection.prototype.modeFocus = function(modeId) {
    this.mode = modeId;
    var elm = document.getElementById(this.mode);
    if (elm != null) {
        elm.className = 'normalMode ' + modeId;
        for (var i = 0; i < this.modes.length; i++)
        {
            if (this.mode != this.modes[i]) {
                var elm2 = document.getElementById(this.modes[i]);
                if (elm2 != null) {
                    elm2.className = 'normalMode';
                }
            }
        }
    }
};
TrackCollection.prototype.moveTrackScroller = function(trackId, event) {
    this.scrollerMoved = 1;
    if(this.tracks.length > 0) { this.trackScroller.className = 'visible'; }
    var position = event.pageX - $(event.target).offset().left + $(event.target).position().left;

    if (this.mode == 'grid')
    {
        var modulus = position % 22.5;
        position -= modulus;
        if (modulus >= 11.25)
        {
            position += 22.5;
        }
    }else if (this.mode != 'slip')
    {
        position = null;
    }

    this.trackScroller.style.left = position + 'px';
    this.click = position;

    if(!this.isPlaying)
    {
        this.clearBlinkScroller();
        this.blinkScroller();
        this.playScroller.style.left = position + 'px';
        this.playScroller.className = 'hidden';

        clock.updateTime();

        this.trackScroller.style.top = (trackId - 1) * 114 + 'px';
        //this in the future needs to happen by order instead of id
        //also needs to account for vertical scroll
    }else
    {
        if(trackId == 'timeline')
        {
            AudioEvents.fireEvent('stop');
            AudioEvents.fireEvent('play');
        }
    }
};
TrackCollection.prototype.playAll = function(callback) {
    this.trackScroller.className = 'hidden';
    if(this.tracks.length > 0) { this.playScroller.className = 'visible'; }
    this.clearBlinkScroller();
    this.isPlaying = true;
    this.playScroller.style.height = this.tracks.length * 114 + 'px';
    if(!this.select)
    {
        this.scrollOffset = this.click;
    }else
    {
        this.scrollOffset = this.selectionStart;
    }
    if(this.click != 0)
    {
        trackCurrentTime = 0;
        clock.pausedSeconds = 0;
        this.click = 0;
    }

    var self = this;
    var tracksLoaded = 0;
    for(var i = 0; i < this.tracks.length; i++)
    {
        if(this.tracks[i].isLoaded)
        {
            tracksLoaded++;
        }
        else
        {
            if(this.tracks[i].waveforms == null || this.tracks[i].waveforms.length == 0)
            {
                tracksLoaded++;
            }else
            {
                this.tracks[i].isLoaded = 1;
                tracksLoaded++;
            }
        }
    }
    var t = setInterval(function() {
        if(tracksLoaded == self.tracks.length)
        {
            clearInterval(t);

            for(var i = 0; i < self.tracks.length; i++)
            {
                if(!self.tracks[i].isPlaying)
                {
                    if(self.tracks[i].waveforms == null || self.tracks[i].waveforms.length == 0) { self.tracks[i].isPlaying = 1; }
                    else { self.tracks[i].play(); }
                }
            }
            if (callback) callback(self);
        }
    }, 50);
};
TrackCollection.prototype.removeTrack = function(track, callback) {
    if(track != null)
    {
        if(track.isPlaying) track.stop();
        track.status = 0;

        this.update();
    }

    if (callback) callback();
};
TrackCollection.prototype.scrollAll = function(pixels) {
    var selectionEnd = false;
    if(this.select)
    {
        //console.log(this.selectionEnd, parseFloat(this.playScroller.style.left));
        if(this.selectionEnd <= parseFloat(this.playScroller.style.left))
        {
            AudioEvents.fireEvent('selectionReset');
            selectionEnd = true;
        }
    }
    if(!selectionEnd)
    {
        var p = (pixels * 45);
        var edit = document.getElementById('edit');

        var editWidth = parseFloat(window.getComputedStyle(document.getElementById('edit')).getPropertyValue('width'));
        var editNames = parseFloat(window.getComputedStyle(document.getElementById('editNamePlates')).getPropertyValue('width'));
        var c = editWidth - editNames;

        this.playScroller.style.left = p + 'px';
        if(parseFloat(this.playScroller.style.left) > c)
        {
            edit.scrollLeft = (parseFloat(this.playScroller.style.left) - c);
        }
     }
};
TrackCollection.prototype.stopAll = function(callback) {
    this.trackScroller.style.left = this.playScroller.style.left;
    if(this.tracks.length > 0) { this.trackScroller.className = 'visible'; }
    this.playScroller.className = 'hidden';
    this.clearBlinkScroller();
    this.blinkScroller();
    this.isPlaying = false;
    for (var i = 0; i < this.tracks.length; i++)
    {
        if(this.tracks[i].isPlaying && this.tracks[i].waveforms.length > 0)
        {
            this.tracks[i].stop();
            this.tracks[i].isPlaying = 0;
        }else
        {
            this.tracks[i].isPlaying = 0;
        }
    }

    if (callback) callback(this);
};
TrackCollection.prototype.trackSolo = function() {
    for (var i = 0; i < this.tracks.length; i++)
    {
        if (!this.tracks[i].soloStatus && !this.tracks[i].muteStatus) {
            if (this.soloedTracks) {
                this.tracks[i].mute(this.tracks[i].id,1);
            }
        }else if(this.tracks[i].soloStatus && this.tracks[i].muteStatus) {
            if($('#track' + this.tracks[i].id + 'EditMuteButton').hasClass('unmuted') && $('#track' + this.tracks[i].id + 'MixMuteButton').hasClass('unmuted')) {
                this.tracks[i].mute(this.tracks[i].id,1);
            }
        }
    }
    if(!this.soloedTracks) {
        for (var i = 0; i < this.tracks.length; i++)
        {
            if(this.tracks[i].muteStatus) {
                if(!($('#track' + this.tracks[i].id + 'EditMuteButton').hasClass('muted')) && !($('#track' + this.tracks[i].id + 'MixMuteButton').hasClass('muted'))) {
                    this.tracks[i].mute(this.tracks[i].id,1);
                }
            }
        }
    }
};
TrackCollection.prototype.unselectAllClips = function() {
    this.select = false;

    for(var i = 0; i < this.tracks.length; i++) {
        var track = this.tracks[i];

        for(var j = 0; j < track.waveforms.length; j++)
        {
            track.waveforms[j].clipSelect = false;
        }
    }
}
TrackCollection.prototype.unselectAllTracks = function() {
    for(var i = 0; i < this.tracks.length; i++) {
        this.unselectTrack(this.tracks[i].id);
    }
    this.select = false;
    this.selectionStart = 0;
    this.selectionEnd = 0;
    AudioEvents.fireEvent('removeGrabs');
    AudioEvents.fireEvent('removeSelects');
}
TrackCollection.prototype.unselectTrack = function(trackId, event) {
    var track = this.getTrackById(trackId);
    if(track != null)
    {
        for(var i = 0; i < track.waveforms.length; i++)
        {
            $('#track' + track.id + 'EditName').removeClass('selectedName');
            $('#track' + track.id + 'MixName').removeClass('selectedName');
            track.changeTrackColor(track.color, false);
        }
        track.selectedStatus = 0;
    }
    for(var i = 0; i < this.selectedTracks; i++)
    {
        if(this.selectedTracks[i] = trackId)
        {
            this.selectedTracks.splice(i, 1);
        }
    }
}
TrackCollection.prototype.update = function() {
    for(var i = 0; i < this.tracks.length; i++) {
        var track = this.tracks[i];
        if(track.status == 0) { delete this.tracks[i]; }
    }
    var cleanTracks = [];
    for(var j = 0; j < this.tracks.length; j++) {
        var cleanTrack = this.tracks[j];
        if(typeof cleanTrack !== 'undefined') { cleanTracks.push(cleanTrack); }
    }
    this.tracks = cleanTracks;
    if(this.tracks.length < 1)
    {
        this.clearBlinkScroller();
        $('#' + this.trackScroller.id).switchClass('visible', 'hidden', 0);
    }
};
TrackCollection.prototype.updateTrackEffects = function() {
    for (var i = 0; i < this.tracks.length; i++)
    {
        this.tracks[i].updateEffects();
    }
};

function DebugTrackCollection() { TrackCollection.apply(this); }
DebugTrackCollection.prototype = new TrackCollection();
DebugTrackCollection.prototype.addTrack = function(track) {
    //console.log('adding track (debug)');
    //console.log(track);
    TrackCollection.prototype.addTrack.apply(this, [track]);
};
DebugTrackCollection.prototype.dataSwitch = function(newTrackId, oldTrackId) {
    //console.log('dataSwitch (debug) - newTrackId: ' + newTrackId + ', oldTrackId: ' + oldTrackId);
    TrackCollection.prototype.dataSwitch.apply(this, [newTrackId, oldTrackId]);
};
DebugTrackCollection.prototype.getTrackById = function(trackId) {
    //console.log('getTrackById (debug) - id: ' + trackId);
    return TrackCollection.prototype.getTrackById.apply(this, [trackId]);
};
DebugTrackCollection.prototype.loadAll = function(callback) {
    //console.log('loadAll (debug)');
    TrackCollection.prototype.loadAll.apply(this, [callback]);
};
DebugTrackCollection.prototype.loadFromProject = function(projectId, fn) {
    //console.log('loadFromProject (debug) - id: ' + projectId);
    TrackCollection.prototype.loadFromProject.apply(this, [projectId, fn]);
};
DebugTrackCollection.prototype.modeFocus = function(modeId) {
    //console.log('modeFocus (debug) - mode: ' + modeId);
    TrackCollection.prototype.modeFocus.apply(this, [modeId]);
};
DebugTrackCollection.prototype.moveTrackScroller = function(trackId, event) {
    //console.log('moveTrackScroller (debug) - trackId: ' + trackId);
    TrackCollection.prototype.moveTrackScroller.apply(this, [trackId, event]);
};
DebugTrackCollection.prototype.playAll = function(callback) {
    //console.log('playAll (debug)');
    TrackCollection.prototype.playAll.apply(this, [callback]);
};
DebugTrackCollection.prototype.removeTrack = function(track, callback) {
    //console.log('removeTrack (debug)');
    //console.log(track);
    TrackCollection.prototype.removeTrack.apply(this, [track, callback]);
};
DebugTrackCollection.prototype.scrollAll = function(pixels) {
    ////console.log('scrollAll (debug) - pixels: ' + pixels);
    TrackCollection.prototype.scrollAll.apply(this, [pixels]);
};
DebugTrackCollection.prototype.stopAll = function(callback) {
    //console.log('stopAll (debug)');
    TrackCollection.prototype.stopAll.apply(this, [callback]);
};
DebugTrackCollection.prototype.trackSolo = function() {
    //console.log('trackSolo (debug)');
    TrackCollection.prototype.trackSolo.apply(this);
};
DebugTrackCollection.prototype.unselectAllTracks = function() {
    //console.log('unselectAllTracks (debug)');
    TrackCollection.prototype.unselectAllTracks.apply(this);
};
DebugTrackCollection.prototype.update = function() {
    //console.log('update (debug)');
    TrackCollection.prototype.update.apply(this);
};
DebugTrackCollection.prototype.updateTrackEffects = function() {
    //console.log('updateTrackEffects (debug)');
    TrackCollection.prototype.updateTrackEffects.apply(this);
};
