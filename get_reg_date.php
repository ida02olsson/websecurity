<?php

require_once 'dbconn.php';

if ($_SERVER["REQUEST_METHOD"] === "GET") {
    $username = $_GET['username'];
  

    // Set up the database connection
    $con = new dbconn();
    $conn = $con->dbcon();
    
    // Validate the data
    $result = validate($username, $conn);
    if($result == false){
        echo "user doesn't exists: $username\n";
        return;
    }

    // Get the user reg_date from the database
    $reg_date = get_reg_date($username, $conn);
    echo $reg_date;
}

function get_reg_date($username, $conn){
    $sql = "SELECT reg_date FROM users where username='" . $username . "';";
    // $reg_date = $conn.query($sql);
    $reg_date = 0;
    if($stmt = $conn->prepare($sql)) {
      // $stmt->bind_param("s", $username);
      $stmt->execute();
      $stmt->bind_result($reg_date);
      $stmt->fetch();
      $stmt->close();
    }
    
    return $reg_date;
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
?>
