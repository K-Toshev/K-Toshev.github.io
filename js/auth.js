document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const netid = document.getElementById('netid').value;
    const password = document.getElementById('password').value;
    
    // Store current user in sessionStorage
    sessionStorage.setItem('currentUser', netid);
    
    // Redirect to home page
    window.location.href = 'home.html';
});

// Add this function to auth.js
function logout() {
    // Clear session storage
    sessionStorage.removeItem('currentUser');
    // Redirect to login page
    window.location.href = 'index.html';
}

// Make sure this is at the bottom of auth.js
document.addEventListener('DOMContentLoaded', function() {
    // Display current user
    const currentUser = sessionStorage.getItem('currentUser');
    if (currentUser) {
        document.getElementById('userWelcome').textContent = `Welcome, ${currentUser}!`;
    }
    
    // Add click event listener (alternative to onclick in HTML)
    const logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
        logoutButton.addEventListener('click', logout);
    }
});