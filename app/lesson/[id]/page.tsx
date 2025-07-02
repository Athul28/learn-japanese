"use client";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AppLayout } from "@/components/app-layout";
import { LessonPlayer } from "@/components/lesson-player";
import { getLessonById } from "@/data/sample-lessons";
export default function LessonPage() {
  const params = useParams();
  const router = useRouter();
  const lessonId = params.id as string;
  const lesson = getLessonById(lessonId);
  if (!lesson) {
    return (
      <AppLayout>
        {" "}
        <div className="min-h-screen flex items-center justify-center">
          {" "}
          <div className="text-center">
            {" "}
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              Lesson Not Found
            </h1>{" "}
            <p className="text-gray-600 mb-6">
              The lesson you're looking for doesn't exist.
            </p>{" "}
            <Button asChild>
              {" "}
              <Link href="/lessons">Back to Lessons</Link>{" "}
            </Button>{" "}
          </div>{" "}
        </div>{" "}
      </AppLayout>
    );
  }
  const handleLessonComplete = () => {
    router.push("/lessons");
  };
  return (
    <AppLayout>
      {" "}
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-green-50">
        {" "}
        {/* Header */}{" "}
        <div className="bg-white shadow-sm">
          {" "}
          <div className="container mx-auto px-4 py-4">
            {" "}
            <div className="flex items-center justify-between">
              {" "}
              <Button variant="ghost" size="sm" asChild>
                {" "}
                <Link href="/lessons" className="flex items-center">
                  {" "}
                  <ArrowLeft className="w-4 h-4 mr-2" /> Back to Lessons{" "}
                </Link>{" "}
              </Button>{" "}
              <h1 className="text-xl font-semibold text-gray-800">
                {lesson.title}
              </h1>{" "}
              <div className="w-20" /> {/* Spacer for centering */}{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
        {/* Lesson Content */}{" "}
        <div className="container mx-auto px-4 py-8">
          {" "}
          <LessonPlayer
            lessonId={lesson.id}
            title={lesson.title}
            questions={lesson.questions}
            xpReward={lesson.xpReward}
            onComplete={handleLessonComplete}
          />{" "}
        </div>{" "}
      </div>{" "}
    </AppLayout>
  );
}
