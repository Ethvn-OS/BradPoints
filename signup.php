<?php
    session_start();

    include("connection.php");
    include("functions.php");


    if ($_SERVER['REQUEST_METHOD'] == "POST") {
        //someting was posted
        $user_name = $_POST['user_name'];
        $password = $_POST['password'];

        if(!empty($user_name) && !empty($password) && !is_numeric($user_name)) {

            //checks if they are not NULL and saves to database

            $user_id = random_num(20);
            $query = "INSERT INTO users (user_id, user_name, password) VALUES ('$user_id', '$user_name', '$password')";

            mysqli_query($con, $query);

            header("Location: login.php");
            die;
        } else {
            echo "Please enter valid information.";
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