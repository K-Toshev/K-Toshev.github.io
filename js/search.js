document.addEventListener('DOMContentLoaded', function() {
    const currentUser = sessionStorage.getItem('currentUser');
    if (!currentUser) window.location.href = 'index.html';
    
    const currentUserData = JSON.parse(localStorage.getItem(currentUser));
    
    document.getElementById('searchButton').addEventListener('click', function() {
        const query = document.getElementById('searchInput').value.trim().toUpperCase();
        if (!query) return;
        
        const resultsContainer = document.getElementById('resultsContainer');
        resultsContainer.innerHTML = '<h2>Loading results...</h2>';
        
        // Get all users except current user
        const allUsers = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key !== currentUser) {
                try {
                    const user = JSON.parse(localStorage.getItem(key));
                    if (user?.courses) {
                        allUsers.push(user);
                    }
                } catch (e) {
                    console.log(`Skipping invalid key: ${key}`);
                }
            }
        }
        
        // Filter by course
        const matchedUsers = allUsers.filter(user => 
            user.courses.some(course => 
                course.toUpperCase().includes(query)
            )
        );
        
        // Calculate match score
        matchedUsers.forEach(user => {
            user.matchScore = calculateMatchScore(
                currentUserData.schedule || {}, 
                user.schedule || {}
            );
        });
        
        // Sort and display
        displayResults(matchedUsers.sort((a, b) => b.matchScore - a.matchScore));
    });
    
    function calculateMatchScore(schedule1, schedule2) {
        let score = 0;
        const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
        
        days.forEach(day => {
            const hours1 = schedule1[day] || [];
            const hours2 = schedule2[day] || [];
            score += hours1.filter(h => hours2.includes(h)).length;
        });
        
        return score;
    }
    
    function displayResults(users) {
        const resultsContainer = document.getElementById('resultsContainer');
        resultsContainer.innerHTML = users.length ? `
            <h2>${users.length} ${users.length === 1 ? 'match' : 'matches'} found</h2>
            <div class="results-grid">
                ${users.map(user => `
                    <div class="result-card" onclick="location.href='student.html?netid=${user.netid}'">
                        <h3>${user.netid}</h3>
                        <p>Shared courses: ${user.courses.filter(c => 
                            currentUserData.courses.includes(c)).join(', ') || 'None'}</p>
                        <p>Schedule match: ${user.matchScore} hours</p>
                    </div>
                `).join('')}
            </div>
        ` : '<p>No matches found. Try another course.</p>';
    }
});