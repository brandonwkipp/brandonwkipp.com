<?php
require_once 'init.php';

$error = null;
$redirect = null;
$register_email = '';
$register_username = '';
$login_username = '';

if(isset($_SESSION['error']))
{
    $error = $_SESSION['error'];
}
if(isset($_SESSION['mobile']))
{
    $redirect = $_SESSION['mobile'];
}

?>
<!DOCTYPE html>
<html>
<head>
    <title>SoundSword | Edit Online</title>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link rel="stylesheet" type="text/CSS" href="styles/index.css"/>
    <!-- Latest compiled and minified CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
</head>
<body>
    <nav class="navbar navbar-inverse navbar-fixed-top">
        <div class="navbar-header">
            <div class="navbar-brand montserrat">SoundSword</div>
        </div>
        <div class="container navbar-container">
            <ul class="nav navbar-nav">
                <li class="active"><a href="#">Home</a></li>
                <li class="hidden-xs"><a href="#" data-toggle="modal" data-target="#login-modal">Login</a></li>
            </ul>
        </div>
    </nav>
    <div class="container divider-container">
        <div class="header-title">
            <span class="image-title montserrat">
                SoundSword
            </span>
            <h4>Cut through the noise.</h4>
        </div>
        <div class="panel odd-panel">
            <div class="panel-body">
                <div class="col-lg-6 col-md-6 hidden-sm hidden-xs">
                    <div class="marketing-panel-image">
                        <img src="images/product-2.png" class="image-border" width="100%"/>
                    </div>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 panel-text">
                    <div class="marketing-panel-title montserrat">
                        Accessible. Intuitive. Dynamic.
                    </div>
                    <p>
                        Unlike traditional audio editors, SoundSword runs inside your browser.
                        There are no files to download and no updates to install—leaving you more time
                        to create your masterpiece.
                    </p>
                    <br/>
                    <h4>
                        Features
                        <span class="glyphicon glyphicon-equalizer" aria-hidden="true"></span>
                    </h4>
                    <ul class="list">
                        <li>Powerful audio routing with multichannel support.</li>
                        <li>32-bit float internal audio processing.</li>
                        <li>Import and render to a variety media formats.</li>
                        <li>Dozens of studio-quality effects for processing audio.</li>
                    </ul>
                </div>
                <div class="hidden-lg hidden-md col-sm-12 col-xs-12">
                    <div class="marketing-panel-image">
                        <img src="images/product-2.png" class="image-border" width="100%"/>
                    </div>
                </div>
            </div>
        </div>
        <div class="panel even-panel">
            <div class="panel-body">
                <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 panel-text">
                    <div class="marketing-panel-title montserrat">
                        SoundSword goes where you go.
                    </div>
                    <p>
                        Inspire your sound with SoundSwords’s intuitive work flow right from the comfort of your laptop.
                        Everything you need to edit and remix your audio tracks is at your fingertips, and any changes are
                        always saved in the cloud.
                    </p>
                    <br/>
                    <h4>
                        Your Location
                        <span class="glyphicon glyphicon-globe" aria-hidden="true"></span>
                    </h4>
                    <ul class="list">
                        <li>Provides up 25 GB of storage</li>
                        <li>No more transferring large files between hard drives</li>
                        <li>Access your projects from any computer with an internet connection</li>
                        <li>Keeps backups of your current project and automatically saves your progress</li>
                    </ul>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <div class="marketing-panel-image">
                        <img src="images/mixer.jpeg" class="image-border" width="100%"/>
                    </div>
                </div>
            </div>
        </div>
        <div class="panel odd-panel">
            <div class="panel-body">
                <div class="col-lg-6 col-md-6 hidden-sm hidden-xs">
                    <div class="marketing-panel-image">
                        <img src="images/collaborate.jpg" class="image-border" width="100%"/>
                    </div>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 panel-text">
                    <div class="marketing-panel-title montserrat">
                        Collaborate with your crew.
                    </div>
                    <p>
                        With SoundSword, you don't have to be alone in your creative moments. Share tracks with your
                        collaborators in real time. Our branching feature allows everyone to experiment with the sound—all
                        while keeping an original version intact.
                    </p>
                    <br/>
                    <h4>
                        Easy access
                        <span class="glyphicon glyphicon-duplicate" aria-hidden="true"></span>
                    </h4>
                    <ul class="list">
                        <li>Easily add up to five friends on any project to work with you</li>
                        <li>Assign any level of access permissions to your collaborators</li>
                        <li>Track multiple versions of your project via simple version control</li>
                        <li>View any collaborator's edits instantly</li>
                    </ul>
                </div>
                <div class="hidden-lg hidden-md col-sm-12 col-xs-12">
                    <div class="marketing-panel-image">
                        <img src="images/collaborate.jpg" class="image-border" width="100%"/>
                    </div>
                </div>
            </div>
        </div>
        <div class="panel even-panel">
            <div class="panel-body">
                <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 panel-text">
                    <div class="marketing-panel-title montserrat">
                        Get Started
                        &nbsp;
                        <span class="glyphicon glyphicon-headphones" aria-hidden="true"></span>
                    </div>
                    <br/>
                    <br/>
                    <p>
                        Signing up for SoundSword is simple. Click the button below to join and
                        start editing your music online today.
                    </p>
                    <br/>
                    <br/>
                    <button id="join" type="button" class="btn btn-secondary btn-lg btn-block" data-toggle="modal" data-target="#login-modal">
                        Sign Up!
                    </button>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <div class="marketing-panel-image">
                        <img src="images/mixing.jpeg" class="image-border" width="100%"/>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer-row montserrat">
            <div class="container-fluid link-container">
                <a class="spaced" href="#">News</a>
                <a class="spaced" href="#">Cookies</a>
                <a class="spaced" href="#">Legal</a>
                <a class="spaced" href="#">Terms of Use</a>
                <a class="spaced" href="#">Privacy</a>
                <a class="spaced" href="#">About Us</a>
                <a class="spaced" href="#">Contact Us</a>
            </div>
        </div>
    </div>

<!-- Latest compiled and minified jQuery -->
<script src="//code.jquery.com/jquery-1.12.0.min.js"></script>

<!-- Latest compiled and minified JavaScript -->
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script>

<!-- Modal -->
<div id="login-modal" class="modal" role="dialog">
    <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-header">
            <span class="modal-title montserrat">User Login</span>
            <button id="login-close" type="button" class="close" data-dismiss="modal">&times;</button>
        </div>
        <span class="error-row">
            <?php
            if (!is_null($error))
            {
                ?><p style="color:#FF0000;"><?= $error; ?></p><?php
            }
            ?>
        </span>
        <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 login-col">
            <form id="login-form" name="login" action="login.php" method="post">
                <div class="login-form">
                    <label for="username">Username:</label><br/>
                    <input type="text" id="login_username" name="login_username" value="<?= $login_username; ?>" />
                </div>
                <br/>
                <div class="login-form">
                    <label for="username">Password:</label><br />
                    <input type="password" id="login_password" name="login_password" value="" />
                </div>
                <br/>
                <div class="login-form">
                    <input type="submit" name="login_submit" value="Login" />
                </div>
            </form>
        </div>
        <div class="hidden-lg hidden-md col-sm-12 col-xs-12 hr">
            <hr style="border-color: #000;"/>
        </div>
        <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 login-col">
            <p class="login-form">
                To test out the current version of SoundSword, login with the username "soundsword"
                and password "password". Please note, that work on SoundSword is ongoing and that some
                features may be disabled. Additionally, the Soundsword app can only be viewed on desktops
                at this time. Enjoy!
            </p>
        </div>
    </div>
</div>

<div id="redirect-modal" class="modal" role="dialog">
    <div class="modal-dialog">
        <div class="modal-header">
            <span class="modal-title montserrat">Mobile Users</span>
            <button id="login-close" type="button" class="close" data-dismiss="modal">&times;</button>
        </div>
        <div class="modal-content">
            <p class="redirect-text"><?php echo $_SESSION['mobile']; ?></p>
        </div>
    </div>
</div>

<?php

if(!is_null($error))
{
    echo '<script>$("#login-modal").modal("show");</script>';
}
if(!is_null($redirect))
{
    echo '<script>$("#redirect-modal").modal("show");</script>';
}

$_SESSION['error'] = null;
$_SESSION['mobile'] = null;

?>

</body>
</html>
