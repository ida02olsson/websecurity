<?php

require_once 'dbconn.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $username = $_POST["username"];
    $address = $_POST["address"];
    $password = $_POST["password"];

    // Validate the data
    $db = new dbconn();
    $con = new dbconn();
    $conn = $con->dbcon();

    $result = validate($username, $conn);
    if($result == 1){
        echo "user exists: $username\n";
        return;
    }

    // Process the data (e.g., save to a database)
    // For simplicity, we'll just echo the name in this example.
    echo "<div>Hello, $username! Your data has been received $address, $password</div>";

    add_user($username, $address, $password, $conn);
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

  function add_user($username, $address, $password, $conn){
    $sql = "INSERT INTO users (username, address, password) VALUES (?, ?, ?);";
    if($stmt = $conn->prepare($sql)) {
      $stmt->bind_param("sss", $username, $address, $password);
      $stmt->execute();
      $stmt->close();
    }
  }
?>
