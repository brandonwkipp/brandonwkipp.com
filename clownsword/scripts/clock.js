var Clock = {
    context: null,
    callback: null,
    element: null,
    isPaused: 0,
    isRunning: 0,
    loop: null,
    minutes: 0,
    pausedMinutes: 0,
    pausedSeconds: 0,
    pixels: 0,
    seconds: 0,
    init: function(elementId, callback) {
        this.element = document.querySelector('#' + elementId);
        this.callback = callback;
        return this;
    },
    pause: function() {
        this.isRunning = 0;
        this.isPaused = 1;
        this.pausedSeconds = parseFloat(this.seconds);
        this.pausedMinutes = parseFloat(this.minutes);

        window.cancelAnimationFrame(this.loop);
    },
    reset: function() {
        this.isRunning = 0;
        this.isPaused = 0;
        this.minutes = 0;
        this.pausedSeconds = 0;
        this.pausedMinutes = 0;
        this.pixels = 0;
        this.seconds = 0;

        window.cancelAnimationFrame(this.loop);

        if(this.element != null) { this.element.innerHTML = '00:00.000'; }
    },
    run: function() {
        if(this.isPaused)
        {
            this.isPaused = 0;
            if(collection.scrollerMoved)
            {
                this.pausedSeconds = 0;
            }
        }
        this.pixels = context.currentTime - trackStartTime + (collection.scrollOffset/45) + this.pausedSeconds;
        this.seconds = this.pixels.toFixed(3);
        this.minutes = Math.floor(this.seconds / 60);

        if (this.seconds > 59) this.seconds = (this.seconds % 60).toFixed(3);
        if (this.seconds < 10) this.seconds = '0' + this.seconds;
        if (this.minutes < 10) this.minutes = '0' + this.minutes;
        if (this.element != null) this.element.innerHTML = this.minutes + ':' + this.seconds;
        if (this.callback) { this.callback(this.pixels); }

        this.loop = window.requestAnimationFrame(this.run.bind(this));
    },
    selectionReset: function() {
        window.cancelAnimationFrame(this.loop);

        this.isRunning = 0;
        this.isPaused = 0;
        this.pixels = collection.selectionStart/45;

        this.seconds = (collection.selectionStart/45).toFixed(3);
        this.minutes = Math.floor(this.seconds/60);

        if (this.seconds > 59) this.seconds = (this.seconds % 60).toFixed(3);
        if (this.seconds < 10) this.seconds = '0' + this.seconds;
        if (this.minutes < 10) this.minutes = '0' + this.minutes;

        if (this.element != null) this.element.innerHTML = this.minutes + ':' + this.seconds;
    },
    start: function() {
        this.isRunning = 1;
        window.requestAnimationFrame(this.run.bind(this));
    },
    updateTime: function() {
        this.seconds = (parseFloat(collection.trackScroller.style.left)/45).toFixed(3);
        this.minutes = Math.floor(this.seconds/60);

        if (this.seconds > 59) this.seconds = (this.seconds % 60).toFixed(3);
        if (this.seconds < 10) this.seconds = '0' + this.seconds;
        if (this.minutes < 10) this.minutes = '0' + this.minutes;

        if (this.element != null) this.element.innerHTML = this.minutes + ':' + this.seconds;
    }
};
