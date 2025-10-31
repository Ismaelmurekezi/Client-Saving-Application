import { Bell, BarChart3, LayoutDashboard, LogOut } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import DashboardContent from "../components/DashboardContent";
import Analytics from "../pages/Analytics";
import { useAuthStore } from "../store/authStore";

const Layout = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r flex flex-col">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-teal-700">USeve</h1>
        </div>

        <nav className="flex-1 px-4">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 ${
              activeTab === "dashboard"
                ? "bg-sky-100 text-teal-700"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => setActiveTab("analytics")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 ${
              activeTab === "analytics"
                ? "bg-sky-100 text-teal-700"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <BarChart3 className="w-5 h-5" />
            <span>Analytics</span>
          </button>
        </nav>

        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 px-8 py-4 text-red-600 hover:bg-red-50 m-4 rounded-lg"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <header className="bg-white border-b px-8 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">
            {activeTab === "dashboard" && `Welcome back, ${user?.name || "User"}`}
            {activeTab === "analytics" && "Analytics"}
          </h2>
          <div className="flex items-center gap-4">
            <Bell className="w-6 h-6 text-gray-600" />
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center">
                <span className="text-white font-medium">
                  {user?.name?.charAt(0).toUpperCase() || "U"}
                </span>
              </div>
              <div>
                <p className="font-medium text-sm">{user?.name || "User"}</p>
                <p className="text-xs text-gray-500">Balance: ${user?.balance || 0}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        {activeTab === "dashboard" && <DashboardContent />}
        {activeTab === "analytics" && <Analytics />}
      </div>
    </div>
  );
};
export default Layout;
