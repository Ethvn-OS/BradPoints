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

document.addEventListener('DOMContentLoaded', function() {
  const loginForm = document.getElementById('loginForm');
  const loginMessage = document.getElementById('loginMessage');

  /*if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const formData = new FormData(loginForm);

      fetch('login.php', {
        method: 'POST',
        body: formData,
        headers: { 'X-Requested-With': 'XMLHttpRequest' }
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          window.location.href = data.redirect;
        } else {
          loginMessage.textContent = data.error || "Login failed. Please try again.";
          loginMessage.style.color = "red";
        }
      })
      .catch(error => {
        loginMessage.textContent = "An error occurred. Please try again.";
        loginMessage.style.color = "red";
      });
    });
  }*/

    // Forgot Password Modal logic
    const forgotLink = document.getElementById('forgotPasswordLink');
    const modal = document.getElementById('forgotPasswordModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
  
    if (forgotLink && modal && closeModalBtn) {
      forgotLink.onclick = function() {
        modal.classList.add('show');
      };
      closeModalBtn.onclick = function() {
        modal.classList.remove('show');
      };
      modal.onclick = function(e) {
        if (e.target === modal) modal.classList.remove('show');
      };
    }
});