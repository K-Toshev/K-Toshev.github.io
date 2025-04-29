document.addEventListener('DOMContentLoaded', function() {
    const currentUser = sessionStorage.getItem('currentUser');
    if (!currentUser) {
        window.location.href = 'index.html';
        return;
    }

    // Initialize user data if it doesn't exist
    let userData = JSON.parse(localStorage.getItem(currentUser)) || {
        netid: currentUser,
        courses: [],
        schedule: {}
    };

    // Save the initialized data back to storage
    localStorage.setItem(currentUser, JSON.stringify(userData));

    const courseList = document.getElementById('courseList');
    const newCourseInput = document.getElementById('newCourse');
    const addCourseButton = document.getElementById('addCourse');

    // Function to render courses
    function renderCourses() {
        courseList.innerHTML = '';
        userData.courses.forEach(course => {
            const li = document.createElement('li');
            li.textContent = course;
            
            // Add delete button for each course
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = '×';
            deleteBtn.className = 'delete-course';
            deleteBtn.addEventListener('click', () => {
                userData.courses = userData.courses.filter(c => c !== course);
                localStorage.setItem(currentUser, JSON.stringify(userData));
                renderCourses();
            });
            
            li.appendChild(deleteBtn);
            courseList.appendChild(li);
        });
    }

    // Add course function
    function addCourse() {
        const course = newCourseInput.value.trim();
        if (!course) {
            alert('Please enter a course name');
            return;
        }

        if (!userData.courses.includes(course)) {
            userData.courses.push(course);
            localStorage.setItem(currentUser, JSON.stringify(userData));
            renderCourses();
            newCourseInput.value = '';
        } else {
            alert('You already have this course added');
        }
    }

    // Event listeners
    addCourseButton.addEventListener('click', addCourse);
    
    // Also allow adding by pressing Enter
    newCourseInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addCourse();
        }
    });

    // Initial render
    renderCourses();
});