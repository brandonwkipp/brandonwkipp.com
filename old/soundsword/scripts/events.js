var Events = {
    eventMap: [],
    init: function() {
        this.eventMap = [];
        return this;
    },
    addEvent: function(eventName, fn) {
        var tempEvent = {};
        tempEvent[eventName] = fn;

        this.eventMap.push(tempEvent);

        return this;
    },
    fireEvent: function(eventName, eventParameters) {
        for (var event in this.eventMap)
        {
            var eventKey = Object.keys(this.eventMap[event]);
            var eventFn = this.eventMap[event][eventKey];
            if(eventKey == eventName && typeof eventFn === 'function')
            {
                eventFn.apply(eventFn, eventParameters);
                return;
            }
        }

        console.log('WARNING: event "' + eventName + '" has not been added!');
    }
};

var AudioEvents = Object.create(Events).init();


AudioEvents.addEvent('backward', function() {
    if(!collection.isPlaying)
    {

    }
});
AudioEvents.addEvent('forward', function() {
    if(!collection.isPlaying)
    {

    }
});
AudioEvents.addEvent('play', function() {
    if(!collection.isPlaying)
    {
        document.getElementById('play').src = 'images/transport/pause.png';

        trackStartTime = context.currentTime;
        collection.playAll(function() {
            clock.start();
            timeline.scroll();
        });
    }
    else
    {
        document.getElementById('play').src = 'images/transport/play.png';

        trackCurrentTime += context.currentTime - trackStartTime;
        collection.stopAll(function() {
            clock.pause();
            timeline.clearScroll();
        });
        collection.scrollerMoved = 0;
        if(collection.select)
        {
            collection.scrollOffset = 0;
        }
    }
});
AudioEvents.addEvent('save', function() {
    if(projectId == null || projectId == undefined || projectId.trim() == '') return;

    loadSave('SoundSword', 'Saving project...');
    $.post('scripts/save-project.php', {
        id: projectId,
        data: {
            trackData: JSON.stringify(collection.tracks),
            tempo: currentTempo,
            waveformCache: JSON.stringify(collection.waveformCache)
        }
    }, function(data) {
        loadSave('SoundSword', 'Project saved!', 1500);
        console.log(data);
    });
});
AudioEvents.addEvent('selectionReset', function() {
    collection.stopAll(function() {
        clock.selectionReset();
    });
    collection.playScroller.style.left = collection.selectionStart + 'px';
    collection.trackScroller.style.left = collection.selectionStart + 'px';

    erasePauseButton();
    drawPlayButton();
});
AudioEvents.addEvent('stop', function() {
    collection.stopAll();
    clock.reset();
    timeline.clearScroll();
    trackStartTime = 0;
    trackCurrentTime = 0;

    AudioEvents.fireEvent('removeSelects')

    document.getElementById('play').src = 'images/transport/play.png';
});

AudioEvents.addEvent('addClipToFileWindow', function(clip_path, clip_title) {
    if($('#noTracks'))
    {
        $('#noTracks').remove();
    }
    document.getElementById('file').innerHTML += '<div class="trackListContainer"><span class="trackListAdd" onclick="AudioEvents.fireEvent(\'createNewTrackFromClip\', [\'' + clip_path + '\'])"><a href="#" class="noSelect">+</a></span><span class="trackListName" draggable="true">' + clip_title + '</span></div>';
});
AudioEvents.addEvent('addNewClip', function(clipPath) {
    var clip = clipList.getClipByPath(clipPath);
    if(clip != null)
    {
        var copy = jQuery.extend({}, clip);
        clipList.addClip(clip);
        AudioEvents.fireEvent('addTrack', [copy]);
    }
});
AudioEvents.addEvent('createNewTrackFromClip', function(clipPath) {
    var clip = clipList.getClipByPath(clipPath);
    if(clip != null)
    {
        clipList.addClip(clip)

        var track = (isDebugEnabled ? new DebugAudioTrack() : new AudioTrack());
        track.initFromClip(clip);
        track.id = (collection.tracks.length + 1);

        AudioEvents.fireEvent('addMixTrackComponent', [track]);
        AudioEvents.fireEvent('addEditTrackComponent', [track]);
        AudioEvents.fireEvent('resizeMeters', [track]);
    }
});
AudioEvents.addEvent('newTrack', function(amount, channelCount, type) {
    AudioEvents.fireEvent('closeOverlay', ['addition']);
    var channels = channelCount == 'mono' ? 1 : 2;
    for(var i = 0; i < amount;)
    {
        i++;
        var t = collection.tracks.length + i;
        if(type == 'audio')
        {
            var tmp = (isDebugEnabled ? new DebugAudioTrack() : new AudioTrack());
            tmp.initEmpty(t, channels);

            var copy = jQuery.extend({}, tmp);
            copy.id = (collection.tracks.length + 1);
            collection.addTrack(copy);
            AudioEvents.fireEvent('addMixTrackComponent', [tmp]);
            AudioEvents.fireEvent('addEditTrackComponent', [tmp]);
        }
    }
});
AudioEvents.addEvent('addEditTrackComponent', function(track) {
    generateEditTrackComponent(track);
});
AudioEvents.addEvent('addMixTrackComponent', function(track) {
    generateMixTrackComponent(track);
});
AudioEvents.addEvent('allowDrop', function(event) {
    event.preventDefault();
});
AudioEvents.addEvent('changeTrackColor', function(color, trackId, event) {
    var track = collection.getTrackById(trackId);
    if(track != null)
    {
        for(var i = 0; i < collection.selectedTracks.length; i++)
        {
            track.changeTrackColor(color);
        }
    }
});
AudioEvents.addEvent('drag', function(trackId, event, clip) {
    /*var crt = this.cloneNode(true);
    crt.style.backgroundColor = "red";
    crt.style.display = "none";
    document.body.appendChild(crt);
    e.dataTransfer.setDragImage(crt, 0, 0);*/
    var track = collection.getTrackById(trackId);
    switch(collection.tool)
    {
        case 'trimmer':
            collection.dragStart = event.pageX - $(event.target).offset().left + $(event.target).position().left;
        break;
        case 'selector':
            collection.dragStart = event.pageX - $(event.target).offset().left + $(event.target).position().left;
            switch(collection.mode)
            {
                case 'grid':
                    var modulus = collection.dragStart % 22.5;
                    collection.dragStart -= modulus;
                    if (modulus >= 11.25) collection.dragStart += 22.5;
                break;
            }
            var div = '<div class="selection" style="width:1px;left:' + collection.dragStart + 'px;"></div>';
            $('#toolDivs').append(div);
        break;
        case 'grabber':
            var start = event.pageX - $(event.target).offset().left + $(event.target).position().left;
            if(track != null && track.selectedStatus)
            {
                var array = ['track' + trackId + 'Clip' + clip, trackId, clip, start];
                var data = JSON.stringify(array);
                event.dataTransfer.setData("Text", data);
            }
        break;
        default:
        break;
    }
});
AudioEvents.addEvent('dragging', function(trackId, event, clip) {
    event.preventDefault();
    var track = collection.getTrackById(trackId);
    switch(collection.tool)
    {
        case 'trimmer':
            var trims = document.querySelectorAll('.trimSelection');
            var left = event.pageX - $(event.target).offset().left + $(event.target).position().left;

            for(var i = 0; i < trims.length; i++)
            {
                trims[i].style.left = left + 'px';
                trims[i].style.width = (track.waveforms[clip].positionEnd - left) + 'px';
            }
        break;
        case 'selector':
            var selects = document.querySelectorAll('.selection');
            var width = event.pageX - $(event.target).offset().left + $(event.target).position().left - collection.dragStart;
            switch(collection.mode)
            {
                case 'grid':
                    var modulus = width % 22.5;
                    width -= modulus;
                    if (modulus > 0) width += 22.5;
                break;
            }
            for(var i = 0; i < selects.length; i++)
            {
                if(width >= 0)
                {
                    selects[i].style.width = width + 'px';
                }else
                {
                    var newLeft = event.pageX - $(event.target).offset().left;
                    switch(collection.mode)
                    {
                        case 'grid':
                            var modulus = newLeft % 22.5;
                            newLeft -= modulus;
                            if (modulus > 11.25) newLeft += 22.5;
                        break;
                    }
                    selects[i].style.left = newLeft + 'px';
                    selects[i].style.width = (collection.dragStart - newLeft) + 'px';
                    AudioEvents.fireEvent('moveScroller', [trackId, event])
                }

            }
        break;
        case 'grabber':
            var limit = false;
            var grabs = document.querySelectorAll('.grabSelection');
            var newPosition = (event.pageX - $(event.target.parentElement.parentElement).offset().left) - collection.dragStart;

            //FF error newPosition is always -313
            console.log(newPosition);

            for(var i = 0; i < grabs.length; i++)
            {
                if(newPosition <= 0)
                {
                    limit = true;
                }
                if(!limit)
                {
                    grabs[i].style.left = newPosition + 'px';
                }else {
                    grabs[i].style.left = 0 + 'px';
                }
            }
        break;
        default:
        break;
    }
});
AudioEvents.addEvent('drop', function(trackId, event) {
    var track = collection.getTrackById(trackId);
    event.preventDefault();

    switch(collection.tool)
    {
        case 'trimmer':
            var newLeft = event.pageX - $(event.target).offset().left + $(event.target).position().left;
            var trims = document.querySelector('.trimSelection');

            for(var i = 0; i < track.waveforms.length; i++)
            {
                document.getElementById('track' + track.id + 'Clip' + i).style.left = newLeft + 'px';
                document.getElementById('track' + track.id + 'Clip' + i).style.width = trims.style.width;

                document.getElementById('track' + track.id + 'Clip' + i + 'Background').style.left = (track.waveforms[i].offset - newLeft) + 'px';
                document.getElementById('track' + track.id + 'Clip' + i + 'Waveforms').style.left = (track.waveforms[i].offset - newLeft) + 'px';

                track.waveforms[i].positionStart = newLeft;
                track.waveforms[i].clipStart = (track.waveforms[i].positionStart - track.waveforms[i].offset)/45;
            }
            AudioEvents.fireEvent('removeTrims');
        break;
        case 'selector':
            collection.select = true;
            collection.selectionStart = parseFloat(collection.trackScroller.style.left);
            collection.selectionEnd = (parseFloat(document.querySelector('.selection').style.width) + parseFloat(collection.trackScroller.style.left));
        break;
        case 'grabber':
            var end = event.pageX - $(event.target).offset().left + $(event.target).position().left;
            var data = JSON.parse(event.dataTransfer.getData("Text"));
            if(trackId != data[1])
            {
                /*document.getElementById('track' + trackId + 'Clips').appendChild(document.getElementById(data[0]));
                document.getElementById(data[0]).setAttribute('id', 'track' + trackId + 'Clip' + track.waveforms.length + 'Waveforms');
                document.getElementById(data[1]).setAttribute('id', 'track' + trackId + 'Clip' + track.waveforms.length + 'Background');
                document.getElementById('track' + data[2] + 'Clip' + data[3] + 'WaveformL').setAttribute('id', 'track' + trackId + 'Clip' + track.waveforms.length + 'WaveformL');
                document.getElementById('track' + data[2] + 'Clip' + data[3] + 'WaveformR').setAttribute('id', 'track' + trackId + 'Clip' + track.waveforms.length + 'WaveformR');
                document.getElementById('track' + data[2] + 'Clip' + data[3] + 'WaveformLInverted').setAttribute('id', 'track' + trackId + 'Clip' + track.waveforms.length + 'WaveformLInverted');
                document.getElementById('track' + data[2] + 'Clip' + data[3] + 'WaveformRInverted').setAttribute('id', 'track' + trackId + 'Clip' + track.waveforms.length + 'WaveformRInverted');
                //collection.dataSwitch(trackId, data[2]);*/
            }
            if(end != data[3])
            {
                //right
                if(end > data[3])
                {
                    document.getElementById(data[0]).style.left = (end - data[3]) + track.waveforms[data[2]].positionStart + 'px';
                    track.waveforms[data[2]].offset = end - data[3];
                    track.waveforms[data[2]].positionStart = parseFloat(document.getElementById(data[0]).style.left);
                //left
                }else if(end < data[3])
                {
                    var newPosition = track.waveforms[data[2]].positionStart - (data[3] - end);
                    if(newPosition <= 0)
                    {
                        document.getElementById('track' + trackId + 'Clip' + data[2]).style.left = 0 + 'px';
                        track.waveforms[data[2]].offset = 0;
                        track.waveforms[data[2]].positionStart = 0;
                    }else
                    {
                        document.getElementById('track' + trackId + 'Clip' + data[2]).style.left = newPosition + 'px';
                        track.waveforms[data[2]].offset -= data[3] - end;
                        track.waveforms[data[2]].positionStart -= data[3] - end;
                    }
                }
            }
        break;
        default:
        break;

        AudioEvents.fireEvent('removeGrabs');
    }
});
AudioEvents.addEvent('mode', function(modeButton) {
    collection.modeFocus(modeButton);
});
AudioEvents.addEvent('moveScroller', function(trackId, event) {
    collection.moveTrackScroller(trackId, event);
});
AudioEvents.addEvent('muteTrack', function(trackId) {
    var track = collection.getTrackById(trackId);
    if (track != null)
    {
        track.mute();
    }
});
AudioEvents.addEvent('removeGrabs', function() {
    var grabs = document.querySelectorAll('.grabSelection');
    for(var i = 0; i < grabs.length; i++)
    {
        grabs[i].remove();
    }
});
AudioEvents.addEvent('removeSelects', function() {
    var selects = document.querySelectorAll('.selection');
    for(var i = 0; i < selects.length; i++)
    {
        selects[i].remove();
    }
    collection.unselectAllClips();
});
AudioEvents.addEvent('removeTrims', function() {
    var trims = document.querySelectorAll('.trimSelection');
    for(var i = 0; i < trims.length; i++)
    {
        trims[i].remove();
    }
});
AudioEvents.addEvent('renameTrack', function(trackId) {
    var track = collection.getTrackById(trackId);
    if (track != null) {
        track.rename();
    }
});
AudioEvents.addEvent('resizeMeters', function(track) {
    var track = track;
    var canvasL = document.getElementById('track' + track.id + 'LevelsCanvasL');
    var canvasR = document.getElementById('track' + track.id + 'LevelsCanvasR');

    if(collection.meterHeight == null && collection.meterWidth == null)
    {
        collection.meterWidth = parseFloat(window.getComputedStyle(canvasL).getPropertyValue('width'));
        collection.meterHeight = parseFloat(window.getComputedStyle(canvasL).getPropertyValue('height'));
    }

    var ctxL = canvasL.getContext('2d');
    ctxL.canvas.width = collection.meterWidth;
    ctxL.canvas.height = collection.meterHeight;
    var ctxR = canvasR.getContext('2d');
    ctxR.canvas.width = collection.meterWidth;
    ctxR.canvas.height = collection.meterHeight;
});
AudioEvents.addEvent('selectClip', function(trackId, event, clip) {
    var track = collection.getTrackById(trackId);
    if(track != null)
    {
        track.waveforms[clip].clipSelect = true;
        track.highlightClip();
    }
});
AudioEvents.addEvent('selectTrack', function(trackId, event, clip) {
    //unselect
    if(event.altKey)
    {
        AudioEvents.fireEvent('unselectTrack', [trackId, event, clip]);
    }else
    {
        AudioEvents.fireEvent('removeSelects');
        AudioEvents.fireEvent('removeTrims');

        switch(event.detail)
        {
            case 1:
                var track = collection.getTrackById(trackId);
                if(track != null)
                {
                    if(!track.selectedStatus)
                    {
                        $('#track' + trackId + 'EditName').addClass('selectedName');
                        $('#track' + trackId + 'MixName').addClass('selectedName');
                        collection.selectedTracks.push(trackId);
                        track.selectedStatus = 1;
                    }
                    switch(collection.tool)
                    {
                        case 'trimmer':
                            if(!$(event.target).hasClass('trackMeasures'))
                            {
                                //width is minus div-border + border of waveform
                                var div = '<div class="trimSelection" style="width:' + (parseFloat(document.getElementById('track' + trackId + 'Clip' + clip).style.width) - 4) + 'px;left:' + document.getElementById('track' + trackId + 'Clip' + clip).style.left  + ';"></div>';
                                $('#toolDivs').append(div);
                            }
                        break;
                        case 'selector':
                        break;
                        case 'grabber':
                            if(!$(event.target).hasClass('trackMeasures'))
                            {
                                collection.dragStart = event.pageX - $(event.target).offset().left;
                                //width is minus div-border + border of waveform
                                var div = '<div class="grabSelection" style="width:' + (track.waveforms[clip].waveformLength - 4) + 'px;left:' + track.waveforms[clip].positionStart + 'px;"></div>';
                                $('#toolDivs').append(div);
                            }
                        break;
                        default:
                        break;
                    }
                }
            break;
            case 2:
                AudioEvents.fireEvent('renameTrack', [trackId])
            break;
            default:
            break;
        }
        if(event.type == 'contextmenu')
        {
            var track = collection.getTrackById(trackId);
            if(track != null)
            {
                if(!track.selectedStatus)
                {
                    $('#track' + trackId + 'EditName').addClass('selectedName');
                    $('#track' + trackId + 'MixName').addClass('selectedName');
                    collection.selectedTracks.push(trackId);
                    track.selectedStatus = 1;
                }
            }
        }
    }
});
AudioEvents.addEvent('soloTrack', function(trackId) {
    var track = collection.getTrackById(trackId);
    if (track != null)
    {
        track.solo();
    }
});
AudioEvents.addEvent('toolCheck', function(trackId, event, clip) {
    switch(event.detail)
    {
        case 1:
            switch(collection.tool)
            {
                case 'trimmer':
                    //AudioEvents.fireEvent('moveScroller', [trackId, event]);
                    AudioEvents.fireEvent('selectTrack', [trackId, event, clip]);
                break;
                case 'selector':
                    AudioEvents.fireEvent('moveScroller', [trackId, event]);
                    AudioEvents.fireEvent('selectTrack', [trackId, event, clip]);
                break;
                case 'grabber':
                    AudioEvents.fireEvent('selectTrack', [trackId, event, clip]);
                    AudioEvents.fireEvent('selectClip', [trackId, event, clip]);
                break;
                default:
                break;
            }
        break;
        case 2:
            switch(collection.tool)
            {
                case 'trimmer':

                break;
                case 'selector':
                    AudioEvents.fireEvent('selectTrack', [trackId, event, clip]);
                    AudioEvents.fireEvent('selectClip', [trackId, event, clip])
                break;
                case 'grabber':
                break;
                default:
                break;
            }
        break;
        case 3:
            switch(collection.tool)
            {
                case 'trimmer':

                break;
                case 'selector':
                    collection.unselectTrack(trackId);
                    AudioEvents.fireEvent('unselectTrack', [trackId, event, clip]);
                break;
                case 'grabber':
                break;
                default:
                break;
            }
        break;
        default:
        break;
    }
});
AudioEvents.addEvent('unselectTrack', function(trackId, event, clip) {
    var track = collection.getTrackById(trackId);
    if(track != null)
    {
        $('#track' + trackId + 'EditName').removeClass('selectedName');
        $('#track' + trackId + 'MixName').removeClass('selectedName');

        track.selectedStatus = 0;

        if(clip == null)
        {
            collection.unselectTrack(trackId);
        }else {
            $('#track' + trackId + 'Clip' + clip + 'Background').css('background', palette[track.color].background);
            $('#track' + trackId + 'Clip' + clip + 'WaveformL').switchClass('bottomWaveform','topWaveform', 0);
            $('#track' + trackId + 'Clip' + clip + 'WaveformR').switchClass('bottomWaveform','topWaveform', 0);
        }
    }
});
AudioEvents.addEvent('volumeChange', function(trackId, val) {
    var track = collection.getTrackById(trackId);
    if (track != null) {
        track.updateVolume(val);
    }
});

AudioEvents.addEvent('bypassPlugin', function(location, event) {
    if($('#bypass' + location).hasClass('bypassEngaged'))
    {
        $('#bypass' + location).removeClass('bypassEngaged');
    }else {
        $('#bypass' + location).addClass('bypassEngaged');
    }
});
AudioEvents.addEvent('closeOverlay', function(overlay) {
    $('#' + overlay).remove();
    var background = document.getElementById('loadSaveBackground');
    if (background != null) {
        background.remove();
    }
    overlayOpen = false;

});
AudioEvents.addEvent('contextMenu', function(key, trackId, event) {
    AudioEvents.fireEvent('closeOverlay', ['context']);
    switch(key)
    {
        case 'delete':
            AudioEvents.fireEvent('removeTrack', [trackId])
        break;
        default:
        break;
    }
});
AudioEvents.addEvent('createTrack', function() {
    createNewTrack();
});
AudioEvents.addEvent('importAudio', function() {
    AudioEvents.fireEvent('closeOverlay', ['addition']);
    importAudioMenu();
});
AudioEvents.addEvent('trackContext', function(trackId, event) {
    event.preventDefault();
    var contextHTML;

    AudioEvents.fireEvent('selectTrack', [trackId, event]);
    if(event.target.className != 'plugin')
    {
        contextHTML = '<div id="context" class="context mix-context" style="left:' + (event.clientX - 50) + 'px; top:' + event.clientY + 'px;">';
        contextHTML += '<li class="context-element"><span class="context-list disabled-text">Copy</span></li>';
        contextHTML += '<li class="context-element"><span class="context-list disabled-text">Paste</span></li>';
        contextHTML += '<li class="context-element"><span class="context-list disabled-text">Duplicate Track</span></li>';
        contextHTML += '<li class="context-element" onclick="AudioEvents.fireEvent(\'contextMenu\', [\'rename\', ' + trackId + ', event])"><span class="context-list">Rename Track</span></li>';
        contextHTML += '<li class="context-element" onclick="AudioEvents.fireEvent(\'contextMenu\', [\'delete\', ' + trackId + ', event])"><span class="context-list">Delete Track</span></li>';
        contextHTML += '<li class="context-element" onclick="colorMenu(' + trackId + ')"><span class="context-list">Change Track Color</span></li></div>';

        document.getElementById('overlay').innerHTML = contextHTML;
    }
});
AudioEvents.addEvent('removeTrack', function(trackId) {
    var track = collection.getTrackById(trackId);
    if(track != null)
    {
        collection.removeTrack(track, function() {
            $('#editTrack' + trackId + 'NamePlate').remove();
            $('#mixChannel' + trackId).remove();
            $('#trackTimeline' + trackId).remove();
        });
    }
});
AudioEvents.addEvent('showPluginMenu', function(elm, trackId) {
    var coor = $(elm).offset();
    var x = coor.left;
    var y = coor.top;
    recallMenu(elm.id, x, y);
});
AudioEvents.addEvent('showPluginWindow', function(event, trackId) {
    $('#plugin_' + trackId.id).show();
    event.stopPropagation();
});

AudioEvents.addEvent('countOff', function() {
    timeline.countOff();
});
