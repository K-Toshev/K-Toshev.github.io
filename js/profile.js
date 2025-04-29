document.addEventListener('DOMContentLoaded', function() {
    const currentUser = sessionStorage.getItem('currentUser');
    if (!currentUser) window.location.href = 'index.html';
    
    // Load user data
    let userData = JSON.parse(localStorage.getItem(currentUser)) || {
        netid: currentUser,
        courses: [],
        schedule: {}
    };
    
    // Display courses
    const courseList = document.getElementById('courseList');
    function renderCourses() {
        courseList.innerHTML = '';
        userData.courses.forEach(course => {
            const li = document.createElement('li');
            li.textContent = course;
            courseList.appendChild(li);
        });
    }
    
    // Add course
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