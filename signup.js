function signup() {
    var username = document.getElementById("username").value;
    var address = document.getElementById("address").value;
    var password = document.getElementById("password").value;
    var confirm = document.getElementById("confirm-pasword").value;

    if (password != confirm) {
        document.getElementById("password").value = "";
        document.getElementById("confirm-pasword").value = "";
        alert("Passwords do not match!");
        return;
    }
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
    xhr.send("username=" + username + "&address=" + address + "&password=" + password);
}
