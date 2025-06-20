<?php

function check_login($con) {
    if (isset($_SESSION['user_id'])) {

        $id = $_SESSION['user_id'];
        $query = "SELECT * FROM users WHERE user_id = '$id' LIMIT 1";

        $result = mysqli_query($con, $query);

        if ($result && mysqli_num_rows($result) > 0) {

            $user_data = mysqli_fetch_assoc($result);
            return $user_data;
        }
    }

    //redirect to login
    header("Location: login.php");
    die;
}

function random_num($length) {

    $text = "";

    //this if-statement is so that length is never less than 5
    if ($length < 5) {
        $length = 5;
    }

    //assign get a number between 4 and $length
    $len = rand(4,$length);

    for ($i = 0; $i < $len; $i++) {

        $text .= rand(0,9);
    }

    return $text;
}