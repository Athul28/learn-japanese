import { ReactNode } from "react";
import { Navbar } from "./navbar";
import { Footer } from "./footer";

interface AppLayoutProps {
  children: ReactNode;
  showAuthButtons?: boolean;
  userInitials?: string;
  userAvatar?: string;
  className?: string;
}

export function AppLayout({
  children,
  showAuthButtons = true,
  userInitials = "YT",
  userAvatar,
  className = "min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50",
}: AppLayoutProps) {
  return (
    <div className={className}>
      <Navbar
        showAuthButtons={showAuthButtons}
        userInitials={userInitials}
        userAvatar={userAvatar}
      />

      <main>{children}</main>

      <Footer />
    </div>
  );
}
