<?php
session_start();

require_once 'autoloader.php';

$database = new \Models\MySQLiDatabase('localhost', 'soundsword_admin', 'Lemongrab80!', 'soundsword');
//$database = new \Models\MySQLiDatabase('127.0.0.1', 'root', '', 'soundsword');
$userService = new \Services\UserService($database);
$soundSwordService = new \Services\SoundSwordService($database);
