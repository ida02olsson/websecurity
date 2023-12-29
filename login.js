// Check if the user is logged in by sending a request to the server with the session cookie.
document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM fully loaded and parsed");
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "check_login.php", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var response = JSON.parse(xhr.responseText);
            console.log(xhr.responseText);
            response["csrfToken"] ? document.cookie = "csrfToken=" + response["csrfToken"] + "; Secure; SameSite=Strict" : null;
            response["isLoggedIn"] ? window.location.href = "store.html" : null;
            document.cookie = "username=" + response["username"] + "; Secure; SameSite=Strict";
        }
    };
    xhr.send(null);
});

var attempts = 0;
function submitForm() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    console.log(username);
    login(username, password);
}   


function login(username, password) {
    console.log("password = " + password);

    // Send data to server.php using AJAX
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "login.php?username=" + username + "&password=" + password, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var response = JSON.parse(xhr.responseText);
            document.getElementById("response").innerHTML = response["message"];
            if (response["success"]) {

                // Set cookie to username
                document.cookie = "username=" + response["username"] + "; Secure; SameSite=Strict";
                document.cookie = "csrfToken=" + response["csrfToken"] + "; Secure; SameSite=Strict";
                // Move to store
                window.location.href = "store.html";
            }   
        }
    }
    console.log("username=" + username);
    xhr.send(null);
}