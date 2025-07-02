import type { Metadata } from "next";
import SessionProvider from "@/components/session-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "NihongoJourney - Learn Japanese",
  description:
    "Master Japanese through gamified lessons, interactive quizzes, and community support",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
