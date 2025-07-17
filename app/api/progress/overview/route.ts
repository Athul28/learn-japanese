import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// Get comprehensive progress data for dashboard and lessons page
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        lessonProgress: {
          include: {
            lesson: {
              include: {
                category: true,
              },
            },
          },
        },
        studySessions: {
          orderBy: { date: "desc" },
          take: 30, // Last 30 days
        },
        achievements: {
          include: {
            achievement: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Calculate lesson category progress
    const categoryProgress = await prisma.lessonProgress.findMany({
      where: {
        userId: user.id,
        lessonId: {
          startsWith: "category-",
        },
      },
    });

    const totalCategoryLessons = 15 * 10; // 15 categories * average 10 lessons each
    const completedCategoryLessons = categoryProgress.reduce(
      (sum, p) => sum + (p.score || 0),
      0
    );

    // Calculate interactive lesson progress
    const interactiveLessonProgress = user.lessonProgress.filter(
      (p) => !p.lessonId.startsWith("category-")
    );

    // Get streak data
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todaySession = user.studySessions.find(
      (session) => session.date.getTime() === today.getTime()
    );

    // Calculate current streak
    let currentStreak = 0;
    const sortedSessions = user.studySessions.sort(
      (a, b) => b.date.getTime() - a.date.getTime()
    );

    if (sortedSessions.length > 0) {
      let currentDate = new Date(today);

      // If no session today, start from yesterday
      if (!todaySession) {
        currentDate.setDate(currentDate.getDate() - 1);
      }

      for (const session of sortedSessions) {
        const sessionDate = new Date(session.date);
        sessionDate.setHours(0, 0, 0, 0);

        if (sessionDate.getTime() === currentDate.getTime()) {
          currentStreak++;
          currentDate.setDate(currentDate.getDate() - 1);
        } else {
          break;
        }
      }
    }

    // Calculate weekly study data
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      return date;
    }).reverse();

    const weeklyStudyData = last7Days.map((date) => {
      const session = user.studySessions.find(
        (s) => s.date.getTime() === date.getTime()
      );
      return {
        date: date.toISOString().split("T")[0],
        xp: session?.xpEarned || 0,
        duration: session?.duration || 0,
        lessonsCompleted: session?.lessonsCompleted || 0,
      };
    });

    // Calculate achievements progress
    const totalAchievements = await prisma.achievement.count({
      where: { isActive: true },
    });
    const earnedAchievements = user.achievements.length;

    const progressData = {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image,
        level: user.level,
        xp: user.xp,
        streak: currentStreak,
        longestStreak: user.longestStreak,
        totalStudyTime: user.totalStudyTime,
        joinDate: user.joinDate,
        isProMember: user.isProMember,
        dailyGoal: user.dailyGoal,
      },

      // Overall progress
      overall: {
        totalLessons: totalCategoryLessons + interactiveLessonProgress.length,
        completedLessons:
          completedCategoryLessons +
          interactiveLessonProgress.filter((p) => p.status === "COMPLETED")
            .length,
        totalXP: user.xp,
        currentLevel: user.level,
        xpToNextLevel: user.level * 500 - user.xp,
        totalStudyTime: user.totalStudyTime,
      },

      // Lesson progress breakdown
      lessons: {
        categoryProgress: completedCategoryLessons,
        totalCategoryLessons,
        interactiveProgress: interactiveLessonProgress.filter(
          (p) => p.status === "COMPLETED"
        ).length,
        totalInteractiveLessons: interactiveLessonProgress.length,
        recentCompletions: user.lessonProgress
          .filter((p) => p.completedAt)
          .sort(
            (a, b) =>
              new Date(b.completedAt!).getTime() -
              new Date(a.completedAt!).getTime()
          )
          .slice(0, 5),
      },

      // Streak and study patterns
      streaks: {
        current: currentStreak,
        longest: user.longestStreak,
        todayStudied: !!todaySession,
        weeklyData: weeklyStudyData,
      },

      // Achievements
      achievements: {
        total: totalAchievements,
        earned: earnedAchievements,
        recent: user.achievements
          .sort(
            (a, b) =>
              new Date(b.earnedAt).getTime() - new Date(a.earnedAt).getTime()
          )
          .slice(0, 3)
          .map((ua) => ({
            ...ua.achievement,
            earnedAt: ua.earnedAt,
          })),
      },

      // Today's study session
      todaySession: todaySession
        ? {
            duration: todaySession.duration,
            xpEarned: todaySession.xpEarned,
            lessonsCompleted: todaySession.lessonsCompleted,
          }
        : null,
    };

    return NextResponse.json(progressData);
  } catch (error) {
    console.error("Error fetching progress overview:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Update daily goal
export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { dailyGoal } = body;

    if (typeof dailyGoal !== "number" || dailyGoal < 1 || dailyGoal > 50) {
      return NextResponse.json(
        { error: "Invalid daily goal. Must be between 1 and 50." },
        { status: 400 }
      );
    }

    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: { dailyGoal },
    });

    return NextResponse.json({
      message: "Daily goal updated successfully",
      dailyGoal: updatedUser.dailyGoal,
    });
  } catch (error) {
    console.error("Error updating daily goal:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
