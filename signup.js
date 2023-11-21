function signup() {
    var username = document.getElementById("username").value;
    var address = document.getElementById("address").value;
    var password = document.getElementById("password").value;
    var securePassword = hashvalue(password);

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
    xhr.send("password=" + securePassword);
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
