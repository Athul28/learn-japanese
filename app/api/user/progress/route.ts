import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { xpEarned, duration, lessonsCompleted } = body;

    if (typeof xpEarned !== "number" || xpEarned < 0) {
      return NextResponse.json({ error: "Invalid XP value" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Calculate new level based on XP
    const newXP = user.xp + xpEarned;
    const newLevel = Math.floor(newXP / 500) + 1; // 500 XP per level

    // Check if user studied yesterday for streak calculation
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const yesterdaySession = await prisma.studySession.findUnique({
      where: {
        userId_date: {
          userId: user.id,
          date: yesterday,
        },
      },
    });

    const lastStudySession = await prisma.studySession.findFirst({
      where: { userId: user.id },
      orderBy: { date: "desc" },
    });

    let newStreak = user.streak;

    // If user has never studied or last study was more than 1 day ago, reset streak
    if (
      !lastStudySession ||
      (lastStudySession.date < yesterday && !yesterdaySession)
    ) {
      newStreak = 1;
    } else if (yesterdaySession) {
      // User studied yesterday, increment streak
      newStreak = user.streak + 1;
    }
    // If user already studied today, don't change streak

    const longestStreak = Math.max(user.longestStreak, newStreak);

    // Update or create today's study session
    await prisma.studySession.upsert({
      where: {
        userId_date: {
          userId: user.id,
          date: today,
        },
      },
      update: {
        duration: { increment: duration || 0 },
        xpEarned: { increment: xpEarned },
        lessonsCompleted: { increment: lessonsCompleted || 0 },
      },
      create: {
        userId: user.id,
        date: today,
        duration: duration || 0,
        xpEarned,
        lessonsCompleted: lessonsCompleted || 0,
      },
    });

    // Update user progress
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        xp: newXP,
        level: newLevel,
        streak: newStreak,
        longestStreak,
        totalStudyTime: { increment: duration || 0 },
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        level: true,
        xp: true,
        streak: true,
        longestStreak: true,
        totalStudyTime: true,
        joinDate: true,
        isProMember: true,
        dailyGoal: true,
      },
    });

    return NextResponse.json({
      user: updatedUser,
      xpEarned,
      leveledUp: newLevel > user.level,
    });
  } catch (error) {
    console.error("Error updating progress:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
