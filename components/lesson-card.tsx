import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Lock, Play } from "lucide-react";
import { LessonCategory } from "@/data/lesson-content";

interface LessonCardProps {
  category: LessonCategory;
  showProgress?: boolean;
  showTopics?: boolean;
  showEstimatedTime?: boolean;
  size?: "small" | "medium" | "large";
}

export function LessonCard({
  category,
  showProgress = true,
  showTopics = false,
  showEstimatedTime = false,
  size = "medium",
}: LessonCardProps) {
  const progressPercentage =
    (category.completedLessons / category.totalLessons) * 100;

  const cardSizeClasses = {
    small: "p-4",
    medium: "p-6",
    large: "p-8",
  };

  const iconSizeClasses = {
    small: "text-2xl",
    medium: "text-4xl",
    large: "text-6xl",
  };

  return (
    <Card
      className={`${category.color} border-2 hover:shadow-lg transition-all group relative ${cardSizeClasses[size]}`}
    >
      {/* Completed Badge */}
      {category.completedLessons === category.totalLessons && (
        <div className="absolute -top-2 -right-2">
          <div className="bg-green-500 text-white rounded-full p-1">
            <CheckCircle className="w-5 h-5" />
          </div>
        </div>
      )}

      {/* Lock Badge for locked content */}
      {!category.isUnlocked && (
        <div className="absolute -top-2 -right-2">
          <div className="bg-gray-500 text-white rounded-full p-1">
            <Lock className="w-5 h-5" />
          </div>
        </div>
      )}

      <CardHeader className="text-center pb-4">
        <div
          className={`${iconSizeClasses[size]} mb-3 group-hover:scale-110 transition-transform`}
        >
          {category.icon}
        </div>
        <div className="space-y-2">
          <CardTitle className={size === "small" ? "text-lg" : "text-xl"}>
            {category.title}
          </CardTitle>
          <CardDescription
            className={size === "small" ? "text-sm" : "text-base"}
          >
            {category.description}
          </CardDescription>

          {/* Difficulty and Time Badges */}
          <div className="flex justify-center space-x-2 flex-wrap">
            {category.difficulty && (
              <Badge variant="secondary" className="text-xs">
                {category.difficulty}
              </Badge>
            )}
            {showEstimatedTime && category.estimatedTime && (
              <Badge variant="outline" className="text-xs">
                ⏱️ {category.estimatedTime}
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Progress Section */}
        {showProgress && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>
                {category.completedLessons}/{category.totalLessons}
              </span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
            <p className="text-xs text-gray-600 text-center">
              {Math.round(progressPercentage)}% Complete
            </p>
          </div>
        )}

        {/* Topics Preview */}
        {showTopics && category.topics && (
          <div className="space-y-2">
            <p className="text-sm font-medium">Topics covered:</p>
            <div className="flex flex-wrap gap-1">
              {category.topics.slice(0, 3).map((topic, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {topic}
                </Badge>
              ))}
              {category.topics.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{category.topics.length - 3} more
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="pt-2">
          {category.isUnlocked ? (
            <Button
              asChild
              className="w-full bg-transparent"
              variant={category.completedLessons === 0 ? "default" : "outline"}
            >
              <Link href={`/lesson/${category.id}`}>
                <Play className="w-4 h-4 mr-2" />
                {category.completedLessons === 0 ? "Start" : "Continue"}
              </Link>
            </Button>
          ) : (
            <Button disabled className="w-full" variant="outline">
              <Lock className="w-4 h-4 mr-2" />
              Locked
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
