import { type LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color?: string;
}

export default function StatsCard({ title, value, icon: Icon, color = "yellow" }: StatsCardProps) {
  const colorClasses = {
    yellow: "bg-yellow-600",
    green: "bg-green-600",
    red: "bg-red-600",
    blue: "bg-blue-600",
  };

  return (
    <div className="bg-white max-h-44 w-[400px] rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <div className={`w-10 h-10 ${colorClasses[color as keyof typeof colorClasses]} rounded-lg flex items-center justify-center`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
      <p className={`text-3xl font-bold text-${color}-600`}>{value}</p>
    </div>
  );
}