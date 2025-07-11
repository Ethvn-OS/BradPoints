<?php
session_start();

    include("connection.php");
    include("functions.php");

    check_login($con);

    $id = $_SESSION['id'];
    $query = "SELECT * FROM users WHERE id = '$id' LIMIT 1";

    $result = mysqli_query($con, $query);

    if ($result && mysqli_num_rows($result) > 0) {

        $user_data = mysqli_fetch_assoc($result);
    }

    $all_users = [];

    $users_query = "SELECT id, user_name, points FROM users WHERE usertype_id = 2";
    $users_results = mysqli_query($con, $users_query);

    if ($users_query) {
        while ($row = mysqli_fetch_assoc($users_results)) {
            $all_users[] = $row;
        }
    }
?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BradPoints Admin | Users</title>
    <link rel="stylesheet" href="permanent.css">
    <link rel="stylesheet" href="home.css">
    <link href="https://fonts.cdnfonts.com/css/coolvetica-2" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap" rel="stylesheet">
</head>
<body>
    <?php include "includes/sidebar.html" ?>
    <div class="main-container">
        <?php include "includes/users.html" ?>
    </div>

    <script src="script.js"></script>
</body>
</html>