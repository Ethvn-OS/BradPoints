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

    $all_customerdel = [];

    $customerdel_query = "SELECT *
                          FROM customers
                          WHERE isDeleted = 1";

    $customerdel_results = mysqli_query($con, $customerdel_query);

    if ($customerdel_results) {
        while ($row = mysqli_fetch_assoc($customerdel_results)) {
            $all_customerdel[] = $row;
        }
    }

    $all_cashierdel = [];

    $cashierdel_query = "SELECT *
                          FROM cashiers
                          WHERE isDeleted = 1";

    $cashierdel_results = mysqli_query($con, $cashierdel_query);

    if ($cashierdel_results) {
        while ($row = mysqli_fetch_assoc($cashierdel_results)) {
            $all_cashierdel[] = $row;
        }
    }

    $all_productdel = [];

    $productdel_query = "SELECT *
                         FROM products
                         WHERE isDeleted = 1";

    $productdel_results = mysqli_query($con, $productdel_query);

    if ($productdel_results) {
        while ($row = mysqli_fetch_assoc($productdel_results)) {
            $all_productdel[] = $row;
        }
    }

    $all_rewarddel = [];

    $rewarddel_query = "SELECT *
                        FROM rewards
                        WHERE isDeleted = 1";

    $rewarddel_results = mysqli_query($con, $rewarddel_query);

    if ($rewarddel_results) {
        while ($row = mysqli_fetch_assoc($rewarddel_results)) {
            $all_rewarddel[] = $row;
        }
    }

?>


<!DOCTYPE html>
<html lang="en" class="admin-body">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BradPoints Admin | Recently Deleted</title>
    <link rel="stylesheet" href="admin.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link href="https://fonts.cdnfonts.com/css/coolvetica-2" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap" rel="stylesheet">
</head>
<body class="admin-body">
    <?php include "includes/sidebar.html" ?>
    <div class="main-containeradmin">
        <header class="site-header">
            <h1>Recently Deleted</h1>
        </header>
        <main class="dashboard-content">
            <?php include "includes/recentlydeleted.html" ?>
        </main>
    </div>
    
    <script src="script.js"></script>
    <script src="admin-pagination.js"></script>
    <script>
        // Pass PHP data to JavaScript
        document.addEventListener('DOMContentLoaded', function() {
            var voucherData = <?php echo json_encode(isset($all_vouchredem) ? $all_vouchredem : []); ?>;
            var redemptionData = <?php echo json_encode(isset($all_redem) ? $all_redem : []); ?>;
            
            // Set the data in the pagination script
            if (typeof setTableData === 'function') {
                setTableData(voucherData, redemptionData);
            }
        });
    </script>
</body>
</html>