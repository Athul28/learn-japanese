import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

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

    const lessonProgress = await prisma.lessonProgress.findMany({
      where: { userId: user.id },
      include: {
        lesson: {
          include: {
            category: true,
          },
        },
      },
    });

    return NextResponse.json(lessonProgress);
  } catch (error) {
    console.error("Error fetching lesson progress:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { lessonId, status, score, timeSpent, questionResults } = body;

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Handle both interactive lessons and category lessons
    let lesson = null;
    let xpReward = 25; // Default XP for interactive lessons

    if (lessonId.startsWith("category-")) {
      // This is a category lesson progress update
      const categoryId = parseInt(lessonId.replace("category-", ""));
      const lessonCategories = [
        { id: 1, title: "Japanese Greetings", xpReward: 100 },
        { id: 2, title: "Hiragana Mastery", xpReward: 150 },
        { id: 3, title: "Na-Adjectives", xpReward: 80 },
        { id: 4, title: "I-Adjectives", xpReward: 80 },
        { id: 5, title: "Body Parts", xpReward: 60 },
        // Add more categories as needed
      ];

      const category = lessonCategories.find((cat) => cat.id === categoryId);
      if (category) {
        xpReward = category.xpReward;
      }
    } else {
      // This is an interactive lesson
      lesson = await prisma.lesson.findUnique({
        where: { id: lessonId },
      });

      if (lesson) {
        xpReward = lesson.xpReward;
      }
    }

    const now = new Date();
    const isCompleted = status === "COMPLETED";

    const progressData = {
      status,
      lastAttemptAt: now,
      attempts: { increment: 1 },
      ...(score !== undefined && { score }),
      ...(timeSpent !== undefined && { timeSpent: { increment: timeSpent } }),
      ...(isCompleted && { completedAt: now }),
    };

    const updatedProgress = await prisma.lessonProgress.upsert({
      where: {
        userId_lessonId: {
          userId: user.id,
          lessonId,
        },
      },
      update: progressData,
      create: {
        userId: user.id,
        lessonId,
        status,
        score,
        timeSpent: timeSpent || 0,
        attempts: 1,
        lastAttemptAt: now,
        ...(isCompleted && { completedAt: now }),
      },
    });

    // If lesson is completed, award XP
    if (isCompleted) {
      const xpEarned = xpReward;

      // Update user progress through the progress API
      await fetch(`${process.env.NEXTAUTH_URL}/api/user/progress`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          xpEarned,
          duration: Math.ceil((timeSpent || 0) / 60), // Convert to minutes
          lessonsCompleted: 1,
        }),
      });
    }

    return NextResponse.json(updatedProgress);
  } catch (error) {
    console.error("Error updating lesson progress:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
