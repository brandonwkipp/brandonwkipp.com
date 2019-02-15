<?php

$return = array();
$return['status'] = false;
$return['error'] = null;

if (!isset($_GET['id']) || trim($_GET['id']) == '')
{
    $return['error'] = 'Invalid project id provided';
    die(json_encode($return));
}

require_once '../init.php';

$projectId = (int) $_GET['id'];
$user = $userService->getUserFromSession();

if (is_null($user))
{
    $return['error'] = 'Invalid user';
    die(json_encode($return));
}

$data = $soundSwordService->getDataForProject($projectId);

if (is_null($data))
{
    $return['error'] = 'Problem loading project';
    die(json_encode($return));
}
$name = 'projectId';
$future = time() + (86400 * 30);

setcookie($name, $projectId, $future, '/');

$decodedData = json_decode($data, true);
$trackData = array_key_exists('trackData', $decodedData) ? $decodedData['trackData'] : array();
$tempo = array_key_exists('tempo', $decodedData) ? $decodedData['tempo'] : null;
$waveformCache = array_key_exists('waveformCache', $decodedData) ? $decodedData['waveformCache'] : array();

$return['status'] = true;
$return['tracks'] = json_encode($trackData);
$return['tempo'] = $tempo;
$return['waveformCache'] = $waveformCache;
die(json_encode($return));
