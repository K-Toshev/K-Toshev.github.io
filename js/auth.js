document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const netid = document.getElementById('netid').value.trim();
    if (!netid) {
        alert("Please enter a NetID");
        return;
    }

    // Create new user if doesn't exist
    if (!localStorage.getItem(netid)) {
        localStorage.setItem(netid, JSON.stringify({
            netid: netid,
            courses: [],
            schedule: {}
        }));
    }

    // Set active session
    sessionStorage.setItem('currentUser', netid);
    window.location.href = 'home.html';
});