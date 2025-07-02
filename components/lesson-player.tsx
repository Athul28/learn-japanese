import { useState } from "react";
import { useProgress } from "@/hooks/use-progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Star, Trophy } from "lucide-react";

interface Question {
  id: string;
  type: "multiple-choice" | "translation" | "audio";
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation?: string;
}

interface LessonPlayerProps {
  lessonId: string;
  title: string;
  questions: Question[];
  xpReward: number;
  onComplete?: () => void;
}

export function LessonPlayer({
  lessonId,
  title,
  questions,
  xpReward,
  onComplete,
}: LessonPlayerProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [startTime] = useState(Date.now());

  const { updateProgress, updateLessonProgress } = useProgress();

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswer = () => {
    const newAnswers = [...answers, selectedAnswer];
    setAnswers(newAnswers);

    const isCorrect = selectedAnswer === currentQ.correctAnswer;
    if (isCorrect) {
      setScore(score + 1);
    }

    setShowResult(true);

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer("");
        setShowResult(false);
      } else {
        // Lesson completed
        completLesson(newAnswers);
      }
    }, 2000);
  };

  const completLesson = async (finalAnswers: string[]) => {
    const endTime = Date.now();
    const timeSpent = Math.floor((endTime - startTime) / 1000); // in seconds
    const finalScore = Math.floor((score / questions.length) * 100);

    try {
      // Update lesson progress
      await updateLessonProgress(lessonId, "COMPLETED", finalScore, timeSpent);

      // Update user progress (XP, etc.)
      const result = await updateProgress(
        xpReward,
        Math.ceil(timeSpent / 60),
        1
      );

      // Show completion animation/modal
      if (result?.leveledUp) {
        // Show level up celebration
        console.log("Level up!");
      }

      onComplete?.();
    } catch (error) {
      console.error("Error completing lesson:", error);
    }
  };

  const isCorrect = showResult && selectedAnswer === currentQ.correctAnswer;

  if (currentQuestion >= questions.length) {
    // Show completion screen
    const finalScore = Math.floor((score / questions.length) * 100);

    return (
      <div className="max-w-2xl mx-auto p-6 text-center">
        <div className="mb-6">
          <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Lesson Complete!
          </h2>
          <p className="text-gray-600">
            Great job finishing &quot;{title}&quot;
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-2xl font-bold text-green-500">
                {finalScore}%
              </div>
              <p className="text-sm text-gray-600">Score</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-2xl font-bold text-blue-500">
                +{xpReward}
              </div>
              <p className="text-sm text-gray-600">XP Earned</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-2xl font-bold text-purple-500">
                {score}/{questions.length}
              </div>
              <p className="text-sm text-gray-600">Correct</p>
            </CardContent>
          </Card>
        </div>

        <Button
          onClick={onComplete}
          className="bg-green-500 hover:bg-green-600"
        >
          Continue Learning
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* Progress Header */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>
            Question {currentQuestion + 1} of {questions.length}
          </span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Question Card */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-xl">{currentQ.question}</CardTitle>
        </CardHeader>
        <CardContent>
          {currentQ.type === "multiple-choice" && currentQ.options && (
            <div className="space-y-3">
              {currentQ.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedAnswer(option)}
                  disabled={showResult}
                  className={`w-full p-4 text-left border-2 rounded-lg transition-colors ${
                    selectedAnswer === option
                      ? showResult
                        ? option === currentQ.correctAnswer
                          ? "border-green-500 bg-green-50"
                          : "border-red-500 bg-red-50"
                        : "border-blue-500 bg-blue-50"
                      : showResult && option === currentQ.correctAnswer
                      ? "border-green-500 bg-green-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{option}</span>
                    {showResult && option === currentQ.correctAnswer && (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}

          {showResult && currentQ.explanation && (
            <div
              className={`mt-4 p-4 rounded-lg ${
                isCorrect
                  ? "bg-green-50 border border-green-200"
                  : "bg-red-50 border border-red-200"
              }`}
            >
              <p className="text-sm">
                <strong>{isCorrect ? "Correct!" : "Incorrect."}</strong>{" "}
                {currentQ.explanation}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Action Button */}
      <div className="text-center">
        {!showResult ? (
          <Button
            onClick={handleAnswer}
            disabled={!selectedAnswer}
            className="bg-blue-500 hover:bg-blue-600 disabled:opacity-50"
          >
            Submit Answer
          </Button>
        ) : (
          <div className="text-center">
            <p className="text-sm text-gray-600">
              {currentQuestion < questions.length - 1
                ? "Moving to next question..."
                : "Completing lesson..."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
