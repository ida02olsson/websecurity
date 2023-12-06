// Print username
document.addEventListener("DOMContentLoaded", function () {
  // Your code to retrieve and display the cookie here
  const username = getCookie("username");
  document.getElementById("response").innerHTML = "Logged in: " + username;
  console.log(document.cookie);
});

// Get cookie
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

// Using an object to store the quantity of each item in the cart
var cartItems = {};
var itemPrices = {
  'Blue': 100,
  'Yellow': 200,
  'Green': 300,
  'Red': 400,
  'Orange': 500
};

// Load cart from cookie when the page loads
document.addEventListener('DOMContentLoaded', function () {
  loadCartFromCookie();
});

function addToCart(productName) {
  console.log('Adding to cart:', productName); // debugg
  var formattedProductName = productName.replace(/\s/g, '_');

  if (cartItems[formattedProductName]) {
    cartItems[formattedProductName]++;
  } else {
    cartItems[formattedProductName] = 1;
  }

  updateCartDisplay();
  saveCartToCookie();
}

function updateCartDisplay() {
  var shoppingCartList = document.getElementById('shoppingCart');
  var totalCostElement = document.getElementById('totalCost');
  var totalCost = 0;

  // Check if shoppingCartList is null or undefined
  if (!shoppingCartList) {
    console.error('Error: shoppingCartList is null or undefined.');
    return;
  }

  // Clear the existing list
  shoppingCartList.innerHTML = '';

  // Display each item in the cart along with its quantity and +/- buttons
  for (var item in cartItems) {
    var listItem = document.createElement('li');
    listItem.textContent = cartItems[item] + 'x ' + item;

    var decrementButton = createButton('-', item);
    var incrementButton = createButton('+', item);

    listItem.appendChild(decrementButton);
    listItem.appendChild(incrementButton);

    shoppingCartList.appendChild(listItem);

    totalCost += cartItems[item] * itemPrices[item];
  }

  // Display total cost
  totalCostElement.textContent = totalCost + 'kr';
}

function createButton(text, item) {
  var button = document.createElement('button');
  button.textContent = text;

  if (text === '-') {
    button.onclick = function () {
      if (cartItems[item] > 0) {
        cartItems[item]--;
      }
      if (cartItems[item] === 0) {
        delete cartItems[item];
      }
      updateCartDisplay();
      saveCartToCookie();
    };
  } else if (text === '+') {
    button.onclick = function () {
      cartItems[item]++;
      updateCartDisplay();
      saveCartToCookie();
    };
  }

  return button;
}

function saveCartToCookie() {
  var cartJSON = JSON.stringify(cartItems);
  document.cookie = "shoppingCart=" + cartJSON + "; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/"; /* cross-site scripting (xss) secure */
  //document.cookie = "shoppingCart=" + cartJSON + "; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/; secure"; /* cross-site scripting (xss) */
}

function loadCartFromCookie() {
  var cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)shoppingCart\s*=\s*([^;]*).*$)|^.*$/, "$1");
  if (cookieValue) {
    cartItems = JSON.parse(cookieValue);
    updateCartDisplay();
  }
}

function pay() {
  var currentTime = new Date().toLocaleString();
  hashValue(currentTime).then(updateReceipt);
  function updateReceipt(hash) {
    var receiptContent = generateReceiptContent(hash);
    var receiptTab = window.open();
    receiptTab.document.write(receiptContent);

  cartItems = {};
  updateCartDisplay();
  saveCartToCookie();
  }
}

function confirmPayment() {
  var itemQuantity = {};
  var itemPrice = {};
  var itemTotal = {};
  var confirmation = '<html><head><title>Confirmation</title><script src="store.js"></script></head><body>';
  confirmation += '<h1>Confirm payment</h1>';
  confirmation += '<h3>Send money to address: Qy2MEFpYaEfkyNb06zwdU</h3>';
  confirmation += `<input type="text" placeholder="Enter TransactionID" id="TransID">`;

  // Assuming you have an element with the id 'totalCost'
  var totalCostElement = document.getElementById('totalCost');
  var totalCost = parseInt(totalCostElement.textContent) || 0; // Default to 0 if element not found
  confirmation += `<h3>Amount being sent: ${totalCost}kr </h3>`;

  for (var item in cartItems) {
    var itemName = item.replace(/_/g, ' '); /* cross-site scripting (xss) secure */
    var itemQuantity = cartItems[item];
    var itemPrice = itemPrices[item];
    var itemTotal = itemQuantity * itemPrice;

    confirmation += `<li>${item}: ${itemQuantity}x ${itemPrice}kr = ${itemTotal}kr</li>`; /* cross-site scripting (xss) */
  }

  confirmation += `<button id="confirmPay" onclick="handleConfirmation()">Confirm payment</button>`;

  var confirmationTab = window.open();
  confirmationTab.document.write(confirmation);

  //var confirmPayButton = confirmationTab.document.getElementById('confirmPay');
  //confirmPayButton.onclick = handleConfirmation();

  confirmation += '</body></html>';

  /*for (var item in cartItems) {
    console.log("test");
    cartItems = {};
    updateCartDisplay();
    saveCartToCookie();
  }*/
}


function handleConfirmation() {
  var TransID = document.getElementById('TransID').value;

  if (TransID.trim() !== '') {
    pay()
   
  } else {
    alert('Please enter your wallet address and private key');
  } 
}


function generateReceiptContent(hash) {
  var receiptContent = '<html><head><title>Receipt</title></head><body>';

  receiptContent += '<h1>Cool Rings Company</h1>';
  receiptContent += '<h3>Receipt</h3>';
  receiptContent += '<ul>';
  receiptContent += '</ul>';

  //var totalCost = parseInt(totalCostElement.textContent);
  receiptContent += `<h4>Total Cost: 100kr</h4>`;

  var currentTime = new Date().toLocaleString();

  receiptContent += `<p>Time: ${currentTime} </p>`;

  receiptContent += `<p>Personalised hash: ${hash}</p>`; // detta funkar inte just nu tillsammans med importsatsen högst upp
  // kommentera bort de två raderna så ska programmet fungera
  receiptContent += '<p>Thank you for shopping with Cool Rings Company(TM)!</p>';

  receiptContent += `<h4>Wallet address: rVkttq7tXaYiE6ApXkui5CZVM6SIYzHCNjU7ft3ONUP0t80</h4>`;

  receiptContent += '</body></html>';

  return receiptContent;
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


function submitReview() {
  var review = DOMPurify.sanitize(document.getElementById("review").value, { ALLOWED_TAGS: [] }); // cross-site scripting (xss) secure
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "reviews.php", true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      console.log("xhr=" + xhr.responseText);
      getReviews();
    }
  };
  xhr.send("username=" + getCookie("username") + "&review=" + review);
}

function getReviews() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "reviews.php", true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      document.getElementById("reviews").innerHTML = xhr.responseText;
      console.log("xhr=" + xhr.responseText);
    }
  };
  xhr.send(null);
}
