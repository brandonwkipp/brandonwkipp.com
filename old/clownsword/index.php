<?php

require_once 'init.php';

$useragent = $_SERVER['HTTP_USER_AGENT'];
if(preg_match('/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iPad|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i',$useragent)||preg_match('/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i',substr($useragent,0,4)))
{
    $_SESSION['mobile'] = 'Mobile devices are not supported at this time. Sorry about that :(';
    header('Location: about');
    exit();
}

$userService->checkForAutoLoginKey();
$user = $userService->getUserFromSession();

if (is_null($user) || is_null($user->id))
{
    header('Location: about');
    exit();
}

$projectId = isset($_COOKIE['projectId']) ? $_COOKIE['projectId'] : null;
$projectErrorMessage = '';

if (isset($_POST['createProject'], $_POST['newProject']) && trim($_POST['newProject']) != '')
{
    $newProject = trim($_POST['newProject']);
    try {
        $newProjectId = $soundSwordService->createProject($user, trim($_POST['newProject']));
        if ($newProjectId > 0)
        {
            $name = 'projectId';
            $future = time() + (86400 * 30);
            $projectId = $newProjectId;
            setcookie($name, $projectId, $future, '/');
        }
        else
        {
            $projectErrorMessage = 'Something went wrong creating your new project!';
        }
    } catch (Exception $e) {
        $projectErrorMessage = 'Creation of ' . $newProject . ' failed! Loading previous project (if applicable)';
    }
}

$userProjectPath = 'users/' . $user->username;
$project = $soundSwordService->getProjectById($projectId);
$projectTracks = $soundSwordService->getTracksForProject($projectId);
?>

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8"/>
    <title><?= (!is_null($project) ? $project['name'] . ' | ' : '') ?>SoundSword</title>

    <link rel="stylesheet" type="text/CSS" href="styles/soundsword.css"/>
    <link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/themes/smoothness/jquery-ui.css">

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js"></script>

    <script src="scripts/base64-binary.js"></script>
    <script src="scripts/canvases.js"></script>
    <script src="scripts/clip.js"></script>
    <script src="scripts/clipboard.js"></script>
    <script src="scripts/context.js"></script>
    <script src="scripts/clock.js"></script>
    <script src="scripts/collection.js"></script>
    <script src="scripts/audiotrack.js"></script>
    <script src="scripts/track-generation.js"></script>
    <script src="scripts/events.js"></script>
    <script src="scripts/knobject.js"></script>
    <script src="scripts/overlay.js"></script>
    <script src="scripts/timeline.js"></script>

    <script type="text/javascript">
        var isDebugEnabled = (<?= isset($_GET['debug']) ? 1 : 0 ; ?> == 1);

        var collection = (isDebugEnabled ? new DebugTrackCollection() : new TrackCollection());
        var allTracksCollection = (isDebugEnabled ? new DebugTrackCollection() : new TrackCollection());
        var clipList = new Clipboard();
        var clock = null;
        var currentProjectPath = '<?= $userProjectPath; ?>';
        var projectId = '<?= $projectId; ?>';
        var timeline = null;

        function initialApp() {
            var baseContext;
            if (typeof AudioContext !== 'undefined') { baseContext = new AudioContext(); }
            else if(typeof webkitAudioContext !== 'undefined') { baseContext = new webkitAudioContext(); }
            else
            {
                var message = 'Audiocontext not supported. :(';
                alert(message);
            }
            context = (isDebugEnabled ? new CustomAudioContext(baseContext) : baseContext);
        }
        function loadProject(projectId) {
            if(projectId.trim() == '') return;
            document.cookie = 'projectId=' + projectId + ';path=/';
            window.location.reload();
            return;
        }

        $(document).ready(function() {
            //sets custom context
            initialApp();
            clock = Object.create(Clock).init('clock', function(seconds) {
                collection.scrollAll(seconds);
            });

            timeline = Object.create(Timeline).init();

            $.ajax({
                url: "color-palette.json",
                dataType: 'json',
                success: function(data) {
                    palette = data;
                    console.log('done loading colors');
                }
            });

            var currentProject = '<?= $projectId; ?>';
            if(currentProject.trim() == '')
            {
                loadMenu(false);
                return;
            }
            loadSave('Initializing SoundSword', 'Loading project...');

            var projectTracks = JSON.parse('<?= json_encode($projectTracks, JSON_HEX_APOS); ?>');
            if(projectTracks != null)
            {
                for (var i = 0; i < projectTracks.length; i++)
                {
                    var t = projectTracks[i];
                    var tmpClip = new Clip();
                    tmpClip.init(t.path, t.title);
                    clipList.addClip(tmpClip);
                }
            }
            clipList.loadFromProject(currentProject, function(clipList) {
                if(clipList.clips.length == 0)
                {
                    loadSave('Initializing SoundSword', 'No Audio Files to Load', 500);
                    return;
                }else
                {
                    loadSave('Initializing SoundSword', 'Loading Audio Files...');
                }
                clipList.loadAll(function() {
                    collection.loadFromProject(currentProject, function(tempCollection) {
                        var loadedCount = 0;
                        collection = tempCollection;
                        if(collection.tracks.length == 0)
                        {
                            loadSave('Initializing SoundSword', 'No tracks loaded', 500);
                            return;
                        }
                        collection.loadAll(function(t) {
                            loadedCount++;
                            loadSave('Initializing SoundSword', 'Loading track ' + loadedCount + ' of ' + collection.tracks.length + '...');
                            if(t.id == undefined) { t.id = loadedCount; }
                            if(loadedCount == collection.tracks.length)
                            {
                                var sortedTracks = [];
                                var unsortedTracks = [];
                                for (var i = 0; i < collection.tracks.length; i++)
                                {
                                    if(collection.tracks[i].order > 0) { sortedTracks[collection.tracks[i].order] = collection.tracks[i]; }
                                    else { unsortedTracks.push(collection.tracks[i]); }
                                }
                                var currentSortedLength = (sortedTracks.length > 0) ? sortedTracks.length : 1;
                                for(var k = 0; k < unsortedTracks.length; k++)
                                {
                                    sortedTracks[currentSortedLength] = unsortedTracks[k];
                                    currentSortedLength++;
                                }
                                for(var j = 1; j < sortedTracks.length; j++)
                                {
                                    loadSave('Initializing SoundSword', 'Generating waveforms for track ' + j + '...');
                                    console.log('collection length: ' + collection.tracks.length, 'loadedCount: ' + loadedCount, 'unsortedLength: ' + unsortedTracks.length, 'sortedLength: ' + sortedTracks.length)
                                }
                                loadSave('Initializing SoundSword', 'Project loaded!', 500);
                            }
                        });
                    });
                })
            });
        });
        $(document).on('updateTrackName', function(e, track) {
            $('#track' + track.id + 'EditName').html(track.trackName);
            $('#track' + track.id + 'MixName').html(track.trackName);
        });
    </script>
</head>
<body>
<div id="header">
	<div id="modes">
       <div id="modesContainer">
            <div class="mode-row mode-row-top" >
                <button id="shuffle" class="normalMode" onclick="AudioEvents.fireEvent('mode', [this.id])">SHUFFLE</button>
	            <button id="spot" class="normalMode" onclick="AudioEvents.fireEvent('mode', [this.id])">SPOT</button>
            </div>
            <div class="mode-row mode-row-bottom">
	            <button id="slip" class="normalMode slip" onclick="AudioEvents.fireEvent('mode', [this.id])">SLIP</button>
                <button id="grid" class="normalMode" onclick="AudioEvents.fireEvent('mode', [this.id])">GRID</button>
            </div>
		</div>
	</div>
	<div id="tools">
        <div id="toolbar">
            <canvas id="trimmer" class="tool-button canvas-button normalToolBackground" width="34" height="34" onclick="tool(this)"></canvas>
            <canvas id="selector" class="tool-button canvas-button selectedToolBackground" width="34" height="34" onclick="tool(this)"></canvas>
            <canvas id="grabber" class="tool-button canvas-button normalToolBackground" width="34" height="34" onclick="tool(this)"></canvas>
        </div>
    </div>
	<div id="counter">
		<div id="clockContainer">
			<div id="clock">00:00.000</div>
		</div>
	</div>
	<div id="transport">
  		<div class="transport-row">
	  		<img id="backward" class="transport-button canvas-button disabled" onclick="AudioEvents.fireEvent('changeTrackColor', [1,event])" src="images/transport/backward.png"></img>
            <img id="forward" class="transport-button canvas-button disabled" onclick="AudioEvents.fireEvent('forward')" src="images/transport/forward.png"></img>
            <img id="stop" class="transport-button canvas-button" onclick="AudioEvents.fireEvent('stop')" src="images/transport/stop.png"></img>
	  		<img id="play" class="transport-button canvas-button" onclick="AudioEvents.fireEvent('play')" src="images/transport/play.png"></img>
  		</div>
  		<div class="transport-row">
            <img id="load" class="transport-button canvas-button disabled" onclick="loadMenu()" src="images/transport/load.png"></img>
            <img id="save" class="transport-button canvas-button disabled" onclick="AudioEvents.fireEvent('save')" src="images/transport/save.png"></img>
  			<img id="addTrack" class="transport-button canvas-button" onclick="addTrackButton()" src="images/transport/add.png"></img>
  			<img id="help" class="transport-button canvas-button" onclick="helpMenu()" src="images/transport/help.png"></img>
  		</div>
  	</div>
    <div id="logoContainer">
        <!--<button id="aboutLink" class="links" onclick="aboutMenu()">About</button>-->
        <!--<button id="faqLink" class="links" onclick="">FAQ</button>-->
        <!--<button id="preferences" class="links" onclick="prefMenu()">Preferences</button>-->
        <!--<button id="profile" class="links" onclick="">Profile</button>-->
        <!--<canvas id="logo" width="200px" height="45px"></canvas>-->
        <div class="logout">
            <a id="logout" class="links" href="logout.php">Logout</a>
        </div>
    </div>
  	<div id="timekeeping">
  		<div id="timeContainer">
  			<div class="rows">
  				<button id="countOff" onclick="AudioEvents.fireEvent('countOff', [])">Count Off</button>
  				<input id="countOffBars" />
  			</div>
  			<div class="rows">
  				<div id="meter">Meter</div>
  				<input id="meterValue" />
  			</div>
  			<div class="rows">
  				<div id="tempo">Tempo</div>
  				<div id="noteValue"></div>
  				<input id="bpm" type="text" />
  			</div>
  		</div>
  	</div>
</div>
<div id="fileWindow">
    <div id="fileTitle">Clips</div>
    <div id="file">
        <?php
        if (is_null($projectTracks))
        {
            echo '<p id="noTracks">No tracks uploaded</p>';
        }
        else
        {
            foreach ($projectTracks as $track)
            {
                echo '<div class="trackListContainer"><span class="trackListAdd" onclick="AudioEvents.fireEvent(\'createNewTrackFromClip\', [\'' . $track['path'] . '\'])"><a href="#" class="">+</a></span><span class="trackListName" draggable="true">' . $track['title'] . '</span></div>';
            }
        }
        ?>
    </div>
</div>
<div id="trackEditWindow">
    <div id="rulers">
        <div id="barsBeats"></div>
        <div id="minSecs"></div>
        <div id="measureIncrements"></div>
    </div>
	<div id="edit">
        <div id="timelines">
            <div id="bars_timeline" onclick="AudioEvents.fireEvent('moveScroller', ['timeline',event])"></div>
            <div id="seconds_timeline" onclick="AudioEvents.fireEvent('moveScroller', ['timeline',event])"></div>
            <div id="measures_timeline" class="selector" onclick="AudioEvents.fireEvent('moveScroller', ['timeline',event])"></div>
        </div>
        <div id="tracks_timeline">
            <div id="editNamePlates"></div>
            <div id="waveforms_timeline">
                <div id="playScroller" class="hidden" style="left:0px"></div>
                <div id="trackScroller" class="hidden" style="left:0px"></div>
                <div id="toolDivs" style="left:0px"></div>
            </div>
        </div>
    </div>
</div>
<div id="mixWindow">
	<div id="mix" class="scrollbar"></div>
</div>
<div id="plugins"></div>
<div id="overlay"></div>
<script src="scripts/audio.js"></script>
<script src="scripts/plugins.js"></script>
<script src="scripts/plugin-effects.js"></script>
<script src="scripts/shortcuts.js"></script>
<script src="scripts/tools.js"></script>
<script type="text/javascript">
init();
</script>
</body>
</html>
