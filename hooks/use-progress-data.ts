import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

interface ProgressOverview {
  user: {
    id: string;
    name: string;
    email: string;
    image: string;
    level: number;
    xp: number;
    streak: number;
    longestStreak: number;
    totalStudyTime: number;
    joinDate: string;
    isProMember: boolean;
    dailyGoal: number;
  };
  overall: {
    totalLessons: number;
    completedLessons: number;
    totalXP: number;
    currentLevel: number;
    xpToNextLevel: number;
    totalStudyTime: number;
  };
  lessons: {
    categoryProgress: number;
    totalCategoryLessons: number;
    interactiveProgress: number;
    totalInteractiveLessons: number;
    recentCompletions: any[];
  };
  streaks: {
    current: number;
    longest: number;
    todayStudied: boolean;
    weeklyData: Array<{
      date: string;
      xp: number;
      duration: number;
      lessonsCompleted: number;
    }>;
  };
  achievements: {
    total: number;
    earned: number;
    recent: any[];
  };
  todaySession: {
    duration: number;
    xpEarned: number;
    lessonsCompleted: number;
  } | null;
}

interface LessonCategoryProgress {
  id: number;
  title: string;
  totalLessons: number;
  difficulty: string;
  xpReward: number;
  completedLessons: number;
  status: string;
  lastAttemptAt: string | null;
  completedAt: string | null;
  isUnlocked: boolean;
  progressPercentage: number;
}

export function useProgressData() {
  const { data: session, status } = useSession();
  const [progressOverview, setProgressOverview] =
    useState<ProgressOverview | null>(null);
  const [categoryProgress, setCategoryProgress] = useState<
    LessonCategoryProgress[]
  >([]);
  const [lessonProgress, setLessonProgress] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch progress overview
  const fetchProgressOverview = async () => {
    if (!session?.user) return;

    try {
      const response = await fetch("/api/progress/overview");
      if (response.ok) {
        const data = await response.json();
        setProgressOverview(data);
      } else {
        console.error("Failed to fetch progress overview");
      }
    } catch (error) {
      console.error("Error fetching progress overview:", error);
      setError("Failed to load progress data");
    }
  };

  // Fetch lesson category progress
  const fetchCategoryProgress = async () => {
    if (!session?.user) return;

    try {
      const response = await fetch("/api/lesson-categories/progress");
      if (response.ok) {
        const data = await response.json();
        setCategoryProgress(data);
      } else {
        console.error("Failed to fetch category progress");
      }
    } catch (error) {
      console.error("Error fetching category progress:", error);
    }
  };

  // Fetch interactive lesson progress
  const fetchLessonProgress = async () => {
    if (!session?.user) return;

    try {
      const response = await fetch("/api/lessons/progress");
      if (response.ok) {
        const data = await response.json();
        setLessonProgress(data);
      } else {
        console.error("Failed to fetch lesson progress");
      }
    } catch (error) {
      console.error("Error fetching lesson progress:", error);
    }
  };

  // Update lesson category progress
  const updateCategoryProgress = async (
    categoryId: number,
    completedLessons: number,
    action: "complete" | "progress" = "progress"
  ) => {
    if (!session?.user) {
      console.warn("Cannot update category progress: User not authenticated");
      return false;
    }

    try {
      const response = await fetch("/api/lesson-categories/progress", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          categoryId,
          completedLessons,
          action,
        }),
      });

      if (response.ok) {
        // Refresh data after update
        await Promise.all([fetchProgressOverview(), fetchCategoryProgress()]);
        return true;
      } else {
        const errorData = await response
          .json()
          .catch(() => ({ error: "Unknown error" }));
        console.error("Failed to update category progress:", errorData);
        setError(
          `Failed to update progress: ${errorData.error || "Unknown error"}`
        );
        return false;
      }
    } catch (error) {
      console.error("Error updating category progress:", error);
      setError("Network error while updating progress");
      return false;
    }
  };

  // Update interactive lesson progress
  const updateLessonProgress = async (
    lessonId: string,
    status: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED",
    score?: number,
    timeSpent?: number,
    questionResults?: any[]
  ) => {
    if (!session?.user) return;

    try {
      const response = await fetch("/api/lessons/progress", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lessonId,
          status,
          score,
          timeSpent,
          questionResults,
        }),
      });

      if (response.ok) {
        // Refresh data after update
        await Promise.all([fetchProgressOverview(), fetchLessonProgress()]);
        return true;
      } else {
        console.error("Failed to update lesson progress");
        return false;
      }
    } catch (error) {
      console.error("Error updating lesson progress:", error);
      return false;
    }
  };

  // Update daily goal
  const updateDailyGoal = async (dailyGoal: number) => {
    if (!session?.user) return;

    try {
      const response = await fetch("/api/progress/overview", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ dailyGoal }),
      });

      if (response.ok) {
        await fetchProgressOverview();
        return true;
      } else {
        console.error("Failed to update daily goal");
        return false;
      }
    } catch (error) {
      console.error("Error updating daily goal:", error);
      return false;
    }
  };

  // Get lesson status helper
  const getLessonStatus = (lessonId: string) => {
    const progress = lessonProgress.find((p) => p.lessonId === lessonId);
    return progress?.status || "NOT_STARTED";
  };

  // Get category progress helper
  const getCategoryProgress = (categoryId: number) => {
    return categoryProgress.find((cat) => cat.id === categoryId) || null;
  };

  // Load all data when session is available
  useEffect(() => {
    if (status === "loading") return;

    if (session?.user) {
      setLoading(true);
      Promise.all([
        fetchProgressOverview(),
        fetchCategoryProgress(),
        fetchLessonProgress(),
      ]).finally(() => {
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [session, status]);

  return {
    // Data
    progressOverview,
    categoryProgress,
    lessonProgress,

    // State
    loading,
    error,
    isAuthenticated: !!session?.user,

    // Actions
    updateCategoryProgress,
    updateLessonProgress,
    updateDailyGoal,
    refreshData: () => {
      if (session?.user) {
        Promise.all([
          fetchProgressOverview(),
          fetchCategoryProgress(),
          fetchLessonProgress(),
        ]);
      }
    },

    // Helpers
    getLessonStatus,
    getCategoryProgress,
  };
}
