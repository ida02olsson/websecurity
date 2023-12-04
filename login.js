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
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                document.getElementById("response").innerHTML = xhr.responseText;
                if(xhr.responseText.startsWith("Login successful")){
                    
                    // Set cookie to username
                    document.cookie = "username=" + username;

                    // Move to store
                    window.location.href = "store.html";
                }else{
                    // Check if too many attempts
                    attempts++;
                    if(attempts == 3){
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