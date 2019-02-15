function Clipboard() {
    this.clips = [];
}
Clipboard.prototype.addClip = function(clip) {
    if(typeof clip === 'object')
    {
        this.clips.push(clip);
    }
}
Clipboard.prototype.getClipByPath = function(path) {
    for(var i = 0; i < this.clips.length; i++)
    {
        if(this.clips[i].path === path)
        {
            return this.clips[i];
        }
    }
}
Clipboard.prototype.loadFromProject = function(projectId, callback) {
    var self = this;
    callback = callback || function() {};
    $.get('scripts/load-project.php', { id: projectId }, function(data) {
        data = JSON.parse(data);
        if (!data.status || !data.hasOwnProperty('tracks'))
        {
            loadSave('Initializing SoundSword', 'No project data found.', 500);
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
                track.status = 1;

                loadSave('Initializing SoundSword', 'Loading project data...');

                var tmp = new Clip();
                tmp.init(track.path, track.title);
                self.addClip(tmp);
            }
        }
        callback(self);
    });
};
Clipboard.prototype.loadAll = function(callback) {
    var self = this;
    var currentClipLoaded = false;
    var loadAudioInterval;
    var loadAudioTimeout;

    var start = context.currentTime;

    function loadAudio(currentClipIndex, skipLoad) {
        clearInterval(loadAudioInterval);
        clearTimeout(loadAudioTimeout);

        if (currentClipIndex == self.clips.length)
        {
            var end = context.currentTime;
            console.log('All audio data loaded into memory.');
            console.log('Execution time: ' + (end - start) + 's');
            callback();

            return;
        }

        if (currentClipLoaded)
        {
            currentClipLoaded = false;
            loadAudioTimeout = setTimeout(function() { loadAudio(currentClipIndex, false); }, 100);
        }
        else if (!skipLoad)
        {
            var clip = self.clips[currentClipIndex];
            clip.load(function(c) {
                currentClipIndex++;
                currentClipLoaded = true;
                loadAudio(currentClipIndex, false);
            });
            if (currentClipIndex < self.clips.length)
            {
                loadAudioInterval = setInterval(function() { loadAudio(currentClipIndex, true); }, 100);
            }
        }
    }

    loadAudio(0, false);
};
