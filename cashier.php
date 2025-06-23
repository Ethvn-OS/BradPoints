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

    // Handle form submission to add points
    if ($_SERVER['REQUEST_METHOD'] == "POST" && isset($_POST['id-number'])) {
        $target_id = intval($_POST['id-number']);

        // Check if user exists
        $check_query = "SELECT * FROM users WHERE id = '$target_id' LIMIT 1";
        $check_result = mysqli_query($con, $check_query);

        if ($check_result && mysqli_num_rows($check_result) > 0) {
            // Add 5 points
            $update_query = "UPDATE users SET points = points + 5 WHERE id = '$target_id'";
            mysqli_query($con, $update_query);
            $success_message = "5 points added to user ID $target_id.";
        } else {
            $error_message = "User with ID $target_id not found.";
        }
    }
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BradPoints Cashier</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <?php include "includes/cashier.html" ?>

    <script src="script.js"></script>
</body>
</html>