<?php
    class dbconn {
    public function dbcon() {
        global $conn;
        $conn = new mysqli('localhost','server','password','Webshop') or die 
        ('Error connecting to mysql' .mysqli_error());
        return $conn;

    }

    public function runStmt() {
        $sql = "SELECT IF(username = ?, 1, 0) FROM users;";
        $result = 0;
        if($stmt = $conn->prepare($sql)) {
        $stmt->bind_param("s", $username);
        $stmt->execute();
        $stmt->bind_result($result);
        $stmt->fetch();
        $stmt->close();
        }
        // Return true if user exists, false if not
        return $result == 1;
    }
}
?>