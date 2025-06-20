<?php

function check_login($con) {
    if (!isset($_SESSION['id'])) {

        header("Location: login.php");
        die;
    }
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