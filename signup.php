<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $username = $_POST["username"];
    $address = $_POST["address"];
    $password = $_POST["password"];

    // Process the data (e.g., save to a database)
    // For simplicity, we'll just echo the name in this example.
    echo "<div>Hello, $username! Your data has been received $address, $password</div>";
}
?>
