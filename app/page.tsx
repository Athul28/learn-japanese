import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Trophy, BookOpen, Zap, Crown } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-green-50">
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
            <Link href="/lessons" className="text-gray-600 hover:text-red-500 transition-colors">
              Lessons
            </Link>
            <Link href="/study" className="text-gray-600 hover:text-red-500 transition-colors">
              Study Notes
            </Link>
            <Link href="/community" className="text-gray-600 hover:text-red-500 transition-colors">
              Community
            </Link>
            <Link href="/subscription" className="text-gray-600 hover:text-red-500 transition-colors">
              Pricing
            </Link>
          </nav>
          <div className="flex items-center space-x-3">
            <Button variant="ghost" asChild>
              <Link href="/auth/login">Login</Link>
            </Button>
            <Button asChild className="bg-red-500 hover:bg-red-600">
              <Link href="/auth/signup">Start Learning</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
              Master Japanese with
              <span className="text-red-500 block">NihongoJourney</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Learn Japanese through gamified lessons, interactive quizzes, and a supportive community. From hiragana to
              advanced grammar - your journey to fluency starts here!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" className="bg-red-500 hover:bg-red-600 text-lg px-8 py-3" asChild>
                <Link href="/auth/signup">Start Free Today</Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-3 bg-transparent" asChild>
                <Link href="/lessons">Try Demo Lesson</Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-red-500">500+</div>
                <div className="text-gray-600">Interactive Lessons</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-500">10K+</div>
                <div className="text-gray-600">Active Learners</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-500">95%</div>
                <div className="text-gray-600">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Why Choose NihongoJourney?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our comprehensive approach combines proven teaching methods with modern gamification
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-2 hover:border-red-200 transition-colors">
              <CardHeader>
                <BookOpen className="w-12 h-12 text-red-500 mb-4" />
                <CardTitle>Comprehensive Curriculum</CardTitle>
                <CardDescription>
                  From basic greetings to advanced grammar, covering hiragana, particles, verbs, and cultural
                  expressions
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-green-200 transition-colors">
              <CardHeader>
                <Trophy className="w-12 h-12 text-green-500 mb-4" />
                <CardTitle>Gamified Learning</CardTitle>
                <CardDescription>
                  Earn XP, maintain streaks, unlock achievements, and compete with friends to stay motivated
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-blue-200 transition-colors">
              <CardHeader>
                <Users className="w-12 h-12 text-blue-500 mb-4" />
                <CardTitle>Community Support</CardTitle>
                <CardDescription>
                  Join study groups, practice with peers, and get help from native speakers and advanced learners
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Learning Path Preview */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Your Learning Journey</h2>
            <p className="text-xl text-gray-600">Structured lessons that build upon each other</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Greetings & Basics", icon: "👋", lessons: 12, color: "bg-green-100 border-green-300" },
                { title: "Hiragana Mastery", icon: "あ", lessons: 15, color: "bg-blue-100 border-blue-300" },
                { title: "Adjectives & Grammar", icon: "📝", lessons: 20, color: "bg-purple-100 border-purple-300" },
                { title: "Verbs & Particles", icon: "⚡", lessons: 25, color: "bg-red-100 border-red-300" },
              ].map((section, index) => (
                <Card key={index} className={`${section.color} border-2`}>
                  <CardHeader className="text-center">
                    <div className="text-4xl mb-2">{section.icon}</div>
                    <CardTitle className="text-lg">{section.title}</CardTitle>
                    <Badge variant="secondary">{section.lessons} lessons</Badge>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Choose Your Plan</h2>
            <p className="text-xl text-gray-600">Start free, upgrade when you're ready</p>
          </div>

          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Free Plan */}
            <Card className="border-2 border-gray-200">
              <CardHeader>
                <CardTitle className="text-2xl">Free</CardTitle>
                <div className="text-3xl font-bold">
                  $0<span className="text-lg font-normal">/month</span>
                </div>
                <CardDescription>Perfect for getting started</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <Zap className="w-5 h-5 text-green-500 mr-2" />5 lessons per day
                  </li>
                  <li className="flex items-center">
                    <Zap className="w-5 h-5 text-green-500 mr-2" />
                    Basic progress tracking
                  </li>
                  <li className="flex items-center">
                    <Zap className="w-5 h-5 text-green-500 mr-2" />
                    Community access
                  </li>
                  <li className="flex items-center">
                    <Zap className="w-5 h-5 text-green-500 mr-2" />
                    Mobile app access
                  </li>
                </ul>
                <Button className="w-full bg-transparent" variant="outline" asChild>
                  <Link href="/auth/signup">Get Started Free</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Pro Plan */}
            <Card className="border-2 border-red-300 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-red-500 text-white">Most Popular</Badge>
              </div>
              <CardHeader>
                <CardTitle className="text-2xl flex items-center">
                  <Crown className="w-6 h-6 text-yellow-500 mr-2" />
                  Pro
                </CardTitle>
                <div className="text-3xl font-bold">
                  $9.99<span className="text-lg font-normal">/month</span>
                </div>
                <CardDescription>Unlimited learning potential</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <Zap className="w-5 h-5 text-green-500 mr-2" />
                    Unlimited lessons
                  </li>
                  <li className="flex items-center">
                    <Zap className="w-5 h-5 text-green-500 mr-2" />
                    Advanced analytics
                  </li>
                  <li className="flex items-center">
                    <Zap className="w-5 h-5 text-green-500 mr-2" />
                    Downloadable practice sheets
                  </li>
                  <li className="flex items-center">
                    <Zap className="w-5 h-5 text-green-500 mr-2" />
                    Priority support
                  </li>
                  <li className="flex items-center">
                    <Zap className="w-5 h-5 text-green-500 mr-2" />
                    Offline mode
                  </li>
                </ul>
                <Button className="w-full bg-red-500 hover:bg-red-600" asChild>
                  <Link href="/auth/signup?plan=pro">Start Pro Trial</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-500 to-pink-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Start Your Japanese Journey?</h2>
          <p className="text-xl mb-8 opacity-90">Join thousands of learners mastering Japanese every day</p>
          <Button size="lg" className="bg-white text-red-500 hover:bg-gray-100 text-lg px-8 py-3" asChild>
            <Link href="/auth/signup">Begin Learning Now</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">日</span>
                </div>
                <span className="text-xl font-bold">NihongoJourney</span>
              </div>
              <p className="text-gray-400">
                Your comprehensive platform for learning Japanese through gamified, interactive lessons.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Learning</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/lessons" className="hover:text-white">
                    Lessons
                  </Link>
                </li>
                <li>
                  <Link href="/practice" className="hover:text-white">
                    Practice
                  </Link>
                </li>
                <li>
                  <Link href="/progress" className="hover:text-white">
                    Progress
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Community</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/community" className="hover:text-white">
                    Study Groups
                  </Link>
                </li>
                <li>
                  <Link href="/leaderboard" className="hover:text-white">
                    Leaderboard
                  </Link>
                </li>
                <li>
                  <Link href="/forums" className="hover:text-white">
                    Forums
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/help" className="hover:text-white">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-white">
                    Privacy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 NihongoJourney. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
