<?php
	session_start();
	if(isset($_GET['logout'])) {
		unset($_SESSION['loggedIn']);
	}
	if(!isset($_SESSION['loggedIn']) || !$_SESSION['loggedIn']) {
		header("Location: login.php");
	}
	/*Create Event deletion on schedule every 5 minute do delete from personal.users where id > 0;*/
?>
<!DOCTYPE html>
<html lang="en">
<head>
<title>Logged In</title>
<link rel="stylesheet" type="text/css" href="loggedin.css">
<meta charset="UTF-8">
</head>

<body>
	<div id="back"><a href="index.html"><strong>Back to main page.</strong></a></div>
	<div id="congrats">
		You have successfully registered and logged in. I hope you enjoyed that little exercise. However,
		in about 5 minutes, the profile you created will be automatically deleted from the database. Sorry!
		Anyway, why you don't you check out some of my other projects? I've posted the links below. Thank you for 
		visiting my site!
	</div>
	<br/>
	<div id="container">
		<a href="/cards"><div id="jsProj">
			<div id="jsText"><br />Javascript Project:<br />Deck of Cards</div>
			<div id="card">
				<div id="topCorner">A</div>
				<div id="cardCenter">&clubs;</div>
				<div id="bottomCorner">A</div>
			</div>
		</div></a>
		<a href="http://pupilsofthepupil.com"><div id="webProj">
			<div id="webText"><br />Website Design:<br />for Client</div>
			<div id="webAlbum"><img src="album.jpg" width="83" height="83" /></div>
		</div></a>
	</div>
	<div id="copyright">
		<p>BrandonKipp.com &copy; 2015</p>
	</div>
</body>
</html>