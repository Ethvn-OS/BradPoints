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

    $vouchredem_query = "SELECT rew.reward_name, COUNT(*) AS number_of_redemptions
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

    $redem_query = "SELECT u.user_name, r.reward_name, red.redemption_id, red.status, red.cashier_id
                    FROM redemption red
                    JOIN users u ON u.id = red.user_id
                    JOIN rewards r ON r.id = red.reward_id";
    $result_redem = mysqli_query($con, $redem_query);

    if ($result_redem) {
        while ($row = mysqli_fetch_assoc($result_redem)) {
            $all_redem[] = $row;
        }
    }

    //$redem_query = "SELECT * FROM redemption";

?>


<!DOCTYPE html>
<html lang="en" class="admin-body">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BradPoints Admin | Dashboard</title>
    <link rel="stylesheet" href="admin.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link href="https://fonts.cdnfonts.com/css/coolvetica-2" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap" rel="stylesheet">
</head>
<body class="admin-body">
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