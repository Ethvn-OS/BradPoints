<?php

function check_login($con) {
    if (!isset($_SESSION['id'])) {

        header("Location: login.php");
        die;
    }
}