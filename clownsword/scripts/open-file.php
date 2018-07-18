<?php

if(isset($_POST['url']))
{
    $file = file_get_contents('../' . $_POST['url']);
    echo $file;
}else {
    echo 'didn\'t work';
}

?>
