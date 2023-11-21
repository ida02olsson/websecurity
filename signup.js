var username;
var address;
var register_date;

var common_passwords_list = ['qwerty123', 'zaq12wsx', '1q2w3e4r', 'mamma123', 'hejsan123', 'abcd1234', 'sommar123', 'hejhej123'];

function signup() {

    username = document.getElementById("username").value;
    address = document.getElementById("address").value;
    var password = document.getElementById("password").value;
    var confirm = document.getElementById("confirm-pasword").value;
    register_date = Date.now();

    // Check that passwords match
    if (password != confirm) {
        document.getElementById("password").value = "";
        document.getElementById("confirm-pasword").value = "";
        alert("Passwords do not match!");
        return;
    }

    if (invalidPassword(password)) {
        alert('not a valid password, must contain 8 characters, upper and lower case and at least one number');
        return;
    }

    if (common_passwords(password)) {
        alert('not a valid password, too common of a password');
        return;
    }

    console.log(password + register_date);
    var securePassword = hashValue(password + register_date).then(sendToServer);
}

function sendToServer(securePassword) {

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
    xhr.send("username=" + username + "&address=" + address + "&password=" + securePassword + "&reg_date=" + register_date);
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

function invalidPassword(password) {
    const re = new RegExp("^(?=.*[a-zA-Z])(?=.*\\d)(?=.*[A-Z])(?=.*[a-z]).{8,}$");
    console.log(re.test(password));
    return !re.test(password);
}

function common_passwords(password) {
    const re = new RegExp("^([pP]assword)");
    console.log(re.test(password));
    
    var includes_password = re.test(password);
    var includes_common = common_passwords_list.includes(password.toLowerCase());
    return includes_password || includes_common;
}



