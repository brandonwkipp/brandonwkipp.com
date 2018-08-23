<?php
//ini_set('display_errors', TRUE);
//ini_set('display_startup_errors', TRUE);
//error_reporting(E_ALL | E_WARNING | E_NOTICE);

session_start();

$servername = "localhost";
$username = "root";
$password = '666**MY$QLPERSONAL**666';
$db = "kipp_blogs";

//$username = "root";
//$password = "";
//$db = "personal";

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

<!-- Latest compiled and minified jQuery -->
<script src="//code.jquery.com/jquery-1.12.0.min.js"></script>
<!-- Latest compiled and minified JavaScript -->
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script>
<!-- Twitter -->
<script src="https://platform.twitter.com/widgets.js"></script>

</head>
<body>
    <div class="col-md-2 hidden-sm hidden-xs" style="height:100%;">
        <div id="blurb">
            <p id="greeting">hello.</p>
            <p id="bio">My name is Brandon and I &lt;3 music and internet technology. Lately, life has been pretty busy; right now, I'm working full-time
		in Minneapolis, producing and recording music, building a virtual drum set, and hacking around on my ridiculous amount of servers at home.
		This website is pretty out-of-date bu I've got some interesting plans coming within the next few months :)
	    </p>
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
			<li><a href="https://github.com/brandonwkipp/raspbeat/" target="_blank">Raspbeat - a really hacked together attempt at making a virtual drumset</a></li>
                        <li><a href="http://soundsword.brandonwkipp.com/about" target="_blank">SoundSword - a sound editing web app</a></li>
                        <li><a href="https://brandonwkipp.github.io/knobject-js" target="_blank">Knobject.js - a JavaScript Knob component</a></li>
                        <li><a href="https://brandonwkipp.com/markets/" target="_blank">Precious Metal Calculator - a precious metals price data-scraper </a></li>
                    </ul>
                </li>
                <li id="blog" class="active"><a href="#">Blog</a></li>
                <li id="connect">
                    <a class="dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
                        Connect<span class="caret"></span>
                    </a>
                    <ul class="dropdown-menu">
                        <li><a href="https://github.com/brandonwkipp" target="_blank"><img class="icon" src="images/icons/github-icon.png"/> Github</a></li>
                        <li><a href="https://linkedin.com/in/brandonwkipp" target="_blank"><img class="icon" src="images/icons/linkedin-icon.png"/> LinkedIn</a></li>
                        <li><a href="https://twitter.com/brandonwkipp" target="_blank"><img class="icon" src="images/icons/twitter-icon.png"/> Twitter</a></li>
                        <li><a href="https://soundcloud.com/brandonwkipp" target="_blank"><img class="icon" src="images/icons/soundcloud-icon.png"/> SoundCloud</a></li>
                    </ul>
                </li>
            </ul>
            <div class="panel-group hidden-sm hidden-md hidden-lg">
                <div class="panel panel-default">
                    <button type="button" class="btn btn-lg btn-block panel-button" data-toggle="collapse" data-target="#mobile-menu" href="#mobile-menu">Menu</button>
                    <div id="mobile-menu" class="panel-collapse collapse">
                        <ul class="list-group">
                            <li id="mobile-projects" class="list-group-item panel-group li-button">
                                <div class="panel panel-default panel-panel">
                                    <button type="button" class="btn btn-block menu-button" data-toggle="collapse" data-target="#mobile-projects-menu" href="#mobile-projects-menu">
                                        <span class="pointer">Projects</span><span class="caret pointer"></span>
                                    </button>
                                    <div id="mobile-projects-menu" class="panel-collapse collapse">
                                        <ul class="list-group mobile-ul">
                                            <li class="list-group-item mobile-list-item"><a href="https://github.com/brandonwkipp/raspbeat">DRUMDUINO - hacky virtual drumset</a></li>
					    <li class="list-group-item mobile-list-item"><a href="http://soundsword.brandonwkipp.com">SoundSword - a sound editing web app</a></li>
                                            <li class="list-group-item mobile-list-item"><a href="https://brandonwkipp.github.io/knobject-js">Knobject.js - a JavaScript Knob component</a></li>
                                            <li class="list-group-item mobile-list-item">
						<a href="https://brandonwkipp.com/markets/" target="_blank">Precious Metal Calculator - a financial commodity data-scraper</a>
					    </li>
                                        </ul>
                                    </div>
                                </div>
                            </li>
                            <li id="mobile-blog" class="list-group-item panel-group li-button">
                                <div class="panel panel-default panel-panel">
                                    <button type="button" class="btn btn-block menu-button" data-toggle="collapse" data-target="#mobile-menu" href="#mobile-menu">
                                        <span class="pointer">Blog</span>
                                    </button>
                                </div>
                            </li>
                            <li id="mobile-connect" class="list-group-item panel-group li-button">
                                <div class="panel panel-default panel-panel">
                                    <button type="button" class="btn btn-block menu-button" data-toggle="collapse" data-target="#mobile-connect-menu" href="#mobile-connect-menu">
                                        <span class="pointer">Connect</span><span class="caret pointer"></span>
                                    </button>
                                    <div id="mobile-connect-menu" class="panel-collapse collapse">
                                        <ul class="list-group mobile-ul">
                                            <li class="list-group-item mobile-list-item"><a href="https://github.com/brandonwkipp"><img class="icon" src="images/icons/github-icon.png"/> Github</a></li>
                                            <li class="list-group-item mobile-list-item"><a href="https://linkedin.com/in/brandonwkipp"><img class="icon" src="images/icons/linkedin-icon.png"/> LinkedIn</a></li>
                                            <li class="list-group-item mobile-list-item"><a href="https://twitter.com/brandonwkipp"><img class="icon" src="images/icons/twitter-icon.png"/> Twitter</a></li>
                                            <li class="list-group-item mobile-list-item"><a href="https://soundcloud.com/brandonwkipp"><img class="icon" src="images/icons/soundcloud-icon.png"/> SoundCloud</a></li>
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
<!-- Scripts -->
<script type="text/javascript" src="scripts/script.js"></script>

<script>
init('<?php echo json_encode($blogs, JSON_HEX_APOS | JSON_HEX_QUOT) ?>');
</script>

<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-81048303-1', 'auto');
  ga('send', 'pageview');

</script>
</body>
</html>
