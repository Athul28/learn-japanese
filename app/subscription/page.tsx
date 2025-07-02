"use client"

import { useState } from "react"
import Link from "next/link"
import { useSearchParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Crown, Check, X, Zap, Download, BarChart3, HeadphonesIcon, Smartphone, Star } from "lucide-react"

export default function SubscriptionPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const isSignup = searchParams.get("signup") === "true"

  const [selectedPlan, setSelectedPlan] = useState<"monthly" | "yearly">("monthly")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubscribe = async (plan: "free" | "pro") => {
    setIsLoading(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    if (plan === "pro") {
      // In a real app, this would integrate with Stripe
      alert("Redirecting to Stripe checkout...")
      // Simulate successful payment
      setTimeout(() => {
        router.push("/dashboard?upgraded=true")
      }, 1000)
    } else {
      router.push("/dashboard")
    }

    setIsLoading(false)
  }

  const monthlyPrice = 9.99
  const yearlyPrice = 99.99
  const yearlyMonthlyPrice = yearlyPrice / 12

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">日</span>
            </div>
            <span className="text-xl font-bold text-gray-800">NihongoJourney</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/dashboard" className="text-gray-600 hover:text-red-500 transition-colors">
              Dashboard
            </Link>
            <Link href="/lessons" className="text-gray-600 hover:text-red-500 transition-colors">
              Lessons
            </Link>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full mb-4">
            <Crown className="w-4 h-4" />
            <span className="text-sm font-medium">Upgrade to Pro</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Unlock Your Full Potential</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {isSignup
              ? "Complete your signup with Pro and get unlimited access to all features"
              : "Take your Japanese learning to the next level with unlimited lessons and advanced features"}
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center mb-8">
          <div className="bg-gray-100 p-1 rounded-lg flex">
            <button
              onClick={() => setSelectedPlan("monthly")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedPlan === "monthly" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setSelectedPlan("yearly")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors relative ${
                selectedPlan === "yearly" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Yearly
              <Badge className="absolute -top-2 -right-2 bg-green-500 text-white text-xs">Save 17%</Badge>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Free Plan */}
          <Card className="border-2 border-gray-200 relative">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-2xl">Free</CardTitle>
              <div className="text-4xl font-bold text-gray-900 mb-2">
                $0<span className="text-lg font-normal text-gray-600">/month</span>
              </div>
              <CardDescription>Perfect for getting started with Japanese</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-3" />
                  <span>5 lessons per day</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-3" />
                  <span>Basic progress tracking</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-3" />
                  <span>Community access</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-3" />
                  <span>Mobile app access</span>
                </li>
                <li className="flex items-center">
                  <X className="w-5 h-5 text-gray-400 mr-3" />
                  <span className="text-gray-500">Unlimited lessons</span>
                </li>
                <li className="flex items-center">
                  <X className="w-5 h-5 text-gray-400 mr-3" />
                  <span className="text-gray-500">Advanced analytics</span>
                </li>
                <li className="flex items-center">
                  <X className="w-5 h-5 text-gray-400 mr-3" />
                  <span className="text-gray-500">Downloadable content</span>
                </li>
              </ul>
              <Button
                className="w-full bg-transparent border-2 border-gray-300 text-gray-700 hover:bg-gray-50"
                onClick={() => handleSubscribe("free")}
                disabled={isLoading}
              >
                {isSignup ? "Continue with Free" : "Current Plan"}
              </Button>
            </CardContent>
          </Card>

          {/* Pro Plan */}
          <Card className="border-2 border-yellow-300 relative bg-gradient-to-br from-yellow-50 to-orange-50">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <Badge className="bg-yellow-500 text-white px-4 py-1">
                <Crown className="w-3 h-3 mr-1" />
                Most Popular
              </Badge>
            </div>
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-2xl flex items-center justify-center">
                <Crown className="w-6 h-6 text-yellow-500 mr-2" />
                Pro
              </CardTitle>
              <div className="text-4xl font-bold text-gray-900 mb-2">
                ${selectedPlan === "monthly" ? monthlyPrice : yearlyMonthlyPrice.toFixed(2)}
                <span className="text-lg font-normal text-gray-600">/month</span>
              </div>
              {selectedPlan === "yearly" && (
                <p className="text-sm text-green-600 font-medium">Billed yearly (${yearlyPrice}/year) - Save 17%</p>
              )}
              <CardDescription>Unlimited learning with advanced features</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-3" />
                  <span className="font-medium">Everything in Free, plus:</span>
                </li>
                <li className="flex items-center">
                  <Zap className="w-5 h-5 text-yellow-500 mr-3" />
                  <span>Unlimited lessons & practice</span>
                </li>
                <li className="flex items-center">
                  <BarChart3 className="w-5 h-5 text-blue-500 mr-3" />
                  <span>Advanced progress analytics</span>
                </li>
                <li className="flex items-center">
                  <Download className="w-5 h-5 text-purple-500 mr-3" />
                  <span>Downloadable practice sheets</span>
                </li>
                <li className="flex items-center">
                  <HeadphonesIcon className="w-5 h-5 text-green-500 mr-3" />
                  <span>Priority customer support</span>
                </li>
                <li className="flex items-center">
                  <Smartphone className="w-5 h-5 text-indigo-500 mr-3" />
                  <span>Offline mode access</span>
                </li>
                <li className="flex items-center">
                  <Star className="w-5 h-5 text-orange-500 mr-3" />
                  <span>Exclusive Pro-only content</span>
                </li>
              </ul>
              <Button
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white"
                onClick={() => handleSubscribe("pro")}
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : `Start Pro ${selectedPlan === "yearly" ? "Yearly" : "Monthly"}`}
              </Button>
              <p className="text-xs text-center text-gray-600 mt-3">7-day free trial • Cancel anytime</p>
            </CardContent>
          </Card>
        </div>

        {/* Feature Comparison */}
        <Card className="max-w-4xl mx-auto mb-12">
          <CardHeader>
            <CardTitle className="text-center">Feature Comparison</CardTitle>
            <CardDescription className="text-center">See what's included in each plan</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Feature</th>
                    <th className="text-center py-3 px-4">Free</th>
                    <th className="text-center py-3 px-4">Pro</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="py-3 px-4">Daily lessons</td>
                    <td className="text-center py-3 px-4">5 per day</td>
                    <td className="text-center py-3 px-4">Unlimited</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">Progress tracking</td>
                    <td className="text-center py-3 px-4">
                      <Check className="w-4 h-4 text-green-500 mx-auto" />
                    </td>
                    <td className="text-center py-3 px-4">
                      <Check className="w-4 h-4 text-green-500 mx-auto" />
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">Community access</td>
                    <td className="text-center py-3 px-4">
                      <Check className="w-4 h-4 text-green-500 mx-auto" />
                    </td>
                    <td className="text-center py-3 px-4">
                      <Check className="w-4 h-4 text-green-500 mx-auto" />
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">Advanced analytics</td>
                    <td className="text-center py-3 px-4">
                      <X className="w-4 h-4 text-gray-400 mx-auto" />
                    </td>
                    <td className="text-center py-3 px-4">
                      <Check className="w-4 h-4 text-green-500 mx-auto" />
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">Downloadable content</td>
                    <td className="text-center py-3 px-4">
                      <X className="w-4 h-4 text-gray-400 mx-auto" />
                    </td>
                    <td className="text-center py-3 px-4">
                      <Check className="w-4 h-4 text-green-500 mx-auto" />
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">Priority support</td>
                    <td className="text-center py-3 px-4">
                      <X className="w-4 h-4 text-gray-400 mx-auto" />
                    </td>
                    <td className="text-center py-3 px-4">
                      <Check className="w-4 h-4 text-green-500 mx-auto" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Testimonials */}
        <div className="max-w-4xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">What Our Pro Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Sarah M.",
                role: "Pro User",
                content:
                  "The unlimited lessons helped me progress so much faster. I went from beginner to intermediate in just 3 months!",
                rating: 5,
              },
              {
                name: "David K.",
                role: "Pro User",
                content: "The downloadable practice sheets are perfect for studying offline. Great value for money.",
                rating: 5,
              },
              {
                name: "Maria L.",
                role: "Pro User",
                content:
                  "Advanced analytics show exactly where I need to improve. The personalized insights are amazing!",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <Card key={index} className="border border-gray-200">
                <CardContent className="p-6">
                  <div className="flex items-center mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4">"{testimonial.content}"</p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle className="text-center">Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Can I cancel my subscription anytime?</h3>
                <p className="text-gray-600">
                  Yes, you can cancel your Pro subscription at any time. You'll continue to have Pro access until the
                  end of your billing period.
                </p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">Is there a free trial?</h3>
                <p className="text-gray-600">
                  Yes! All Pro subscriptions come with a 7-day free trial. You won't be charged until the trial period
                  ends.
                </p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">What payment methods do you accept?</h3>
                <p className="text-gray-600">
                  We accept all major credit cards, PayPal, and other payment methods through our secure Stripe
                  integration.
                </p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">Can I switch between monthly and yearly plans?</h3>
                <p className="text-gray-600">
                  Yes, you can upgrade or downgrade your plan at any time from your account settings.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
