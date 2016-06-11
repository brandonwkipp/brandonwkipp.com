<?php 
session_start();
$dbhost = "localhost";
$dbuser = "diddykong";
$dbpass = "12Tiptup*";
$dbname = "personal";
$connection = mysqli_connect($dbhost, $dbuser, $dbpass, $dbname);
	if(mysqli_connect_errno()) {
		die("Database connection failed: " . mysqli_connect_error() . " (" . mysqli_connect_errno() . ")"
		);
	}
foreach ($_POST as $key => $value) {
	$$key = mysqli_real_escape_string($connection, $value);
}
if(empty($first_name)) {
	$_POST['a'] = true;
	header("Location: login.php");
}elseif(empty($last_name)) { 
	$_POST['b'] = true;
	header("Location: login.php");
}elseif(empty($email)) {
	$_POST['c'] = true;
	header("Location: login.php");
}elseif(empty($username)) {
	$_POST['d'] = true;
	header("Location: login.php");
}elseif(empty($password)) {
	$_POST['e'] = true;
	header("Location: login.php");
}else {
	$query = "INSERT INTO users (first_name, last_name, email, username, password) VALUES ('$first_name','$last_name','$email','$username', '$password')";
	$result = mysqli_query($connection, $query);

	if(!$result) {
		die("Database query failed. Didn't get result." . mysqli_errno($connection));
	}
	header("Location: login.php");
}
mysqli_free_result($result);
mysqli_close($connection); 
?>

<!--instead of posting variables, send things in the url, then in login, take the url data and use that to trigger $reg_first-->