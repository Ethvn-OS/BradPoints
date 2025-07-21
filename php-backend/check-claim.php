<?php

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");

session_start();

include("connection.php");
include("functions.php");

$user_data = $_SESSION['user'];

$success_message = '';
$error_message = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['reward_id'])) {
    $reward_id = (int)$_POST['reward_id'];
    $userID = (int)$user_data['id'];

    $check_query = "SELECT * FROM redemption WHERE reward_id = $reward_id AND user_id = $userID AND status = 'Claimed'";
    $check_result = mysqli_query($con, $check_query);

    if ($check_result && mysqli_num_rows($check_result) > 0) {
        $success_message = "Claimed";
    } else {
        $error_message = "Not claimed";
    }
}

header('Content-Type: application/json');

if ($success_message) {
    $response = [
        'claimed' => true,
        'message' => $success_message
    ];
} else {
    $response = [
        'claimed' => false,
        'message' => $error_message
    ];
}

echo json_encode($response);

?>