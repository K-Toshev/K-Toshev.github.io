// Save profile to Firestore
async function saveProfile(userId, profileData) {
    try {
      await db.collection("users").doc(userId).set(profileData);
      console.log("Profile saved to Firestore!");
    } catch (error) {
      console.error("Firestore error:", error);
      // Fallback to localStorage
      localStorage.setItem(userId, JSON.stringify(profileData));
    }
  }
  
  // Load profile from Firestore
  async function loadProfile(userId) {
    try {
      const doc = await db.collection("users").doc(userId).get();
      return doc.exists ? doc.data() : null;
    } catch (error) {
      console.error("Firestore error:", error);
      // Fallback to localStorage
      return JSON.parse(localStorage.getItem(userId));
    }
  }
  
  // Example usage in profile.js
  document.addEventListener('DOMContentLoaded', async () => {
    const currentUser = sessionStorage.getItem('currentUser');
    if (!currentUser) window.location.href = 'index.html';
  
    // Load existing profile
    const userData = await loadProfile(currentUser) || {
      netid: currentUser,
      courses: [],
      schedule: {}
    };
  
    // Save when adding a course
    document.getElementById('addCourse').addEventListener('click', async () => {
      const course = document.getElementById('newCourse').value.trim();
      if (course && !userData.courses.includes(course)) {
        userData.courses.push(course);
        await saveProfile(currentUser, userData);
        renderCourses(); // Update UI
      }
    });
  });