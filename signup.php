<?php
    session_start();

    include("connection.php");
    include("functions.php");

    if ($_SERVER['REQUEST_METHOD'] == "POST") {
        $user_name = $_POST['user_name'];
        $email = $_POST['email'];
        $password = $_POST['password'];
        $confirm_password = $_POST['confirm-password'];

        if(!empty($user_name) && !empty($email) && !empty($password) && !empty($confirm_password)) {

            if (!preg_match('/^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d]).+$/', $user_name)) {
                $error_message = "Username must include at least one letter, one number, and one special character.";
            } else if (strlen($password) < 8) {
                $error_message = "Password must be at least 8 characters.";
            } else if ($password !== $confirm_password) {
                $error_message = "Passwords do not match.";
            } else {
                if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                    $error_message = "Invalid email format.";
                }
                //Check if username already exists
                $check_query = "SELECT id FROM users WHERE (user_name = '$user_name' OR email = '$email') AND isDeleted = 0 LIMIT 1";
                $check_result = mysqli_query($con, $check_query);

                if ($check_result && mysqli_num_rows($check_result) > 0) {
                    $error_message = "Username or email already taken. Please choose another.";
                } else {
                    $hashed_password = password_hash($password, PASSWORD_DEFAULT);
                    $query = "INSERT INTO users (user_name, email, password) VALUES ('$user_name', '$email', '$hashed_password')";
                    if (mysqli_query($con, $query)) {
                        // Send welcome email
                        require_once 'email_helper.php';
                        sendWelcomeEmail($email, $user_name);
                    }
                    $addCustomer = "INSERT INTO customers (user_id)
                                    SELECT id
                                    FROM users
                                    WHERE user_name = '$user_name'";
                    mysqli_query($con, $addCustomer);
                    header("Location: login.php");
                    die;
                }
            }
        } else {
            $error_message = "Please enter valid information.";
        }
    }
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BradPoints Sign Up</title>
    <link rel="stylesheet" href="loginsignup.css">
    <link href="https://fonts.cdnfonts.com/css/coolvetica-2" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
</head>
<body class="loginbody">
    <?php include "includes/signup.html" ?>
</body>
</html>