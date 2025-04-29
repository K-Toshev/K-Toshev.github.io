async function searchStudents() {
    const query = document.getElementById('searchInput').value.trim().toUpperCase();
    const currentUser = sessionStorage.getItem('currentUser');
    
    // Get current user's data
    const currentUserData = await loadProfile(currentUser);
    if (!currentUserData?.courses) return;
  
    // Query Firestore for users with matching courses
    const snapshot = await db.collection("users")
      .where("courses", "array-contains", query)
      .get();
  
    const matchedUsers = [];
    snapshot.forEach(doc => {
      if (doc.id !== currentUser) {
        const user = doc.data();
        user.matchScore = calculateMatchScore(currentUserData.schedule, user.schedule);
        matchedUsers.push(user);
      }
    });
  
    // Display results (same as before)
    renderResults(matchedUsers);
  }