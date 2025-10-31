import { type ReactNode } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function DashboardLayout({
  children,
  title,
  activeTab,
  setActiveTab,
}: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1">
        <Header title={title} />
        <main>{children}</main>
      </div>
    </div>
  );
}
