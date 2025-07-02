"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CheckCircle, XCircle, Star, Heart } from "lucide-react";
import Link from "next/link";
import { AppLayout } from "@/components/app-layout";
import { ALL_LESSONS } from "@/lib/japanese-content";

export default function LessonPage() {
  const params = useParams();
  const router = useRouter();
  const lessonId = Number.parseInt(params.id as string);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | string | null>(
    null
  );
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [hearts, setHearts] = useState(5);
  const [xpEarned, setXpEarned] = useState(0);

  const lesson = ALL_LESSONS[lessonId as keyof typeof ALL_LESSONS];

  if (!lesson) {
    return <div>Lesson not found</div>;
  }

  const question = lesson.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / lesson.questions.length) * 100;

  const handleAnswerSelect = (answer: number | string) => {
    setSelectedAnswer(answer);
  };

  const handleSubmit = () => {
    let correct = false;

    if (question.type === "multiple-choice") {
      correct = selectedAnswer === question.correct;
    } else if (question.type === "translation" || question.type === "writing") {
      correct =
        (selectedAnswer as string)?.toLowerCase().trim() ===
        question.answer?.toLowerCase().trim();
    }

    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
      setScore(score + 1);
      setXpEarned(xpEarned + 10);
    } else {
      setHearts(Math.max(0, hearts - 1));
    }
  };

  const handleNext = () => {
    if (currentQuestion < lesson.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      // Lesson complete
      router.push(
        `/lesson-complete?score=${score}&total=${lesson.questions.length}&xp=${xpEarned}`
      );
    }
  };

  const renderQuestion = () => {
    switch (question.type) {
      case "multiple-choice":
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-center mb-6">
              {question.question}
            </h2>
            <div className="grid grid-cols-1 gap-3">
              {question.options?.map((option, index) => (
                <Button
                  key={index}
                  variant={selectedAnswer === index ? "default" : "outline"}
                  className={`p-4 h-auto text-left justify-start ${
                    selectedAnswer === index ? "bg-blue-500 text-white" : ""
                  }`}
                  onClick={() => handleAnswerSelect(index)}
                >
                  {option}
                </Button>
              ))}
            </div>
          </div>
        );

      case "translation":
      case "writing":
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-center mb-6">
              {question.question}
            </h2>
            <div className="max-w-md mx-auto">
              <input
                type="text"
                className="w-full p-4 border-2 border-gray-300 rounded-lg text-center text-lg"
                placeholder="Type your answer..."
                value={(selectedAnswer as string) || ""}
                onChange={(e) => handleAnswerSelect(e.target.value)}
              />
            </div>
          </div>
        );

      default:
        return <div>Question type not supported</div>;
    }
  };

  return (
    <AppLayout showAuthButtons={false}>
      {/* Lesson Header */}
      <div className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Link>
              </Button>
              <div>
                <h1 className="font-bold text-lg">{lesson.title}</h1>
                <p className="text-sm text-gray-600">{lesson.description}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Heart className="w-5 h-5 text-red-500" />
                <span className="font-semibold">{hearts}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-yellow-500" />
                <span className="font-semibold">{xpEarned} XP</span>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <Progress value={progress} className="h-2" />
            <p className="text-sm text-gray-600 mt-2">
              Question {currentQuestion + 1} of {lesson.questions.length}
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {!showResult ? (
            <Card className="border-2">
              <CardContent className="p-8">
                {renderQuestion()}
                <div className="mt-8 text-center">
                  <Button
                    onClick={handleSubmit}
                    disabled={selectedAnswer === null || selectedAnswer === ""}
                    className="px-8 py-3 text-lg"
                  >
                    Check Answer
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card
              className={`border-2 ${
                isCorrect
                  ? "border-green-300 bg-green-50"
                  : "border-red-300 bg-red-50"
              }`}
            >
              <CardContent className="p-8 text-center">
                <div className="mb-4">
                  {isCorrect ? (
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
                  ) : (
                    <XCircle className="w-16 h-16 text-red-500 mx-auto" />
                  )}
                </div>
                <h2
                  className={`text-2xl font-bold mb-4 ${
                    isCorrect ? "text-green-700" : "text-red-700"
                  }`}
                >
                  {isCorrect ? "Correct!" : "Not quite right"}
                </h2>
                <p className="text-gray-700 mb-6">{question.explanation}</p>
                {isCorrect && (
                  <Badge className="bg-yellow-500 text-white mb-4">
                    +10 XP
                  </Badge>
                )}
                <div>
                  <Button onClick={handleNext} className="px-8 py-3 text-lg">
                    {currentQuestion < lesson.questions.length - 1
                      ? "Next Question"
                      : "Complete Lesson"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
