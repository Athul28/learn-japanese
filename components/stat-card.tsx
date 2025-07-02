import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  iconColor?: string;
  className?: string;
}

export default function StatCard({
  icon: Icon,
  label,
  value,
  iconColor = "text-blue-500",
  className = "",
}: StatCardProps) {
  return (
    <Card className={className}>
      <CardContent className="p-4 text-center">
        <Icon className={`w-8 h-8 ${iconColor} mx-auto mb-2`} />
        <div className="text-sm text-gray-600">{label}</div>
        <span className="font-semibold">{value}</span>
      </CardContent>
    </Card>
  );
}
