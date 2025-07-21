<?php
    session_start();

    include("connection.php");
    include("functions.php");

	header("Access-Control-Allow-Origin: http://localhost:3000");
	header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
	header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
	header("Access-Control-Max-Age: 86400");
	header("Access-Control-Allow-Credentials: true");
	header("Content-Type: application/json");

    $user_data = $_SESSION['user'];
    $userID = (int)$user_data['id'];

    $notifs = [];
    $notifs_query = "SELECT * FROM notifications WHERE customer_id = $userID ORDER BY date_created DESC";

    $notifs_result = mysqli_query($con, $notifs_query);
    if ($notifs_result) {
        while ($row = mysqli_fetch_assoc($notifs_result)) {
            $notifs[] = $row;
        }
    }

    echo json_encode($notifs);

?>