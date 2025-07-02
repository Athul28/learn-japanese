"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Crown,
  Check,
  X,
  Zap,
  Download,
  BarChart3,
  HeadphonesIcon,
  Smartphone,
  Star,
} from "lucide-react";
import { AppLayout } from "@/components/app-layout";

export default function SubscriptionPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const isSignup = searchParams.get("signup") === "true";

  const [selectedPlan, setSelectedPlan] = useState<"monthly" | "yearly">(
    "monthly"
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async (plan: "free" | "pro") => {
    setIsLoading(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    if (plan === "pro") {
      // In a real app, this would integrate with Stripe
      alert("Redirecting to Stripe checkout...");
      // Simulate successful payment
      setTimeout(() => {
        router.push("/dashboard?upgraded=true");
      }, 1000);
    } else {
      router.push("/dashboard");
    }

    setIsLoading(false);
  };

  const monthlyPrice = 9.99;
  const yearlyPrice = 99.99;
  const yearlyMonthlyPrice = yearlyPrice / 12;

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-500 rounded-full mb-6">
              <Crown className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              {isSignup ? "Choose Your Learning Plan" : "Upgrade to Pro"}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Unlock unlimited lessons, offline mode, and personalized learning
              paths to master Japanese faster
            </p>
          </div>

          {/* Plan Toggle */}
          <div className="flex justify-center mb-8">
            <div className="bg-gray-100 p-1 rounded-lg">
              <Button
                variant={selectedPlan === "monthly" ? "default" : "ghost"}
                onClick={() => setSelectedPlan("monthly")}
                className="px-6"
              >
                Monthly
              </Button>
              <Button
                variant={selectedPlan === "yearly" ? "default" : "ghost"}
                onClick={() => setSelectedPlan("yearly")}
                className="px-6"
              >
                Yearly
                <Badge
                  variant="secondary"
                  className="ml-2 bg-green-500 text-white"
                >
                  Save 17%
                </Badge>
              </Button>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
            {/* Free Plan */}
            <Card className="border-2 relative">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl mb-2">Free</CardTitle>
                <div className="text-4xl font-bold text-gray-800 mb-2">
                  $0
                  <span className="text-lg font-normal text-gray-600">
                    /month
                  </span>
                </div>
                <CardDescription>Perfect for getting started</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-sm">5 lessons per day</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Basic hiragana & katakana</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Community access</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <X className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-500">
                      Unlimited lessons
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <X className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-500">Offline mode</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <X className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-500">
                      Progress analytics
                    </span>
                  </div>
                </div>
                <Separator />
                <Button
                  className="w-full"
                  variant="outline"
                  onClick={() => handleSubscribe("free")}
                  disabled={isLoading}
                >
                  Get Started Free
                </Button>
              </CardContent>
            </Card>

            {/* Pro Plan */}
            <Card className="border-2 border-yellow-500 relative shadow-lg">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-yellow-500 text-white px-4 py-1">
                  <Star className="w-3 h-3 mr-1" />
                  Most Popular
                </Badge>
              </div>
              <CardHeader className="text-center pb-8 pt-8">
                <CardTitle className="text-2xl mb-2 text-yellow-600">
                  Pro
                </CardTitle>
                <div className="text-4xl font-bold text-gray-800 mb-2">
                  $
                  {selectedPlan === "monthly"
                    ? monthlyPrice
                    : yearlyMonthlyPrice.toFixed(2)}
                  <span className="text-lg font-normal text-gray-600">
                    /month
                  </span>
                </div>
                {selectedPlan === "yearly" && (
                  <div className="text-sm text-green-600">
                    Billed yearly at ${yearlyPrice}
                  </div>
                )}
                <CardDescription>
                  Everything you need to master Japanese
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-medium">
                      Unlimited lessons
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-sm">
                      All hiragana, katakana & kanji
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-sm">
                      Grammar & conversation practice
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Download className="w-4 h-4 text-blue-500" />
                    <span className="text-sm">Offline mode</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <BarChart3 className="w-4 h-4 text-purple-500" />
                    <span className="text-sm">Detailed progress analytics</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <HeadphonesIcon className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Audio pronunciation</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Smartphone className="w-4 h-4 text-orange-500" />
                    <span className="text-sm">Mobile app access</span>
                  </div>
                </div>
                <Separator />
                <Button
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-white"
                  onClick={() => handleSubscribe("pro")}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Processing...
                    </div>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 mr-2" />
                      Start Pro{" "}
                      {selectedPlan === "yearly" ? "Yearly" : "Monthly"}
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Offline Learning</h3>
              <p className="text-gray-600">
                Download lessons and study anywhere, even without internet
                connection
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Progress Tracking</h3>
              <p className="text-gray-600">
                Detailed analytics to track your learning progress and identify
                areas to improve
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <HeadphonesIcon className="w-8 h-8 text-purple-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Audio Pronunciation
              </h3>
              <p className="text-gray-600">
                Native speaker audio for perfect pronunciation and listening
                comprehension
              </p>
            </div>
          </div>

          {/* FAQ Section */}
          <Card className="bg-gray-50">
            <CardHeader>
              <CardTitle className="text-center">
                Frequently Asked Questions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold mb-2">Can I cancel anytime?</h4>
                <p className="text-gray-600">
                  Yes, you can cancel your subscription at any time. You&apos;ll
                  continue to have Pro access until the end of your billing
                  period.
                </p>
              </div>
              <Separator />
              <div>
                <h4 className="font-semibold mb-2">Is there a free trial?</h4>
                <p className="text-gray-600">
                  Our free plan gives you access to basic features. You can
                  upgrade to Pro anytime to unlock all features.
                </p>
              </div>
              <Separator />
              <div>
                <h4 className="font-semibold mb-2">
                  What payment methods do you accept?
                </h4>
                <p className="text-gray-600">
                  We accept all major credit cards, PayPal, and Apple Pay
                  through our secure payment processor.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
