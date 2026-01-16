// Register Page Script

document.addEventListener('DOMContentLoaded', function() {
  const registerForm = document.getElementById('registerForm');
  const registerBtn = document.getElementById('registerBtn');
  const successMessage = document.getElementById('successMessage');
  const errorMessage = document.getElementById('errorMessage');

  const emailInput = document.getElementById('email');
  const displayNameInput = document.getElementById('displayName');
  const userTypeSelect = document.getElementById('userType');
  const passwordInput = document.getElementById('password');
  const confirmPasswordInput = document.getElementById('confirmPassword');

  const urlParams = new URLSearchParams(window.location.search);
  const userType = urlParams.get('type');
  if (userType) {
    userTypeSelect.value = userType;
  }

  function clearErrors() {
    document.querySelectorAll('.field-error').forEach(el => {
      el.textContent = '';
    });
    document.querySelectorAll('input').forEach(el => {
      el.classList.remove('error');
    });
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

    if (!displayNameInput.value) {
      showFieldError('displayNameError', 'Full name is required');
      isValid = false;
    } else if (displayNameInput.value.length < 2) {
      showFieldError('displayNameError', 'Full name must be at least 2 characters');
      isValid = false;
    }

    if (!passwordInput.value) {
      showFieldError('passwordError', 'Password is required');
      isValid = false;
    } else if (passwordInput.value.length < 6) {
      showFieldError('passwordError', 'Password must be at least 6 characters');
      isValid = false;
    }

    if (!confirmPasswordInput.value) {
      showFieldError('confirmPasswordError', 'Please confirm your password');
      isValid = false;
    } else if (passwordInput.value !== confirmPasswordInput.value) {
      showFieldError('confirmPasswordError', 'Passwords do not match');
      isValid = false;
    }

    return isValid;
  }

  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    registerBtn.disabled = true;
    registerBtn.textContent = 'Creating Account...';

    try {
      await registerUser(
        emailInput.value,
        passwordInput.value,
        displayNameInput.value,
        userTypeSelect.value
      );

      successMessage.textContent = 'Registration successful! Redirecting...';
      successMessage.style.display = 'block';

      setTimeout(() => {
        window.location.href = 'dashboard.html';
      }, 2000);
    } catch (error) {
      errorMessage.textContent = error.message;
      errorMessage.style.display = 'block';
      registerBtn.disabled = false;
      registerBtn.textContent = 'Create Account';
    }
  });

  emailInput.addEventListener('change', function() {
    document.getElementById('emailError').textContent = '';
    this.classList.remove('error');
  });

  displayNameInput.addEventListener('change', function() {
    document.getElementById('displayNameError').textContent = '';
    this.classList.remove('error');
  });

  passwordInput.addEventListener('change', function() {
    document.getElementById('passwordError').textContent = '';
    this.classList.remove('error');
  });

  confirmPasswordInput.addEventListener('change', function() {
    document.getElementById('confirmPasswordError').textContent = '';
    this.classList.remove('error');
  });
});
