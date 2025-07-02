"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Trophy, Star, Flame, Target, ArrowRight, Home } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function LessonCompletePage() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const score = Number.parseInt(searchParams.get("score") || "0")
  const total = Number.parseInt(searchParams.get("total") || "1")
  const xp = Number.parseInt(searchParams.get("xp") || "0")

  const [showConfetti, setShowConfetti] = useState(false)

  const percentage = Math.round((score / total) * 100)
  const isPerfect = score === total
  const isGood = percentage >= 80

  useEffect(() => {
    setShowConfetti(true)
    const timer = setTimeout(() => setShowConfetti(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  const getPerformanceMessage = () => {
    if (isPerfect) return "Perfect! Outstanding work!"
    if (isGood) return "Great job! Well done!"
    if (percentage >= 60) return "Good effort! Keep practicing!"
    return "Keep trying! Practice makes perfect!"
  }

  const getPerformanceColor = () => {
    if (isPerfect) return "text-green-600"
    if (isGood) return "text-blue-600"
    if (percentage >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center p-4">
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-green-400/20 to-blue-400/20 animate-pulse" />
        </div>
      )}

      <div className="max-w-md w-full">
        <Card className="border-2 border-green-300 bg-white/90 backdrop-blur-sm">
          <CardContent className="p-8 text-center">
            {/* Trophy Icon */}
            <div className="mb-6">
              <Trophy className={`w-20 h-20 mx-auto ${isPerfect ? "text-yellow-500" : "text-gray-400"}`} />
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Lesson Complete!</h1>

            {/* Performance Message */}
            <p className={`text-lg font-semibold mb-6 ${getPerformanceColor()}`}>{getPerformanceMessage()}</p>

            {/* Stats */}
            <div className="space-y-4 mb-8">
              {/* Score */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Target className="w-5 h-5 text-blue-500" />
                  <span className="font-medium">Score</span>
                </div>
                <div className="text-right">
                  <div className="font-bold text-lg">
                    {score}/{total}
                  </div>
                  <div className="text-sm text-gray-600">{percentage}%</div>
                </div>
              </div>

              {/* XP Earned */}
              <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <span className="font-medium">XP Earned</span>
                </div>
                <Badge className="bg-yellow-500 text-white">+{xp} XP</Badge>
              </div>

              {/* Streak Bonus */}
              <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Flame className="w-5 h-5 text-orange-500" />
                  <span className="font-medium">Streak Bonus</span>
                </div>
                <Badge className="bg-orange-500 text-white">+5 XP</Badge>
              </div>
            </div>

            {/* Achievements */}
            {isPerfect && (
              <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Trophy className="w-5 h-5 text-green-600" />
                  <span className="font-semibold text-green-700">Perfect Score!</span>
                </div>
                <p className="text-sm text-green-600">You answered all questions correctly. Amazing work!</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button className="w-full bg-green-500 hover:bg-green-600" asChild>
                <Link href="/dashboard">
                  <Home className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Link>
              </Button>

              <Button variant="outline" className="w-full bg-transparent" asChild>
                <Link href="/lesson/2">
                  Next Lesson
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>

            {/* Encouragement */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-700">
                💡 <strong>Tip:</strong> Review your mistakes and practice daily to improve your Japanese skills!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
