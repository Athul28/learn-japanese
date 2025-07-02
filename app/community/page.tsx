"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, MessageCircle, Plus, Search, Star, Clock, Send } from "lucide-react"
import Link from "next/link"

// Mock data for study groups and messages
const studyGroups = [
  {
    id: 1,
    name: "Beginner Japanese Learners",
    description: "Perfect for those just starting their Japanese journey",
    members: 156,
    isJoined: true,
    level: "Beginner",
    activity: "Very Active",
  },
  {
    id: 2,
    name: "Hiragana Masters",
    description: "Focus on mastering hiragana writing and reading",
    members: 89,
    isJoined: false,
    level: "Beginner",
    activity: "Active",
  },
  {
    id: 3,
    name: "Grammar Enthusiasts",
    description: "Deep dive into Japanese grammar patterns",
    members: 234,
    isJoined: true,
    level: "Intermediate",
    activity: "Very Active",
  },
  {
    id: 4,
    name: "Daily Conversation Practice",
    description: "Practice everyday Japanese conversations",
    members: 67,
    isJoined: false,
    level: "Intermediate",
    activity: "Moderate",
  },
]

const recentMessages = [
  {
    id: 1,
    user: "Sakura_Chan",
    avatar: "/placeholder.svg?height=32&width=32",
    message: "Can someone help me understand the difference between は and が particles?",
    group: "Grammar Enthusiasts",
    time: "2 minutes ago",
    replies: 3,
  },
  {
    id: 2,
    user: "TokyoDreamer",
    avatar: "/placeholder.svg?height=32&width=32",
    message: "Just completed my first week of hiragana practice! がんばって！",
    group: "Beginner Japanese Learners",
    time: "15 minutes ago",
    replies: 8,
  },
  {
    id: 3,
    user: "KanjiMaster",
    avatar: "/placeholder.svg?height=32&width=32",
    message: "Does anyone have tips for remembering kanji readings?",
    group: "Grammar Enthusiasts",
    time: "1 hour ago",
    replies: 12,
  },
]

export default function CommunityPage() {
  const [newMessage, setNewMessage] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredGroups = studyGroups.filter(
    (group) =>
      group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
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
            <Link href="/dashboard" className="text-gray-600 hover:text-red-500 transition-colors">
              Dashboard
            </Link>
            <Link href="/lessons" className="text-gray-600 hover:text-red-500 transition-colors">
              Lessons
            </Link>
            <Link href="/study" className="text-gray-600 hover:text-red-500 transition-colors">
              Study Notes
            </Link>
            <Link href="/community" className="text-red-500 font-medium">
              Community
            </Link>
          </nav>
          <Avatar>
            <AvatarImage src="/placeholder.svg?height=32&width=32" />
            <AvatarFallback>YT</AvatarFallback>
          </Avatar>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Community</h1>
          <p className="text-gray-600">Connect with fellow Japanese learners and practice together</p>
        </div>

        <Tabs defaultValue="groups" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="groups">Study Groups</TabsTrigger>
            <TabsTrigger value="messages">Recent Messages</TabsTrigger>
          </TabsList>

          <TabsContent value="groups" className="space-y-6">
            {/* Search and Create */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search study groups..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button className="bg-purple-500 hover:bg-purple-600">
                <Plus className="w-4 h-4 mr-2" />
                Create Group
              </Button>
            </div>

            {/* Study Groups Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredGroups.map((group) => (
                <Card key={group.id} className="border-2 hover:shadow-lg transition-all">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-2">{group.name}</CardTitle>
                        <CardDescription className="mb-3">{group.description}</CardDescription>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <Users className="w-4 h-4" />
                            <span>{group.members} members</span>
                          </div>
                          <Badge variant="secondary">{group.level}</Badge>
                          <Badge
                            variant={group.activity === "Very Active" ? "default" : "secondary"}
                            className={group.activity === "Very Active" ? "bg-green-500" : ""}
                          >
                            {group.activity}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {group.isJoined ? (
                      <div className="space-y-3">
                        <Button className="w-full" asChild>
                          <Link href={`/community/group/${group.id}`}>
                            <MessageCircle className="w-4 h-4 mr-2" />
                            View Messages
                          </Link>
                        </Button>
                        <Button variant="outline" className="w-full bg-transparent">
                          Leave Group
                        </Button>
                      </div>
                    ) : (
                      <Button className="w-full bg-blue-500 hover:bg-blue-600">Join Group</Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="messages" className="space-y-6">
            {/* Post New Message */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Share with the Community</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Textarea
                    placeholder="Ask a question, share your progress, or help others..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    rows={3}
                  />
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-600">Be respectful and helpful to fellow learners</p>
                    <Button disabled={!newMessage.trim()}>
                      <Send className="w-4 h-4 mr-2" />
                      Post
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Messages */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">Recent Community Messages</h2>
              {recentMessages.map((message) => (
                <Card key={message.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <Avatar>
                        <AvatarImage src={message.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{message.user[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="font-semibold">{message.user}</span>
                          <Badge variant="outline" className="text-xs">
                            {message.group}
                          </Badge>
                          <div className="flex items-center text-xs text-gray-500">
                            <Clock className="w-3 h-3 mr-1" />
                            {message.time}
                          </div>
                        </div>
                        <p className="text-gray-700 mb-3">{message.message}</p>
                        <div className="flex items-center space-x-4">
                          <Button variant="ghost" size="sm">
                            <MessageCircle className="w-4 h-4 mr-1" />
                            {message.replies} replies
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Star className="w-4 h-4 mr-1" />
                            Helpful
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
