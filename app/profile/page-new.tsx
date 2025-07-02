"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  User,
  Trophy,
  Flame,
  Calendar,
  Upload,
  Crown,
  Target,
  BookOpen,
  Clock,
} from "lucide-react";
import { AppLayout } from "@/components/app-layout";
import { mockUserData } from "@/data/user-profile-content";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(mockUserData.name);
  const [email, setEmail] = useState(mockUserData.email);

  const progressPercentage =
    (mockUserData.xp / (mockUserData.xp + mockUserData.xpToNext)) * 100;

  return (
    <AppLayout showAuthButtons={false}>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Profile</h1>
            <p className="text-gray-600">
              Track your Japanese learning journey and achievements
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Info */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader className="text-center">
                  <div className="relative mx-auto w-24 h-24 mb-4">
                    <Avatar className="w-24 h-24">
                      <AvatarImage src="/placeholder.svg?height=96&width=96" />
                      <AvatarFallback className="text-2xl">
                        {mockUserData.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <Button
                      size="sm"
                      variant="outline"
                      className="absolute -bottom-2 -right-2 p-2"
                    >
                      <Upload className="w-3 h-3" />
                    </Button>
                  </div>
                  <CardTitle className="text-xl">{mockUserData.name}</CardTitle>
                  <CardDescription>
                    Level {mockUserData.level} • Joined {mockUserData.joinDate}
                  </CardDescription>
                  {mockUserData.isPro && (
                    <Badge className="bg-yellow-500 text-white mt-2">
                      <Crown className="w-3 h-3 mr-1" />
                      Pro Member
                    </Badge>
                  )}
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progress to Level {mockUserData.level + 1}</span>
                      <span className="text-gray-600">
                        {mockUserData.xp}/
                        {mockUserData.xp + mockUserData.xpToNext} XP
                      </span>
                    </div>
                    <Progress value={progressPercentage} className="h-2" />
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-orange-500">
                        {mockUserData.streak}
                      </div>
                      <div className="text-xs text-gray-600">Day Streak</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-500">
                        {mockUserData.completedLessons}
                      </div>
                      <div className="text-xs text-gray-600">Lessons Done</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="stats" className="space-y-6">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="stats">Statistics</TabsTrigger>
                  <TabsTrigger value="achievements">Achievements</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>

                <TabsContent value="stats" className="space-y-6">
                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Card>
                      <CardContent className="p-4 text-center">
                        <Flame className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                        <div className="text-sm text-gray-600">
                          Longest Streak
                        </div>
                        <span className="font-semibold">
                          {mockUserData.longestStreak} days
                        </span>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 text-center">
                        <Clock className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                        <div className="text-sm text-gray-600">
                          Total Study Time
                        </div>
                        <span className="font-semibold">
                          {mockUserData.studyTime}h
                        </span>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 text-center">
                        <Target className="w-8 h-8 text-green-500 mx-auto mb-2" />
                        <div className="text-sm text-gray-600">
                          Completion Rate
                        </div>
                        <span className="font-semibold">
                          {Math.round(
                            (mockUserData.completedLessons /
                              mockUserData.totalLessons) *
                              100
                          )}
                          %
                        </span>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 text-center">
                        <BookOpen className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                        <div className="text-sm text-gray-600">
                          Lessons Left
                        </div>
                        <span className="font-semibold">
                          {mockUserData.totalLessons -
                            mockUserData.completedLessons}
                        </span>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Weekly Activity */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        This Week's Activity
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-7 gap-2">
                        {mockUserData.weeklyStats.map((day, index) => (
                          <div key={index} className="text-center">
                            <div className="text-xs text-gray-600 mb-2">
                              {day.day}
                            </div>
                            <div className="relative h-16 bg-gray-100 rounded">
                              <div
                                className="absolute bottom-0 w-full bg-blue-500 rounded"
                                style={{
                                  height: `${(day.lessons / 5) * 100}%`,
                                  minHeight: day.lessons > 0 ? "4px" : "0",
                                }}
                              />
                            </div>
                            <div className="text-xs font-semibold mt-1">
                              {day.lessons}
                            </div>
                          </div>
                        ))}
                      </div>
                      <p className="text-xs text-gray-600 mt-4 text-center">
                        Lessons completed per day
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="achievements" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {mockUserData.achievements.map((achievement) => (
                      <Card
                        key={achievement.id}
                        className={
                          achievement.earned
                            ? "border-yellow-300"
                            : "opacity-60"
                        }
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-3">
                            <div
                              className={`w-12 h-12 rounded-full flex items-center justify-center ${
                                achievement.earned
                                  ? "bg-yellow-500 text-white"
                                  : "bg-gray-200 text-gray-400"
                              }`}
                            >
                              <Trophy className="w-6 h-6" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold">
                                {achievement.name}
                              </h3>
                              <p className="text-sm text-gray-600">
                                {achievement.description}
                              </p>
                              {achievement.earned && achievement.date && (
                                <p className="text-xs text-green-600 mt-1">
                                  Earned on {achievement.date}
                                </p>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="settings" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        Personal Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            disabled={!isEditing}
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email Address</Label>
                          <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={!isEditing}
                          />
                        </div>
                      </div>
                      <div className="flex justify-end space-x-2">
                        {isEditing ? (
                          <>
                            <Button
                              variant="outline"
                              onClick={() => setIsEditing(false)}
                            >
                              Cancel
                            </Button>
                            <Button onClick={() => setIsEditing(false)}>
                              Save Changes
                            </Button>
                          </>
                        ) : (
                          <Button onClick={() => setIsEditing(true)}>
                            <User className="w-4 h-4 mr-2" />
                            Edit Profile
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
