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
            $_SESSION['target_id'] = $target_id;
            $success_message = "ID number $target_id located. Please pick which function to use.";
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
    <link rel="stylesheet" href="cashier.css">
</head>
<body>
    <?php include "includes/cashier.html" ?>
    
    <script src="script.js"></script>
</body>
</html>
