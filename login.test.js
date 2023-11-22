// Import the function to be tested
const submitForm = require('./login');

// Test for cross-site scripting (XSS) attack
test('Cross-Site Scripting (XSS) Attack Test', () => {
  // Set up the test data
  const maliciousResponse = '<script>alert("XSS Attack!");</script>';
  const xhrMock = {
    open: jest.fn(),
    setRequestHeader: jest.fn(),
    onreadystatechange: jest.fn(),
    readyState: 4,
    status: 200,
    responseText: maliciousResponse,
  };
  global.XMLHttpRequest = jest.fn(() => xhrMock);

  // Mock the necessary DOM elements
  document.getElementById = jest.fn((id) => {
    if (id === 'username') {
      return { value: 'testuser' };
    } else if (id === 'password') {
      return { value: 'testpassword' };
    } else if (id === 'response') {
      return { innerHTML: '' };
    }
  });

  // Call the function to be tested
  submitForm();

  // Assert that the response is properly sanitized
  const responseElement = document.getElementById('response');
  expect(responseElement.innerHTML).not.toContain(maliciousResponse);
});