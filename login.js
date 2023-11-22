
/*
function submitForm() {
    var name = document.getElementById("name").value;
    
    // Send data to server.php using AJAX
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "server.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            document.getElementById("response").innerHTML = xhr.responseText;
        }
    };
    console.log("name=" + name);
    xhr.send("name=" + name);
}

function signup() {
    var name = document.getElementById("name").value;

    // Send data to server.php using AJAX
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "server.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            document.getElementById("response").innerHTML = xhr.responseText;
        }
    };
    console.log("name=" + name);
    xhr.send("name=" + name);
}
*/

function submitForm() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    // Send data to server.php using AJAX
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "server.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var response = xhr.responseText;
            document.getElementById("response").innerHTML = response;

            // Check if the login was successful
            if (response.includes("Login successful")) {
                // Set a cookie with the username
                setCookie('username', username, 7); // 7 days expiration, adjust as needed

                // Redirect or perform other actions as needed
            }
        }
    };

    xhr.send("username=" + username + "&password=" + password);
}

function signup() {
    var username = document.getElementById("username").value;

    // Send data to server.php using AJAX
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "server.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            document.getElementById("response").innerHTML = xhr.responseText;
        }
    };

    xhr.send("username=" + username);
}

function setCookie(name, value, days) {
    var expires = '';
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + value + expires + '; path=/';
}
