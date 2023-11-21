
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
  document.cookie = "shoppingCart=" + cartJSON + "; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/";
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

function generateReceiptContent() {
  var receiptContent = '<html><head><title>Receipt</title></head><body>';

  receiptContent += '<h1>Cool Rings Company</h1>';
  receiptContent += '<h3>Receipt</h3>';
  receiptContent += '<ul>';

  for (var item in cartItems) {
    var itemName = item.replace(/_/g, ' ');
    var itemQuantity = cartItems[item];
    var itemPrice = itemPrices[item];
    var itemTotal = itemQuantity * itemPrice;

    receiptContent += `<li>${itemName}: ${itemQuantity}x ${itemPrice}kr = ${itemTotal}kr</li>`;
  }

  receiptContent += '</ul>';

  var totalCostElement = document.getElementById('totalCost');
  var totalCost = parseInt(totalCostElement.textContent);
  receiptContent += `<h4>Total Cost: ${totalCost}kr</h4>`;

  var currentTime = new Date().toLocaleString();
  receiptContent += `<p>Time: ${currentTime}</p>`;

  receiptContent += '</body></html>';

  return receiptContent;
}