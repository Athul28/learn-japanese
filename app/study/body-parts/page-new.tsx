"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { AppLayout } from "@/components/app-layout";
import InteractiveCharacter from "@/components/interactive-character";
import { StudyVocabCard } from "@/components/study-vocab-card";
import { bodyPartsVocabulary, BodyPart } from "@/data/body-parts-content";

export default function BodyPartsPage() {
  const handleBodyPartClick = (part: BodyPart) => {
    console.log(`Clicked: ${part.romaji}`);
    // Add audio playback or other interactions here
  };

  const handlePlayAudio = (text: string, isJapanese: boolean) => {
    console.log(`Playing audio for: ${text} (Japanese: ${isJapanese})`);
    // Add speech synthesis logic here
  };

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center space-x-4 mb-8">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/study">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Study Notes
              </Link>
            </Button>
            <div>
              <h1 className="font-bold text-lg">
                Body Parts - Interactive Learning
              </h1>
              <p className="text-sm text-gray-600">
                Click on each body part to learn!
              </p>
            </div>
          </div>

          <Card className="bg-gradient-to-r from-yellow-100 to-orange-100 border-2 border-yellow-300 mb-8">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl text-yellow-700 flex items-center justify-center">
                <span className="text-4xl mr-3">👤</span>
                Interactive Body Parts
              </CardTitle>
            </CardHeader>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Character Illustration */}
            <Card className="border-2 border-yellow-300">
              <CardContent className="p-8">
                <InteractiveCharacter
                  bodyParts={bodyPartsVocabulary}
                  onBodyPartClick={handleBodyPartClick}
                />
              </CardContent>
            </Card>

            {/* Vocabulary List */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Body Parts Vocabulary
              </h2>
              {bodyPartsVocabulary.map((part, index) => (
                <StudyVocabCard
                  key={index}
                  item={part}
                  onPlayAudio={handlePlayAudio}
                />
              ))}
            </div>
          </div>

          {/* Memory Game Section */}
          <Card className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-300">
            <CardHeader>
              <CardTitle className="text-center text-green-700">
                🎮 Memory Challenge
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-700 mb-4">
                Test your knowledge! Can you identify all the body parts in
                Japanese?
              </p>
              <Button className="bg-green-500 hover:bg-green-600">
                Start Memory Game
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
