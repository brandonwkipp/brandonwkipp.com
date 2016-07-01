<?php

session_start();

require_once 'security.php';

$error = isset($_SESSION['error']) ? $_SESSION['error'] : null;

?>

<!DOCTYPE html>
<html lang="en">
<head>
<title>Brandon W. Kipp</title>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">

<!-- Latest compiled and minified CSS -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
<link rel="stylesheet" href="styles/index.css"/>

<!-- Latest Less CDN -->
<!--<script src="//cdnjs.cloudflare.com/ajax/libs/less.js/2.6.1/less.min.js"></script>-->
</head>
<body class="color-tone-a">
    <div class="col-md-2 hidden-sm hidden-xs" style="height:100%;">
        <div id="blurb" class="color-tone-b color-tone-d hidden-xs">
            <p style="font-size:36px;">hello.</p>
            <p>My name is Brandon and I’m an aspiring web developer from the great state of Wisconsin. My passions lie in
            web UI/UX design and music technology. My biggest goal with web design, right now, is to make peoples' lives
            easier through my intuitive web app: <a href="#">SoundSword</a>. Aside from all that, I love business, philosophy,
            finance, bots, reading, tea, rum, biking, and live music.</p>
        </div>
    </div>
    <div id="content" class="col-md-10">
        <div id="name-container" class="top">
            <span id="name">Brandon W. Kipp</span>
            <img id="portrait" draggable="false" src="images/1.png" width="200px" height="200px"></img>
        </div>
        <div class="tabs-center color-tone-e top">
            <ul id="navTabs" class="nav nav-tabs nav-justified top container">
                <li id="projects">
                    <a class="dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
                        Projects<span class="caret"></span>
                    </a>
                    <ul class="dropdown-menu">
                        <li><a href="../soundsword/index.php">SoundSword - a sound editing web app</a></li>
                        <li><a href="https://brandonwkipp.github.io/knobject-js">Knobject.js - a JavaScript Knob component</a></li>
                    </ul>
                </li>
                <li id="blog" class="active"><a href="#">Blog</a></li>
                <li id="resume"><a href="#">Resume</a></li>
                <li id="connect">
                    <a class="dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
                        Connect<span class="caret"></span>
                    </a>
                    <ul class="dropdown-menu">
                        <li><a href="https://twitter.com/brandonwkipp"><img class="icon" src="images/icons/twitter-icon.png"/> Twitter</a></li>
                        <li><a href="https://linkedin.com/in/brandonwkipp"><img class="icon" src="images/icons/linkedin-icon.png"/> LinkedIn</a></li>
                        <li><a href="https://soundcloud.com/brandonwkipp"><img class="icon" src="images/icons/soundcloud-icon.png"/> SoundCloud</a></li>
                        <li><a href="https://reddit.com/user/BlackestNapkin"><img class="icon" src="images/icons/reddit-icon.png"/> Reddit</a></li>
                        <li><a href="https://github.com/brandonwkipp"><img class="icon" src="images/icons/github-icon.png"/> Github</a></li>
                    </ul>
                </li>
                <li id="contact"><a href="#" data-toggle="modal" data-target="#contact-modal">Contact</a></li>
            </ul>
        </div>
        <div id="content-box" class="color-tone-b color-tone-d"></div>
    </div>
<!-- Latest compiled and minified jQuery -->
<script src="//code.jquery.com/jquery-1.12.0.min.js"></script>
<!-- Latest compiled and minified JavaScript -->
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script>
<!-- Scripts -->
<script type="text/javascript" src="scripts/script.js"></script>

<div id="contact-modal" class="modal fade" role="dialog">
    <div class="modal-dialog">
        <!-- Modal content-->
        <div class="color-tone-b color-tone-d">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Contact</h4>
            </div>
            <div class="modal-body">
                <?php
                    if(isset($error))
                    {
                        ?><span class="error-row"><?= $error ?></span><?php
                    }
                ?>
                <form method="post" action="form.php">
                    <input class="form-input" type="text" name="name" placeholder="Your Name*" autocomplete="off" <?php echo isset($_SESSION['name']) ? ' value="' . e($_SESSION['name']) . '"' : '' ?>>
                    <input class="form-input" type="text" name="email" placeholder="Your Email Address*" autocomplete="off" <?php echo isset($_SESSION['email']) ? ' value="' . e($_SESSION['email']) . '"' : '' ?>>
                    <textarea class="form-input message" type="text" name="message" placeholder="Message*" autocomplete="off"><?php echo isset($_SESSION['message']) ? e($_SESSION['message']) : '' ?></textarea>
                    <span id="form-submit-container">
                        <input class="form-submit" type="submit" name="submit" class="btn btn-info" value="Send Message"/>
                    </span>
                </form>
            </div>
        </div>
    </div>
</div>
</body>
<?php


if(!is_null($error))
{
    echo '<script>$("#contact-modal").modal("show");</script>';
}


unset($_SESSION['error']);
unset($_SESSION['name']);
unset($_SESSION['email']);
unset($_SESSION['message']);

?>
</html>
