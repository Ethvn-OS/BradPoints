<?php
session_start();

    include("connection.php");
    include("functions.php");

    check_login($con);

    $id = $_SESSION['id'];
    $query = "SELECT * FROM users WHERE id = '$id' LIMIT 1";

    $result = mysqli_query($con, $query);

    if ($result && mysqli_num_rows($result) > 0) {

        $user_data = mysqli_fetch_assoc($result);
    }

    //Create user
    if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['add_user'])) {
        if ((int)$_POST['usertype'] === 2) {
            $username = trim($_POST['username']);
            $password = $_POST['password'];
            $email = trim($_POST['email']);

            if (!preg_match('/^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d]).+$/', $username)) {
                $error_message1 = "Username must include at least one letter, one number, and one special character.";
            } else if (strlen($password) < 8) {
                $error_message1 = "Password must be at least 8 characters.";
            } else {
                if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                    $error_message1 = "Invalid email format.";
                }
                //Check if username already exists
                $check_query = "SELECT id FROM users WHERE (user_name = '$username' OR email = '$email') AND isDeleted = 0 LIMIT 1";
                $check_result = mysqli_query($con, $check_query);

                if ($check_result && mysqli_num_rows($check_result) > 0) {
                    $error_message1 = "Username or email already taken. Please choose another.";
                } else {
                    $hashed_password = password_hash($password, PASSWORD_DEFAULT);
                    $create_query = "INSERT INTO users (user_name, email, password, usertype_id) VALUES (?, ?, ?, ?)";
                    $stmt = mysqli_prepare($con, $create_query);
                    $usertype = 2;
                    mysqli_stmt_bind_param($stmt, "sssi", $username, $email, $hashed_password, $usertype);

                    if (mysqli_stmt_execute($stmt)) {
                        //Send welcome email
                        require_once 'email_helper.php';
                        sendWelcomeEmail($email, $username);
                        $new_user_id = mysqli_insert_id($con); // ✅ Get the ID directly

                        // Now insert into customers using the new user's ID
                        $customer_query = "INSERT INTO customers (user_id) VALUES (?)";
                        $stmt2 = mysqli_prepare($con, $customer_query);
                        mysqli_stmt_bind_param($stmt2, "i", $new_user_id);
                        mysqli_stmt_execute($stmt2);
                        mysqli_stmt_close($stmt2);

                        $success_message1 = "Customer user added!";
                    } else {
                        $error_message1 = "Failed to add customer user.";
                    }
                    mysqli_stmt_close($stmt);
                }
            }
        } else {
            $username = trim($_POST['username']);
            $password = $_POST['password'];
            $email = trim($_POST['email']);

            if (!preg_match('/^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d]).+$/', $username)) {
                $error_message = "Username must include at least one letter, one number, and one special character.";
            } else if (strlen($password) < 8) {
                $error_message = "Password must be at least 8 characters.";
            } else {
                if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                    $error_message = "Invalid email format.";
                }
                //Check if username already exists
                $check_query = "SELECT id FROM users WHERE (user_name = '$username' OR email = '$email') AND isDeleted = 0 LIMIT 1";
                $check_result = mysqli_query($con, $check_query);

                if ($check_result && mysqli_num_rows($check_result) > 0) {
                    $error_message = "Username or email already taken. Please choose another.";
                } else {
                    $hashed_password = password_hash($password, PASSWORD_DEFAULT);
                    $create_query = "INSERT INTO users (user_name, email, password, usertype_id) VALUES (?, ?, ?, ?)";
                    $stmt = mysqli_prepare($con, $create_query);
                    $usertype = 1;
                    mysqli_stmt_bind_param($stmt, "sssi", $username, $email, $hashed_password, $usertype);

                    if (mysqli_stmt_execute($stmt)) {
                        //Send welcome email
                        require_once 'email_helper.php';
                        sendWelcomeEmail($email, $username);
                        $new_user_id = mysqli_insert_id($con); // Get the ID directly

                        // Now insert into customers using the new user's ID
                        $cashier_query = "INSERT INTO cashiers (user_id) VALUES (?)";
                        $stmt2 = mysqli_prepare($con, $cashier_query);
                        mysqli_stmt_bind_param($stmt2, "i", $new_user_id);
                        mysqli_stmt_execute($stmt2);
                        mysqli_stmt_close($stmt2);

                        $success_message = "Cashier user added!";
                    } else {
                        $error_message = "Failed to add cashier user.";
                    }
                    mysqli_stmt_close($stmt);
                }
            }
        }
    }

    //Update user
    if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['edit_user'])) {

        if ((int)$_POST['usertype'] === 2) {
            $edit_id = intval($_POST['edit_id']);
            $edit_username = trim($_POST['edit_username']);
            $edit_points = intval($_POST['edit_points']);
            $edit_email = trim($_POST['edit_email']);

            $edit_query = "UPDATE users SET user_name = ?, email=? WHERE id=?";
            $stmt = mysqli_prepare($con, $edit_query);
            mysqli_stmt_bind_param($stmt, "ssi", $edit_username, $edit_email, $edit_id);
            if (mysqli_stmt_execute($stmt)) {
                $updatecust_query = "UPDATE customers SET points=? WHERE user_id=?";
                $stmt2 = mysqli_prepare($con, $updatecust_query);
                mysqli_stmt_bind_param($stmt2, "ii", $edit_points, $edit_id);
                mysqli_stmt_execute($stmt2);
                mysqli_stmt_close($stmt2);
                $success_message1 = "User updated!";
            } else {
                $error_message1 = "Failed to update user.";
            }
            mysqli_stmt_close($stmt);
        } else {

            $edit_id = intval($_POST['edit_id']);
            $edit_username = trim($_POST['edit_username']);
            $edit_email = trim($_POST['edit_email']);

            $edit_query = "UPDATE users SET user_name = ?, email=? WHERE id=?";
            $stmt = mysqli_prepare($con, $edit_query);
            mysqli_stmt_bind_param($stmt, "ssi", $edit_username, $edit_email, $edit_id);
            if (mysqli_stmt_execute($stmt)) {
                $success_message = "User updated!";
            } else {
                $error_message = "Failed to update user.";
            }
            mysqli_stmt_close($stmt);
        }
    }

    //Delete user
    if (isset($_GET['delete'])) {
        if ((int)$_GET['usertype'] === 2) {
            $delete_id = intval($_GET['delete']);
            $delete_query = "UPDATE users
                            SET isDeleted = 1
                            WHERE id = ?";
            $stmt = mysqli_prepare($con, $delete_query);
            mysqli_stmt_bind_param($stmt, "i", $delete_id);
            if (mysqli_stmt_execute($stmt)) {
                $deletecust_query = "UPDATE customers
                                    SET isDeleted = 1
                                    WHERE user_id = ?";
                $stmt2 = mysqli_prepare($con, $deletecust_query);
                mysqli_stmt_bind_param($stmt2, "i", $delete_id);

                if (mysqli_stmt_execute($stmt2)) {
                    $success_message1 = "User deleted!";
                }
                mysqli_stmt_close($stmt2);
            } else {
                $error_message1 = "Failed to delete user.";
            }
            mysqli_stmt_close($stmt);
        } else {
            $delete_id = intval($_GET['delete']);
            $delete_query = "UPDATE users
                             SET isDeleted = 1
                             WHERE id = ?";
            $stmt = mysqli_prepare($con, $delete_query);
            mysqli_stmt_bind_param($stmt, "i", $delete_id);
            if (mysqli_stmt_execute($stmt)) {
                $deletecash_query = "UPDATE cashiers
                                    SET isDeleted = 1
                                    WHERE user_id = ?";
                $stmt2 = mysqli_prepare($con, $deletecash_query);
                mysqli_stmt_bind_param($stmt2, "i", $delete_id);

                if (mysqli_stmt_execute($stmt2)) {
                    $success_message = "User deleted!";
                }
                mysqli_stmt_close($stmt2);
            } else {
                $error_message = "Failed to delete user.";
            }
            mysqli_stmt_close($stmt);
        }
    }

    $all_users = [];

    $users_query = "SELECT u.id, u.user_name, u.email, c.points, u.isDeleted
                    FROM users u
                    LEFT JOIN customers c ON c.user_id = u.id
                    WHERE usertype_id = 2";
    $users_results = mysqli_query($con, $users_query);

    if ($users_results) {
        while ($row = mysqli_fetch_assoc($users_results)) {
            $all_users[] = $row;
        }
    }

    $all_cashiers = [];

    $cashier_query = "SELECT id, user_name, email, isDeleted
                      FROM users
                      WHERE usertype_id = 1";
    $cashier_results = mysqli_query($con, $cashier_query);

    if ($cashier_results) {
        while ($row = mysqli_fetch_assoc($cashier_results)) {
            $all_cashiers[] = $row;
        }
    }
?>


<!DOCTYPE html>
<html lang="en" class="admin-body">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BradPoints Admin | Users</title>
    <link rel="stylesheet" href="permanent.css">
    <link rel="stylesheet" href="home.css">
    <link rel="stylesheet" href="admin.css">
    <link href="https://fonts.cdnfonts.com/css/coolvetica-2" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body class="admin-body">
    <?php include "includes/sidebar.html" ?>

    <div class="main-containeradmin">
        <header class="site-header">
            <h1><i class="fas fa-users"></i> Users</h1>
        </header>
        <main class="dashboard-content">
            <?php include "includes/users.html" ?>
        </main>
    </div>

    <script src="script.js"></script>
    <script src="users-pagination.js"></script>
</body>
</html>