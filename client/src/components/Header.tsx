import { Bell } from "lucide-react";


interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {


  return (
    <header className="bg-white border-b px-8 py-4 flex items-center justify-between">
      <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
      <div className="flex items-center gap-4">
        <Bell className="w-6 h-6 text-gray-600" />
        <div className="flex items-center gap-3">
          <div>
            <p className="font-medium text-sm">peter</p>
          </div>
        </div>
      </div>
    </header>
  );
}