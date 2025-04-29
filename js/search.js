document.addEventListener('DOMContentLoaded', function() {
    const currentUser = sessionStorage.getItem('currentUser');
    if (!currentUser) {
        window.location.href = './index.html';
        return;
    }

    // Load current user's data
    const currentUserData = JSON.parse(localStorage.getItem(currentUser));
    if (!currentUserData?.courses?.length) {
        document.getElementById('resultsContainer').innerHTML = `
            <div class="no-courses-warning">
                <p>You haven't added any courses to your profile yet.</p>
                <a href="./profile.html">Add courses to find matches</a>
            </div>
        `;
        return;
    }

    // Display course checkboxes
    const courseCheckboxes = document.getElementById('courseCheckboxes');
    currentUserData.courses.forEach(course => {
        const label = document.createElement('label');
        label.className = 'course-checkbox';
        label.innerHTML = `
            <input type="checkbox" checked value="${course}">
            ${course}
        `;
        courseCheckboxes.appendChild(label);
    });

    // Find matches button
    document.getElementById('findMatches').addEventListener('click', function() {
        const selectedCourses = Array.from(
            document.querySelectorAll('#courseCheckboxes input:checked')
        ).map(checkbox => checkbox.value);

        if (selectedCourses.length === 0) {
            alert("Please select at least one course");
            return;
        }

        findMatchingStudents(selectedCourses, currentUserData);
    });

    // Initial search with all courses selected
    findMatchingStudents(currentUserData.courses, currentUserData);
});

function findMatchingStudents(selectedCourses, currentUserData) {
    const resultsContainer = document.getElementById('resultsContainer');
    resultsContainer.innerHTML = '<p>Searching for matches...</p>';

    // Get all users except current user
    const allUsers = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key !== currentUserData.netid) {
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

    // Find students with matching courses
    const matchedUsers = allUsers.filter(user => 
        selectedCourses.some(course => 
            user.courses.includes(course)
        )
    );

    // Calculate match scores
    matchedUsers.forEach(user => {
        // Course match score (number of shared courses)
        user.courseMatch = user.courses.filter(c => 
            selectedCourses.includes(c)
        ).length;
        
        // Schedule match score (shared available hours)
        user.scheduleMatch = calculateScheduleMatch(
            currentUserData.schedule || {},
            user.schedule || {}
        );
        
        // Combined score (prioritize course matches)
        user.totalScore = user.courseMatch * 2 + user.scheduleMatch;
    });

    // Sort by best matches
    matchedUsers.sort((a, b) => b.totalScore - a.totalScore);

    // Display results
    displayResults(matchedUsers, selectedCourses);
}

function calculateScheduleMatch(schedule1, schedule2) {
    let score = 0;
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    
    days.forEach(day => {
        const hours1 = schedule1[day] || [];
        const hours2 = schedule2[day] || [];
        score += hours1.filter(h => hours2.includes(h)).length;
    });
    
    return score;
}

function displayResults(users, selectedCourses) {
    const resultsContainer = document.getElementById('resultsContainer');
    
    if (users.length === 0) {
        resultsContainer.innerHTML = `
            <div class="no-results">
                <p>No students found taking all selected courses.</p>
                <p>Try selecting fewer courses or check back later.</p>
            </div>
        `;
        return;
    }

    resultsContainer.innerHTML = `
        <h2>Found ${users.length} potential study partner${users.length !== 1 ? 's' : ''}</h2>
        <div class="results-grid">
            ${users.map(user => `
                <div class="result-card" onclick="location.href='./student.html?netid=${user.netid}'">
                    <h3>${user.netid}</h3>
                    <div class="match-info">
                        <span class="course-match">
                            ${user.courseMatch}/${selectedCourses.length} courses
                        </span>
                        <span class="schedule-match">
                            ${user.scheduleMatch} matching hours
                        </span>
                    </div>
                    <div class="shared-courses">
                        <strong>Shared courses:</strong>
                        ${user.courses.filter(c => selectedCourses.includes(c)).join(', ')}
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}