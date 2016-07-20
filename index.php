<?php

session_start();

require_once 'security.php';

$error = isset($_SESSION['error']) ? $_SESSION['error'] : null;

$servername = "localhost";
$username = "kipp_admin";
$password = "Lemongrab80!";
$db = "kipp_blogs";

$username = "root";
$password = "";
$db = "personal";

$conn = new mysqli($servername, $username, $password, $db);
if ($conn->connect_error)
{
    die("Connection failed: " . $conn->connect_error);
}else
{
    mysqli_set_charset($conn,"utf8");

    $blogs = [];
    $sql = "SELECT * FROM blogs";

    $result = $conn->query($sql);
    if($result->num_rows > 0)
    {
        foreach($result as $row)
        {
            $date = $row['date'];
            $id = $row['id'];
            $images = $row['images'];
            $links = $row['links'];
            $text = $row['text'];
            $title = $row['title'];

            $row_array = array('date'=>$date,'id'=>$id,'images'=>$images,'links'=>$links,'text'=>$text,'title'=>$title);
            array_push($blogs, $row_array);
        }
    }
$conn->close();
}

?>

<!DOCTYPE html>
<html lang="en">
<head>
<title>Brandon W. Kipp</title>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">

<!-- Latest compiled and minified CSS -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
<link rel="stylesheet" href="styles/styles.css"/>

<script src="https://platform.twitter.com/widgets.js"></script>

</head>
<body>
    <div class="col-md-2 hidden-sm hidden-xs" style="height:100%;">
        <div id="blurb">
            <p id="greeting">hello.</p>
            <p id="bio">My name is Brandon and I &lt;3 the internet. I'm also an aspiring web developer with passions for
            web UI/UX design and music technology. My biggest goal in web design right now, is to make peoples' lives
            easier through my intuitive web app: <a class="links" href="../soundsword/index.php" target="_blank">SoundSword</a>. Aside from all that, I love
            business, philosophy, finance, bots, reading, tea, rum, biking, and live music.</p>
        </div>
    </div>
    <div id="content" class="col-md-10 col-sm-12">
        <div id="name-container">
            <div id="name">Brandon W. Kipp</div>
            <img id="portrait" draggable="false"></img>
        </div>
        <div class="tabs-center">
            <ul id="navTabs" class="nav nav-tabs nav-justified container hidden-xs">
                <li id="projects">
                    <a class="dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
                        Projects<span class="caret"></span>
                    </a>
                    <ul class="dropdown-menu">
                        <li><a href="../soundsword/index.php" target="_blank">SoundSword - a sound editing web app</a></li>
                        <li><a href="https://brandonwkipp.github.io/knobject-js" target="_blank">Knobject.js - a JavaScript Knob component</a></li>
                        <li><a href="https://github.com/brandonwkipp/DrumDuino/blob/master/DRUMDUINO.ino" target="_blank">DRUMDUINO - an Arduino sketch for MIDI controllers</a></li>
                        <li><a id="bots" href="#">BotNet - my personal collection of Twitter Bots</a></li>
                    </ul>
                </li>
                <li id="blog" class="active"><a href="#">Blog</a></li>
                <li id="resume" data-toggle="modal" data-target="#resume-modal"><a href="#">Resume</a></li>
                <li id="connect">
                    <a class="dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
                        Connect<span class="caret"></span>
                    </a>
                    <ul class="dropdown-menu">
                        <li><a href="https://twitter.com/brandonwkipp" target="_blank"><img class="icon" src="images/icons/twitter-icon.png"/> Twitter</a></li>
                        <li><a href="https://linkedin.com/in/brandonwkipp" target="_blank"><img class="icon" src="images/icons/linkedin-icon.png"/> LinkedIn</a></li>
                        <li><a href="https://soundcloud.com/brandonwkipp" target="_blank"><img class="icon" src="images/icons/soundcloud-icon.png"/> SoundCloud</a></li>
                        <li><a href="https://reddit.com/user/BlackestNapkin" target="_blank"><img class="icon" src="images/icons/reddit-icon.png"/> Reddit</a></li>
                        <li><a href="https://github.com/brandonwkipp" target="_blank"><img class="icon" src="images/icons/github-icon.png"/> Github</a></li>
                    </ul>
                </li>
                <li id="contact"><a href="#" data-toggle="modal" data-target="#contact-modal">Contact</a></li>
            </ul>
            <div class="panel-group hidden-sm hidden-md hidden-lg">
                <div class="panel panel-default">
                    <div class="panel-heading" data-toggle="collapse" href="#mobile-menu">
                        <h4 class="panel-title">Menu</h4>
                    </div>
                    <div id="mobile-menu" class="panel-collapse collapse">
                        <ul class="list-group">
                            <li id="mobile-projects" class="list-group-item panel-group" data-toggle="collapse" href="#mobile-projects-menu">
                                <div class="panel panel-default panel-panel"><span class="pointer">Projects</span><span class="caret pointer"></span>
                                    <div id="mobile-projects-menu" class="panel-collapse collapse">
                                        <ul class="list-group mobile-ul">
                                            <li class="list-group-item mobile-list-item"><a href="../soundsword/index.php">SoundSword - a sound editing web app</a></li>
                                            <li class="list-group-item mobile-list-item"><a href="https://brandonwkipp.github.io/knobject-js">Knobject.js - a JavaScript Knob component</a></li>
                                            <li class="list-group-item mobile-list-item"><a href="https://github.com/brandonwkipp/DrumDuino/blob/master/DRUMDUINO.ino">DRUMDUINO - an Arduino sketch for MIDI controllers</a></li>
                                            <li id="mobile-bots" class="list-group-item mobile-list-item"><a href="#">BotNet - my personal collection of Twitter Bots</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </li>
                            <li id="mobile-blog" class="active list-group-item" data-toggle="collapse" data-target="#mobile-menu">Blog</li>
                            <li id="mobile-resume" class="list-group-item" data-toggle="modal" data-target="#resume-modal">Resume</li>
                            <li id="mobile-connect" class="list-group-item panel-group" data-toggle="collapse" href="#mobile-connect-menu">
                                <div class="panel panel-default panel-panel">Connect<span class="caret"></span>
                                    <div id="mobile-connect-menu" class="panel-collapse collapse">
                                        <ul class="list-group mobile-ul">
                                            <li class="list-group-item mobile-list-item"><a href="https://linkedin.com/in/brandonwkipp"><img class="icon" src="images/icons/linkedin-icon.png"/> LinkedIn</a></li>
                                            <li class="list-group-item mobile-list-item"><a href="https://github.com/brandonwkipp"><img class="icon" src="images/icons/github-icon.png"/> Github</a></li>
                                            <li class="list-group-item mobile-list-item"><a href="https://twitter.com/brandonwkipp"><img class="icon" src="images/icons/twitter-icon.png"/> Twitter</a></li>
                                            <li class="list-group-item mobile-list-item"><a href="https://soundcloud.com/brandonwkipp"><img class="icon" src="images/icons/soundcloud-icon.png"/> SoundCloud</a></li>
                                            <li class="list-group-item mobile-list-item"><a href="https://reddit.com/user/BlackestNapkin"><img class="icon" src="images/icons/reddit-icon.png"/> Reddit</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </li>
                            <li id="mobile-contact" class="list-group-item" data-toggle="modal" data-target="#contact-modal">Contact</li>
                        </ul>
                    </div>
                </div></a>
            </div>
        </div>
        <div id="content-box"></div>
    </div>
<!-- Latest compiled and minified jQuery -->
<script src="//code.jquery.com/jquery-1.12.0.min.js"></script>
<!-- Latest compiled and minified JavaScript -->
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script>

<!-- Scripts -->
<script type="text/javascript" src="scripts/script.js"></script>

<script>
init('<?php echo json_encode($blogs, JSON_HEX_APOS | JSON_HEX_QUOT) ?>');
</script>

<div id="contact-modal" class="modal fade" role="dialog">
    <div class="modal-dialog">
        <!-- Modal content-->
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
<div id="resume-modal" class="modal fade" role="dialog">
    <div class="modal-dialog">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <div id="resume-img" draggable="false"></div>
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
