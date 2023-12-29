var username;
var address;
var register_date;
var password;

var common_passwords_list = ['qwerty123', 'zaq12wsx', '1q2w3e4r', 'mamma123', 'hejsan123', 'abcd1234', 'sommar123', 'hejhej123'];

function signup() {

    username = document.getElementById("username").value;
    address = document.getElementById("address").value;
    password = document.getElementById("password").value;
    var confirm = document.getElementById("confirm-pasword").value;

    // Check that passwords match
    if (password != confirm) {
        document.getElementById("password").value = "";
        document.getElementById("confirm-pasword").value = "";
        document.getElementById("response").innerHTML = "Passwords do not match!";
        return;
    }


    console.log(password + register_date);
    sendToServer();
}

function sendToServer() {

    // Send data to server.php using AJAX
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "signup.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        var response = JSON.parse(xhr.responseText);
        if (xhr.readyState == 4 && xhr.status == 200) {
            document.getElementById("response").innerHTML = response["message"];
            if(response["message"].startsWith("Signup successful")){
                window.location.href = "index.html";
            }
        }
    };
    console.log("username=" + username);
    xhr.send("username=" + username + "&address=" + address + "&password=" + password);
}