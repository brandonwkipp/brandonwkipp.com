function init() {
    drawTrimmer();
    drawSelector();
    drawGrabber();
    //drawLogo();
    resizeCanvasButtons();
    collection.playScroller = document.getElementById('playScroller');
    collection.trackScroller = document.getElementById('trackScroller');
}

var applebees = window.getComputedStyle(document.body).getPropertyValue('height');

var fileWindow = document.getElementById('file');
var fileWidth = parseFloat(window.getComputedStyle(fileWindow).getPropertyValue('width'));
var fileHeight = parseFloat(window.getComputedStyle(fileWindow).getPropertyValue('height'));
var trackEditWindow = document.getElementById('edit');
var trackEditWidth = parseFloat(window.getComputedStyle(trackEditWindow).getPropertyValue('width'));
var trackEditHeight = parseFloat(window.getComputedStyle(trackEditWindow).getPropertyValue('height'));
var mixWindow = document.getElementById('mix');
var mixWidth = parseFloat(window.getComputedStyle(mixWindow).getPropertyValue('width'));
var mixHeight = parseFloat(window.getComputedStyle(mixWindow).getPropertyValue('height'));
var mixWindowReal = document.getElementById('mixWindow');
var mixWindowReal = mixWindowReal.getBoundingClientRect().width;
var windowWidth = parseFloat(window.getComputedStyle(document.body).getPropertyValue('width'));

$('#fileWindow').resizable({
    handles:'e',
    maxWidth: (fileWidth + 50),
    minWidth: fileWidth,
    maxHeight: fileHeight,
    minHeight: fileHeight
});
$('#trackEditWindow').resizable({
    handles:'e',
    maxWidth: trackEditWidth,
    maxHeight: trackEditHeight,
    minHeight: trackEditHeight
});
$('#mixWindow').css('min-width', document.getElementById('mixWindow').getBoundingClientRect().width);

$('#fileWindow').resize(function() {
    $('#trackEditWindow').css('width', (windowWidth - ( document.getElementById('fileWindow').getBoundingClientRect().width + document.getElementById('mixWindow').getBoundingClientRect().width )));
    $("#trackEditWindow").resizable("option","maxWidth", (windowWidth - (document.getElementById('fileWindow').getBoundingClientRect().width + mixWindowReal)));
});
$('#trackEditWindow').resize(function() {
    $('#mixWindow').css('width', (windowWidth - (document.getElementById('fileWindow').getBoundingClientRect().width + document.getElementById('trackEditWindow').getBoundingClientRect().width) ));
});

var handles = document.querySelectorAll('.ui-resizable-handle');
for(var i = 0; i < handles.length; i++) {
    handles[i].addEventListener('click', function(e) {
        if(e.altKey) {
            var i = e.target.parentNode.id;
            if(i == 'editWindow') {
                document.getElementById('mix').className = 'scrollbar';
                $('#mixWindow').css('width', mixWidth);
                $('#trackEditWindow').css('width', (windowWidth - ( $('#mixWindow').width() + $('#fileWindow').width() )));
            }
            if(i == 'fileWindow') {
                $('#fileWindow').css('width', fileWidth);
                $('#trackEditWindow').css('width', (windowWidth - ( $('#mixWindow').width() + $('#fileWindow').width() )));
            }
        }
    },false);
}

for(var i = 0; i < document.styleSheets[0].cssRules.length; i++)
{
    if(document.styleSheets[0].cssRules[i].selectorText === '.mixChannel')
    {
        document.styleSheets[0].insertRule('.mixChannel { width: ' + (mixWidth - 8) + 'px }', i);
        break;
    }

}
