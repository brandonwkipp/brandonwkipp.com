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
        <div class="container-fluid nav-container">
            <div class="navbar-header">
                <div class="navbar-brand montserrat">SoundSword</div>
            </div>
            <div class="container navbar-container">
                <ul class="nav navbar-nav">
                    <li class="active"><a href="#">Home</a></li>
                    <li><a href="explore">Explore</a></li>
                    <li class="hidden-xs"><a href="#" data-toggle="modal" data-target="#login-modal">Login</a></li>
                    <li><a href="#">My Account</a></li>
                </ul>
            </div>
        </div>
    </nav>
    <div class="container divider-container">
        <span class="image-title montserrat">
            Edit Online with SoundSword
        </span>
        <div class="row image-row">
            <div class="image-container">
                <img src="images/product-2.png" width="100%"/>
            </div>
        </div>
        <div class="row divider-row">
            <div class="col-md-4 col-sm-12 divider">
                <div class="divider-title">
                    <span class="column-title montserrat">
                        Audio Editing
                        &nbsp;
                        <span class="glyphicon glyphicon-file" aria-hidden="true"></span>
                    </span>
                </div>
                <p>SoundSword is a powerful, robust audio editing application. Unlike traditional Digital Audio Workstations,
                SoundSword runs inside your browser. There are no files to download and no updates to install, which means more
                time to create your masterpiece.</p>
                <p>SoundSword allows you to edit and collaborate on your recordings wherever you are because it's all stored in
                the cloud.</p>
            </div>
            <div class="col-md-4 col-sm-12 divider">
                <div class="divider-title">
                    <span class="column-title montserrat">
                        Features
                        &nbsp;
                        <span class="glyphicon glyphicon-equalizer" aria-hidden="true"></span>
                    </span>
                </div>
                <p>Inspire your sound with SoundSwords’s intuitive flow and ease of use rich set of features is at home.
                Everything you need to edit and remix your audio tracks is at your fingertips.</p>
                <p>With SoundSword, you don't have to be alone in your creative moments. You can share the experience and fun with friends!</p>
                <ul class="list">
                    <li>Efficient, fast to load, and tightly coded.</li>
                    <li>Powerful audio routing with multichannel support.</li>
                    <li>32-bit float internal audio processing.</li>
                    <li>Import and render to a variety media formats.</li>
                    <li>Dozens of studio-quality effects for processing audio.</li>
                </ul>
            </div>
            <div class="col-md-4 col-sm-12 divider">
                <div class="divider-title">
                    <span class="column-title montserrat">
                        Get Started
                        &nbsp;
                        <span class="glyphicon glyphicon-headphones" aria-hidden="true"></span>
                    </span>
                </div>
                <p>Signing up for SoundSword is fast, free, and super easy!</p>
                <p>Just click <a href="#" data-toggle="modal" data-target="#login-modal" style="color:#AAA;">here</a>,
                to start editing your music online today.</p>
            </div>
        </div>
        <div class="row footer-row montserrat">
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
            <span class="modal-title montserrat">SoundSword Login</span>
            <button type="button" class="close" data-dismiss="modal">&times;</button>
        </div>
        <div class="modal-body montserrat">
            <div class="error-row">
                <?php
                if (!is_null($error))
                {
                    ?><p style="color: #FF0000;"><?= $error; ?></p><?php
                }
                ?>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <form name="login" action="login.php" method="post">
                        <div>
                            <label for="username">Username:</label><br/>
                            <input type="text" id="login_username" name="login_username" value="<?= $login_username; ?>" />
                        </div>
                        <br/>
                        <div>
                            <label for="username">Password:</label><br />
                            <input type="password" id="login_password" name="login_password" value="" />
                        </div>
                        <br/>
                        <div>
                            <input type="submit" name="login_submit" value="Login" />
                        </div>
                    </form>
                </div>
                <div class="col-md-6">
                    <form name="signup" action="register.php" method="post">
                        <div>
                            <label for="email">Email:</label><br />
                            <input type="text" id="register_email" name="register_email" value="<?= $register_email; ?>" />
                        </div>
                        <br />
                        <div>
                            <label for="username">Username:</label><br />
                            <input type="text" id="register_username" name="register_username" value="<?= $register_username; ?>" />
                        </div>
                        <br />
                        <div>
                            <label for="username">Password:</label><br />
                            <input type="password" id="register_password" name="register_password" value="" />
                        </div>
                        <br />
                        <div>
                            <input type="submit" name="register_submit" value="Signup" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>

<div id="redirect-modal" class="modal" role="dialog">
    <div class="modal-dialog">
        <div class="modal-content">
            <p>One fine body&hellip;</p>
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

?>

</body>
</html>
