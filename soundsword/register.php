<?php

require_once 'init.php';

$error = null;
$username = '';
$password = '';
$email = '';

if (isset($_POST['register_submit']))
{
    if (!isset($_POST['register_username'], $_POST['register_password'], $_POST['register_email']) || trim($_POST['register_username']) == '' || trim($_POST['register_password']) == '' || trim($_POST['register_email']) == '')
    {
        $error = 'Please fill in all required fields';
    }

    $username = $_POST['register_username'];
    $password = $_POST['register_password'];
    $email = $_POST['register_email'];

    if (is_null($error))
    {
        $user = new \Models\User();
        $user->username = $username;
        $user->password = $password;
        $user->email = $email;

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

                // hack so login will work
                $user->password = $password;

                if ($userService->login($user, false))
                {
                    header('location: index.php');
                    exit();
                }
            }
        } catch (Exception $e) {
            $error = $e->getMessage();
            $_SESSION['error'] = $error;
            header('Location: ' . dirname('.'));
            exit();
        }
    }else {
        $_SESSION['error'] = $error;
        header('Location: ' . dirname('.'));
        exit();
    }
}else {
    header('Location: ' . dirname('.'));
    exit();
}

?>
