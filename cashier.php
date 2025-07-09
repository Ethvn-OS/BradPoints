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
?>
asdasdsadasdasdsa

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
    <div>hello world</div>
    <script src="script.js"></script>
</body>
</html>