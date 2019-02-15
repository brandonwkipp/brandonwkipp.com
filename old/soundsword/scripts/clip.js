var clipCache = {};

function Clip() {
    this.data = null;
    this.isLoaded = 0;
    this.path = null;
    this.title = null;
}
Clip.prototype.init = function(path, title) {
    this.path = path;
    this.title = title;
}
Clip.prototype.load = function(fn) {
    if(this.isLoaded || this.path == null)
    {
        if (fn) fn(this);
        return;
    }
    var self = this;

    function populatePropertiesFromArrayBuffer(data)
    {
        self.data = data;
        self.isLoaded = 1;
        self.waveformLength = self.data.duration / 2 * 90;
    }
    if(clipCache.hasOwnProperty(self.path))
    {
        var cachedTrack = clipCache[self.path];
        if(cachedTrack.hasOwnProperty('data'))
        {
            populatePropertiesFromArrayBuffer(cachedTrack.data);
        }

        if (fn) fn(self);
    }
    else
    {
        loadSave('Initializing SoundSword', 'Loading audio for ' + this.title + '...');
        var xhr = new XMLHttpRequest();
        xhr.open('GET', currentProjectPath + '/' + this.path, true);
        xhr.responseType = 'arraybuffer';
        xhr.onload = function() {
            if (xhr.status == 200) {
                context.decodeAudioData(xhr.response, function onSuccess(data) {
                    self.data = data;
                    self.isLoaded = 1;
                    self.waveformLength = self.data.duration / 2 * 90;

                    if (fn) fn(self);
                }, function onFailure() {
                    console.log('context.decodeAudioData failed for ' + self.path);
                });
            }
            else
            {
                if (fn) fn(self);
            }
        };
        xhr.send();
    }
}
