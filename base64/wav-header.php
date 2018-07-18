<?php

include 'WaveFileReader.php';

$control_url = 'Vocals.wav';
$control = WaveFileReader::ReadFile($control_url);

$test_url = 'protools.wav';
$test = WaveFileReader::ReadFile($test_url);


?>

<!DOCTYPE html>
<html>
<head>
    <title>Wav Analysis</title>
</head>
<body>
<div style="width:500px;height:400px;margin:auto;border-left:1px solid #000;">
    <div style="display:inline-block;width:200px;border-right:1px solid #000;float:left;">
    <?php
        foreach($control as $item)
        {
            foreach($item as $thing)
            {
                echo '<pre>' . $thing . '</pre>';
            }
        }
    ?>
    </div>
    <div style="display:inline-block;width:200px;border-right:1px solid #000;float:right;">
    <?php
        foreach($test as $item)
        {
            foreach($item as $thing)
            {
                echo '<pre>' . $thing . '</pre>';
            }
        }
    ?>
    </div>
</div>
</body>
</html>
