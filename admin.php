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

    $all_vouchredem = [];

    $vouchredem_query = "SELECT red.reward_id, rew.reward_name, COUNT(*) AS number_of_redemptions
                         FROM redemption red
                         JOIN rewards rew ON rew.id = red.reward_id
                         GROUP BY red.reward_id";

    $vouch_results = mysqli_query($con, $vouchredem_query);

    if ($vouch_results) {
        while ($row = mysqli_fetch_assoc($vouch_results)) {
            $all_vouchredem[] = $row;
        }
    }

    $all_redem = [];

    $redem_query = "SELECT * FROM redemption";
    $result_redem = mysqli_query($con, $redem_query);

    if ($result_redem) {
        while ($row = mysqli_fetch_assoc($result_redem)) {
            $all_redem[] = $row;
        }
    }

?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BradPoints Admin | Dashboard</title>
    <link rel="stylesheet" href="permanent.css">
    <link rel="stylesheet" href="home.css">
    <link href="https://fonts.cdnfonts.com/css/coolvetica-2" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap" rel="stylesheet">
</head>
<body>
    <?php include "includes/sidebar.html" ?>
    <div class="main-containeradmin">
        <header class="site-header">
            <h1>Dashboard</h1>
        </header>
        <main class="dashboard-content">
            <?php include "includes/admin.html" ?>
        </main>
    </div>

    <script src="script.js"></script>
</body>
</html>