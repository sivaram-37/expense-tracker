"use client";
import OuterCard from "@/layout/OuterCard";
import { useExpenseStore } from "../stores/useExpenseStore";
import { TrendingUp, Calendar, PieChart, IndianRupeeIcon } from "lucide-react";

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
      value: `₹${totalExpenses.toFixed(2)}`,
      icon: IndianRupeeIcon,
      color: "text-blue-600",
      bgColor: "bg-blue-100 dark:bg-blue-900",
    },
    {
      title: "This Month",
      value: `₹${monthlyTotal.toFixed(2)}`,
      icon: Calendar,
      color: "text-green-600",
      bgColor: "bg-green-100 dark:bg-green-900",
    },
    {
      title: "Categories",
      value: Object.keys(expensesByCategory).length.toString(),
      icon: PieChart,
      color: "text-purple-600",
      bgColor: "bg-purple-100 dark:bg-purple-900",
    },
    {
      title: "Transactions",
      value: expenses.length.toString(),
      icon: TrendingUp,
      color: "text-orange-600",
      bgColor: "bg-orange-100 dark:bg-orange-900",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <OuterCard key={stat.title}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
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
          <OuterCard>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
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
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            ₹{amount.toFixed(2)}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
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
          <OuterCard>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Recent Transactions
            </h3>
            <div className="space-y-3">
              {recentExpenses.map((expense) => (
                <div
                  key={expense.id}
                  className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {expense.description}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {expense.category} • {new Date(expense.date).toLocaleDateString()}
                    </p>
                  </div>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    ₹{expense.amount.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </OuterCard>
        )}
      </div>
    </div>
  );
}
