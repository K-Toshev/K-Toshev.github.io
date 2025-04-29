// Simulate UW NetID login (replace localStorage with Firebase Auth)
function handleLogin(netId, password) {
    // For demo, we'll use Firebase Email/Password Auth
    auth.signInWithEmailAndPassword(`${netId}@uw.edu`, password)
        .then((userCredential) => {
            sessionStorage.setItem('currentUser', netId);
            window.location.href = 'home.html';
        })
        .catch((error) => {
            alert("Login failed. Using demo mode.");
            // Fallback to localStorage if Firebase fails
            sessionStorage.setItem('currentUser', netId);
            window.location.href = 'home.html';
        });
}

document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const netId = document.getElementById('netid').value;
    const password = document.getElementById('password').value;
    handleLogin(netId, password);
});