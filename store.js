
// Using an object to store the quantity of each item in the cart
var cartItems = {};
var itemPrices = {
  'Blå ring': 100,
  'Gul ring': 200,
  'Grön ring': 300,
  'Röd ring': 400,
  'Orange ring': 500
};

// Load cart from cookie when the page loads
window.onload = function () {
  loadCartFromCookie();
};

function addToCart(productName) {
  // Check if the item is already in the cart
  if (cartItems[productName]) {
    cartItems[productName]++;
  } else {
    cartItems[productName] = 1;
  }

  updateCartDisplay();
  saveCartToCookie();
}

function updateCartDisplay() {
  var shoppingCartList = document.getElementById('shoppingCart');
  var totalCostElement = document.getElementById('totalCost');
  var totalCost = 0;

  // Clear the existing list
  shoppingCartList.innerHTML = '';

  // Display each item in the cart along with its quantity and +/- buttons
  for (var item in cartItems) {
    var listItem = document.createElement('li');
    listItem.textContent = cartItems[item] + 'x ' + item;

    // Add increment and decrement buttons
    var decrementButton = createButton('-', item);
    var incrementButton = createButton('+', item);

    listItem.appendChild(decrementButton);
    listItem.appendChild(incrementButton);

    shoppingCartList.appendChild(listItem);

    // Calculate total cost
    totalCost += cartItems[item] * itemPrices[item];
  }

  // Display total cost
  totalCostElement.textContent = totalCost + 'kr';
}

// Function to create +/- buttons with correct item information
function createButton(text, item) {
  var button = document.createElement('button');
  button.textContent = text;

  if (text === '-') {
    button.onclick = function () {
      if (cartItems[item] > 0) {
        cartItems[item]--;
      }
      if (cartItems[item] === 0) {
        delete cartItems[item]; // Remove item if quantity is 0
      }
      updateCartDisplay();
      saveCartToCookie();
    };
  } else if (text === '+') {
    button.onclick = function () {
      cartItems[item]++;
      updateCartDisplay();
      saveCartToCookie();
    }
  };
  return button;
}

// Function to save the cart to a cookie
function saveCartToCookie() {
  var cartJSON = JSON.stringify(cartItems);
  document.cookie = "shoppingCart=" + cartJSON + "; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/";
}

// Function to load the cart from a cookie
function loadCartFromCookie() {
  var cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)shoppingCart\s*=\s*([^;]*).*$)|^.*$/, "$1");
  if (cookieValue) {
    cartItems = JSON.parse(cookieValue);
    updateCartDisplay();
  }
}

// Function to handle payment and generate a receipt
function pay() {
  // Create a receipt content
  var receiptContent = generateReceiptContent();

  // Open a new tab with the receipt
  var receiptTab = window.open();
  receiptTab.document.write(receiptContent);

  // Clear the cart after payment
  cartItems = {};
  updateCartDisplay();
  saveCartToCookie();
}

// Function to generate receipt content
function generateReceiptContent() {
  var receiptContent = '<html><head><title>Receipt</title></head><body>';

  // Add store name
  receiptContent += '<h2>Store Name</h2>';

  // Add items and details
  receiptContent += '<h3>Receipt</h3>';
  receiptContent += '<ul>';
  for (var item in cartItems) {
    var itemName = item;
    var itemQuantity = cartItems[item];
    var itemPrice = itemPrices[item];
    var itemTotal = itemQuantity * itemPrice;

    receiptContent += `<li>${itemName}: ${itemQuantity}x ${itemPrice}kr = ${itemTotal}kr</li>`;
  }
  receiptContent += '</ul>';

  // Add total cost
  var totalCostElement = document.getElementById('totalCost');
  var totalCost = parseInt(totalCostElement.textContent);
  receiptContent += `<h4>Total Cost: ${totalCost}kr</h4>`;

  // Add current time
  var currentTime = new Date().toLocaleString();
  receiptContent += `<p>Time: ${currentTime}</p>`;

  // Close the HTML content
  receiptContent += '</body></html>';

  return receiptContent;
}
