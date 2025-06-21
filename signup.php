<?php
    session_start();

    include("connection.php");
    include("functions.php");

    if ($_SERVER['REQUEST_METHOD'] == "POST") {
        $user_name = $_POST['user_name'];
        $password = $_POST['password'];
        $confirm_password = $_POST['confirm-password'];

        if(!empty($user_name) && !empty($password) && !empty($confirm_password)) {

            if ($password !== $confirm_password) {
                $error_message = "Passwords do not match.";
            } else {
                //Check if username already exists
                $check_query = "SELECT id FROM users WHERE user_name = '$user_name' LIMIT 1";
                $check_result = mysqli_query($con, $check_query);

                if ($check_result && mysqli_num_rows($check_result) > 0) {
                    $error_message = "Username already taken. Please choose another.";
                } else {
                    $hashed_password = password_hash($password, PASSWORD_DEFAULT);
                    $query = "INSERT INTO users (user_name, password) VALUES ('$user_name', '$hashed_password')";
                    mysqli_query($con, $query);

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
    <link rel="stylesheet" href="styles.css">
    <title>BradPoints Sign Up</title>
</head>
<body class="loginbody">
    <?php include "includes/signup.html" ?>
</body>
</html>