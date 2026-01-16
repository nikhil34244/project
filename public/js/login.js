// Login Page Script

document.addEventListener('DOMContentLoaded', function() {
  const loginForm = document.getElementById('loginForm');
  const loginBtn = document.getElementById('loginBtn');
  const errorMessage = document.getElementById('errorMessage');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');

  function clearErrors() {
    document.querySelectorAll('.field-error').forEach(el => {
      el.textContent = '';
    });
    document.querySelectorAll('input').forEach(el => {
      el.classList.remove('error');
    });
    errorMessage.style.display = 'none';
  }

  function showFieldError(fieldId, message) {
    const errorElement = document.getElementById(fieldId);
    if (errorElement) {
      errorElement.textContent = message;
      const inputId = fieldId.replace('Error', '');
      document.getElementById(inputId)?.classList.add('error');
    }
  }

  function validateForm() {
    clearErrors();
    let isValid = true;

    if (!emailInput.value) {
      showFieldError('emailError', 'Email is required');
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
      showFieldError('emailError', 'Please enter a valid email address');
      isValid = false;
    }

    if (!passwordInput.value) {
      showFieldError('passwordError', 'Password is required');
      isValid = false;
    }

    return isValid;
  }

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    loginBtn.disabled = true;
    loginBtn.textContent = 'Logging in...';

    try {
      await loginUser(emailInput.value, passwordInput.value);
      window.location.href = 'dashboard.html';
    } catch (error) {
      errorMessage.textContent = error.message;
      errorMessage.style.display = 'block';
      loginBtn.disabled = false;
      loginBtn.textContent = 'Login';
    }
  });

  emailInput.addEventListener('change', function() {
    document.getElementById('emailError').textContent = '';
    this.classList.remove('error');
  });

  passwordInput.addEventListener('change', function() {
    document.getElementById('passwordError').textContent = '';
    this.classList.remove('error');
  });
});
