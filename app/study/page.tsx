"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Play, Volume2, Star, Heart, Brain, Eye } from "lucide-react"

// Study content with visual learning aids
const studyCategories = [
  {
    id: "greetings",
    title: "Japanese Greetings",
    icon: "👋",
    color: "bg-green-100 border-green-300",
    description: "Essential daily greetings with visual context",
    items: [
      {
        japanese: "こんにちは",
        romaji: "Konnichiwa",
        english: "Hello",
        context: "Used anytime from late morning to late afternoon",
        image: "👋",
        memoryTip: "Think 'cone-knee-chee-wa' - imagine a cone on your knee saying hello!",
      },
      {
        japanese: "おはようございます",
        romaji: "Ohayou gozaimasu",
        english: "Good morning",
        context: "Polite morning greeting until 10 AM",
        image: "🌅",
        memoryTip: "Oh-hi-yo! Like saying 'Oh hi yo!' to the morning sun",
      },
      {
        japanese: "ありがとうございます",
        romaji: "Arigatou gozaimasu",
        english: "Thank you very much",
        context: "Polite way to express gratitude",
        image: "🙏",
        memoryTip: "Ah-ree-gah-toe - imagine saying thanks while wiggling your toe!",
      },
      {
        japanese: "すみません",
        romaji: "Sumimasen",
        english: "Excuse me / Sorry",
        context: "Used to get attention or apologize",
        image: "🙇‍♂️",
        memoryTip: "Sue-me-mah-sen - 'Sue me, ma, I'm sorry!'",
      },
      {
        japanese: "おやすみなさい",
        romaji: "Oyasumi nasai",
        english: "Good night",
        context: "Said when going to bed",
        image: "🌙",
        memoryTip: "Oh-ya-sue-me nasai - 'Oh yeah, sue me, I'm sleepy!'",
      },
    ],
  },
  {
    id: "body-parts",
    title: "Body Parts",
    icon: "👤",
    color: "bg-yellow-100 border-yellow-300",
    description: "Learn body parts with a friendly cartoon character",
    items: [
      {
        japanese: "あたま",
        romaji: "atama",
        english: "head",
        image: "🧠",
        memoryTip: "Ah-ta-ma - 'Ah, that's my head!'",
      },
      {
        japanese: "かお",
        romaji: "kao",
        english: "face",
        image: "😊",
        memoryTip: "Ka-o - sounds like 'cow' - imagine a cow's face!",
      },
      {
        japanese: "め",
        romaji: "me",
        english: "eye",
        image: "👁️",
        memoryTip: "Me - just like 'me' in English, point to your eye and say 'me!'",
      },
      {
        japanese: "みみ",
        romaji: "mimi",
        english: "ear",
        image: "👂",
        memoryTip: "Mimi - sounds like 'me me' - your ears hear people say 'me me!'",
      },
      {
        japanese: "くち",
        romaji: "kuchi",
        english: "mouth",
        image: "👄",
        memoryTip: "Kuchi - sounds like 'coochie' - your mouth goes 'coochie coo!'",
      },
      {
        japanese: "て",
        romaji: "te",
        english: "hand",
        image: "✋",
        memoryTip: "Te - sounds like 'tea' - you hold tea with your hand!",
      },
      {
        japanese: "あし",
        romaji: "ashi",
        english: "leg/foot",
        image: "🦵",
        memoryTip: "Ashi - sounds like 'ashy' - don't let your legs get ashy!",
      },
    ],
  },
  {
    id: "colors",
    title: "Colors",
    icon: "🎨",
    color: "bg-rose-100 border-rose-300",
    description: "Colorful vocabulary with visual associations",
    items: [
      {
        japanese: "あか",
        romaji: "aka",
        english: "red",
        image: "🔴",
        memoryTip: "Aka - sounds like 'aha!' - 'Aha! That's red!'",
      },
      {
        japanese: "しろ",
        romaji: "shiro",
        english: "white",
        image: "⚪",
        memoryTip: "Shiro - sounds like 'she-row' - imagine a white rowing boat",
      },
      {
        japanese: "くろ",
        romaji: "kuro",
        english: "black",
        image: "⚫",
        memoryTip: "Kuro - sounds like 'crew' - imagine a black crew uniform",
      },
      {
        japanese: "あお",
        romaji: "ao",
        english: "blue",
        image: "🔵",
        memoryTip: "Ao - sounds like 'ow!' - 'Ow! I'm feeling blue!'",
      },
      {
        japanese: "みどり",
        romaji: "midori",
        english: "green",
        image: "🟢",
        memoryTip: "Midori - sounds like 'me-door-ee' - green door for me!",
      },
      {
        japanese: "き",
        romaji: "ki",
        english: "yellow",
        image: "🟡",
        memoryTip: "Ki - sounds like 'key' - imagine a bright yellow key!",
      },
    ],
  },
  {
    id: "family",
    title: "Family Members",
    icon: "👨‍👩‍👧‍👦",
    color: "bg-emerald-100 border-emerald-300",
    description: "Family vocabulary with character illustrations",
    items: [
      {
        japanese: "ちち",
        romaji: "chichi",
        english: "father",
        image: "👨",
        memoryTip: "Chichi - sounds like 'cheesy' - dad's cheesy jokes!",
      },
      {
        japanese: "はは",
        romaji: "haha",
        english: "mother",
        image: "👩",
        memoryTip: "Haha - sounds like laughing 'haha' - mom's always laughing!",
      },
      {
        japanese: "あに",
        romaji: "ani",
        english: "older brother",
        image: "👦",
        memoryTip: "Ani - sounds like 'any' - 'Any older brother would help!'",
      },
      {
        japanese: "あね",
        romaji: "ane",
        english: "older sister",
        image: "👧",
        memoryTip: "Ane - sounds like 'Annie' - imagine your sister Annie!",
      },
      {
        japanese: "おとうと",
        romaji: "otouto",
        english: "younger brother",
        image: "🧒",
        memoryTip: "Otouto - 'Oh-toe-toe' - little brother stubbed his toe!",
      },
      {
        japanese: "いもうと",
        romaji: "imouto",
        english: "younger sister",
        image: "👶",
        memoryTip: "Imouto - 'Ee-mow-toe' - little sister says 'eee!' and mows the lawn with her toe!",
      },
    ],
  },
  {
    id: "food",
    title: "Food Items",
    icon: "🍱",
    color: "bg-amber-100 border-amber-300",
    description: "Delicious Japanese food vocabulary",
    items: [
      {
        japanese: "おにぎり",
        romaji: "onigiri",
        english: "rice ball",
        image: "🍙",
        memoryTip: "Onigiri - 'Oh-knee-gee-ree' - you need your knee to grip rice balls!",
      },
      {
        japanese: "やさい",
        romaji: "yasai",
        english: "vegetables",
        image: "🥬",
        memoryTip: "Yasai - 'Ya-sigh' - 'Ya, I sigh when I eat vegetables!'",
      },
      {
        japanese: "にく",
        romaji: "niku",
        english: "meat",
        image: "🥩",
        memoryTip: "Niku - sounds like 'knee-coo' - meat makes your knees go 'coo!'",
      },
      {
        japanese: "さかな",
        romaji: "sakana",
        english: "fish",
        image: "🐟",
        memoryTip: "Sakana - 'Sah-kah-nah' - fish swimming in a sauna!",
      },
      {
        japanese: "たまご",
        romaji: "tamago",
        english: "egg",
        image: "🥚",
        memoryTip: "Tamago - 'Tah-mah-go' - 'Gotta go get eggs!'",
      },
    ],
  },
  {
    id: "numbers",
    title: "Numbers",
    icon: "🔢",
    color: "bg-cyan-100 border-cyan-300",
    description: "Count in Japanese with visual aids",
    items: [
      {
        japanese: "一",
        romaji: "ichi",
        english: "one",
        image: "1️⃣",
        memoryTip: "Ichi - sounds like 'itchy' - one itchy spot!",
      },
      {
        japanese: "二",
        romaji: "ni",
        english: "two",
        image: "2️⃣",
        memoryTip: "Ni - sounds like 'knee' - you have two knees!",
      },
      {
        japanese: "三",
        romaji: "san",
        english: "three",
        image: "3️⃣",
        memoryTip: "San - like 'sun' - the sun has three rays in drawings!",
      },
      {
        japanese: "四",
        romaji: "yon/shi",
        english: "four",
        image: "4️⃣",
        memoryTip: "Yon - sounds like 'yawn' - four o'clock makes you yawn!",
      },
      {
        japanese: "五",
        romaji: "go",
        english: "five",
        image: "5️⃣",
        memoryTip: "Go - just like English 'go' - high five and go!",
      },
    ],
  },
]

export default function StudyPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("greetings")

  const filteredCategories = studyCategories.filter(
    (category) =>
      category.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.items.some(
        (item) =>
          item.english.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.romaji.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
  )

  const playAudio = (text: string) => {
    // In a real app, you'd use a TTS service or audio files
    console.log(`Playing audio for: ${text}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">日</span>
              </div>
              <span className="text-xl font-bold text-gray-800">NihongoJourney</span>
            </Link>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/dashboard" className="text-gray-600 hover:text-red-500 transition-colors">
              Dashboard
            </Link>
            <Link href="/lessons" className="text-gray-600 hover:text-red-500 transition-colors">
              Lessons
            </Link>
            <Link href="/study" className="text-red-500 font-medium">
              Study Notes
            </Link>
            <Link href="/community" className="text-gray-600 hover:text-red-500 transition-colors">
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
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4 flex items-center justify-center">
            <Brain className="w-10 h-10 mr-3 text-purple-500" />
            Visual Study Notes
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Learn Japanese with memorable images, cartoons, and memory tricks!
          </p>

          {/* Search */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search vocabulary..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Category Navigation */}
        <div className="mb-8">
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
            <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 mb-6">
              {studyCategories.map((category) => (
                <TabsTrigger key={category.id} value={category.id} className="text-xs">
                  <span className="mr-1">{category.icon}</span>
                  <span className="hidden sm:inline">{category.title.split(" ")[0]}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {studyCategories.map((category) => (
              <TabsContent key={category.id} value={category.id}>
                <Card className={`${category.color} border-2 mb-6`}>
                  <CardHeader className="text-center">
                    <div className="text-6xl mb-2">{category.icon}</div>
                    <CardTitle className="text-2xl">{category.title}</CardTitle>
                    <CardDescription className="text-lg">{category.description}</CardDescription>
                  </CardHeader>
                </Card>

                {/* Vocabulary Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.items.map((item, index) => (
                    <Card key={index} className="border-2 hover:shadow-lg transition-all group">
                      <CardHeader className="text-center pb-4">
                        <div className="text-6xl mb-3 group-hover:scale-110 transition-transform">{item.image}</div>
                        <div className="space-y-2">
                          <div className="text-2xl font-bold text-gray-800">{item.japanese}</div>
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
                              <span className="text-sm font-semibold text-yellow-700">Memory Tip</span>
                            </div>
                            <p className="text-sm text-yellow-700">{item.memoryTip}</p>
                          </div>

                          {/* Context (if available) */}
                          {item.context && (
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                              <div className="flex items-center mb-2">
                                <Eye className="w-4 h-4 text-blue-600 mr-2" />
                                <span className="text-sm font-semibold text-blue-700">Context</span>
                              </div>
                              <p className="text-sm text-blue-700">{item.context}</p>
                            </div>
                          )}

                          {/* Action Buttons */}
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="flex-1 bg-transparent"
                              onClick={() => playAudio(item.romaji)}
                            >
                              <Volume2 className="w-3 h-3 mr-1" />
                              Listen
                            </Button>
                            <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                              <Heart className="w-3 h-3 mr-1" />
                              Save
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        {/* Character Illustration Section */}
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-purple-200 mb-8">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-purple-700">Meet Nihongo-kun! 🎌</CardTitle>
            <CardDescription className="text-lg">Your friendly Japanese learning companion</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="max-w-2xl mx-auto">
              {/* Cartoon Character Representation */}
              <div className="bg-white rounded-full w-48 h-48 mx-auto mb-6 flex items-center justify-center border-4 border-purple-300 relative">
                <div className="text-8xl">😊</div>
                {/* Body parts labels around the character */}
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-yellow-500 text-white">あたま (atama) - head</Badge>
                </div>
                <div className="absolute top-16 -left-16">
                  <Badge className="bg-blue-500 text-white">め (me) - eye</Badge>
                </div>
                <div className="absolute top-16 -right-16">
                  <Badge className="bg-green-500 text-white">みみ (mimi) - ear</Badge>
                </div>
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-red-500 text-white">くち (kuchi) - mouth</Badge>
                </div>
              </div>

              <p className="text-gray-700 mb-4">
                Nihongo-kun helps you remember Japanese words with fun associations and visual cues!
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="text-2xl mb-2">🧠</div>
                  <h3 className="font-semibold mb-1">Memory Tricks</h3>
                  <p className="text-gray-600">Each word comes with a memorable association</p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="text-2xl mb-2">🎨</div>
                  <h3 className="font-semibold mb-1">Visual Learning</h3>
                  <p className="text-gray-600">Colorful images help reinforce vocabulary</p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="text-2xl mb-2">🔊</div>
                  <h3 className="font-semibold mb-1">Audio Practice</h3>
                  <p className="text-gray-600">Listen to correct pronunciation</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Study Tips */}
        <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center text-green-700">
              <Star className="w-5 h-5 mr-2" />
              Study Tips for Visual Learning
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
              <div className="flex items-start space-x-2">
                <div className="text-2xl">🎯</div>
                <div>
                  <p className="font-medium">Use Memory Tricks</p>
                  <p className="text-gray-600">Create silly associations to remember words better</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <div className="text-2xl">🔄</div>
                <div>
                  <p className="font-medium">Review Regularly</p>
                  <p className="text-gray-600">Come back to these notes daily for reinforcement</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <div className="text-2xl">✏️</div>
                <div>
                  <p className="font-medium">Practice Writing</p>
                  <p className="text-gray-600">Write the characters while saying them aloud</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <div className="text-2xl">🎮</div>
                <div>
                  <p className="font-medium">Take Quizzes</p>
                  <p className="text-gray-600">Test your knowledge with our interactive lessons</p>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <Button asChild className="bg-green-500 hover:bg-green-600">
                <Link href="/lessons">
                  <Play className="w-4 h-4 mr-2" />
                  Practice with Quizzes
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
