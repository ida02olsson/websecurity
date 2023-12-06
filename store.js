
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
  var receiptContent = generateReceiptContent();
  var receiptTab = window.open();
  receiptTab.document.write(receiptContent);

  cartItems = {};
  updateCartDisplay();
  saveCartToCookie();
  
}

function confirmPayment() {
  var itemQuantity = {};
  var itemPrice = {};
  var itemTotal = {};
  var confirmation = '<html><head><title>Confirmation</title><script src="store.js"></script></head><body>';
  confirmation += '<h1>Confirm payment</h1>';
  confirmation += '<h3>Send money to address: Qy2MEFpYaEfkyNb06zwdU</h3>';
  confirmation += `<input type="text" placeholder="Enter your wallet address" id="walletAddress">`;
  confirmation += `<input type="text" placeholder="Enter your private key" id="privateKey">`;

  // Assuming you have an element with the id 'totalCost'
  var totalCostElement = document.getElementById('totalCost');
  var totalCost = parseInt(totalCostElement.textContent) || 0; // Default to 0 if element not found
  confirmation += `<h3>Amount being sent: ${totalCost}kr </h3>`;

  for (var item in cartItems) {
    console.log("test");
    var itemQuantity = cartItems[item];
    var itemPrice = itemPrices[item];
    var itemTotal = itemQuantity * itemPrice;

    //receiptContent += `<li>${itemName}: ${itemQuantity}x ${itemPrice}kr = ${itemTotal}kr</li>`; /* cross-site scripting (xss) secure */
    confirmation += `<li>${item}: ${itemQuantity}x ${itemPrice}kr = ${itemTotal}kr</li>`; /* cross-site scripting (xss) */
  }

  confirmation += `<button id="confirmPay" onclick="handleConfirmation()">Confirm payment</button>`;

  var confirmationTab = window.open();
  confirmationTab.document.write(confirmation);

  // Define the function that will handle the confirmation logic
  

  // Attach the handleConfirmation function to the button's click event
  var confirmPayButton = confirmationTab.document.getElementById('confirmPay');
  confirmPayButton.onclick = handleConfirmation();

  confirmation += '</body></html>';
}


function handleConfirmation() {
  var walletAddress = document.getElementById('walletAddress').value;
  var privateKey = document.getElementById('privateKey').value;

  if (walletAddress.trim() !== '' && privateKey.trim() !== '') {
    pay()
    /*fetch("SimpleCoin-master/simpleCoin/wallet.py", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: "walletAddress=" + encodeURIComponent(walletAddress) +
            "&privateKey=" + encodeURIComponent(privateKey) +
            "&param=" + encodeURIComponent(text)
    })
    .then(response => response.text())
    .then(data => {
      console.log(data); // Handle the response if needed
      send_transaction(walletAddress, privateKey, "Qy2MEFpYaEfkyNb06zwdU", totalCost);
      pay();
    })
    .catch(error => {
      console.error("Error:", error);
      // Handle the error if needed
    }); */
  } else {
    alert('Please enter your wallet address and private key');
  } 
}



function generateReceiptContent() {
  var receiptContent = '<html><head><title>Receipt</title></head><body>';

  receiptContent += '<h1>Cool Rings Company</h1>';
  receiptContent += '<h3>Receipt</h3>';
  receiptContent += '<ul>';
  receiptContent += '</ul>';

  //var totalCost = parseInt(totalCostElement.textContent);
  receiptContent += `<h4>Total Cost: 100kr</h4>`;

  var currentTime = new Date().toLocaleString();

  receiptContent += `<p>Time: ${currentTime} </p>`;

  receiptContent += '</body></html>';

  return receiptContent;
}

