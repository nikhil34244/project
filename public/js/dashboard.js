// Dashboard Page Script

document.addEventListener('DOMContentLoaded', async function() {
  const logoutBtn = document.getElementById('logoutBtn');
  const userName = document.getElementById('userName');
  const userEmail = document.getElementById('userEmail');
  const userType = document.getElementById('userType');

  const user = await getCurrentUser();

  if (!user) {
    window.location.href = 'login.html';
    return;
  }

  userName.textContent = user.displayName || 'User';
  userEmail.textContent = user.email;
  userType.textContent = user.userType === 'jobseeker' ? 'Job Seeker' : 'Employer';

  logoutBtn.addEventListener('click', async function() {
    if (confirm('Are you sure you want to logout?')) {
      try {
        await logoutUser();
        window.location.href = 'index.html';
      } catch (error) {
        alert('Logout failed: ' + error.message);
      }
    }
  });
});
