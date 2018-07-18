var first_tap, last_tap;

var Timeline = {
    countOff: null,
    countOffBars: 1,
    countOffStatus: false,
    edit: document.getElementById('edit'),
    loop: null,
    meter: null,
    meterArray: [4,4],
    results: [],
    taps: [],
    tapAvg: 0,
    tempo: null,
    calculate: function() {
        last_tap = this.taps[this.taps.length - 1];

        if(this.taps.length < 2) { first_tap = this.taps[0]; }
        else { first_tap = this.taps[this.taps.length - 2]; }

        this.results.push(last_tap - first_tap);
        if(this.results.length < 4) {
            this.tapAvg += this.results[this.results.length - 1];
            currentTempo = Math.floor(60000 / (this.tapAvg / this.results.length));
        }else {
            this.tapAvg = this.results[this.results.length - 1] + this.results[this.results.length - 2] + this.results[this.results.length - 3] + this.results[this.results.length - 4];
            currentTempo = Math.floor(60000 / (this.tapAvg / 4));
        }
        collection.tempo = currentTempo.toFixed(4);
        $('#bpm').val(collection.tempo);

        collection.updateTrackEffects();
    },
    clearScroll: function() {
        window.cancelAnimationFrame(this.loop);
    },
    countOff: function() {
        //fix in the future by specifying class instead of ID lookup
        if(!this.countOffStatus) {
            document.getElementById('countOff').style.background = 'rgb(157,226,35)';
            document.getElementById('countOff').style.border = '2px solid rgb(157,226,35)';
            document.getElementById('countOff').style.color = 'rgb(31,37,25)';
            this.countOffStatus = true;
        }else {
            document.getElementById('countOff').style.background = 'transparent';
            document.getElementById('countOff').style.border = '2px solid rgb(74,100,27)';
            document.getElementById('countOff').style.color = 'rgb(154,224,16)';
            this.countOffStatus = false;
        }
    },
    init: function() {
        var seconds = 0;
        var seconds_tens = 0;
        var min = 0;
        var barBeatsHTML = '<div id="barInfo" style="width:125px;"><div class="bar_numbers">Bars|Beats</div></div>';
        var minSecsHTML = '<div id="secsInfo" style="width:125px;"><div class="seconds_numbers">Min:Secs</div></div>';
        document.getElementById('barsBeats').innerHTML = barBeatsHTML;
        document.getElementById('minSecs').innerHTML = minSecsHTML;
        for(var i = 0; i < 120; i++) {
            document.getElementById('bars_timeline').innerHTML += '<div class="bar_block"><div class="bar_numbers">' + (i + 1) + '</div></div>';
            if(seconds > 8) {
                seconds = 0;
                seconds_tens++;
            }
            if(seconds_tens == 6) {
                seconds_tens = 0;
                min++;
            }
            document.getElementById('seconds_timeline').innerHTML += '<div class="seconds_block"><div class="seconds_numbers">' + min + ':' + seconds_tens + seconds + '</div></div>';
            seconds += 2;
            document.getElementById('measures_timeline').innerHTML+= '<div class="measure_parent"></div><div class="measure_child"></div><div class="measure_child"></div><div class="measure_child"></div>';
        }
        document.getElementById('meterValue').value = this.meterArray[0] + '/' + this.meterArray[1];

        return this;
    },
    scroll: function() {
        var number = edit.scrollTop;
        document.getElementById('timelines').style.marginTop = number + 'px';

        var number2 = edit.scrollLeft;
        document.getElementById('editNamePlates').style.marginLeft = number2 + 'px';

        this.loop = window.requestAnimationFrame(this.scroll.bind(this));
    },
    updateCountOff: function() {
        var grammar = (this.countOffBars == 1) ? ' bar' : ' bars';
        document.getElementById('countOffBars').value = this.countOffBars + grammar;
    }
}
