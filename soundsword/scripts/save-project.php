<?php

$return = array();
$return['status'] = false;
$return['error'] = null;

if (!isset($_POST['data']))
{
    $return['error'] = 'No data provided';
    die(json_encode($return));
}

if (!isset($_POST['id']) || trim($_POST['id']) == '' || ((int) $_POST['id'] == 0))
{
    $return['error'] = 'Invalid project id provided';
    die(json_encode($return));
}

if (!is_array($_POST['data']) || !array_key_exists('trackData', $_POST['data']))
{
    $return['error'] = 'No data.trackData provided';
    die(json_encode($return));
}

require_once '../init.php';

$user = $userService->getUserFromSession();

if (is_null($user))
{
    $return['error'] = 'Invalid user';
    die(json_encode($return));
}

$projectId = (int) $_POST['id'];

$rawTrackData = json_decode($_POST['data']['trackData']);
$tempo = (array_key_exists('tempo', $_POST['data'])) ? (int) $_POST['data']['tempo'] : null;
$waveformCache = json_decode($_POST['data']['waveformCache']);

$orderCount = 1;
foreach ($rawTrackData as $trackData)
{
    $trackData->order = $orderCount;
    $orderCount++;
}
$trackData = json_encode(array(
    'trackData' => $rawTrackData,
    'tempo' => $tempo,
    'waveformCache' => $waveformCache
));

try {
    $soundSwordService->saveProjectData($projectId, $trackData, $user->id);
    $return['status'] = true;
} catch (Exception $e) {
    $return['error'] = $e->getMessage();
}

die(json_encode($return));

?>
