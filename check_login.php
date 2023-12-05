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
    $response = ['isLoggedIn' => false];

    if (isset($_SESSION['user_logged_in']) && $_SESSION['user_logged_in'] === true) {
        $response['isLoggedIn'] = true;
        $response['userId'] = $_SESSION['user_id'] ?? null;
        $response['username'] = $_SESSION['username'] ?? null;
        $response['csrfToken'] = $_SESSION['csrf_token'] ?? null;
    }
    
    header('Content-Type: application/json');
    echo json_encode($response);    
}
?>
