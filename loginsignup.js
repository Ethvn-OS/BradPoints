// Signup form validation 

const signupForm = document.getElementById('signupForm');
if (signupForm) {
  signupForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('signupUsername').value.trim();
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const messageBox = document.getElementById('signupMessage');

    messageBox.textContent = '';
    messageBox.classList.remove('success');

    // Username validation
    const usernamePattern = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])/;
    if (!usernamePattern.test(username)) {
      messageBox.textContent = 'Username must include at least one letter, one number, and one special character.';
      return;
    }

    // Password length check
    if (password.length < 8) {
      messageBox.textContent = 'Password must be at least 8 characters.';
      return;
    }

    // Checking if password == confirmPassword 
    if (password !== confirmPassword) {
      messageBox.textContent = 'Passwords do not match.';
      return;
    }

    // Checking if username already exists
    const storedUsers = JSON.parse(localStorage.getItem('users') || '{}');
    if (storedUsers[username]) {
      messageBox.textContent = 'Username already exists. Please choose another one.';
      return;
    }

    // Save user to localStorage
    storedUsers[username] = { password: password };
    localStorage.setItem('users', JSON.stringify(storedUsers));

    messageBox.textContent = 'Signup successful! Redirecting to login...';
    messageBox.classList.add('success');

    setTimeout(() => {
      window.location.href = 'login.html';
    }, 1500);
  });
}

// Login form validation 
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value;
    const messageBox = document.getElementById('loginMessage');

    messageBox.textContent = '';
    messageBox.classList.remove('success');

    const storedUsers = JSON.parse(localStorage.getItem('users') || '{}');

    if (!storedUsers[username]) {
      messageBox.textContent = 'Username not found.';
      return;
    }

    if (storedUsers[username].password !== password) {
      messageBox.textContent = 'Incorrect password.';
      return;
    }

    messageBox.textContent = 'Login successful! Redirecting...';
    messageBox.classList.add('success');

    setTimeout(() => {
      // Redirecting to landing page 
      window.location.href = 'home.html';
    }, 1000);
  });
}