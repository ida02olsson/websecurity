// Import the function to be tested
const  updateCartDisplay  = require('./store');

// Test for cross-site scripting attack
test('Cross-Site Scripting (XSS) Attack Test', () => {
  // Set up the test data
  const maliciousItem = '<script>alert("XSS Attack!");</script>';
  const cartItems = {
    'item1': 2,
    'item2': 1,
    'item3': maliciousItem,
  };

  // Mock the necessary DOM elements
  document.getElementById = jest.fn((id) => {
    if (id === 'shoppingCart') {
      return document.createElement('ul');
    } else if (id === 'totalCost') {
      return document.createElement('span');
    }
  });

  // Call the function to be tested
  updateCartDisplay();

  // Assert that the malicious item is properly escaped
  const shoppingCartList = document.getElementById('shoppingCart');
  const listItem = shoppingCartList.firstChild;
  expect(listItem.textContent).not.toContain(maliciousItem);
});