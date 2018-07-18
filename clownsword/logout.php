<?php

require_once 'init.php';

$userService->logout();

foreach ($_COOKIE as $key => $value)
{
    setcookie($key, '', (time() - 3600), '/');
}

header('Location: about');
exit();
