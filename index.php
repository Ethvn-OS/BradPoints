<?php
session_start();

    include("connection.php");
    include("functions.php");

    $user_data = check_login($con);
?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="styles.css">
    <title>BradPoints Home</title>
</head>
<body>
    <?php include "includes/landing.html" ?>

    <script src="script.js"></script>
</body>
</html>