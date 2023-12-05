<?php

require_once 'dbconn.php';

function generateCSRFToken() {
    return bin2hex(random_bytes(32)); // Adjust the token length as needed
}

session_start();

if (!isset($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = generateCSRFToken();
}

$csrfToken = $_SESSION['csrf_token'];


if ($_SERVER["REQUEST_METHOD"] === "GET") {
    $username = $_GET['username'];
    $password = $_GET['password'];

    // Set up the database connection 
    $con = new dbconn();
    $conn = $con->dbcon();

    // Hash the password

    // Check the hash of the passwords match
    $sql = "SELECT password FROM users where username='" . $username . "';";
    // $sql = "SELECT password FROM users where username='" . $username . "'";
    $hash = "";
    if($stmt = $conn->prepare($sql)) {
      $stmt->execute();
      $stmt->bind_result($hash);
      $stmt->fetch();
      $stmt->close();
    }
    if(password_verify($password, $hash)){
        echo "Login successful for user: $username\n";
    } else {
        echo "Wrong password or username it was $hash";
    }
}
?>
