<?php 
session_start();
$username = "";
$password = "";
$enter_user = false;
$enter_pass = false;
$reg_first = false;
$reg_last = false;
$reg_email = false;
$reg_user = false;
$reg_pass = false;
if(isset($_POST['register'])) {
	if($_POST['a']) {
		$reg_first = true;
	}
	if($_POST['b']) {
		$reg_last = true;
	}
	if($_POST['c']) {
		$reg_email = true;
	}
	if($_POST['d']) {
		$reg_user = true;
	}
	if($_POST['e']) {
		$reg_pass = true;
	}
}
if(isset($_POST['submit'])) {
	if((isset($_POST['username'])) && (isset($_POST['password']))) {
		$username = $_POST['username'];
		$password = $_POST['password'];
		if(trim($username) == "") {
			$enter_user = true;
		}elseif ($username && (trim($password) == "")) {
			$enter_pass = true;
		}else {
			$dbhost = "localhost";
			$dbuser = "diddykong";
			$dbpass = "12Tiptup*";
			$dbname = "personal";
			$connection = mysqli_connect($dbhost, $dbuser, $dbpass, $dbname);
				if(mysqli_connect_errno()) {
					die("Database connection failed: " . mysqli_connect_error() . " (" . mysqli_connect_errno() . ")"
					);
				}
			$user_query = "SELECT * FROM users WHERE username ='" . mysqli_real_escape_string($connection, $_POST['username']) . "' AND password = '" . mysqli_real_escape_string($connection, $_POST['password']) . "' LIMIT 1";
			if(!$user_result = mysqli_query($connection, $user_query)) {
				echo mysqli_error($connection);
			}

			while($fetch = mysqli_fetch_assoc($user_result)) {
				$_SESSION['loggedIn'] = true;
				header("Location: loggedin.php");
			}
			mysqli_free_result($user_result);
			mysqli_close($connection);
		}
	}
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
<title>Login</title>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="stylesheet" type="text/css" href="login.css">
</head>
<body>
<div id="back"><a href="index.html"><strong>Back to main page.</strong></a></div>
<div id="container">
	<div id="text"><p>This page shows an example of a login screen. Here, I'm using an HTML form to send data that a user
		types and using PHP to take the data and query it against a database I've created with MySQL.</p>
		<p>I've also included a registration form that inputs data a user enters into the user database. Go ahead 
		create a new user, and login if you'd like.</p>
	</div>	
	<div id="form">
		<form action="<?php echo $_SERVER['PHP_SELF'] ?>" method="post">
		<br/>
		<div class="message">
			<?php
				if($enter_user) {
					echo "Please enter a user name.";
				}
				elseif($enter_pass) {
					echo "Please enter password.";
				}else {
					echo "<br/>";
				}
			?>
		</div>
		<br/>
		<strong>Login</strong>
		<br/>
		<br/>
		Username: <input type="text" name="username" value="" /><br/>
		Password: <input type="password" name="password" value="" /><br/>
		<br/>
		<input id="button" type="submit" name="submit" value="Submit" />
		</form>
	</div>
	<table id="register">
		<form action="registration.php" method="post">
		<div class="message">
			<?php
				if($reg_first) {
					echo "Please enter your first name.<br/>";
				}
				if($reg_last) {
					echo "Please enter your last name.<br/>";
				}
				if($reg_email) {
					echo "Please enter a valid email address.<br/>";
				}
				if($reg_user) {
					echo "Please enter a username.<br/>";
				}
				if($reg_last) {
					echo "Please enter password.<br/>";
				}
				if(!$reg_user && !!$reg_pass && ! $reg_email && !$reg_first && !$reg_last) {
					echo "<br/>";
				}
			?>
		</div>
		<th>
			<strong>Register New User</strong>
		</th>
			<tr>
				<td>
					First Name: <input type="text" name="first_name" value="" /><br/>
				</td>
			</tr>
			<tr>
				<td>
					Last Name: <input type="text" name="last_name" value="" /><br/>
				</td>
			</tr>
			<tr>
				<td>
					Email Address: <input type="text" name="email" value="" /><br/>
				</td>
			</tr>
			<tr>
				<td>
					Username: <input type="text" name="username" value="" /><br/>
				</td>
			</tr>
			<tr>
				<td>
					Password: <input type="password" name="password" value="" /><br/>
				</td>
			</tr>
		<br/>
			<tr>
				<td>
					<input id="button" type="submit" name="register" value="Submit" />
				</td>
			</tr>
		</form>
	</table>
</div>

</body>
</html>