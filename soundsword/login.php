<?php

require_once 'init.php';

$error = null;
$email = '';
$username = '';
$password = '';

if (isset($_POST['login_submit']))
{
    $username = $_POST['login_username'];
    $password = $_POST['login_password'];

    if (is_null($error))
    {
        $user = new \Models\User();
        $user->username = $username;
        $user->password = $password;

        if (!$userService->login($user, false))
        {
            $_SESSION['error'] = 'Invalid username and/or password';
            header('Location: about');
            exit();
        }
        else
        {
            header('Location: index');
            exit();
        }
    }
}
?>
