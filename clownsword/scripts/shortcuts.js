var nMode = false;

function key(e) {
    //enter/return
    if(e.keyCode === 13) {
        if($('#overlay').children().length > 0 || document.activeElement.id == 'bpm')
        {
            if(document.activeElement.id == 'bpm')
            {
                collection.tempo = parseFloat($('#bpm').val());
            }else {
                if($('#ok')) $('#ok').click();
                if($('#create')) $('#create').click();
            }
        }else
        {
            AudioEvents.fireEvent('stop');
            document.getElementById('edit').scrollLeft = 0;
            document.getElementById('playScroller').style.left = 0;
            document.getElementById('trackScroller').style.left = 0;
            collection.click = 0;
            collection.offset = 0;
            collection.unselectAllTracks();
        }
    }
    //spacebar
    if(e.keyCode === 32 && !overlayOpen) {
        e.stopPropagation();
        e.preventDefault();
        if(nMode == false) {
        	AudioEvents.fireEvent('play');
        }else {
        	AudioEvents.fireEvent('stop');
        }
    }
    //a
    if(e.keyCode === 65 && !overlayOpen)
    {
        if(e.altKey) {
            var channels = $('#mix > div').length;
            if(channels >= 1)
            {
                if(document.getElementById('mixWindow').getBoundingClientRect().width <= mixWindowReal)
                {
                    var mixChannel = document.querySelector('.mixChannel');
                    //extra margin of 4 if more then one mixChannel
                    var extra = channels > 1 ? 4 : 0;
                    $('#mixWindow').css('width', ((channels * mixChannel.getBoundingClientRect().width) + (mixWindowReal - mixChannel.getBoundingClientRect().width + extra)));
                    $('#trackEditWindow').css('width', (windowWidth - ( document.getElementById('fileWindow').getBoundingClientRect().width + document.getElementById('mixWindow').getBoundingClientRect().width )));
                }else
                {
                    $('#mixWindow').css('width', mixWindowReal);
                    $('#trackEditWindow').css('width', (windowWidth - ( document.getElementById('fileWindow').getBoundingClientRect().width + document.getElementById('mixWindow').getBoundingClientRect().width )));
                }
            }
        }
    }
    //b
    if(e.keyCode === 66)
    {
        console.log(e.keyCode && !overlayOpen);
    }
    //c
    if(e.keyCode === 67)
    {
        console.log(e.keyCode && !overlayOpen);
    }
    //d
    if(e.keyCode === 68 && !overlayOpen)
    {
        console.log('duplicate');
    }
    //e
    if(e.keyCode === 69 && !overlayOpen)
    {
        e.preventDefault();
        //var width = document.getElementById('trackScroller').style.left;
        //$('#track1Waveforms').clone().appendTo('#trackTimeline1');
        /*document.getElementById('track1Waveforms').style.width = width;
        document.getElementById('track1Waveforms').style.overflow = 'hidden';
        document.getElementById('track1WaveformBackground').style.width = width;*/
    }
    //f
    if(e.keyCode === 70 && !overlayOpen)
    {
        console.log(e.keyCode);
    }
    //g
    if(e.keyCode === 71 && !overlayOpen)
    {
        console.log(e.keyCode);
    }
    //h
    if(e.keyCode === 72 && !overlayOpen)
    {
        console.log(e.keyCode);
    }
    //i
    if(e.keyCode === 73 && !overlayOpen)
    {
        console.log(e.keyCode);
    }
    //j
    if(e.keyCode === 74 && !overlayOpen)
    {
        console.log(e.keyCode);
    }
    //k
    if(e.keyCode === 75 && !overlayOpen)
    {
        console.log(e.keyCode);
    }
    //l
    if(e.keyCode === 76 && !overlayOpen)
    {
        console.log(e.keyCode);
    }
    //m
    if(e.keyCode === 77 && !overlayOpen)
    {
        console.log(e.keyCode);
    }
    //n
    if(e.keyCode === 78 && !overlayOpen)
    {
        if(e.ctrlKey) {
            if(e.shiftKey) {
                addTrack();
            }
        }else {
            if(nMode == false) {
        		nMode = true;
        	}else {
        		nMode = false;
        	}
        }
    }
    //r
    if (e.keyCode === 82 && !overlayOpen)
    {
        if(e.ctrlKey)
        {
            e.preventDefault();
        }
    }else
    {
        if(e.ctrlKey)
        {
            e.preventDefault();
        }
    }
    //s
    if (e.keyCode === 83 && !overlayOpen)
    {
        e.preventDefault();
        if(e.altKey)
        {
            for(var i = 0; i < collection.selectedTracks.length; i++)
            {
                AudioEvents.fireEvent('soloTrack', [collection.selectedTracks[i]]);
            }
        }else if(e.ctrlKey && !disable)
        {
            AudioEvents.fireEvent('save');
        }

    }
    //t
    if(e.keyCode === 84 && !overlayOpen) {
        taps.push(Date.now());
        if(taps.length > 1) {
            calculate();
        }
    }
}

window.addEventListener("keydown", key, false);
