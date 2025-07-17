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

    $success_message = '';
    $error_message = '';

    //Create reward
    if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['add_reward'])) {
        $rewardname = trim($_POST['rewardName']);
        $rewarddesc = trim($_POST['desc']);
        $rewardpoints = (int)$_POST['points'];

            //Check if product already exists
            $check_query = "SELECT id FROM rewards WHERE reward_name = '$rewardname' AND isDeleted = 0 LIMIT 1";
            $check_result = mysqli_query($con, $check_query);

            if ($check_result && mysqli_num_rows($check_result) > 0) {
                $error_message = "Reward already exists.";
            } else {
                $create_query = "INSERT INTO rewards (reward_name, reward_desc, reward_points) VALUES (?, ?, ?)";
                $stmt = mysqli_prepare($con, $create_query);
                mysqli_stmt_bind_param($stmt, "ssi", $rewardname, $rewarddesc, $rewardpoints);
                if (mysqli_stmt_execute($stmt)) {
                    $success_message = "Reward added!";
                } else {
                    $error_message = "Failed to add reward.";
                }
                mysqli_stmt_close($stmt);
            }
    }

    //Update reward
    if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['edit_user'])) {

        $edit_id = intval($_POST['edit_id']);
        $edit_rewardname = trim($_POST['edit_rewardname']);
        $edit_rewarddesc = trim($_POST['edit_rewarddesc']);
        $edit_rewardpoints = (int)$_POST['edit_rewardpoints'];

        $edit_query = "UPDATE rewards SET reward_name = ?, reward_desc=?, reward_points=? WHERE id=?";
        $stmt = mysqli_prepare($con, $edit_query);
        mysqli_stmt_bind_param($stmt, "ssii", $edit_rewardname, $edit_rewarddesc, $edit_rewardpoints, $edit_id);
        if (mysqli_stmt_execute($stmt)) {
            $success_message = "Reward updated!";
        } else {
            $error_message = "Failed to update reward.";
        }
        mysqli_stmt_close($stmt);
    }

    //Delete reward
    if (isset($_GET['delete'])) {
        $delete_id = intval($_GET['delete']);
        $delete_query = "UPDATE rewards
                         SET isDeleted = 1
                         WHERE id = ?";
        $stmt = mysqli_prepare($con, $delete_query);
        mysqli_stmt_bind_param($stmt, "i", $delete_id);
        if (mysqli_stmt_execute($stmt)) {
            $success_message = "Reward deleted!";
        } else {
            $error_message = "Failed to delete reward.";
        }
        mysqli_stmt_close($stmt);
    }

    $all_rewards = [];

    $rewards_query = "SELECT id, reward_name, reward_desc, reward_points, isDeleted FROM rewards";
    $reward_results = mysqli_query($con, $rewards_query);

    if ($reward_results) {
        while ($row = mysqli_fetch_assoc($reward_results)) {
            $all_rewards[] = $row;
        }
    }

?>


<!DOCTYPE html>
<html lang="en" class="admin-body">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BradPoints Admin | Rewards</title>
    <link rel="stylesheet" href="permanent.css">
    <link rel="stylesheet" href="home.css">
    <link rel="stylesheet" href="admin.css">
    <link href="https://fonts.cdnfonts.com/css/coolvetica-2" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body class="admin-body">
    <?php include "includes/sidebar.html" ?>
    <div class="main-containeradmin">
        <header class="site-header">
            <h1><i class="fas fa-gift"></i> Rewards</h1>
        </header>
        <main class="dashboard-content">
            <?php include "includes/rewardsadmin.html" ?>
        </main>
    </div>

    <script src="script.js"></script>
</body>
</html>