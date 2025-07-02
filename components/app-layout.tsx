import { ReactNode } from "react";
import { Navbar } from "./navbar";
import { Footer } from "./footer";

interface AppLayoutProps {
  children: ReactNode;
  className?: string;
}

export function AppLayout({
  children,
  className = "min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50",
}: AppLayoutProps) {
  return (
    <div className={className}>
      <Navbar />

      <main>{children}</main>

      <Footer />
    </div>
  );
}
