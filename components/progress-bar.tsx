import { Progress } from "@/components/ui/progress";

interface ProgressBarProps {
  current: number;
  total: number;
  label?: string;
  showNumbers?: boolean;
  className?: string;
}

export default function ProgressBar({
  current,
  total,
  label,
  showNumbers = true,
  className = "",
}: ProgressBarProps) {
  const percentage = Math.round((current / total) * 100);

  return (
    <div className={className}>
      {(label || showNumbers) && (
        <div className="flex justify-between text-sm mb-2">
          {label && <span>{label}</span>}
          {showNumbers && (
            <span className="text-gray-600">
              {current}/{total} ({percentage}%)
            </span>
          )}
        </div>
      )}
      <Progress value={percentage} className="h-2" />
    </div>
  );
}
