// Demo script to test the progress APIs
// This would typically be run in the browser console or as a test

console.log("Testing Progress APIs...");

// Test authenticated endpoints (requires login)
async function testProgressAPIs() {
  try {
    // Test progress overview
    console.log("1. Testing progress overview...");
    const overviewResponse = await fetch("/api/progress/overview");
    if (overviewResponse.ok) {
      const overview = await overviewResponse.json();
      console.log("✅ Progress overview:", overview.overall);
    } else {
      console.log("❌ Progress overview failed:", overviewResponse.status);
    }

    // Test lesson category progress
    console.log("2. Testing lesson category progress...");
    const categoryResponse = await fetch("/api/lesson-categories/progress");
    if (categoryResponse.ok) {
      const categories = await categoryResponse.json();
      console.log("✅ Category progress:", categories.length, "categories");
    } else {
      console.log("❌ Category progress failed:", categoryResponse.status);
    }

    // Test updating category progress
    console.log("3. Testing category progress update...");
    const updateResponse = await fetch("/api/lesson-categories/progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        categoryId: 1,
        completedLessons: 5,
        action: "progress",
      }),
    });
    if (updateResponse.ok) {
      const result = await updateResponse.json();
      console.log("✅ Category update successful:", result.category);
    } else {
      console.log("❌ Category update failed:", updateResponse.status);
    }

    // Test lesson progress
    console.log("4. Testing lesson progress...");
    const lessonResponse = await fetch("/api/lessons/progress");
    if (lessonResponse.ok) {
      const lessons = await lessonResponse.json();
      console.log("✅ Lesson progress:", lessons.length, "lessons");
    } else {
      console.log("❌ Lesson progress failed:", lessonResponse.status);
    }
  } catch (error) {
    console.error("API Test Error:", error);
  }
}

// Uncomment the line below to run the test
// testProgressAPIs();
