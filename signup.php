<?php

require_once 'dbconn.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $username = $_POST["username"];
    $address = $_POST["address"];
    $password = $_POST["password"];

    $response = ['success' => false];
    
    header('Content-Type: application/json');

    // Validate the data
    $db = new dbconn();
    $con = new dbconn();
    $conn = $con->dbcon();

    $result = validate($username, $conn);
    if($result == 1){
        $response['message'] = "Username already exists";
        echo json_encode($response);
        return;
    }

    if(!check($password, $response, $username, $address, $conn))
    {
        return;
    }
    
    # Hash the password using argon2id
    $password = password_hash($password, PASSWORD_ARGON2ID);
    // $response['debug'] = $password . ' ' . $username . ' ' . $address;
    // Add the user to the database
    add_user($username, $address, $password, $conn);
    $response['message'] = "Signup successfull!";
    $response['success'] = true;
    echo json_encode($response);
}

function check($password, $response, $username, $address, $conn){
    if(strlen($password) < 8){
        $response['message'] = "Password must be at least 8 characters long";
        echo json_encode($response);
        return false;
    }
    if(strlen($username) < 1){
        $response['message'] = "Username must be at least 1 characters long";
        echo json_encode($response);
        return false;
    }
    $pattern = '/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/';

    if (!preg_match($pattern, $password)) {
        $response['message'] = "Password must contain at least one uppercase letter, one lowercase letter, and one digit.";
        echo json_encode($response);
        return false;
    }

    $bad_passwords = ['qwerty123', 'zaq12wsx', '1q2w3e4r', 'mamma123', 'hejsan123', 'abcd1234', 'sommar123', 'hejhej123'];
    if(in_array($password, $bad_passwords)){
        $response['message'] = "Password is too weak";
        echo json_encode($response);
        return false;
    }
    return true;
}

function validate($username, $conn){
    $sql = "SELECT COUNT(*) FROM users where username='" . $username ."';";
    $result = 0;
    if($stmt = $conn->prepare($sql)) {
      $stmt->execute();
      $stmt->bind_result($result);
      $stmt->fetch();
      $stmt->close();
    }
    // Return true if user exists, false if not
    return $result >= 1;
}

  function add_user($username, $address, $password, $conn){
    $reg_date = date("Y-m-d H:i:s");
    $sql = "INSERT INTO users (username, address, password, reg_date) VALUES ('" . $username . "', '" . $address ."', '" . $password ."', '" . $reg_date . "');";
    if($stmt = $conn->prepare($sql)) {
      // $stmt->bind_param("ssss", $username, $address, $password, $reg_date);
      $stmt->execute();
      $stmt->close();
    }
  }
?>
