function signup() {
    var username = document.getElementById("username").value;
    var address = document.getElementById("address").value;
    var password = document.getElementById("password").value;
    var securePassword = hashValue(password);
    var confirm = document.getElementById("confirm-pasword").value;

    if (password != confirm) {
        document.getElementById("password").value = "";
        document.getElementById("confirm-pasword").value = "";
        alert("Passwords do not match!");
        return;
    }

    if (validPassword(password)) {
        console.log('not a valid password, must contain 8 characters, upper and lower case and at least one number');
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
    xhr.send("username=" + username + "&address=" + address + "&password=" + securePassword);
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

function validPassword(password) {
    const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$");
    return re.test(password);
}



