"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Flame, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import Logo from "@/components/logo";

interface NavbarProps {
  showAuthButtons?: boolean;
  userInitials?: string;
  userAvatar?: string;
  showUserStats?: boolean;
  userStats?: {
    streak: number;
    xp: number;
  };
}

export function Navbar({
  showAuthButtons = true,
  userInitials = "YT",
  userAvatar,
  showUserStats = false,
  userStats,
}: NavbarProps) {
  const pathname = usePathname();

  const navItems = [
    { href: "/dashboard", label: "Dashboard", authRequired: true },
    { href: "/lessons", label: "Lessons" },
    { href: "/study", label: "Study Notes" },
    { href: "/community", label: "Community" },
    {
      href: "/subscription",
      label: "Pricing",
      authRequired: false,
      hideForAuth: true,
    },
  ];

  const isActivePage = (href: string) => pathname === href;

  return (
    <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Logo />

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => {
            // Skip items based on auth state
            if (!showAuthButtons && item.authRequired) return null;
            if (showAuthButtons && item.hideForAuth) return null;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "transition-colors",
                  isActivePage(item.href)
                    ? "text-red-500 font-medium"
                    : "text-gray-600 hover:text-red-500"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Auth Buttons or User Section */}
        <div className="flex items-center space-x-3">
          {showAuthButtons ? (
            <>
              <Button variant="ghost" asChild>
                <Link href="/auth/login">Login</Link>
              </Button>
              <Button asChild className="bg-red-500 hover:bg-red-600">
                <Link href="/auth/signup">Start Learning</Link>
              </Button>
            </>
          ) : (
            <div className="flex items-center space-x-4">
              {/* User Stats */}
              {showUserStats && userStats && (
                <>
                  <div className="flex items-center space-x-2">
                    <Flame className="w-5 h-5 text-orange-500" />
                    <span className="font-semibold">{userStats.streak}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="w-5 h-5 text-yellow-500" />
                    <span className="font-semibold">{userStats.xp} XP</span>
                  </div>
                </>
              )}

              {/* User Avatar */}
              <Avatar>
                <AvatarImage src={userAvatar} />
                <AvatarFallback>{userInitials}</AvatarFallback>
              </Avatar>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
