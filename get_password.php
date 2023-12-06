<?php

require_once 'dbconn.php';

$username = $_GET['username'];
$con = new dbconn();
$conn = $con->dbcon();  
echo "Username: " . htmlspecialchars($username) . "<br>";
$result = get_user_data($username, $conn);

function get_user_data($username, $conn){
    $results = [];
    if(!$conn){
        echo "Connection fail";
    } else {
        $sql = "SELECT * FROM users WHERE username='" . $username . "'";
        if ($conn->multi_query($sql)) {
            do {
                if ($result = $conn->store_result()) {
                    while ($row = $result->fetch_assoc()) {
                        $results[] = $row;
                    }
                    $result->free();
                }
                // Check for more results
            } while ($conn->more_results() && $conn->next_result());
        } else {
            echo "Error: " . $conn->error;
        }
    }
    return $results;
}

// Loop through the results and print each row
foreach ($result as $row) {
    foreach ($row as $key => $value) {
        echo htmlspecialchars($key) . ": " . htmlspecialchars($value) . "<br>";
    }
    echo "<br>";
}
?>
