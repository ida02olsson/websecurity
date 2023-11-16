function signup() {
    var username = document.getElementById("username").value;
    var address = document.getElementById("address").value;
    var password = document.getElementById("password").value;

    // Send data to server.php using AJAX
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "signup.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            document.getElementById("response").innerHTML = xhr.responseText;
        }
    };
    console.log("username=" + username);
    xhr.send("username=" + username);
    xhr.send("address=" + address);
    xhr.send("password=" + password);
}
