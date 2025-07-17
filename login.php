<?php
session_start();
$is_ajax = !empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest';

include("connection.php");
include("functions.php");

if ($_SERVER['REQUEST_METHOD'] == "POST") {
    $user_name = $_POST['user_name'];
    $password = $_POST['password'];

    if(!empty($user_name) && !empty($password) && !is_numeric($user_name)) {
        $query = "SELECT u.id AS user_id, u.user_name, u.password, u.usertype_id, u.email, c.points AS points
                  FROM users u
                  LEFT JOIN customers c ON c.user_id = u.id
                  WHERE u.user_name = '$user_name' LIMIT 1";
        $result = mysqli_query($con, $query);

        if($result && mysqli_num_rows($result) > 0) {
            $user_data = mysqli_fetch_assoc($result);

            if (password_verify($password, $user_data['password'])) {
                $_SESSION["authenticated"] = true;
                $_SESSION['id'] = $user_data['user_id'];
                $_SESSION['user'] = [
                    'id' => $user_data['user_id'],
                    'user_name' => $user_data['user_name'],
                    'email' => $user_data['email'],
                    'usertype_id' => $user_data['usertype_id'],
                    'points' => $user_data['points']
                ];

                if ($is_ajax) {
                    $redirect = ($user_data['usertype_id'] == 2) ? "http://localhost:3000/" :
                                (($user_data['usertype_id'] == 1) ? "cashier.php" : "admin.php");
                    echo json_encode(['success' => true, 'redirect' => $redirect]);
                    exit;
                }

                if ($user_data['usertype_id'] == 2) {
                    header("Location: http://localhost:3000/");
                } else if ($user_data['usertype_id'] == 1) {
                    header("Location: cashier.php");
                } else {
                    header("Location: admin.php");
                }
                exit;
            }
        }
        $error_message = "Wrong username or password.";
    } else {
        $error_message = "Please enter valid information.";
    }

    if ($is_ajax) {
        echo json_encode(['success' => false, 'error' => $error_message]);
        exit;
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BradPoints Login</title>
    <link rel="stylesheet" href="loginsignup.css">
    <link href="https://fonts.cdnfonts.com/css/coolvetica-2" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
</head>
<body class="loginbody">
    <?php include "includes/login.html" ?>
</body>
<script src="loginsignup.js"></script>
</html>