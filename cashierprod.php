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

    $target_id = isset($_SESSION['target_id']) ? intval($_SESSION['target_id']) : 0;

    // Fetch products from database
    $products = [];

    $product_query = "SELECT p.*, category_name, points, p.isDeleted
                      FROM products p
                      JOIN category c ON c.id = p.category_id";

    $product_result = mysqli_query($con, $product_query);
    if ($product_result) {
        while ($row = mysqli_fetch_assoc($product_result)) {
            $products[] = $row;
        }
    }

    if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['order_data'])) {
    $orderData = json_decode($_POST['order_data'], true);
    $totalPoints = 0;
    foreach ($orderData as $order) {
        $totalPoints += $order['qty'] * $order['points'];
    }
    // Update points for the customer
    if ($totalPoints > 0 && $target_id > 0) {
        $update_query = "UPDATE customers SET points = points + $totalPoints WHERE user_id = $target_id";
        mysqli_query($con, $update_query);
        // Optionally, redirect or show a success message
        header("Location: cashier.php?success=1");
        exit;
    }
} 
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BradPoints Cashier Product List</title>
    <link rel="stylesheet" href="cashier.css">
    <link href="https://fonts.cdnfonts.com/css/coolvetica-2" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap" rel="stylesheet">
</head>
<body class="no-bg">
    <?php include "includes/cashierprod.html" ?>

    <!-- Confirmation Modal -->
    <div id="confirmModal" class="modalcash" style="display: none;">
    <div class="modal-content">
        <p>Are you sure you want to submit the order?</p>
        <br>
        <button id="confirmYes">Yes</button>
        <button id="confirmNo">No</button>
    </div>
    </div>

    <script src="script.js"></script>
</body>
</html>