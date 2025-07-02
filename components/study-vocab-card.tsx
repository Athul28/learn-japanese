import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Volume2, Heart, Brain, Eye } from "lucide-react";

interface BaseVocabItem {
  japanese: string;
  romaji: string;
  english: string;
  image?: string;
  memoryTip?: string;
  context?: string;
}

interface StudyVocabCardProps {
  item: BaseVocabItem;
  onPlayAudio: (text: string, isJapanese: boolean) => void;
  isVoicesLoaded?: boolean;
}

export function StudyVocabCard({
  item,
  onPlayAudio,
  isVoicesLoaded = false,
}: StudyVocabCardProps) {
  return (
    <Card className="border-2 hover:shadow-lg transition-all group">
      <CardHeader className="text-center pb-4">
        {item.image && (
          <div className="text-6xl mb-3 group-hover:scale-110 transition-transform">
            {item.image}
          </div>
        )}
        <div className="space-y-2">
          <div className="text-2xl font-bold text-gray-800">
            {item.japanese}
          </div>
          <div className="text-lg text-blue-600 font-medium">{item.romaji}</div>
          <div className="text-lg text-gray-700">{item.english}</div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {/* Memory Tip */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <div className="flex items-center mb-2">
              <Brain className="w-4 h-4 text-yellow-600 mr-2" />
              <span className="text-sm font-semibold text-yellow-700">
                Memory Tip
              </span>
            </div>
            <p className="text-sm text-yellow-700">{item.memoryTip}</p>
          </div>

          {/* Context (if available) */}
          {item.context && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <div className="flex items-center mb-2">
                <Eye className="w-4 h-4 text-blue-600 mr-2" />
                <span className="text-sm font-semibold text-blue-700">
                  Context
                </span>
              </div>
              <p className="text-sm text-blue-700">{item.context}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-2">
            <Button
              size="sm"
              variant="outline"
              className="flex-1 bg-transparent hover:bg-blue-50"
              onClick={() => onPlayAudio(item.japanese, true)}
              disabled={!isVoicesLoaded}
              title={`Listen to Japanese pronunciation: ${item.japanese}`}
            >
              <Volume2 className="w-3 h-3 mr-1" />
              🇯🇵 Listen
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="flex-1 bg-transparent hover:bg-green-50"
              onClick={() => onPlayAudio(item.english, false)}
              title={`Listen to English pronunciation: ${item.english}`}
            >
              <Volume2 className="w-3 h-3 mr-1" />
              🇺🇸 English
            </Button>
          </div>

          {/* Save Button */}
          <Button
            size="sm"
            variant="outline"
            className="w-full bg-transparent hover:bg-red-50"
          >
            <Heart className="w-3 h-3 mr-1" />
            Save to Favorites
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
