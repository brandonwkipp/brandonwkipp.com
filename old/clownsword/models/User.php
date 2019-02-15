<?php

namespace Models;

class User {

    public $requiredFields = array('username', 'email', 'password');

    public $id;
    public $username;
    public $email;
    public $password;
    public $autoLoginKey;

    public static function initFromRow($row)
    {
        $class = get_called_class();
        $user = new $class();

        if (array_key_exists('user_id', $row)) $user->id = $row['user_id'];
        if (array_key_exists('username', $row)) $user->username = $row['username'];
        if (array_key_exists('email', $row)) $user->email = $row['email'];
        if (array_key_exists('password', $row)) $user->password = $row['password'];
        if (array_key_exists('auto_login_key', $row)) $user->autoLoginKey = $row['auto_login_key'];

        return $user;
    }

}