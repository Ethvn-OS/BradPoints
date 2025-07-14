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

    $rewards = [];

    $rewards_query = "SELECT * FROM rewards";

    $rewards_result = mysqli_query($con, $rewards_query);
    if ($rewards_result) {
        while ($row = mysqli_fetch_assoc($rewards_result)) {
            $rewards[] = $row;
        }
    }

    $response = [
        "rewards" => $rewards
    ];

    echo json_encode($response);

?>