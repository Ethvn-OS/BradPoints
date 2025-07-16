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

    $all_feedback = [];

    $allfeedback_query = "SELECT * FROM feedback";
    $result_query = mysqli_query($con, $allfeedback_query);

    if ($result_query) {
        while ($row = mysqli_fetch_assoc($result_query)) {
            $all_feedback[] = $row;
        }
    }
?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BradPoints Admin | Feedback</title>
    <link rel="stylesheet" href="permanent.css">
    <link rel="stylesheet" href="home.css">
    <link href="https://fonts.cdnfonts.com/css/coolvetica-2" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap" rel="stylesheet">
</head>
<body>
    <?php include "includes/sidebar.html" ?>
    <div class="main-containeradmin">
        <header class="site-header">
            <h1>Customer Feedback</h1>
        </header>
        <main class="dashboard-content">
            <?php include "includes/feedbackadmin.html" ?>
        </main>
    </div>

    <script src="script.js"></script>
</body>
</html>