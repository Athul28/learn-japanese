"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Flame, Star, LogOut, User, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import Logo from "@/components/logo";

export function Navbar() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";
  const isLoading = status === "loading";

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

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  const getUserInitials = () => {
    if (!session?.user?.name) return "U";
    return session.user.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Logo />

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => {
            // Skip items based on auth state
            if (!isAuthenticated && item.authRequired) return null;
            if (isAuthenticated && item.hideForAuth) return null;

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
          {isLoading ? (
            <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
          ) : isAuthenticated ? (
            <div className="flex items-center space-x-4">
              {/* User Stats - you can add real stats from user data later */}
              <div className="flex items-center space-x-2">
                <Flame className="w-5 h-5 text-orange-500" />
                <span className="font-semibold">7</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-yellow-500" />
                <span className="font-semibold">1250 XP</span>
              </div>

              {/* User Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={session?.user?.image || ""} />
                      <AvatarFallback>{getUserInitials()}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      {session?.user?.name && (
                        <p className="font-medium">{session.user.name}</p>
                      )}
                      {session?.user?.email && (
                        <p className="w-[200px] truncate text-sm text-muted-foreground">
                          {session.user.email}
                        </p>
                      )}
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/subscription" className="flex items-center">
                      <Settings className="mr-2 h-4 w-4" />
                      Subscription
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="flex items-center"
                    onSelect={handleSignOut}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link href="/auth/login">Login</Link>
              </Button>
              <Button asChild className="bg-red-500 hover:bg-red-600">
                <Link href="/auth/signup">Start Learning</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
