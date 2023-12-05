<?php

require_once 'dbconn.php';

if ($_SERVER["REQUEST_METHOD"] === "GET") {
    $con = new dbconn();
    $conn = $con->dbcon();

    $sql = "SELECT * FROM reviews;";
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
        echo "<table><tr><th>Username</th><th>Review</th></tr>";
        while($row = $result->fetch_assoc()) {
            echo "<tr><td>" . $row["username"] . "</td><td>" . $row["review"] . "</td></tr>";
        }
        echo "</table>";
    } else {
        echo "0 results";
    }

}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $username = $_POST["username"];
    $review = $_POST["review"];

    // Validate the data
    $db = new dbconn();
    $con = new dbconn();
    $conn = $con->dbcon();
    
    // Add review to the database
    add_review($username, $review, $conn);
    echo "Reviewed successfully!";
}


  function add_review($username, $review, $conn){
    $sql = "INSERT INTO reviews (username, review) VALUES (?, ?);";
    if($stmt = $conn->prepare($sql)) {
      $stmt->bind_param("ss", $username, $review);
      $stmt->execute();
      $stmt->close();
    }
  }
?>
