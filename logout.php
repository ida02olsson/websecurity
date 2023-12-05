<?php

require_once 'dbconn.php';
session_start();
if ($_SERVER["REQUEST_METHOD"] === "GET") {
    $response = ['success' => false];
    session_unset();
    session_destroy();
    $response['success'] = true;
    
    header('Content-Type: application/json');
    echo json_encode($response);    
}
?>
