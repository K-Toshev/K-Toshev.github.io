document.addEventListener('DOMContentLoaded', function() {
    const currentUser = sessionStorage.getItem('currentUser');
    if (!currentUser) window.location.href = 'index.html';
    
    let userData = JSON.parse(localStorage.getItem(currentUser));
    
    // Course Management
    const courseList = document.getElementById('courseList');
    function renderCourses() {
        courseList.innerHTML = '';
        userData.courses.forEach(course => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${course}
                <button class="delete-btn" data-course="${course}">×</button>
            `;
            courseList.appendChild(li);
        });
        
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
        const course = document.getElementById('newCourse').value.trim();
        if (course && !userData.courses.includes(course)) {
            userData.courses.push(course);
            localStorage.setItem(currentUser, JSON.stringify(userData));
            renderCourses();
            document.getElementById('newCourse').value = '';
        }
    });
    
    renderCourses();
});