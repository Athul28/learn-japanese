import Link from "next/link";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  withText?: boolean;
  href?: string;
  className?: string;
}

export default function Logo({
  size = "md",
  withText = true,
  href = "/",
  className = "",
}: LogoProps) {
  const sizeClasses = {
    sm: "w-6 h-6 text-xs",
    md: "w-8 h-8 text-sm",
    lg: "w-10 h-10 text-base",
  };

  const textSizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  };

  const logoElement = (
    <div className={`flex items-center space-x-2 ${className}`}>
      <div
        className={`${sizeClasses[size]} bg-red-500 rounded-full flex items-center justify-center`}
      >
        <span className="text-white font-bold">日</span>
      </div>
      {withText && (
        <span className={`${textSizeClasses[size]} font-bold text-gray-800`}>
          NihongoJourney
        </span>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="inline-flex">
        {logoElement}
      </Link>
    );
  }

  return logoElement;
}
