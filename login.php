<?php
    session_start();

    include("connection.php");
    include("functions.php");


    if ($_SERVER['REQUEST_METHOD'] == "POST") {
        //someting was posted
        $user_name = $_POST['user_name'];
        $password = $_POST['password'];

        if(!empty($user_name) && !empty($password) && !is_numeric($user_name)) {

            //read from database
            $query = "SELECT * FROM users WHERE user_name = '$user_name' LIMIT 1";

            $result = mysqli_query($con, $query);

            if($result && mysqli_num_rows($result) > 0) {

                $user_data = mysqli_fetch_assoc($result);

                if (password_verify($password, $user_data['password'])) {

                    $_SESSION["authenticated"] = true;
                    $_SESSION['id'] = $user_data['id'];
                    $_SESSION['user'] = $user_data;

                    if ($user_data['usertype_id'] == 2) {
                        header("Location: http://localhost:3000/");
                    } else if ($user_data['usertype_id'] == 1) {
                        header("Location: cashier.php");
                    } else {
                        header("Location: admin.php");
                    }

                    die;
                }
            }
            $error_message = "Wrong username or password.";
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
    <title>BradPoints Login</title>
    <link rel="stylesheet" href="loginsignup.css">
    <link href="https://fonts.cdnfonts.com/css/coolvetica-2" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
</head>
<body class="loginbody">
    <?php include "includes/login.html" ?>
</body>
</html>