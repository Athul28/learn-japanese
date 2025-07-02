// Demo script to test local storage functionality
// Run this in the browser console on localhost:3000

console.log("=== NihongoJourney Progress Demo ===");

// Check current progress in localStorage
function checkLocalProgress() {
  const progress = localStorage.getItem("nihongo-progress");
  const lessons = localStorage.getItem("nihongo-lessons");

  console.log("Current Progress:", progress ? JSON.parse(progress) : "None");
  console.log("Lesson Progress:", lessons ? JSON.parse(lessons) : "None");
}

// Simulate completing a lesson as a guest user
function simulateGuestLessonCompletion() {
  // Mock lesson completion data
  const mockProgress = {
    level: 2,
    xp: 150,
    streak: 3,
    longestStreak: 5,
    totalStudyTime: 45,
    completedLessons: 3,
    dailyGoal: 5,
    isProMember: false,
  };

  const mockLessonProgress = [
    {
      lessonId: "lesson-1",
      status: "COMPLETED",
      score: 85,
      timeSpent: 180,
      attempts: 1,
      lastAttemptAt: new Date().toISOString(),
      completedAt: new Date().toISOString(),
    },
  ];

  localStorage.setItem("nihongo-progress", JSON.stringify(mockProgress));
  localStorage.setItem("nihongo-lessons", JSON.stringify(mockLessonProgress));
  localStorage.setItem("nihongo-last-study", new Date().toDateString());

  console.log("✅ Simulated lesson completion for guest user!");
  console.log("Progress saved to localStorage");
}

// Clear all progress
function clearProgress() {
  localStorage.removeItem("nihongo-progress");
  localStorage.removeItem("nihongo-lessons");
  localStorage.removeItem("nihongo-last-study");
  console.log("🗑️ All progress cleared");
}

// Export functions for testing
window.demoFunctions = {
  checkLocalProgress,
  simulateGuestLessonCompletion,
  clearProgress,
};

console.log("Demo functions available:");
console.log("- demoFunctions.checkLocalProgress()");
console.log("- demoFunctions.simulateGuestLessonCompletion()");
console.log("- demoFunctions.clearProgress()");

// Check current state
checkLocalProgress();
