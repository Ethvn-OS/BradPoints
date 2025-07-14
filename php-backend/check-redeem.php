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

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['avail_reward_id'])) {
    $reward_id = (int)$_POST['avail_reward_id'];
    $userID = (int)$user_data['id'];

    $check_query = "SELECT * FROM redemption WHERE reward_id = $reward_id AND user_id = $userID";
    $check_result = mysqli_query($con, $check_query);

    if ($check_result && mysqli_num_rows($check_result) > 0) {
        $error_message = "Already availed.";
    } else {
        $success_message = "Not yet availed.";
    }
}

header('Content-Type: application/json');

if ($success_message) {
    $response = [
        'redeemed' => false,
        'message' => $success_message
    ];
} else {
    $response = [
        'redeemed' => true,
        'message' => $error_message
    ];
}

echo json_encode($response);

?>