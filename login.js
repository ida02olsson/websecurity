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
    var reg_date;
    // Send data to server.php using AJAX
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "get_reg_date.php?username=" + username, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            reg_date = xhr.responseText;
            console.log("name=" + reg_date);
            login(username, reg_date, password);
        }
    };
    xhr.send(null);
}


function login(username, reg_date, password) {
    var securePassword = hashValue(password + reg_date).then(sendToServer);
    console.log("password = " + password);
    console.log("reg_date = " + reg_date);
    function sendToServer(securePassword) {
        console.log(securePassword);

        // Send data to server.php using AJAX
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "login.php?username=" + username + "&password=" + securePassword, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var response = JSON.parse(xhr.responseText);
                document.getElementById("response").innerHTML = response["message"];
                if(response["success"]){
                    
                    // Set cookie to username
                    document.cookie = "username=" + response["username"] + "; Secure; SameSite=Strict";
                    document.cookie = "csrfToken=" + response["csrfToken"] + "; Secure; SameSite=Strict";
                    // Move to store
                    window.location.href = "store.html";
                }else{
                    // Get attempts from cookie
                    var cookie = document.cookie;
                    var cookieArray = cookie.split(";");
                    for(var i = 0; i < cookieArray.length; i++){
                        var cookie = cookieArray[i].split("=");
                        if(cookie[0].trim() == "attempts"){
                            attempts = cookie[1];
                        }
                    }
                    attempts++;
                    document.cookie = "attempts=" + attempts + ";max-age=30";
                    if(attempts > 3){
                        alert("Too many attempts, please try again later");
                        window.location.href = "signup.html";
                    }
                }
            }
        };
        console.log("username=" + username);
        xhr.send(null);
    }
}

const hashValue = val =>
crypto.subtle
  .digest('SHA-256', new TextEncoder('utf-8').encode(val))
  .then(h => {
    let hexes = [],
      view = new DataView(h);
    for (let i = 0; i < view.byteLength; i += 4)
      hexes.push(('00000000' + view.getUint32(i).toString(16)).slice(-8));
    return hexes.join('');
  });
 
hashValue(password).then(console.log);