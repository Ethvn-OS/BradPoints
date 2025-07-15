<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Include PHPMailer files
require 'phpmailer/Exception.php';
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';

function sendWelcomeEmail($user_email, $user_name) {
    $mail = new PHPMailer(true);

    try {
        // Server settings
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = '22101521@usc.edu.ph';
        $mail->Password   = 'kxde emao hloz rsyo'; 
        $mail->SMTPSecure = 'tls';
        $mail->Port       = 587;

        // Recipients
        $mail->setFrom('yourgmail@gmail.com', 'BradPoints');
        $mail->addAddress($user_email, $user_name);

        // Content
        $mail->isHTML(true);
        $mail->Subject = 'Welcome to BradPoints!';
        $mail->Body    = "
            <h2>Welcome to BradPoints, $user_name!</h2>
            <p>Thank you for signing up. We're excited to have you on board!</p>
            <p>You can now log in to your account and start earning points.</p>
        ";

        $mail->send();
        return true;
    } catch (Exception $e) {
        error_log("Email could not be sent. Mailer Error: {$mail->ErrorInfo}");
        return false;
    }
}
?>