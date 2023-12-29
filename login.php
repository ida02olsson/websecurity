<?php

require_once 'dbconn.php';

// function generateCSRFToken() {
//     return bin2hex(random_bytes(32)); // Adjust the token length as needed
// }

session_start();

if ($_SERVER["REQUEST_METHOD"] === "GET") {
    $username = $_GET['username'];
    $password = $_GET['password'];

    // Set up the database connection 
    $con = new dbconn();
    $conn = $con->dbcon();
    $response = ['success' => false];
    // Set the amount of attempts and the last attempt time
    if(!isset($_SESSION['attempts'])) {
        $_SESSION['attempts'] = 0;
    }
    if(!isset($_SESSION['last_attempt'])) {
        $_SESSION['last_attempt'] = time();
    }

    // Reset the attempts if the last attempt was more than 3 minutes ago
    if(time() - $_SESSION['last_attempt'] > 180) {
        $_SESSION['attempts'] = 0;
    }

    // Otherwise return an error if the user has tried to log in more than 3 times
    if($_SESSION['attempts'] > 3) {
        $response['message'] = 'Too many attempts';
        echo json_encode($response);
        return;
    }

    // Update the attempts and the last attempt time
    $_SESSION['last_attempt'] = time();
    $_SESSION['attempts'] += 1;
    
    // Set the header to JSON
    header('Content-Type: application/json');

    // Check the hash of the passwords match
    $sql = "SELECT password FROM users where username='" . $username . "';";
    $hash = "";
    if($stmt = $conn->prepare($sql)) {
      $stmt->bind_param("s", $username);
      $stmt->execute();
      $stmt->bind_result($hash);
      $stmt->fetch();
      $stmt->close();
    }
    // $response['debug'] = $hash . ' ' . $password . ' ' . $username;
    if(password_verify($password, $hash)){
        $_SESSION['username'] = $username;
        $_SESSION['user_logged_in'] = true;
        // if (!isset($_SESSION['csrf_token'])) {
        //     $_SESSION['csrf_token'] = generateCSRFToken();
        // }
        $response['success'] = true;
        // $response['csrfToken'] = $_SESSION['csrf_token'] ?? null;
        $response['username'] = $_SESSION['username'] ?? null;
        $repsonse['message'] = 'Login successful';
    } else {
        $response['message'] = 'Wrong password or username';

    }

    echo json_encode($response);
}
?>
