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

    //Create user
    if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['add_user'])) {
        if ($_POST['usertype'] === 2) {
            $username = trim($_POST['username']);
            $points = intval($_POST['points']);
            if ($username !== '') {
                $create_query = "INSERT INTO users (user_name, points, usertype_id) VALUES (?, ?, 2)";
                $stmt = mysqli_prepare($con, $create_query);
                mysqli_stmt_bind_param($stmt, "si", $username, $points);
                if (mysqli_stmt_execute($stmt)) {
                    $success_message = "User added!";
                } else {
                    $error_message = "Failed to add user.";
                }
                mysqli_stmt_close($stmt);
            }
        } else {
            //cashier
        }
    }

    //Update user
    if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['edit_user'])) {
        $edit_id = intval($_POST['edit_id']);
        $edit_username = trim($_POST['edit_username']);
        $edit_points = intval($_POST['edit_points']);
        $edit_query = "UPDATE users SET user_name=?, points=? WHERE id=?";
        $stmt = mysqli_prepare($con, $edit_query);
        mysqli_stmt_bind_param($stmt, "sii", $edit_username, $edit_points, $edit_id);
        if (mysqli_stmt_execute($stmt)) {
            $success_message = "User updated!";
        } else {
            $error_message = "Failed to update user.";
        }
        mysqli_stmt_close($stmt);
    }

    //Delete user
    if (isset($_GET['delete'])) {
        $delete_id = intval($_GET['delete']);
        $delete_query = "DELETE FROM users WHERE id=?";
        $stmt = mysqli_prepare($con, $delete_query);
        mysqli_stmt_bind_param($stmt, "i", $delete_id);
        if (mysqli_stmt_execute($stmt)) {
            $success_message = "User deleted!";
        } else {
            $error_message = "Failed to delete user.";
        }
        mysqli_stmt_close($stmt);
    }

    $all_users = [];

    $users_query = "SELECT u.id, u.user_name, c.points 
                    FROM users u
                    LEFT JOIN customers c ON c.user_id = u.id
                    WHERE usertype_id = 2";
    $users_results = mysqli_query($con, $users_query);

    if ($users_results) {
        while ($row = mysqli_fetch_assoc($users_results)) {
            $all_users[] = $row;
        }
    }

    $all_cashiers = [];

    $cashier_query = "SELECT id, user_name
                      FROM users
                      WHERE usertype_id = 1";
    $cashier_results = mysqli_query($con, $cashier_query);

    if ($cashier_results) {
        while ($row = mysqli_fetch_assoc($cashier_results)) {
            $all_cashiers[] = $row;
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

    <div class="main-containeradmin">
        <header class="site-header">
            <h1>Users</h1>
        </header>
        <main class="dashboard-content">
            <?php include "includes/users.html" ?>
        </main>
    </div>

    <script src="script.js"></script>
</body>
</html>