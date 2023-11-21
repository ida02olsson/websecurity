
<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $username = $_POST["username"];
    $password = $_POST["password"];

    // Hardcoded username and password (for demonstration purposes)
    $validUsername = "demo_user";
    $validPassword = "demo_pass";

    // Check if the provided credentials are valid
    if ($username === $validUsername && $password === $validPassword) {
        echo "Login successful. Welcome, $username!";
    } else {
        echo "Invalid username or password. Please try again.";
    }
}
?>

