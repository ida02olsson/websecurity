<?php

$servername = "localhost";
$username = "server";
$password = "password";

function connect() {
    global $servername, $username, $password;
    $conn = new mysqli($servername, $username, $password);
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error . "\n");
    }
    return $conn;

}

// Create connection
$conn = new mysqli($servername, $username, $password);
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// Create database
$sql = "CREATE DATABASE Webshop";
if ($conn->query($sql) === TRUE) {
  echo "Database created successfully";
} else {
  echo "Error creating database: " . $conn->error;
}

// Use the database
$sql = "use Webshop;";
$conn->query($sql);

// Create table of users
$sql = "CREATE TABLE users (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(30) NOT NULL,
    address VARCHAR(30) NOT NULL,
    password VARCHAR(30) NOT NULL,
    reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );";
$conn->query($sql);

// Check if user exists
$username = "admin";
$user_exists = validate($username, $conn);

if ($user_exists) {
  echo "\n$username user already exists\n";
  return;
}
// Add user to table
$sql = "INSERT INTO users (username, address, password) VALUES ('admin', 'admin', 'admin');";


if ($conn->query($sql) === TRUE) {
  echo "New record created successfully";
} else {
  echo "Error: " . $sql . "<br>" . $conn->error;
}



$conn->close();
