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
        var clip = new parent.Clip();
		clip.init('<?= $data['path'] ?>','<?= addslashes($data['title']); ?>');
		clip.load();
		console.log(clip.path);

        parent.clipList.addClip(clip);
        parent.AudioEvents.fireEvent('addClipToFileWindow', ['' + clip.path + '','<?= addslashes($data['title']) ?>']);
        parent.AudioEvents.fireEvent('closeOverlay', ['importAudioMenu']);
    </script>
    <?php
} catch (Exception $e) {
    die($e->getMessage());
}

echo 'trackId: ' . $trackId . '<br />';
echo 'projectId: ' . $projectId;
die();
