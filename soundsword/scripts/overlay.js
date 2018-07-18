var overlayOpen = false;
function aboutMenu()
{
    overlayOpen = true;
    document.getElementById('overlay').innerHTML = '<div id="about"><div class="menuHeader"><span class="menuTitle noSelect">About</span><canvas id="aboutClose" class="close-button" width="17px" height="17px" onclick="AudioEvents.fireEvent(\'closeOverlay\', [\'about\'])"></canvas></div><div id="aboutText">SoundSword is an ever-evolving web app meant to edit/playback audio. This current version is the Minimum Viable Product of this project and is meant to serve as a prototype. The design and feel of the user interface is modeled after Avid\'s (a well known media software company) ProTools interface. HTML5 and the Web Audio API are the primary technologies upon which this product is built. The Web Audio API is defined as "a high-level JavaScript API for processing and synthesizing audio in web applications." It allows programmers to access a computer\'s soundcard directly and base all time and rhythm operations on that clock as opposed to the system clock; that means that the API can respond to user input in a much quicker manner and allows for an overall better experience.</div></div>';
    drawCloseButton('aboutClose');
    $('#about').animate({marginTop:200}, 700);
}
function addTrackButton()
{
    overlayOpen = true;
    document.getElementById('overlay').innerHTML = '<div id="addition"><div class="menuHeader"><span class="menuTitle noSelect">Add Track</span><canvas id="additionClose" class="close-button" width="17px" height="17px" onclick="AudioEvents.fireEvent(\'closeOverlay\', [\'addition\'])"></canvas></div><div id="innerAddition"><div id="create" class="createTrack additionalButtons noSelect" onclick="AudioEvents.fireEvent(\'createTrack\')">Create Track</div>&nbsp;<div class="import additionalButtons noSelect" onclick="AudioEvents.fireEvent(\'importAudio\')">Import File</div></div></div>';
    drawCloseButton('additionClose');
}
function addTrackRow()
{
    document.getElementById('trackRows').innerHTML += '<div class="newTrackRow">Create &nbsp; <input class="additionalTracks" type="number" min="0" value="1"></input> &nbsp; new &nbsp; <select><option value="mono">Mono</option><option value="stereo">Stereo</option></select> &nbsp; <select><option value="audio">Audio Track</option><option value="aux">Aux Track</option><option value="master">Master Fader</option></select> &nbsp; in &nbsp; <select><option value="samples">Samples</option></select> &nbsp; <button class="addRow" onclick="addTrackRow()">+</button></div>';
    $('#addition').css('height', ($('#addition').height() + 35));
    drawCloseButton('trackClose');
}
function createNewTrack()
{
    overlayOpen = true;
    document.getElementById('overlay').innerHTML = '<div id="addition"><div class="menuHeader"><span class="menuTitle">New Tracks</span><canvas id="trackClose" class="close-button" width="17px" height="17px" onclick="AudioEvents.fireEvent(\'closeOverlay\', [\'addition\'])"></canvas></div><div id="trackRows"><div class="newTrackRow">Create &nbsp; <input id="trackCount" class="additionalTracks" type="number" min="0" value="1"></input> &nbsp; new &nbsp; <select id="channelCount"><option value="mono">Mono</option><option value="stereo">Stereo</option></select> &nbsp; <select id="trackType"><option value="audio">Audio Track</option><option value="aux">Aux Track</option><option value="master">Master Fader</option></select> &nbsp; in &nbsp; <select><option value="samples">Samples</option></select> &nbsp; <button class="addRow" onclick="addTrackRow()">+</button></div></div><div id="addButtons"><button class="previous">Previous</button><button class="cancel" onclick="AudioEvents.fireEvent(\'closeOverlay\', [\'addition\'])">Cancel</button><button class="create" onclick="AudioEvents.fireEvent(\'newTrack\', [$(\'#trackCount\').val(), $(\'#channelCount\').val(),$(\'#trackType\').val()])">Create</button></div></div>';
    drawCloseButton('trackClose');
}
function colorMenu(trackId) {
    overlayOpen = true;

    collection.selectedTracks.push(trackId);
    var track = collection.getTrackById(trackId);
    if(track != null)
    {
        track.selectedStatus = 1;
        $('#track' + trackId + 'EditName').addClass('selectedName');
        $('#track' + trackId + 'MixName').addClass('selectedName');
    }

    var colorHTML = '<div id="colorMenu"><div class="menuHeader"><span class="menuTitle">Color Palette</span>';
    colorHTML += '<canvas id="colorClose" class="close-button" width="17px" height="17px" onclick="AudioEvents.fireEvent(\'closeOverlay\', [\'colorMenu\'])">';
    colorHTML += '</canvas></div><div class="palette"><div class="color-row">';
    colorHTML += '<div class="color-box" style="background:' + palette.blue.foreground + '" onclick="AudioEvents.fireEvent(\'changeTrackColor\', [\'blue\', ' + trackId + ', event])""></div>';
    colorHTML += '<div class="color-box" style="background:' + palette.green.foreground + '" onclick="AudioEvents.fireEvent(\'changeTrackColor\', [\'green\', ' + trackId + ', event])"></div>';
    colorHTML += '<div class="color-box" style="background:' + palette.yellow.foreground + '" onclick="AudioEvents.fireEvent(\'changeTrackColor\', [\'yellow\', ' + trackId + ', event])"></div>';
    colorHTML += '<div class="color-box" style="background:' + palette.red.foreground + '" onclick="AudioEvents.fireEvent(\'changeTrackColor\', [\'red\', ' + trackId + ', event])"></div>';
    colorHTML += '<div class="color-box" style="background:' + palette.violet.foreground + '" onclick="AudioEvents.fireEvent(\'changeTrackColor\', [\'violet\', ' + trackId + ', event])"></div>';
    colorHTML += '<div class="color-box" style="background:' + palette.indigo.foreground + '" onclick="AudioEvents.fireEvent(\'changeTrackColor\', [\'indigo\', ' + trackId + ', event])"></div>';
    colorHTML += '<div class="color-box"></div>';
    colorHTML += '<div class="color-box"></div>';
    colorHTML += '<div class="color-box"></div>';
    colorHTML += '<div class="color-box"></div>';
    colorHTML += '</div><div class="color-row"></div><div class="color-row"></div></div></div>';

    document.getElementById('overlay').innerHTML = colorHTML;
    $(function() {
        $('#colorMenu').draggable();
    });
    drawCloseButton('colorClose');
}
function helpMenu()
{
    overlayOpen = true;
    var helpHTML = '<div id="helpMenu"><div class="menuHeader"><span class="menuTitle">Help</span>';
    helpHTML += '<canvas id="helpClose" class="close-button" width="17px" height="17px" onclick="AudioEvents.fireEvent(\'closeOverlay\', [\'helpMenu\'])"></canvas>';
    helpHTML += '</div><h4>Help Menu</h4><div><p>Shortcuts</p><ul><li>Play/Stop - Spacebar</li><li>Return - Stop/Go to Beginning</li>';
    helpHTML += '<li>Expand Mix Window - Option/Alt + A</li><li></li></ul></div></div>';

    document.getElementById('overlay').innerHTML = helpHTML;
    $(function() {
        $('#helpMenu').draggable();
    });
    drawCloseButton('helpClose');
}
function loadMenu(showClose)
{
    showClose = (showClose == undefined) ? true : showClose;
    var newProjectHtml = '<div><form action="#" method="post">';
    newProjectHtml += '<label>Create New Project</label><br /><input type="text" id="newProject" name="newProject" placeholder="New Project Name"/>';
    newProjectHtml += '<input type="submit" value="Create Project" name="createProject" id="createProject" /></form></div>';

    $.ajax({
        url: 'scripts/list-projects.php?id=' + projectId,
        type: 'GET',
        success: function(response) {
            overlayOpen = true;
            var overlayHtml = '<div id="loadSaveBackground"><div id="loadMenu"><div class="menuHeader"><span class="menuTitle">Create/Load Projects</span>';
            if(showClose)
            {
                overlayHtml += '<canvas id="loadClose" class="close-button" width="17px" height="17px" onclick="AudioEvents.fireEvent(\'closeOverlay\',[\'loadMenu\'])"></canvas>';
            }
            overlayHtml += '</div><div style="padding:10px;">' + newProjectHtml + response + '</div></div></div>';
            document.getElementById('overlay').innerHTML = overlayHtml;
            if(showClose)
            {
                drawCloseButton('loadClose');
            }
        }
    })
}
function prefMenu() {
    overlayOpen = true;
    document.getElementById('overlay').innerHTML = '<div id="prefMenu"><div class="menuHeader"><span class="menuTitle noSelect">Preferences</span><canvas id="prefClose" class="close-button" width="17px" height="17px" onclick="AudioEvents.fireEvent(\'closeOverlay\',[\'prefMenu\'])"></canvas></div><button>Scroller</button></div>';
    drawCloseButton('prefClose');
}
function renameMenu(track)
{
    overlayOpen = true;
    document.getElementById('overlay').innerHTML = '<div id="renameMenu" class="noSelect"><div class="menuHeader"><span class="menuTitle noSelect">' + track.trackName + '</span><canvas id="renameClose" class="close-button" width="17px" height="17px" onclick="AudioEvents.fireEvent(\'closeOverlay\', [\'renameMenu\'])"></canvas></div><div id="renameInnerDiv">Name the track:<br/><input id="trackName" type="text" value="' + track.trackName + '"></input><br/>Comments:<br/><textarea id="comments"></textarea><br/><button class="renameButton">Previous</button><button class="renameButton">Next</button><button id="cancel" class="renameButton" onclick="AudioEvents.fireEvent(\'closeOverlay\', [\'renameMenu\'])">Cancel</button><button id="ok" class="renameButton">Ok</button></div></div>';
    drawCloseButton('renameClose');
    $(function() {
        $('#renameMenu').draggable();
    });
}

function loadSave(title,text,duration)
{
    overlayOpen = true;
    var overlay = document.getElementById('overlay');
    document.getElementById('overlay').innerHTML = '<div id="loadSaveBackground"><div id="loadSave" class="ui-corner-all"><h2 id="loadSaveHeader">' + title + '</h2><p id="loading-text">' + text + '</p></div></div>';

    if (duration != undefined)
    {
        setTimeout(function() { overlay.removeChild(document.getElementById('loadSaveBackground')); overlayOpen = false; }, duration);
    }
}
function importAudioMenu() {
    overlayOpen = true;
    var overlay = document.getElementById('overlay');
    document.getElementById('overlay').innerHTML = '<div id="importAudioMenu"><div class="menuHeader"><span class="menuTitle">Import File</span><canvas id="importAudioClose" class="close-button" width="17px" height="17px" onclick="AudioEvents.fireEvent(\'closeOverlay\', [\'importAudioMenu\'])"></canvas></div><form id="form" action="scripts/file-upload.php?id=' + projectId + '" method="post" target="hidden_upload" enctype="multipart/form-data" style="width:300px;height:50px;margin:auto;border:1px solid black;"><input id="import-file" name="file" type="file" style="width:200px;height:50px;margin:0px;padding:0px;"/></form><br/><input type="submit" name="action" value="Upload" onclick="$(\'#form\').submit()"/><iframe id="hidden_upload" name="hidden_upload" src=""></iframe></div></div>';
    drawCloseButton('importAudioClose');
    $('#import-file').click();
}
