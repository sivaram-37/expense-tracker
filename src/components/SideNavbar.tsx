"use client";

import { cn } from "@/lib/utils";
import { BarChart3, PlusCircle, List, Target, Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback } from "react";

const tabs = [
  { id: "/dashboard", label: "Dashboard", icon: Home },
  { id: "/add-expense", label: "Add Expense", icon: PlusCircle },
  { id: "/expenses", label: "Expenses", icon: List },
  { id: "/analytics", label: "Analytics", icon: BarChart3 },
  { id: "/budgets", label: "Budgets", icon: Target },
];

const SideNavbar = () => {
  const path = usePathname();

  const renderNavigationLinks = useCallback(
    (useLabelWithIcon = true) =>
      tabs.map(({ id, label, icon: Icon }) => {
        const isActive = path === id;
        return (
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
            {useLabelWithIcon && <span>{label}</span>}
          </Link>
        );
      }),
    [path]
  );

  return (
    <>
      <nav className="p-4 h-[calc(100dvh-64px)] sticky w-[300px] space-y-2 bg-sidebar-border hidden md:block">
        {renderNavigationLinks()}
      </nav>
      <nav className="p-2 h-[calc(100dvh-64px)] sticky space-y-2 bg-sidebar-border block md:hidden">
        {renderNavigationLinks(false)}
      </nav>
    </>
  );
};

export default SideNavbar;
