import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// Lesson categories data - this matches the data in the lessons page
const lessonCategories = [
  {
    id: 1,
    title: "Japanese Greetings",
    totalLessons: 10,
    difficulty: "Beginner",
    xpReward: 100,
  },
  {
    id: 2,
    title: "Hiragana Mastery",
    totalLessons: 15,
    difficulty: "Beginner",
    xpReward: 150,
  },
  {
    id: 3,
    title: "Na-Adjectives",
    totalLessons: 8,
    difficulty: "Beginner",
    xpReward: 80,
  },
  {
    id: 4,
    title: "I-Adjectives",
    totalLessons: 8,
    difficulty: "Beginner",
    xpReward: 80,
  },
  {
    id: 5,
    title: "Body Parts",
    totalLessons: 6,
    difficulty: "Beginner",
    xpReward: 60,
  },
  {
    id: 6,
    title: "Basic Verbs",
    totalLessons: 12,
    difficulty: "Beginner",
    xpReward: 120,
  },
  {
    id: 7,
    title: "Verb Conjugation",
    totalLessons: 15,
    difficulty: "Intermediate",
    xpReward: 200,
  },
  {
    id: 8,
    title: "Particles Mastery",
    totalLessons: 18,
    difficulty: "Intermediate",
    xpReward: 250,
  },
  {
    id: 9,
    title: "Colors in Japanese",
    totalLessons: 5,
    difficulty: "Beginner",
    xpReward: 50,
  },
  {
    id: 10,
    title: "Family Members",
    totalLessons: 6,
    difficulty: "Beginner",
    xpReward: 60,
  },
  {
    id: 11,
    title: "Numbers & Kanji",
    totalLessons: 10,
    difficulty: "Intermediate",
    xpReward: 150,
  },
  {
    id: 12,
    title: "Days & Dates",
    totalLessons: 8,
    difficulty: "Beginner",
    xpReward: 80,
  },
  {
    id: 13,
    title: "Food Vocabulary",
    totalLessons: 7,
    difficulty: "Beginner",
    xpReward: 70,
  },
  {
    id: 14,
    title: "Daily Expressions",
    totalLessons: 10,
    difficulty: "Intermediate",
    xpReward: 130,
  },
  {
    id: 15,
    title: "Existence (Aru/Iru)",
    totalLessons: 8,
    difficulty: "Intermediate",
    xpReward: 120,
  },
];

// Get lesson category progress for authenticated users
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Get stored lesson category progress
    const categoryProgressRecords = await prisma.lessonProgress.findMany({
      where: {
        userId: user.id,
        lessonId: {
          startsWith: "category-",
        },
      },
    });

    // Convert to a map for easy lookup
    const progressMap = new Map();
    categoryProgressRecords.forEach((record) => {
      const categoryId = parseInt(record.lessonId.replace("category-", ""));
      progressMap.set(categoryId, {
        completedLessons: record.score || 0,
        status: record.status,
        lastAttemptAt: record.lastAttemptAt,
        completedAt: record.completedAt,
      });
    });

    // Combine with category data
    const categoryProgress = lessonCategories.map((category) => {
      const progress = progressMap.get(category.id) || {
        completedLessons: 0,
        status: "NOT_STARTED",
        lastAttemptAt: null,
        completedAt: null,
      };

      return {
        ...category,
        ...progress,
        isUnlocked: category.id <= 5 || progress.completedLessons > 0, // First 5 are unlocked by default
        progressPercentage: Math.round(
          (progress.completedLessons / category.totalLessons) * 100
        ),
      };
    });

    return NextResponse.json(categoryProgress);
  } catch (error) {
    console.error("Error fetching lesson category progress:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Update lesson category progress
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { categoryId, completedLessons, action } = body;

    // Validate input data
    if (
      typeof categoryId !== "number" ||
      typeof completedLessons !== "number" ||
      completedLessons < 0
    ) {
      return NextResponse.json(
        {
          error:
            "Invalid request data. CategoryId and completedLessons must be valid numbers.",
        },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const category = lessonCategories.find((cat) => cat.id === categoryId);
    if (!category) {
      return NextResponse.json(
        { error: `Category not found for ID: ${categoryId}` },
        { status: 404 }
      );
    }

    // Ensure completedLessons doesn't exceed totalLessons
    const actualCompletedLessons = Math.min(
      completedLessons,
      category.totalLessons
    );

    const lessonId = `category-${categoryId}`;
    const now = new Date();
    const isCompleted = actualCompletedLessons >= category.totalLessons;
    const status = isCompleted
      ? "COMPLETED"
      : actualCompletedLessons > 0
      ? "IN_PROGRESS"
      : "NOT_STARTED";

    // Update or create category progress
    const updatedProgress = await prisma.lessonProgress.upsert({
      where: {
        userId_lessonId: {
          userId: user.id,
          lessonId,
        },
      },
      update: {
        score: actualCompletedLessons,
        status,
        lastAttemptAt: now,
        attempts: { increment: 1 },
        ...(isCompleted && { completedAt: now }),
      },
      create: {
        userId: user.id,
        lessonId,
        status,
        score: actualCompletedLessons,
        attempts: 1,
        lastAttemptAt: now,
        ...(isCompleted && { completedAt: now }),
      },
    });

    // If category is completed and this is a new completion, award XP
    if (isCompleted && action === "complete") {
      try {
        const xpEarned = category.xpReward;

        // Get current user data safely
        const currentUser = await prisma.user.findUnique({
          where: { id: user.id },
          select: { xp: true, level: true },
        });

        if (currentUser) {
          const newXP = currentUser.xp + xpEarned;
          const newLevel = Math.floor(newXP / 500) + 1;

          // Update user XP and level
          await prisma.user.update({
            where: { id: user.id },
            data: {
              xp: newXP,
              level: newLevel,
            },
          });

          // Create or update today's study session
          const today = new Date();
          today.setHours(0, 0, 0, 0);

          await prisma.studySession.upsert({
            where: {
              userId_date: {
                userId: user.id,
                date: today,
              },
            },
            update: {
              xpEarned: { increment: xpEarned },
              lessonsCompleted: { increment: 1 },
            },
            create: {
              userId: user.id,
              date: today,
              xpEarned,
              lessonsCompleted: 1,
              duration: 0,
            },
          });
        }
      } catch (xpError) {
        console.warn(
          "Error updating XP, but category progress saved:",
          xpError
        );
        // Don't fail the whole request if XP update fails
      }
    }

    return NextResponse.json({
      ...updatedProgress,
      category: {
        ...category,
        completedLessons: actualCompletedLessons,
        progressPercentage: Math.round(
          (actualCompletedLessons / category.totalLessons) * 100
        ),
      },
    });
  } catch (error) {
    console.error("Error updating lesson category progress:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
