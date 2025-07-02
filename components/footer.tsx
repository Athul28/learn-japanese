import Link from "next/link";
import Logo from "@/components/logo";

export function Footer() {
  const footerSections = [
    {
      title: "Learning",
      links: [
        { href: "/lessons", label: "Lessons" },
        { href: "/study", label: "Study Notes" },
        { href: "/dashboard", label: "Dashboard" },
      ],
    },
    {
      title: "Community",
      links: [
        { href: "/community", label: "Study Groups" },
        { href: "/leaderboard", label: "Leaderboard" },
        { href: "/forums", label: "Forums" },
      ],
    },
    {
      title: "Support",
      links: [
        { href: "/help", label: "Help Center" },
        { href: "/contact", label: "Contact" },
        { href: "/privacy", label: "Privacy" },
      ],
    },
  ];

  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Logo className="w-8 h-8" />
              <span className="text-xl font-bold">NihongoJourney</span>
            </div>
            <p className="text-gray-400">
              Your comprehensive platform for learning Japanese through
              gamified, interactive lessons.
            </p>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2 text-gray-400">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 NihongoJourney. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
