<?php

require_once 'dbconn.php';

if ($_SERVER["REQUEST_METHOD"] === "GET") {
    $username = $_GET['username'];
    $password = $_GET['password'];

    // Set up the database connection 
    $con = new dbconn();
    $conn = $con->dbcon();

    // Validate the data

    // Check the hash of the passwords match
    $sql = "SELECT password FROM users where username=" + $username + " AND password=" + $password + ";";
    $hash = $conn->query($sql);
    // $hash = "";
    // if($stmt = $conn->prepare($sql)) {
    //   // $stmt->bind_param("s", $username);
    //   $stmt->execute();
    //   $stmt->bind_result($hash);
    //   $stmt->fetch();
    //   $stmt->close();
    // }

    if($hash == $password){
        echo "Login successful";
    } else {
        echo "Wrong password or username it was " + $hash;
    }
}
?>
