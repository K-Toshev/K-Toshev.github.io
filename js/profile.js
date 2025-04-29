document.addEventListener('DOMContentLoaded', function() {
    const currentUser = sessionStorage.getItem('currentUser');
    if (!currentUser) {
        window.location.href = './index.html';
        return;
    }
    
    let userData = JSON.parse(localStorage.getItem(currentUser)) || {
        netid: currentUser,
        courses: [],
        schedule: {}
    };

    // Course Management
    const courseList = document.getElementById('courseList');
    function renderCourses() {
        courseList.innerHTML = userData.courses.map(course => `
            <li>
                ${course}
                <button class="delete-btn" data-course="${course}">×</button>
            </li>
        `).join('');
        
        // Add delete handlers
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                userData.courses = userData.courses.filter(c => c !== this.dataset.course);
                localStorage.setItem(currentUser, JSON.stringify(userData));
                renderCourses();
            });
        });
    }
    
    document.getElementById('addCourse').addEventListener('click', function() {
        const courseInput = document.getElementById('newCourse');
        const course = courseInput.value.trim();
        
        if (course && !userData.courses.includes(course)) {
            userData.courses.push(course);
            localStorage.setItem(currentUser, JSON.stringify(userData));
            renderCourses();
            courseInput.value = '';
        }
    });
    
    renderCourses();
});