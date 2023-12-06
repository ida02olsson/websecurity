<?php

require_once 'dbconn.php';
session_start();

if ($_SERVER["REQUEST_METHOD"] === "GET") {
    $search = $_GET['search'];
    $con = new dbconn();
    $conn = $con->dbcon();
    $search = "%" . $search . "%";
    $sql = "SELECT * FROM reviews WHERE review LIKE '" . $search . "';";
    // SELECT * FROM reviews WHERE review like '%T%' UNION SELECT 0, username, password FROM users WHERE '1%'='1;
    // Vulnerable to query of "' OR '1'='1' UNION SELECT 0, username, password FROM users WHERE '1'='1"
    if($stmt = $conn->prepare($sql)) {
      $stmt->execute();
      $result = $stmt->get_result();
      if ($result->num_rows > 0) {
          echo "<table><tr><th>Username</th><th>Review</th></tr>";
          while($row = $result->fetch_assoc()) {
              echo "<tr><td>" . $row["username"] . "</td><td>" . $row["review"] . "</td></tr>";
          }
          echo "</table>";
      } else {
        echo $search;
          echo $sql;
          echo "0 results";
      }
      $stmt->close();
    }

}
?>
