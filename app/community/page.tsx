"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Search, Send } from "lucide-react";
import { AppLayout } from "@/components/app-layout";
import StudyGroupCard from "@/components/study-group-card";
import CommunityMessageCard from "@/components/community-message-card";
import { studyGroups, recentMessages } from "@/data/community-content";

export default function CommunityPage() {
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredGroups = studyGroups.filter(
    (group) =>
      group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleJoinGroup = (groupId: number) => {
    console.log(`Joining group ${groupId}`);
    // Add join group logic here
  };

  const handleLeaveGroup = (groupId: number) => {
    console.log(`Leaving group ${groupId}`);
    // Add leave group logic here
  };

  const handleReply = (messageId: number) => {
    console.log(`Replying to message ${messageId}`);
    // Add reply logic here
  };

  const handleMarkHelpful = (messageId: number) => {
    console.log(`Marking message ${messageId} as helpful`);
    // Add helpful logic here
  };

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Community</h1>
          <p className="text-gray-600">
            Connect with fellow Japanese learners and practice together
          </p>
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
                <StudyGroupCard
                  key={group.id}
                  group={group}
                  onJoinGroup={handleJoinGroup}
                  onLeaveGroup={handleLeaveGroup}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="messages" className="space-y-6">
            {/* Post New Message */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Share with the Community
                </CardTitle>
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
                    <p className="text-sm text-gray-600">
                      Be respectful and helpful to fellow learners
                    </p>
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
              <h2 className="text-xl font-semibold text-gray-800">
                Recent Community Messages
              </h2>
              {recentMessages.map((message) => (
                <CommunityMessageCard
                  key={message.id}
                  message={message}
                  onReply={handleReply}
                  onMarkHelpful={handleMarkHelpful}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
