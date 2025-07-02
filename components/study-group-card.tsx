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
import { Users, MessageCircle } from "lucide-react";
import { StudyGroup } from "@/data/community-content";

interface StudyGroupCardProps {
  group: StudyGroup;
  onJoinGroup?: (groupId: number) => void;
  onLeaveGroup?: (groupId: number) => void;
}

export default function StudyGroupCard({
  group,
  onJoinGroup,
  onLeaveGroup,
}: StudyGroupCardProps) {
  return (
    <Card className="border-2 hover:shadow-lg transition-all">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg mb-2">{group.name}</CardTitle>
            <CardDescription className="mb-3">
              {group.description}
            </CardDescription>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4" />
                <span>{group.members} members</span>
              </div>
              <Badge variant="secondary">{group.level}</Badge>
              <Badge
                variant={
                  group.activity === "Very Active" ? "default" : "secondary"
                }
                className={
                  group.activity === "Very Active" ? "bg-green-500" : ""
                }
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
            <Button
              variant="outline"
              className="w-full bg-transparent"
              onClick={() => onLeaveGroup?.(group.id)}
            >
              Leave Group
            </Button>
          </div>
        ) : (
          <Button
            className="w-full bg-blue-500 hover:bg-blue-600"
            onClick={() => onJoinGroup?.(group.id)}
          >
            Join Group
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
