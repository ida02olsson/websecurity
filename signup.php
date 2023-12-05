<?php

require_once 'dbconn.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $username = $_POST["username"];
    $address = $_POST["address"];
    $password = $_POST["password"];
    $reg_date = $_POST["reg_date"];

    // Validate the data
    $db = new dbconn();
    $con = new dbconn();
    $conn = $con->dbcon();

    $result = validate($username, $conn);
    if($result == 1){
        echo "user exists: $username\n";
        return;
    }

    # Hash the password using argon2id
    $password = password_hash($password, PASSWORD_ARGON2ID);
    
    // Add the user to the database
    add_user($username, $address, $password, $reg_date, $conn);
    echo "Signup successfull!";
}

function validate($username, $conn){
    $sql = "SELECT COUNT(*) FROM users where username=?;";
    $result = 0;
    if($stmt = $conn->prepare($sql)) {
      $stmt->bind_param("s", $username);
      $stmt->execute();
      $stmt->bind_result($result);
      $stmt->fetch();
      $stmt->close();
    }
    // Return true if user exists, false if not
    return $result >= 1;
}

  function add_user($username, $address, $password, $reg_date, $conn){
    $sql = "INSERT INTO users (username, address, password, reg_date) VALUES (?, ?, ?, ?);";
    if($stmt = $conn->prepare($sql)) {
      $stmt->bind_param("ssss", $username, $address, $password, $reg_date);
      $stmt->execute();
      $stmt->close();
    }
  }
?>
