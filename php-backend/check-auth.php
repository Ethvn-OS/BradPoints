<?php
	session_start();

	header("Access-Control-Allow-Origin: http://localhost:3000");
	header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
	header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
	header("Access-Control-Max-Age: 86400");
	header("Access-Control-Allow-Credentials: true");
	header("Content-Type: application/json");


	if (isset($_SESSION["authenticated"]) && $_SESSION["authenticated"] === true) {
		$response = [
			"authenticated" => true,
			"user" => isset($_SESSION['user']) ? $_SESSION['user'] : null
		];
	} else {
		$response = [
			"authenticated" => false,
			"user" => null
		];
	}

	echo json_encode($response);
?>
