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

    $target_id = isset($_SESSION['target_id']) ? intval($_SESSION['target_id']) : 0;

    if($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['redeemvouch'])) {
        $redeemvouch = $_POST['redeemvouch'];

        $check_query = "SELECT * FROM redemption WHERE redemption_id = '$redeemvouch' AND user_id = $target_id LIMIT 1";
        $check_result = mysqli_query($con, $check_query);

        if ($check_result && mysqli_num_rows($check_result) > 0) {
            $check_redeem_query = "SELECT * FROM redemption WHERE redemption_id = '$redeemvouch' AND user_id = $target_id AND status = 'Claimed'";
            $check_redeem_result = mysqli_query($con, $check_redeem_query);

            if ($check_redeem_result && mysqli_num_rows($check_redeem_result) > 0) {
                $error_message = "Voucher $redeemvouch has already been claimed by User ID $target_id";
            } else {
                $redeem_query = "UPDATE redemption SET status = 'Claimed' WHERE redemption_id = '$redeemvouch'";
                mysqli_query($con, $redeem_query);
                $success_message = "Voucher $redeemvouch has been claimed by User ID $target_id.";
            }
        } else {
            $error_message = "Voucher $redeemvouch not found for User ID $target_id.";
        }
    } 

?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cashier Redeem</title>
    <link rel="stylesheet" href="cashier.css">
    <link href="https://fonts.cdnfonts.com/css/coolvetica-2" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap" rel="stylesheet">
</head>
<body>
    <?php include("includes/cashierredeem.html"); ?>
</body>
</html>