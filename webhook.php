<?php

if(isset($_GET['repo']) && !empty(trim($_GET['repo'])))
{
    $repo = filter_var(trim($_GET['repo']), FILTER_SANITIZE_STRING);
    echo shell_exec("touch /var/www/repos/" . $repo);
}
