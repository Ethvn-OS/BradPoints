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

    if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['avail_reward_name'], $_POST['avail_reward_points'], $_POST['avail_reward_id'])) {
        $reward_name = $_POST['avail_reward_name'];
        $reward_points = (int)$_POST['avail_reward_points'];
        $reward_id = (int)$_POST['avail_reward_id'];
        $user_points = (int)$user_data['points'];
        $userID = (int)$user_data['id'];

        if ($user_points >= $reward_points) {
            $check_query = "SELECT * FROM redemption WHERE reward_id = $reward_id AND user_id = $userID";
            $check_result = mysqli_query($con, $check_query);

            if ($check_result && mysqli_num_rows($check_result) > 0) {
                $error_message = "You already availed $reward_name";
            } else {
                //Deduct points
                $update_query = "UPDATE users SET points = points - $reward_points WHERE id = $id";
                mysqli_query($con, $update_query);

                //Refresh user data
                $result = mysqli_query($con, $query);
                if ($result && mysqli_num_rows($result) > 0) {
                    $user_data = mysqli_fetch_assoc($result);
                }

                //Use this block of code for future random id's hehe
                //Insert daan ang row so that ang $last_id naay value
                $placeholder_code = "PENDING";
                $redemption_query = "INSERT INTO redemption (user_id, reward_id, redemption_id) VALUES (?,?,?)";
                $stmt = mysqli_prepare($con, $redemption_query);
                mysqli_stmt_bind_param($stmt, "iis", $id, $reward_id, $placeholder_code);
                mysqli_stmt_execute($stmt);

                //This generates unique redemption code
                $last_id = mysqli_insert_id($con);
                $code = rand(10000, 99999);
                $redemption_id = "BRAD" . $code . "_" . $last_id;

                //This updates the redemption query
                $update_redem_query = "UPDATE redemption SET redemption_id = '$redemption_id' WHERE id = $last_id";
                $update_stmt = mysqli_query($con, $update_redem_query);

                $success_message = "You have successfully availed $reward_name! Your voucher code is <b>$redemption_id</b>. Show this to the cashier to claim your prize.";
            }
        } else {
            $error_message = "You do not have enough points to avail $reward_name.";
        }
    }

    $rewards = [];

    $rewards_query = "SELECT id, reward_name, reward_desc, reward_points FROM rewards";

    $rewards_result = mysqli_query($con, $rewards_query);
    if ($rewards_result) {
        while ($row = mysqli_fetch_assoc($rewards_result)) {
            $rewards[] = $row;
        }
    }
?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="home.css">
    <link href="https://fonts.googleapis.com/css2?family=Forum&family=Lora:ital,wght@0,400..700;1,400..700&family=Source+Serif+4:ital,opsz,wght@0,8..60,200..900;1,8..60,200..900&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Forum&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Lora:ital,wght@0,400..700;1,400..700&family=Source+Serif+4:ital,opsz,wght@0,8..60,200..900;1,8..60,200..900&display=swap" rel="stylesheet">
    <title>BradPoints Rewards</title>
</head>
<body>
    <?php include "includes/rewards.html" ?>

    <script src="script.js"></script>
</body>
</html>