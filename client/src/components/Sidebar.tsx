import { LayoutDashboard, LogOut, Users } from "lucide-react";




interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "analytics", label: "Analytics", icon: Users },
  ];

  return (
    <div className="w-64 bg-white border-r flex flex-col">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-teal-700">USeve</h1>
      </div>

      <nav className="flex-1 px-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 ${
                activeTab === item.id
                  ? "bg-sky-100 text-teal-700"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <button 
        className="flex items-center gap-3 px-8 py-4 text-red-600 hover:bg-red-50 m-4 rounded-lg"
      >
        <LogOut className="w-5 h-5" />
        <span>Logout</span>
      </button>
    </div>
  );
}