"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Trophy, Flame, Calendar, Upload, Crown, Target, BookOpen, Clock } from "lucide-react"

// Mock user data
const userData = {
  name: "Yuki Tanaka",
  email: "yuki.tanaka@example.com",
  joinDate: "March 2024",
  level: 12,
  xp: 2450,
  xpToNext: 550,
  streak: 7,
  longestStreak: 23,
  totalLessons: 45,
  completedLessons: 32,
  studyTime: 127, // hours
  isPro: false,
  achievements: [
    { id: 1, name: "First Steps", description: "Complete your first lesson", earned: true, date: "Mar 15, 2024" },
    { id: 2, name: "Week Warrior", description: "Maintain a 7-day streak", earned: true, date: "Mar 22, 2024" },
    { id: 3, name: "Hiragana Hero", description: "Master all hiragana characters", earned: true, date: "Apr 2, 2024" },
    { id: 4, name: "Grammar Guru", description: "Complete 10 grammar lessons", earned: false, date: null },
    { id: 5, name: "Conversation King", description: "Practice 50 conversations", earned: false, date: null },
  ],
  weeklyStats: [
    { day: "Mon", lessons: 3, xp: 45 },
    { day: "Tue", lessons: 2, xp: 30 },
    { day: "Wed", lessons: 4, xp: 60 },
    { day: "Thu", lessons: 1, xp: 15 },
    { day: "Fri", lessons: 3, xp: 45 },
    { day: "Sat", lessons: 2, xp: 30 },
    { day: "Sun", lessons: 3, xp: 45 },
  ],
}

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState(userData.name)
  const [email, setEmail] = useState(userData.email)

  const progressPercentage = (userData.xp / (userData.xp + userData.xpToNext)) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">日</span>
            </div>
            <span className="text-xl font-bold text-gray-800">NihongoJourney</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <a href="/dashboard" className="text-gray-600 hover:text-red-500 transition-colors">
              Dashboard
            </a>
            <a href="/lessons" className="text-gray-600 hover:text-red-500 transition-colors">
              Lessons
            </a>
            <a href="/community" className="text-gray-600 hover:text-red-500 transition-colors">
              Community
            </a>
          </nav>
          <Avatar>
            <AvatarImage src="/placeholder.svg?height=32&width=32" />
            <AvatarFallback>YT</AvatarFallback>
          </Avatar>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <Card>
              <CardHeader className="text-center">
                <div className="relative mx-auto mb-4">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src="/placeholder.svg?height=96&width=96" />
                    <AvatarFallback className="text-2xl">YT</AvatarFallback>
                  </Avatar>
                  <Button size="sm" className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0">
                    <Upload className="w-4 h-4" />
                  </Button>
                </div>
                <CardTitle className="text-xl">{userData.name}</CardTitle>
                <CardDescription>
                  Level {userData.level} • Joined {userData.joinDate}
                </CardDescription>
                {userData.isPro && (
                  <Badge className="bg-yellow-500 text-white">
                    <Crown className="w-3 h-3 mr-1" />
                    Pro Member
                  </Badge>
                )}
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Progress to Level {userData.level + 1}</span>
                      <span>
                        {userData.xp}/{userData.xp + userData.xpToNext} XP
                      </span>
                    </div>
                    <Progress value={progressPercentage} className="h-2" />
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-3 bg-orange-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-500">{userData.streak}</div>
                      <div className="text-xs text-gray-600">Current Streak</div>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-500">{userData.completedLessons}</div>
                      <div className="text-xs text-gray-600">Lessons Done</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Flame className="w-4 h-4 text-orange-500" />
                      <span className="text-sm">Longest Streak</span>
                    </div>
                    <span className="font-semibold">{userData.longestStreak} days</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-blue-500" />
                      <span className="text-sm">Study Time</span>
                    </div>
                    <span className="font-semibold">{userData.studyTime}h</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Target className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Completion Rate</span>
                    </div>
                    <span className="font-semibold">
                      {Math.round((userData.completedLessons / userData.totalLessons) * 100)}%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="achievements">Achievements</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                {/* Weekly Activity */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Calendar className="w-5 h-5 mr-2" />
                      This Week's Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-7 gap-2">
                      {userData.weeklyStats.map((day, index) => (
                        <div key={index} className="text-center">
                          <div className="text-xs text-gray-600 mb-2">{day.day}</div>
                          <div
                            className={`h-16 rounded-lg flex flex-col items-center justify-center ${
                              day.lessons > 0 ? "bg-green-100 border-2 border-green-300" : "bg-gray-100"
                            }`}
                          >
                            <div className="text-sm font-bold">{day.lessons}</div>
                            <div className="text-xs text-gray-600">{day.xp} XP</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Learning Progress */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BookOpen className="w-5 h-5 mr-2" />
                      Learning Progress
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                        <div>
                          <div className="font-semibold text-green-700">Japanese Greetings</div>
                          <div className="text-sm text-green-600">Completed</div>
                        </div>
                        <Badge className="bg-green-500">100%</Badge>
                      </div>
                      <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                        <div>
                          <div className="font-semibold text-blue-700">Hiragana Basics</div>
                          <div className="text-sm text-blue-600">In Progress</div>
                        </div>
                        <Badge variant="secondary">53%</Badge>
                      </div>
                      <div className="flex justify-between items-center p-4 bg-purple-50 rounded-lg">
                        <div>
                          <div className="font-semibold text-purple-700">Adjectives</div>
                          <div className="text-sm text-purple-600">In Progress</div>
                        </div>
                        <Badge variant="secondary">42%</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="achievements" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Trophy className="w-5 h-5 mr-2 text-yellow-500" />
                      Your Achievements
                    </CardTitle>
                    <CardDescription>Unlock badges by completing lessons and maintaining streaks</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {userData.achievements.map((achievement) => (
                        <div
                          key={achievement.id}
                          className={`p-4 rounded-lg border-2 ${
                            achievement.earned
                              ? "bg-yellow-50 border-yellow-300"
                              : "bg-gray-50 border-gray-200 opacity-60"
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <div
                              className={`w-12 h-12 rounded-full flex items-center justify-center ${
                                achievement.earned ? "bg-yellow-500" : "bg-gray-400"
                              }`}
                            >
                              <Trophy className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1">
                              <div className="font-semibold">{achievement.name}</div>
                              <div className="text-sm text-gray-600">{achievement.description}</div>
                              {achievement.earned && achievement.date && (
                                <div className="text-xs text-green-600 mt-1">Earned on {achievement.date}</div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <User className="w-5 h-5 mr-2" />
                      Profile Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Name</Label>
                          <Input
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            disabled={!isEditing}
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={!isEditing}
                          />
                        </div>
                      </div>
                      <div className="flex space-x-3">
                        {isEditing ? (
                          <>
                            <Button onClick={() => setIsEditing(false)}>Save Changes</Button>
                            <Button variant="outline" onClick={() => setIsEditing(false)}>
                              Cancel
                            </Button>
                          </>
                        ) : (
                          <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Subscription */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Crown className="w-5 h-5 mr-2 text-yellow-500" />
                      Subscription
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {userData.isPro ? (
                      <div className="space-y-4">
                        <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                          <div className="flex items-center space-x-2 mb-2">
                            <Crown className="w-5 h-5 text-yellow-500" />
                            <span className="font-semibold text-yellow-700">Pro Member</span>
                          </div>
                          <p className="text-sm text-yellow-600">
                            You have unlimited access to all lessons and features.
                          </p>
                        </div>
                        <Button variant="outline">Manage Subscription</Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <div className="font-semibold mb-2">Free Plan</div>
                          <p className="text-sm text-gray-600 mb-4">
                            You're currently on the free plan with limited daily lessons.
                          </p>
                          <Button className="bg-yellow-500 hover:bg-yellow-600">Upgrade to Pro</Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
