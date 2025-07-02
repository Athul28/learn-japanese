"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Volume2, Brain } from "lucide-react"

const bodyParts = [
  { japanese: "あたま", romaji: "atama", english: "head", position: "top-4 left-1/2 transform -translate-x-1/2" },
  { japanese: "かお", romaji: "kao", english: "face", position: "top-16 left-1/2 transform -translate-x-1/2" },
  { japanese: "め", romaji: "me", english: "eye", position: "top-20 left-8" },
  { japanese: "みみ", romaji: "mimi", english: "ear", position: "top-20 right-8" },
  { japanese: "くち", romaji: "kuchi", english: "mouth", position: "top-28 left-1/2 transform -translate-x-1/2" },
  { japanese: "くび", romaji: "kubi", english: "neck", position: "top-36 left-1/2 transform -translate-x-1/2" },
  { japanese: "かた", romaji: "kata", english: "shoulder", position: "top-44 left-4" },
  { japanese: "て", romaji: "te", english: "hand", position: "top-52 left-0" },
  { japanese: "ゆび", romaji: "yubi", english: "finger", position: "top-56 left-2" },
  { japanese: "おなか", romaji: "onaka", english: "stomach", position: "top-48 left-1/2 transform -translate-x-1/2" },
  { japanese: "あし", romaji: "ashi", english: "leg", position: "bottom-8 left-1/3" },
]

export default function BodyPartsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/study">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Study Notes
              </Link>
            </Button>
            <div>
              <h1 className="font-bold text-lg">Body Parts - Interactive Learning</h1>
              <p className="text-sm text-gray-600">Click on each body part to learn!</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
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
                <div className="relative mx-auto" style={{ width: "300px", height: "500px" }}>
                  {/* Simple character representation */}
                  <div className="absolute inset-0 flex flex-col items-center">
                    {/* Head */}
                    <div className="w-24 h-24 bg-yellow-200 rounded-full border-4 border-yellow-400 flex items-center justify-center mb-2 relative">
                      <span className="text-2xl">😊</span>
                      {/* Eyes */}
                      <div className="absolute top-6 left-6 w-2 h-2 bg-black rounded-full"></div>
                      <div className="absolute top-6 right-6 w-2 h-2 bg-black rounded-full"></div>
                      {/* Mouth */}
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-4 h-2 bg-red-400 rounded-full"></div>
                    </div>

                    {/* Neck */}
                    <div className="w-8 h-8 bg-yellow-200 border-2 border-yellow-400 mb-2"></div>

                    {/* Body */}
                    <div className="w-32 h-40 bg-blue-200 border-4 border-blue-400 rounded-lg relative mb-4">
                      {/* Arms */}
                      <div className="absolute -left-8 top-4 w-6 h-20 bg-yellow-200 border-2 border-yellow-400 rounded-full"></div>
                      <div className="absolute -right-8 top-4 w-6 h-20 bg-yellow-200 border-2 border-yellow-400 rounded-full"></div>
                      {/* Hands */}
                      <div className="absolute -left-10 top-20 w-4 h-4 bg-yellow-300 border-2 border-yellow-500 rounded-full"></div>
                      <div className="absolute -right-6 top-20 w-4 h-4 bg-yellow-300 border-2 border-yellow-500 rounded-full"></div>
                    </div>

                    {/* Legs */}
                    <div className="flex space-x-4">
                      <div className="w-6 h-32 bg-blue-300 border-2 border-blue-500 rounded-full"></div>
                      <div className="w-6 h-32 bg-blue-300 border-2 border-blue-500 rounded-full"></div>
                    </div>
                  </div>

                  {/* Interactive labels */}
                  {bodyParts.map((part, index) => (
                    <div key={index} className={`absolute ${part.position} z-10`}>
                      <Badge
                        className="bg-white text-gray-800 border-2 border-gray-300 hover:bg-yellow-100 cursor-pointer transition-colors"
                        onClick={() => {
                          // Play audio or show more info
                          console.log(`Clicked: ${part.romaji}`)
                        }}
                      >
                        {part.japanese}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Vocabulary List */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Body Parts Vocabulary</h2>
              {bodyParts.map((part, index) => (
                <Card key={index} className="border-2 hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="text-xl font-bold text-gray-800">{part.japanese}</div>
                        <div className="text-lg text-blue-600">{part.romaji}</div>
                        <div className="text-gray-700">{part.english}</div>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Volume2 className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Brain className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Memory Game Section */}
          <Card className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-300">
            <CardHeader>
              <CardTitle className="text-center text-green-700">🎮 Memory Challenge</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-700 mb-4">
                Test your knowledge! Can you identify all the body parts in Japanese?
              </p>
              <Button className="bg-green-500 hover:bg-green-600">Start Memory Game</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
