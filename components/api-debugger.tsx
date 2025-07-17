// Simple API test component - add this to any page for debugging
import { useState } from "react";
import { useSession } from "next-auth/react";

export function ApiDebugger() {
  const { data: session } = useSession();
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const testCategoryProgressAPI = async () => {
    setLoading(true);
    try {
      // Test GET
      console.log("Testing GET /api/lesson-categories/progress");
      const getResponse = await fetch("/api/lesson-categories/progress");
      const getData = await getResponse.json();
      console.log("GET Response:", getData);

      if (session?.user) {
        // Test POST
        console.log("Testing POST /api/lesson-categories/progress");
        const postResponse = await fetch("/api/lesson-categories/progress", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            categoryId: 1,
            completedLessons: 1,
            action: "progress",
          }),
        });
        const postData = await postResponse.json();
        console.log("POST Response:", postData);
        setResult({ get: getData, post: postData });
      } else {
        setResult({ get: getData, note: "Not logged in, skipping POST test" });
      }
    } catch (error) {
      console.error("API Test Error:", error);
      setResult({
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
    setLoading(false);
  };

  return (
    <div className="fixed bottom-4 right-4 bg-white p-4 border border-gray-300 rounded shadow-lg max-w-md">
      <h3 className="font-bold text-sm mb-2">API Debugger</h3>
      <p className="text-xs mb-2">
        User: {session?.user?.email || "Not logged in"}
      </p>
      <button
        onClick={testCategoryProgressAPI}
        disabled={loading}
        className="bg-blue-500 text-white px-3 py-1 rounded text-xs disabled:opacity-50"
      >
        {loading ? "Testing..." : "Test Category API"}
      </button>
      {result && (
        <pre className="text-xs mt-2 bg-gray-100 p-2 rounded overflow-auto max-h-32">
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
}
