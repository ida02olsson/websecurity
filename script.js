function submitForm() {
    var name = document.getElementById("name"); // tog bort ".value" 


    // Send data to server.php using AJAX
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "server.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            document.getElementById("response").innerHTML = xhr.responseText;
        }
    };
    xhr.send("name=" + name);
}
