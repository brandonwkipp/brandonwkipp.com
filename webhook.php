
<?php

if(isset($_GET['repo']) && !empty(trim($_GET['repo'])))
{
    $repo = filter_var(trim($_GET['repo']), FILTER_SANITIZE_STRING);
    echo shell_exec("touch /var/www/repos/" . $repo);
}
else if(isset($_GET['carbon']) && !empty(trim($_GET['carbon'])))
{
    $secret = md5(date("ymd") . "orangubae");
    $str = filter_var(trim($_GET['carbon']), FILTER_SANITIZE_STRING);

    if($secret === $str)
        echo file_get_contents('../carbon.ip');
}

