<?php

function __autoload($className)
{
    $classParts = explode("\\", $className);
    $className = array_pop($classParts);

    if (count($classParts) > 0)
    {
        if (file_exists(dirname(__FILE__) . '/libraries/' . strtolower(implode('/', $classParts)) . '/' . $className . '.php'))
        {
            require_once  dirname(__FILE__) . '/libraries/' . strtolower(implode('/', $classParts)) . '/' . $className . '.php';
        }
        else
        {
            require_once  dirname(__FILE__) . '/' . strtolower(implode('/', $classParts)) . '/' . $className . '.php';
        }
    }
}