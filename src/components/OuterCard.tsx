import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export const tabs = [
  { id: "/dashboard", label: "Dashboard" },
  { id: "/add-expense", label: "Add New Expense" },
  { id: "/expenses", label: "Recent Expenses" },
  { id: "/analytics", label: "Analytics" },
  { id: "/budgets", label: "Budget Manager" },
];

export function getTabInfoById(id: string): { label: string } {
  const tab = tabs.find((tab) => tab.id === id);
  return { label: tab!.label };
}

const OuterCard = ({
  children,
  className = "",
  includeHeader = false,
}: {
  children: React.ReactNode;
  className?: string;
  includeHeader?: boolean;
}) => {
  const path = usePathname();
  const { label } = getTabInfoById(path);

  return (
    <div
      className={cn(
        "p-2 sm:p-6 bg-gray-100 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800",
        includeHeader ? "pt-0 sm:pt-0" : "",
        className
      )}>
      {includeHeader && (
        <h2 className="sticky top-[-16px] sm:top-[-32px] z-50 bg-gray-100 dark:bg-gray-900 text-lg lg:text-2xl font-extrabold text-gray-900 dark:text-white py-3 lg:py-6 flex items-center justify-center gap-2">
          <span className="mb-2 border-b-6 border-b-emerald-500 border-double">{label}</span>
        </h2>
      )}
      {children}
    </div>
  );
};

export default OuterCard;
