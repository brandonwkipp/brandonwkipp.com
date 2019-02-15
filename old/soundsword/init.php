<?php
session_start();

require_once 'autoloader.php';

$database = new \Models\MySQLiDatabase('localhost', 'soundsword_admin', 'Lemongrab80!', 'soundsword');
//$database = new \Models\MySQLiDatabase('127.0.0.1', 'root', '', 'soundsword');
$userService = new \Services\UserService($database);
$soundSwordService = new \Services\SoundSwordService($database);

function createUser(\Models\User $user)
{
    global $userService;

    try {
        $userCreated = $userService->create($user);

        if ($userCreated)
        {
            $userDirectory = dirname(__FILE__) . '/users';
            if (!file_exists($userDirectory))
            {
                mkdir($userDirectory, 0755);
            }

            $userCustomDirectory = $userDirectory .'/' . $user->username;
            if (!file_exists($userCustomDirectory))
            {
                mkdir($userCustomDirectory, 0755);
            }
        }
    } catch (Exception $e) {
        throw $e;
    }
}
