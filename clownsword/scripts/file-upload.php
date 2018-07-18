<?php
require_once '../init.php';

//users can have multiple projects and multiple tracks, but projects can share tracks
//var_dump($_SERVER);
$userService->checkForAutoLoginKey();
$user = $userService->getUserFromSession();

if (is_null($user->id))
{
	echo 'hello';
    exit();
}

if(!isset($_FILES['file']))
{
	die();
}

$projectId = (isset($_GET['id'])) ? $_GET['id'] : die();

try {
    $trackId = $soundSwordService->addTrackForUser($user, (isset($_FILES['file']) ? $_FILES['file'] : null));
	//$clipPath = $soundSwordService->addClipForUser($user, (isset($_FILES['file']) ? $_FILES['file'] : null));
    echo '<h3>' . $trackId . '</h3>';
    var_dump('addTrackForUser: added! ' . $trackId);
} catch (Exception $e) {
    die($e->getMessage());
}

try {
    $soundSwordService->addTrackToProject($trackId, $projectId, $user->id);
    $data = $soundSwordService->getTrackById($trackId);
    ?>
    <script>
		var $ = window.parent.$, jQuery = window.parent.jQuery;
        var clip = new parent.Clip();
		var base = parent.Base64Binary;
		var ctx = parent.context;
		var clipList = parent.clipList;
		var events = parent.AudioEvents;

		clip.init('<?= $data['path'] ?>','<?= addslashes($data['title']); ?>');
        var fileURL =  {
            url: parent.currentProjectPath + '/enc_audio_assets/' + clip.path
        }
		parent.loadSave('Initializing SoundSword', 'Loading audio for ' + clip.title + '...');
        $.post("scripts/open-file.php", fileURL, function(data) {

			var result = base.decodeArrayBuffer(data);
            ctx.decodeAudioData(result, function onSuccess(audio) {
                clip.data = audio;
                clip.isLoaded = 1;
                clip.waveformLength = clip.data.duration / 2 * 90;

				clipList.addClip(clip);
		        events.fireEvent('addClipToFileWindow', ['' + clip.path + '','<?= addslashes($data['title']) ?>']);
		        events.fireEvent('closeOverlay', ['importAudioMenu']);

				return;

            }, function onFailure() {
                console.log('context.decodeAudioData failed for ' + clip.path);
            });
		});
    </script>
    <?php
} catch (Exception $e) {
    die($e->getMessage());
}

echo 'trackId: ' . $trackId . '<br />';
echo 'projectId: ' . $projectId;
die();
