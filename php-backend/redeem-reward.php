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

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['avail_reward_name'], $_POST['avail_reward_points'], $_POST['avail_reward_id'])) {
    $reward_name = $_POST['avail_reward_name'];
    $reward_points = (int)$_POST['avail_reward_points'];
    $reward_id = (int)$_POST['avail_reward_id'];
    $user_points = (int)$user_data['points'];
    $userID = (int)$user_data['id'];

    if ($user_points >= $reward_points) {
        $check_query = "SELECT * FROM redemption WHERE reward_id = $reward_id AND user_id = $userID";
        $check_result = mysqli_query($con, $check_query);

        if ($check_result && mysqli_num_rows($check_result) > 0) {
            $error_message = "You already availed $reward_name";
        } else {
            //Deduct points
            $update_query = "UPDATE customers SET points = points - $reward_points WHERE user_id = $userID";
            mysqli_query($con, $update_query);

            //Refresh user data
            $result = mysqli_query($con, "SELECT u.id AS user_id, u.user_name, u.password, u.usertype_id, u.email, c.points AS points
                                          FROM users u
                                          JOIN customers c ON c.user_id = u.id
                                          WHERE u.id = $userID");
            if ($result && mysqli_num_rows($result) > 0) {
                $user_data = mysqli_fetch_assoc($result);
            }

            //Use this block of code for future random id's hehe
            //Insert daan ang row so that ang $last_id naay value
            $placeholder_code = "PENDING";
            $redemption_query = "INSERT INTO redemption (user_id, reward_id, redemption_id) VALUES (?,?,?)";
            $stmt = mysqli_prepare($con, $redemption_query);
            mysqli_stmt_bind_param($stmt, "iis", $userID, $reward_id, $placeholder_code);
            mysqli_stmt_execute($stmt);

            //This generates unique redemption code
            $last_id = mysqli_insert_id($con);
            $code = rand(10000, 99999);
            $redemption_id = "BRAD" . $code . "_" . $last_id;

            //This updates the redemption query
            $update_redem_query = "UPDATE redemption SET redemption_id = '$redemption_id' WHERE id = $last_id";
            $update_stmt = mysqli_query($con, $update_redem_query);

            $success_message = "You have successfully availed $reward_name! Your voucher code is $redemption_id. Show this to the cashier to claim your prize.";
        }
    } else {
        $error_message = "You do not have enough points to avail $reward_name.";
    }
}

header('Content-Type: application/json');

if ($success_message) {
    $response = [
        'success' => true,
        'points' => $user_data['points'],
        'redemption_id' => $redemption_id ?? null,
        'message' => $success_message
    ];
} else {
    $response = [
        'success' => false,
        'points' => $user_data['points'],
        'message' => $error_message
    ];
}

echo json_encode($response);

?>