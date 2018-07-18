<?php

namespace Services;

use Models\Database;
use Models\User;

class UserService {

    const USER_SESSION_KEY = 'user_session';
    const USER_ID_SESSION_KEY = 'user_id';
    const USER_COOKIE_AUTO_LOGIN_KEY = 'user_auto_login';
    const USER_SALT = 'user_salt';

    public static $USER_AUTO_LOGIN_DAY_LIMIT = 30;

    /**
     * @var Database $db
     */
    protected $db;

    public function __construct(\Models\Database $db)
    {
        $this->db = $db;
    }

    // sign up
    public function create(User $user)
    {
        if (!$this->validateFields($user))
        {
            throw new \Exception('Please fill out all the required fields');
        }
        if (!is_null($this->getUserByEmailOrUsername($user)))
        {
            throw new \Exception('User already exists');
        }

        $securePassword = $this->generateSecurePassword($user->password);
        $this->db->query("INSERT INTO users (username, email, password, date_created) VALUES ('" . $this->db->filterParameter($user->username) . "', '" . $this->db->filterParameter($user->email) . "', '" . $this->db->filterParameter($securePassword) . "', NOW())");

        if (is_null($this->db->getInsertId()) || (int) $this->db->getInsertId() == 0)
        {
            return false;
        }

        $user->id = $this->db->getInsertId();
        $user->password = $securePassword;

        return true;
    }

    public function getUserByEmailOrUsername(User $user)
    {
        if (is_null($user))
        {
            return null;
        }

        $this->db->query("SELECT * FROM users WHERE (email='" . $this->db->filterParameter($user->email) . "' OR username='" . $this->db->filterParameter($user->username) . "') LIMIT 1");
        return $this->db->getFirstResult();
    }

    // login
    public function login(User $user, $storeLoginCookie = false)
    {
        if (is_null($user->id))
        {
            $tempUser = $this->getUserByEmailOrUsername($user);
            if (is_null($tempUser))
            {
                return false;
            }

            $this->db->query("SELECT * FROM users WHERE user_id='" . $tempUser['user_id'] . "' AND password='" . $this->generateSecurePassword($user->password) . "' LIMIT 1");
            $rawUser = $this->db->getFirstResult();
            if (is_null($rawUser))
            {
                return false;
            }

            $user->id = $rawUser['user_id'];
            $user->email = $rawUser['email'];
            $user->username = $rawUser['username'];
        }

        $autoLoginKey =  $this->generateAutoLoginKey($user->id, $user->email);
        $this->storeUserSession($autoLoginKey, $user->id);
        $user->autoLoginKey = $autoLoginKey;

        if ($storeLoginCookie)
        {
            setcookie(self::USER_COOKIE_AUTO_LOGIN_KEY, $autoLoginKey, (time() + (86400 * (int) self::$USER_AUTO_LOGIN_DAY_LIMIT)), '/');
            $this->db->query("UPDATE users SET auto_login_key='" . $this->db->filterParameter($autoLoginKey) . "' WHERE user_id='" . $this->db->filterParameter($user->id) . "' LIMIT 1");
        }

        return true;
    }

    public function checkForAutoLoginKey()
    {
        if ((isset($_SESSION[self::USER_SESSION_KEY]) && isset($_SESSION[self::USER_ID_SESSION_KEY])) || !isset($_COOKIE[self::USER_COOKIE_AUTO_LOGIN_KEY]))
        {
            return false;
        }

        $cookieValue = $_COOKIE[self::USER_COOKIE_AUTO_LOGIN_KEY];

        $this->db->query("SELECT id, auto_login_key FROM users WHERE auto_login_key='" . $this->db->filterParameter($cookieValue) . "' LIMIT 1");
        $user = $this->db->getFirstResult();

        if (is_null($user))
        {
            setcookie(self::USER_COOKIE_AUTO_LOGIN_KEY, '', (time() - 3600), '/');
            return false;
        }

        $this->storeUserSession($user['auto_login_key'], $user['user_id']);

        return true;
    }

    // logout
    public function logout()
    {
        unset($_SESSION[self::USER_SESSION_KEY]);
        unset($_SESSION[self::USER_ID_SESSION_KEY]);

        setcookie(self::USER_COOKIE_AUTO_LOGIN_KEY, '', (time() - 3600), '/');
    }

    // change email
    public function updateEmailAddress(User $user, $newEmailAddress)
    {
        $newEmailAddress = trim($newEmailAddress);
        if (is_null($user) || $newEmailAddress == '' || $user->email == $newEmailAddress)
        {
            return false;
        }

        $this->db->query("SELECT user_id FROM users WHERE email='" . $this->db->filterParameter($newEmailAddress) . "' LIMIT 1");
        if (!is_null($this->db->getFirstResult()))
        {
            throw new \Exception('Email is already taken: ' . $newEmailAddress);
        }

        $this->db->query("SELECT user_id, email FROM users WHERE email='" . $user->email . "' LIMIT 1");
        $tempUser = $this->db->getFirstResult();

        if (is_null($tempUser))
        {
            throw new \Exception('User not found with email address: ' . $user->email);
        }

        $this->db->query("UPDATE users SET email='" . $this->db->filterParameter($newEmailAddress) . "', date_updated=NOW() WHERE email='" . $this->db->filterParameter($tempUser['email']) . "' AND user_id='" . $this->db->filterParameter($tempUser['user_id']) . "' LIMIT 1");

        if ($this->db->getResults() == 0)
        {
            return false;
        }

        return true;
    }

    // change username
    public function updateUsername(User $user, $newUsername)
    {
        $newUsername = trim($newUsername);
        if (is_null($user) || $newUsername == '' || $user->username == $newUsername)
        {
            return false;
        }

        $this->db->query("SELECT id FROM users WHERE username='" . $this->db->filterParameter($newUsername) . "' LIMIT 1");
        if (!is_null($this->db->getFirstResult()))
        {
            throw new \Exception('Username is already taken: ' . $newUsername);
        }

        $this->db->query("SELECT id, username FROM users WHERE username='" . $user->username . "' LIMIT 1");
        $tempUser = $this->db->getFirstResult();

        if (is_null($tempUser))
        {
            throw new \Exception('User not found with username: ' . $user->username);
        }

        $this->db->query("UPDATE users SET username='" . $this->db->filterParameter($newUsername) . "', date_updated=NOW() WHERE username='" . $this->db->filterParameter($tempUser['username']) . "' AND user_id='" . $this->db->filterParameter($tempUser['user_id']) . "' LIMIT 1");

        if ($this->db->getResults() == 0)
        {
            return false;
        }

        return true;
    }

    // change password
    public function updatePassword(User $user, $newPassword)
    {
        $newPassword = trim($newPassword);
        if (is_null($user) || $newPassword == '')
        {
            return false;
        }

        $this->db->query("SELECT * FROM users WHERE user_id='" . $this->db->filterParameter($user->id) . "' LIMIT 1");
        $tempUser = $this->db->getFirstResult();

        if (is_null($tempUser))
        {
            throw new \Exception('User not found with id: ' . $user->id);
        }

        $this->db->query("UPDATE users SET password='" . $this->generateSecurePassword($newPassword) . "', date_updated=NOW() WHERE user_id='" . $this->db->filterParameter($tempUser['user_id']) . "' LIMIT 1");

        if ($this->db->getResults() == 0)
        {
            return false;
        }

        return true;
    }

    public function getUserFromSession($skipInit = false)
    {
        if (!isset($_SESSION[self::USER_SESSION_KEY], $_SESSION[self::USER_ID_SESSION_KEY]))
        {
            return null;
        }

        $userId = (int) $_SESSION[self::USER_ID_SESSION_KEY];
        if ($userId == 0)
        {
            return null;
        }

        $this->db->query("SELECT * FROM users WHERE user_id='" . $this->db->filterParameter($userId) . "' LIMIT 1");
        $tempUser = $this->db->getFirstResult();

        if (is_null($tempUser))
        {
            $this->logout();
            return null;
        }

        return ((!$skipInit) ? User::initFromRow($tempUser) : $tempUser);
    }

    private function storeUserSession($autoLoginKey, $id)
    {
        $_SESSION[self::USER_SESSION_KEY] = sha1($autoLoginKey . time());
        $_SESSION[self::USER_ID_SESSION_KEY] = $id;
    }

    private function generateAutoLoginKey($id, $email)
    {
        return sha1($id . $email . time());
    }

    private function generateSecurePassword($password)
    {
        return sha1(self::USER_SALT . md5($password));
    }

    private function validateFields(User $user)
    {
        if (is_null($user))
        {
            return false;
        }

        foreach ($user->requiredFields as $field)
        {
            if (!isset($user->{$field}) || trim($user->{$field}) == '')
            {
                return false;
            }
        }

        return true;
    }


    // recover password
    // recover username
    // add secondary email

}