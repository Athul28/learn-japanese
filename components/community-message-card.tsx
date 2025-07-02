import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageCircle, Star, Clock } from "lucide-react";
import { CommunityMessage } from "@/data/community-content";

interface CommunityMessageCardProps {
  message: CommunityMessage;
  onReply?: (messageId: number) => void;
  onMarkHelpful?: (messageId: number) => void;
}

export default function CommunityMessageCard({
  message,
  onReply,
  onMarkHelpful,
}: CommunityMessageCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
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
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onReply?.(message.id)}
              >
                <MessageCircle className="w-4 h-4 mr-1" />
                {message.replies} replies
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onMarkHelpful?.(message.id)}
              >
                <Star className="w-4 h-4 mr-1" />
                Helpful
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
