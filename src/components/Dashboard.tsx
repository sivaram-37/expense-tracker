"use client";
import OuterCard from "@/components/OuterCard";
import { useExpenseStore } from "../stores/useExpenseStore";
import { TrendingUp, Calendar, PieChart, IndianRupeeIcon } from "lucide-react";
import { CATEGORY_STYLES } from "./ExpenseList";
import { cn } from "@/lib/utils";

export default function Dashboard() {
  const { expenses, getTotalExpenses, getExpensesByCategory, getRecentExpenses } =
    useExpenseStore();

  const totalExpenses = getTotalExpenses();
  const expensesByCategory = getExpensesByCategory();
  const recentExpenses = getRecentExpenses(4);

  // Get current month expenses
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const monthlyExpenses = expenses.filter((expense) => {
    const expenseDate = new Date(expense.date);
    return expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear;
  });
  const monthlyTotal = monthlyExpenses.reduce((sum, expense) => sum + expense.amount, 0);

  const stats = [
    {
      title: "Total Expenses",
      value: `₹ ${totalExpenses.toFixed(2)}`,
      icon: IndianRupeeIcon,
      color: "text-blue-700 dark:text-blue-300",
      bgColor: "bg-blue-200 dark:bg-blue-800",
    },
    {
      title: "This Month",
      value: `₹ ${monthlyTotal.toFixed(2)}`,
      icon: Calendar,
      color: "text-green-700 dark:text-green-300",
      bgColor: "bg-green-200 dark:bg-green-800",
    },
    {
      title: "Categories",
      value: Object.keys(expensesByCategory).length.toString(),
      icon: PieChart,
      color: "text-purple-700 dark:text-purple-300",
      bgColor: "bg-purple-200 dark:bg-purple-900",
    },
    {
      title: "Transactions",
      value: expenses.length.toString(),
      icon: TrendingUp,
      color: "text-orange-700 dark:text-orange-300",
      bgColor: "bg-orange-200 dark:bg-orange-800",
    },
  ];

  return (
    <OuterCard includeHeader>
      <div className="space-y-5">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-6">
          {stats.map((stat) => (
            <OuterCard key={stat.title} className="sm:p-4 bg-gray-200 dark:bg-gray-800">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{stat.title}</p>
                  <p className="text-2xl font-bold text-number">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full ${stat.bgColor}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </OuterCard>
          ))}
        </div>

        {/* Two column layout for categories and recent expenses */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Categories */}
          {Object.keys(expensesByCategory).length > 0 && (
            <OuterCard className="bg-gray-200 dark:bg-gray-800">
              <h3 className="text-sm sm:text-lg font-bold text-gray-900 dark:text-white mb-4">
                Top Spending Categories
              </h3>
              <div className="space-y-3">
                {Object.entries(expensesByCategory)
                  .sort(([, a], [, b]) => b - a)
                  .slice(0, 5)
                  .map(([category, amount]) => {
                    const percentage = (amount / totalExpenses) * 100;
                    return (
                      <div key={category} className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                              {category}
                            </span>
                            <span className="text-sm text-number">₹{amount.toFixed(2)}</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </OuterCard>
          )}

          {/* Recent Expenses */}
          {recentExpenses.length > 0 && (
            <OuterCard className="bg-gray-200 dark:bg-gray-800">
              <h3 className="text-sm sm:text-lg font-bold text-gray-900 dark:text-white mb-4">
                Recent Transactions
              </h3>
              <div className="space-y-2 sm:space-y-4">
                {recentExpenses.map((expense) => (
                  <div
                    key={expense.id}
                    className="flex justify-between flex-col sm:flex-row gap-2 p-2 bg-gray-300 dark:bg-gray-700 rounded-lg">
                    <div className="flex-1 space-y-3">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {expense.description}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 space-x-1">
                        <span
                          className={cn("px-2 py-1 rounded-lg", CATEGORY_STYLES[expense.category])}>
                          {expense.category}
                        </span>
                        <span>• {new Date(expense.date).toLocaleDateString()}</span>
                      </p>
                    </div>
                    <span className="text-lg font-bold text-number">
                      ₹{expense.amount.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </OuterCard>
          )}
        </div>
      </div>
    </OuterCard>
  );
}
