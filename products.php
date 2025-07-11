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

    $all_prod = [];

    $prod_query = "SELECT * FROM products";
    $result_query = mysqli_query($con, $prod_query);

    if ($result_query) {
        while ($row = mysqli_fetch_assoc($result_query)) {
            $all_prod[] = $row;
        }
    }

    $success_message = '';
    $error_message = '';

    if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['add_product'])) {
        $prod_name = trim($_POST['prod_name']);
        $category_id = intval($_POST['prodCategory']);

        if (!empty($prod_name) && $category_id > 0) {
            $insert_query = "INSERT INTO products (prod_name, category_id) VALUES (?, ?)";
            $stmt = mysqli_prepare($con, $insert_query);

            mysqli_stmt_bind_param($stmt, "si", $prod_name, $category_id);

            if (mysqli_stmt_execute($stmt)) {
                $success_message = "Product added successfully!";
            } else {
                $error_message = "Failed to add product.";
            }
            mysqli_stmt_close($stmt);
        }
    }

?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BradPoints Admin | Products</title>
    <link rel="stylesheet" href="permanent.css">
    <link rel="stylesheet" href="home.css">
    <link href="https://fonts.cdnfonts.com/css/coolvetica-2" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap" rel="stylesheet">
</head>
<body>
    <?php include "includes/sidebar.html" ?>
    <div class="main-container">
        <?php include "includes/products.html" ?>
    </div>

    <script src="script.js"></script>
</body>
</html>