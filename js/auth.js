document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');

    if (!loginForm) {
        console.error("Login form not found!");
        return;
    }

    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const netid = document.getElementById('netid').value.trim();

        if (!netid) {
            alert("Please enter a NetID");
            return;
        }

        // Initialize user if new
        if (!localStorage.getItem(netid)) {
            localStorage.setItem(netid, JSON.stringify({
                netid: netid,
                email: `${netid}@uw.edu`, // Default email
                courses: [],
                schedule: {}
            }));
        }

        // Set session and redirect
        sessionStorage.setItem('currentUser', netid);
        window.location.href = './home.html';
    });
});