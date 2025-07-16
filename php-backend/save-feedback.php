<?php
session_start();

    include("connection.php");
    include("functions.php");

	header("Access-Control-Allow-Origin: http://localhost:3000");
	header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
	header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
	header("Access-Control-Max-Age: 86400");
	header("Access-Control-Allow-Credentials: true");
    header('Content-Type: application/json');

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $user_id = intval($_POST['user_id']);
        $rating = intval($_POST['rating']);
        $content = trim($_POST['feedback']);

        if ($user_id && $rating && $content) {
            $stmt = mysqli_prepare($con, "INSERT INTO feedback (user_id, rating, content) VALUES (?, ?, ?, NOW())");
            mysqli_stmt_bind_param($stmt, "iis", $user_id, $rating, $content);

            if (mysqli_stmt_execute($stmt)) {
                echo json_encode([
                    'success' => true,
                    'review_id' => mysqli_insert_id($con)
                ]);
            } else {
                echo json_encode([
                    'success' => false,
                    'message' => 'Database insertion failed.'
                ]);
            }

            mysqli_stmt_close($stmt);
        } else {
            echo json_encode([
                'success' => false,
                'message' => 'Missing input data.'
            ]);
        }
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'Invalid request method.'
        ]);
    }
?>