import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export interface UserProgress {
  level: number;
  xp: number;
  streak: number;
  longestStreak: number;
  totalStudyTime: number;
  completedLessons: number;
  dailyGoal: number;
  isProMember: boolean;
}

export interface LessonProgress {
  lessonId: string;
  status: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";
  score?: number;
  timeSpent: number;
  attempts: number;
  lastAttemptAt?: string;
  completedAt?: string;
}

const defaultProgress: UserProgress = {
  level: 1,
  xp: 0,
  streak: 0,
  longestStreak: 0,
  totalStudyTime: 0,
  completedLessons: 0,
  dailyGoal: 5,
  isProMember: false,
};

export function useProgress() {
  const { data: session, status } = useSession();
  const [userProgress, setUserProgress] =
    useState<UserProgress>(defaultProgress);
  const [lessonProgress, setLessonProgress] = useState<LessonProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isAuthenticated = status === "authenticated";

  // Load progress from localStorage for unauthenticated users
  const loadLocalProgress = () => {
    try {
      const savedProgress = localStorage.getItem("nihongo-progress");
      const savedLessons = localStorage.getItem("nihongo-lessons");

      if (savedProgress) {
        setUserProgress(JSON.parse(savedProgress));
      }

      if (savedLessons) {
        setLessonProgress(JSON.parse(savedLessons));
      }
    } catch (error) {
      console.error("Error loading local progress:", error);
    }
  };

  // Save progress to localStorage for unauthenticated users
  const saveLocalProgress = (
    progress: UserProgress,
    lessons: LessonProgress[]
  ) => {
    try {
      localStorage.setItem("nihongo-progress", JSON.stringify(progress));
      localStorage.setItem("nihongo-lessons", JSON.stringify(lessons));
    } catch (error) {
      console.error("Error saving local progress:", error);
    }
  };

  // Load progress from API for authenticated users
  const loadServerProgress = async () => {
    try {
      setLoading(true);

      const [profileResponse, lessonsResponse] = await Promise.all([
        fetch("/api/user/profile"),
        fetch("/api/lessons/progress"),
      ]);

      if (profileResponse.ok) {
        const profile = await profileResponse.json();
        setUserProgress({
          level: profile.level,
          xp: profile.xp,
          streak: profile.streak,
          longestStreak: profile.longestStreak,
          totalStudyTime: profile.totalStudyTime,
          completedLessons: 0, // Will be calculated from lesson progress
          dailyGoal: profile.dailyGoal,
          isProMember: profile.isProMember,
        });
      }

      if (lessonsResponse.ok) {
        const lessons = await lessonsResponse.json();
        setLessonProgress(
          lessons.map((l: any) => ({
            lessonId: l.lessonId,
            status: l.status,
            score: l.score,
            timeSpent: l.timeSpent,
            attempts: l.attempts,
            lastAttemptAt: l.lastAttemptAt,
            completedAt: l.completedAt,
          }))
        );
      }
    } catch (error) {
      console.error("Error loading server progress:", error);
      setError("Failed to load progress");
    } finally {
      setLoading(false);
    }
  };

  // Update progress
  const updateProgress = async (
    xpEarned: number,
    duration: number = 0,
    lessonsCompleted: number = 0
  ) => {
    if (isAuthenticated) {
      try {
        const response = await fetch("/api/user/progress", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ xpEarned, duration, lessonsCompleted }),
        });

        if (response.ok) {
          const result = await response.json();
          setUserProgress((prev) => ({
            ...prev,
            level: result.user.level,
            xp: result.user.xp,
            streak: result.user.streak,
            longestStreak: result.user.longestStreak,
            totalStudyTime: result.user.totalStudyTime,
          }));
          return result;
        }
      } catch (error) {
        console.error("Error updating server progress:", error);
        setError("Failed to update progress");
      }
    } else {
      // Update local progress
      const newXP = userProgress.xp + xpEarned;
      const newLevel = Math.floor(newXP / 500) + 1;

      // Simple streak logic for local storage
      const today = new Date().toDateString();
      const lastStudyDate = localStorage.getItem("nihongo-last-study");
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      let newStreak = userProgress.streak;
      if (lastStudyDate === today) {
        // Already studied today, don't change streak
      } else if (lastStudyDate === yesterday.toDateString()) {
        // Studied yesterday, increment streak
        newStreak = userProgress.streak + 1;
      } else {
        // Didn't study yesterday, reset streak
        newStreak = 1;
      }

      localStorage.setItem("nihongo-last-study", today);

      const updatedProgress = {
        ...userProgress,
        xp: newXP,
        level: newLevel,
        streak: newStreak,
        longestStreak: Math.max(userProgress.longestStreak, newStreak),
        totalStudyTime: userProgress.totalStudyTime + duration,
        completedLessons: userProgress.completedLessons + lessonsCompleted,
      };

      setUserProgress(updatedProgress);
      saveLocalProgress(updatedProgress, lessonProgress);

      return {
        user: updatedProgress,
        xpEarned,
        leveledUp: newLevel > userProgress.level,
      };
    }
  };

  // Update lesson progress
  const updateLessonProgress = async (
    lessonId: string,
    status: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED",
    score?: number,
    timeSpent: number = 0
  ) => {
    if (isAuthenticated) {
      try {
        const response = await fetch("/api/lessons/progress", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ lessonId, status, score, timeSpent }),
        });

        if (response.ok) {
          const result = await response.json();
          setLessonProgress((prev) => {
            const updated = prev.filter((l) => l.lessonId !== lessonId);
            updated.push({
              lessonId: result.lessonId,
              status: result.status,
              score: result.score,
              timeSpent: result.timeSpent,
              attempts: result.attempts,
              lastAttemptAt: result.lastAttemptAt,
              completedAt: result.completedAt,
            });
            return updated;
          });
        }
      } catch (error) {
        console.error("Error updating lesson progress:", error);
        setError("Failed to update lesson progress");
      }
    } else {
      // Update local lesson progress
      const updatedLessons = lessonProgress.filter(
        (l) => l.lessonId !== lessonId
      );
      const existingProgress = lessonProgress.find(
        (l) => l.lessonId === lessonId
      );

      const newProgress: LessonProgress = {
        lessonId,
        status,
        score,
        timeSpent: (existingProgress?.timeSpent || 0) + timeSpent,
        attempts: (existingProgress?.attempts || 0) + 1,
        lastAttemptAt: new Date().toISOString(),
        ...(status === "COMPLETED" && {
          completedAt: new Date().toISOString(),
        }),
      };

      updatedLessons.push(newProgress);
      setLessonProgress(updatedLessons);
      saveLocalProgress(userProgress, updatedLessons);
    }
  };

  // Load progress on mount and auth change
  useEffect(() => {
    if (status === "loading") return;

    if (isAuthenticated) {
      loadServerProgress();
    } else {
      loadLocalProgress();
      setLoading(false);
    }
  }, [isAuthenticated, status]);

  return {
    userProgress,
    lessonProgress,
    loading,
    error,
    updateProgress,
    updateLessonProgress,
    isAuthenticated,
  };
}
