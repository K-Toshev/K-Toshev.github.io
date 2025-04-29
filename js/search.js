document.addEventListener('DOMContentLoaded', function() {
    const currentUser = sessionStorage.getItem('currentUser');
    if (!currentUser) window.location.href = 'index.html';
    
    // Get current user's data
    const currentUserData = JSON.parse(localStorage.getItem(currentUser));
    if (!currentUserData || !currentUserData.courses) {
        alert('Please set up your profile first!');
        window.location.href = 'profile.html';
        return;
    }
    
    document.getElementById('searchButton').addEventListener('click', searchStudents);
    
    function searchStudents() {
        const query = document.getElementById('searchInput').value.trim().toUpperCase();
        if (!query) {
            alert('Please enter a course to search for');
            return;
        }
        
        const resultsContainer = document.getElementById('resultsContainer');
        resultsContainer.innerHTML = '<h2>Loading results...</h2>';
        
        // Get all users except current user
        const allUsers = [];
        const keys = Object.keys(localStorage);
        
        for (const key of keys) {
            try {
                if (key !== currentUser && key !== 'debug') {
                    const user = JSON.parse(localStorage.getItem(key));
                    if (user && user.courses) {
                        allUsers.push(user);
                    }
                }
            } catch (e) {
                console.log(`Skipping invalid key: ${key}`);
            }
        }
        
        // Filter by course
        const matchedUsers = allUsers.filter(user => 
            user.courses.some(course => 
                course.toUpperCase().includes(query)
            )
        );
        
        // Calculate match score based on shared free time
        matchedUsers.forEach(user => {
            user.matchScore = calculateMatchScore(currentUserData.schedule || {}, user.schedule || {});
        });
        
        // Sort by match score
        matchedUsers.sort((a, b) => b.matchScore - a.matchScore);
        
        // Display results
        if (matchedUsers.length === 0) {
            resultsContainer.innerHTML = '<p>No matches found. Try another course.</p>';
        } else {
            resultsContainer.innerHTML = `
                <h2>${matchedUsers.length} ${matchedUsers.length === 1 ? 'match' : 'matches'} found</h2>
                <div class="results-grid">
                    ${matchedUsers.map(user => `
                        <div class="result-card" onclick="location.href='student.html?netid=${user.netid}'">
                            <h3>${user.netid}</h3>
                            <p>Shared courses: ${user.courses.filter(c => 
                                currentUserData.courses.includes(c)).join(', ') || 'None'}</p>
                            <p>Schedule match: ${user.matchScore} hours</p>
                        </div>
                    `).join('')}
                </div>
            `;
        }
    }
    
    function calculateMatchScore(schedule1, schedule2) {
        let score = 0;
        const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
        
        days.forEach(day => {
            const hours1 = schedule1[day] || [];
            const hours2 = schedule2[day] || [];
            
            // Count overlapping hours
            score += hours1.filter(h => hours2.includes(h)).length;
        });
        
        return score;
    }
});