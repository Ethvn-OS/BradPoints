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

    //Create reward
    if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['add_product'])) {
        $prodname = trim($_POST['prodname']);
        $prodcategory = (int)$_POST['prodCategory'];

            //Check if product already exists
            $check_query = "SELECT id FROM products WHERE prod_name = '$prodname' AND isDeleted = 0 LIMIT 1";
            $check_result = mysqli_query($con, $check_query);

            if ($check_result && mysqli_num_rows($check_result) > 0) {
                $error_message = "Product already exists.";
            } else {
                $create_query = "INSERT INTO products (prod_name, category_id) VALUES (?, ?)";
                $stmt = mysqli_prepare($con, $create_query);
                mysqli_stmt_bind_param($stmt, "si", $prodname, $prodcategory);
                if (mysqli_stmt_execute($stmt)) {
                    $success_message = "Product added!";
                } else {
                    $error_message = "Failed to add product.";
                }
                mysqli_stmt_close($stmt);
            }
    }

    //Update reward
    if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['edit_user'])) {

        $edit_id = intval($_POST['edit_id']);
        $edit_product = trim($_POST['edit_product']);
        $edit_category = (int)$_POST['edit_prodCategory'];

        $edit_query = "UPDATE products SET prod_name = ?, category_id=? WHERE id=?";
        $stmt = mysqli_prepare($con, $edit_query);
        mysqli_stmt_bind_param($stmt, "ssi", $edit_product, $edit_category, $edit_id);
        if (mysqli_stmt_execute($stmt)) {
            $success_message = "Product updated!";
        } else {
            $error_message = "Failed to update product.";
        }
        mysqli_stmt_close($stmt);
    }

    //Delete reward
    if (isset($_GET['delete'])) {
        $delete_id = intval($_GET['delete']);
        $delete_query = "UPDATE products
                         SET isDeleted = 1
                         WHERE id = ?";
        $stmt = mysqli_prepare($con, $delete_query);
        mysqli_stmt_bind_param($stmt, "i", $delete_id);
        if (mysqli_stmt_execute($stmt)) {
            $success_message = "Product deleted!";
        } else {
            $error_message = "Failed to delete user.";
        }
        mysqli_stmt_close($stmt);
    }

    $all_rewards = [];

    $rewards_query = "SELECT id, reward_name, reward_desc, reward_points FROM rewards";
    $reward_results = mysqli_query($con, $rewards_query);

    if ($reward_results) {
        while ($row = mysqli_fetch_assoc($reward_results)) {
            $all_rewards[] = $row;
        }
    }

?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BradPoints Admin | Rewards</title>
    <link rel="stylesheet" href="permanent.css">
    <link rel="stylesheet" href="home.css">
    <link href="https://fonts.cdnfonts.com/css/coolvetica-2" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap" rel="stylesheet">
</head>
<body>
    <?php include "includes/sidebar.html" ?>
    <div class="main-containeradmin">
        <header class="site-header">
            <h1>Rewards</h1>
        </header>
        <main class="dashboard-content">
            <?php include "includes/rewardsadmin.html" ?>
        </main>
    </div>

    <script src="script.js"></script>
</body>
</html>