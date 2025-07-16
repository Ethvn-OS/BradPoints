<?php
session_start();

    include("connection.php");
    include("functions.php");

	header("Access-Control-Allow-Origin: http://localhost:3000");
	header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
	header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
	header("Access-Control-Max-Age: 86400");
	header("Access-Control-Allow-Credentials: true");

    $query = "SELECT id, rating, content, DATE_FORMAT(created_at, '%M %d, %Y %h:%i %p') as date FROM feedback ORDER BY id DESC";
    $result = mysqli_query($con, $query);

    $feedback = [];

    if ($result) {
        while ($row = mysqli_fetch_assoc($result)) {
            $feedback[] = $row;
        }
    }

    header('Content-Type: application/json');
    echo json_encode($feedback);
?>