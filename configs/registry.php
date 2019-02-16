<?php

use Intersect\Application;
use Intersect\Blog\Commands\InstallBlogCommand;
use Intersect\Blog\Commands\UpgradeBlogCommand;

$connection = Application::instance()->getConnection();

return [
    'classes' => [],
    'singletons' => [],
    'events' => [],
    'commands' => [
        'blog:install' => new InstallBlogCommand($connection),
        'blog:upgrade' => new UpgradeBlogCommand($connection),
    ]
];
