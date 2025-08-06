<?php
header('Content-Type: application/json');

try {
    include("connection.php");

    $rating_query = "SELECT rating,
                        COUNT(*) AS num_rating
                     FROM feedback
                     GROUP BY rating
                     ORDER BY rating";

    $rating_result = mysqli_query($con, $rating_query);

    if (!$rating_result) {
        throw new Exception("Database query failed: " . mysqli_error($con));
    }

    $rating_result = mysqli_query($con, $rating_query);

    $data = [];

    while ($row = mysqli_fetch_assoc($rating_result)) {
        array_push($data, $row);
    }

    echo json_encode($data);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}

?>