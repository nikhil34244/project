// Home Page Script

document.addEventListener('DOMContentLoaded', async function() {
  // Check if user is already authenticated
  const user = await getCurrentUser();

  if (user) {
    // Redirect to dashboard if already logged in
    window.location.href = 'dashboard.html';
  }
});
