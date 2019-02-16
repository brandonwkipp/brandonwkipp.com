<?php

use Intersect\Application;
use Intersect\Database\Connection\Connection;
use Intersect\Blog\Commands\InstallBlogCommand;
use Intersect\Blog\Commands\UpgradeBlogCommand;
use Intersect\Database\Connection\ConnectionFactory;
use Intersect\Database\Connection\ConnectionSettings;

$application = Application::instance();

$databaseConfig = $application->getRegisteredConfigs('database');
$connectionSettings = new ConnectionSettings($databaseConfig['host'], $databaseConfig['username'], $databaseConfig['password'], $databaseConfig['port'], $databaseConfig['name']);
$connection = ConnectionFactory::get($databaseConfig['driver'], $connectionSettings);

return [
    'classes' => [],
    'singletons' => [],
    'events' => [],
    'commands' => [
        'blog:install' => new InstallBlogCommand($connection),
        'blog:upgrade' => new UpgradeBlogCommand($connection),
    ]
];
