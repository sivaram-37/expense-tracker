"use client";

import { cn } from "@/lib/utils";
import { BarChart3, PlusCircle, List, Target, Home, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { id: "/dashboard", label: "Dashboard", icon: Home },
  { id: "/add-expense", label: "Add Expense", icon: PlusCircle },
  { id: "/expenses", label: "Expenses", icon: List },
  { id: "/analytics", label: "Analytics", icon: BarChart3 },
  { id: "/budgets", label: "Budgets", icon: Target },
];

const renderLink = (
  id: string,
  label: string,
  Icon: React.ElementType,
  isActive: boolean,
  showLabel = true
) => (
  <Link
    key={id}
    href={id}
    className={cn(
      "w-full flex items-center gap-3 p-2 rounded-lg text-left transition-colors",
      isActive
        ? "bg-primary text-white"
        : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
    )}>
    <Icon className="w-5 h-5" />
    {showLabel && <span>{label}</span>}
  </Link>
);

const SideNavbar = () => {
  const path = usePathname();

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="w-[210px] px-2 py-4 h-[calc(100dvh-64px)] sticky bg-sidebar-border hidden md:flex flex-col justify-between">
        <nav className="space-y-3">
          {tabs.map(({ id, label, icon }) => renderLink(id, label, icon, path === id))}
        </nav>
        <nav>{renderLink("/settings", "Settings", Settings, path === "/settings")}</nav>
      </div>

      {/* Mobile Sidebar */}
      <div className="p-2 h-[calc(100dvh-64px)] sticky bg-sidebar-border flex flex-col justify-between md:hidden">
        <nav className="space-y-2">
          {tabs.map(({ id, label, icon }) => renderLink(id, label, icon, path === id, false))}
        </nav>
        <nav>{renderLink("/settings", "Settings", Settings, path === "/settings", false)}</nav>
      </div>
    </>
  );
};

export default SideNavbar;
