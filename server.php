<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $name = $_POST["name"];

    // Process the data (e.g., save to a database)
    // For simplicity, we'll just echo the name in this example.
    echo "Hello, $name! Your data has been received.";
}
?>
