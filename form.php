<?php

session_start();

require_once 'PHPMailerAutoload.php';

$error = '';

if(isset($_POST['name'], $_POST['email'], $_POST['message']))
{
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];

    if(!preg_match("/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/i",$email))
    {
        $error = "Error: Invalid email address";
    }

    if(empty($_POST['name']) || empty($_POST['email']) || empty($_POST['message']))
    {
        $error = "Error: All fields are required.";
    }
    if(empty($error))
    {
        $mail = new PHPMailer;

        $mail->isSMTP();
        $mail->SMTPAuth = true;

        $mail->Host = 'smtp.gmail.com';
        $mail->Username = 'blackestnapkin@gmail.com';
        $mail->Password = 'Redcharm15';
        $mail->SMTPSecure = 'ssl';
        $mail->Port = 465;

        $mail->isHTML();

        $mail->Subject = 'Contact form submitted';
        $mail->Body = 'From: ' . $_POST['name'] . ' (' . $_POST['email'] . ')<p>' . $_POST['message'] . '</p>';

        $mail->FromName = 'Contact Form';

        $mail->AddAddress('blackestnapkin@gmail.com', 'Brandon Kipp');
        if($mail->send())
        {
            header('Location: reboot.php');
            die();
        }else
        {
            $error = 'Sorry, could not send email. Try again later.';
        }
    }
}else
{
    $error = 'Something went wrong.';
}

/*
if(empty($errors))
{
    $to = $myemail;
    $email_subject = "Contact form submission: $name";
    $email_body = "You have received a new message. " . " Here are the details:\n Name: $name \n " . "Email: $email_address\n Message \n $message";
    $headers = "From: $myemail\n";
    $headers .= "Reply-To: $email_address";
    mail($to,$email_subject,$email_body,$headers);
}
*/
$_SESSION['error'] = $error;
$_SESSION['name'] = $name;
$_SESSION['email'] = $email;
$_SESSION['message'] = $message;

header('Location: reboot.php');

?>
