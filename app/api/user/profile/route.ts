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
        reminderTime: true,
        preferredVoice: true,
        studyLanguages: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { dailyGoal, reminderTime, preferredVoice, studyLanguages } = body;

    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: {
        ...(dailyGoal !== undefined && { dailyGoal }),
        ...(reminderTime !== undefined && { reminderTime }),
        ...(preferredVoice !== undefined && { preferredVoice }),
        ...(studyLanguages !== undefined && { studyLanguages }),
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
        reminderTime: true,
        preferredVoice: true,
        studyLanguages: true,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Error updating user profile:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
