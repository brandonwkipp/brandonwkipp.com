var hidden, visibilityChange;
var marquee_index = 0;

if(typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support
    hidden = "hidden";
    visibilityChange = "visibilitychange";
} else if (typeof document.mozHidden !== "undefined") {
    hidden = "mozHidden";
    visibilityChange = "mozvisibilitychange";
} else if (typeof document.msHidden !== "undefined") {
    hidden = "msHidden";
    visibilityChange = "msvisibilitychange";
} else if (typeof document.webkitHidden !== "undefined") {
    hidden = "webkitHidden";
    visibilityChange = "webkitvisibilitychange";
}

function handleVisibilityChange() {
    if(document[hidden]) {
        clearTimeout(displayLoop);
        marquee(marquee_index, 1);
    }else {
        marquee_reset();
        updatePrices();
        w.terminate();
    }
}

// Warn if the browser doesn't support addEventListener or the Page Visibility API
if (typeof document.addEventListener === "undefined" || typeof document[hidden] === "undefined") {
    console.error("This app requires a browser, such as Google Chrome or Firefox, that supports the Page Visibility API.");
} else
{
    // Handle page visibility change
    document.addEventListener(visibilityChange, handleVisibilityChange, false);
}
