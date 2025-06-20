<?php

session_start();

if(isset($_SESSION['user_id'])) {

    unset($_SESSION['iser_id']);
}

header("Location: login.php");
die;