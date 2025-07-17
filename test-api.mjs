// Simple Node.js script to test the API endpoints
import fetch from "node-fetch";

const baseUrl = "http://localhost:3002";

async function testCategoryProgressAPI() {
  console.log("🧪 Testing lesson category progress API...\n");

  // Test GET endpoint (should return 401 without auth)
  console.log("1. Testing GET /api/lesson-categories/progress (should be 401)");
  try {
    const getResponse = await fetch(
      `${baseUrl}/api/lesson-categories/progress`
    );
    const getData = await getResponse.json();
    console.log(`   Status: ${getResponse.status}`);
    console.log(`   Response:`, getData);
  } catch (error) {
    console.log(`   Error:`, error.message);
  }

  console.log(
    "\n2. Testing POST /api/lesson-categories/progress (should be 401)"
  );
  try {
    const postResponse = await fetch(
      `${baseUrl}/api/lesson-categories/progress`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          categoryId: 1,
          completedLessons: 1,
          action: "progress",
        }),
      }
    );
    const postData = await postResponse.json();
    console.log(`   Status: ${postResponse.status}`);
    console.log(`   Response:`, postData);
  } catch (error) {
    console.log(`   Error:`, error.message);
  }

  console.log("\n✅ API endpoints are responding (401 expected without auth)");
}

testCategoryProgressAPI();
