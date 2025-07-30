"use client";
import { useExpenseStore } from "../stores/useExpenseStore";
import { Trash2, Calendar, Tag } from "lucide-react";
import EmptyStateCard from "./EmptyStateCard";
import { Button } from "./ui/button";

export default function ExpenseList() {
  const { expenses, deleteExpense } = useExpenseStore();

  if (expenses.length === 0) {
    return (
      <EmptyStateCard
        icon={<Tag />}
        title="No expenses yet"
        description="Add your first expense to get started tracking your spending."
      />
    );
  }

  return (
    <div className="card animate-fade-in">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Recent Expenses</h2>

      <div className="space-y-3">
        {expenses.map((expense) => (
          <div
            key={expense.id}
            className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors animate-slide-up">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-medium text-gray-900 dark:text-white">{expense.description}</h3>
                <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full">
                  {expense.category}
                </span>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {new Date(expense.date).toLocaleDateString()}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-lg font-semibold text-gray-900 dark:text-white">
                ₹{expense.amount.toFixed(2)}
              </span>
              <Button
                variant={"ghost"}
                onClick={() => deleteExpense(expense.id)}
                className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                aria-label="Delete expense">
                <Trash2 className="w-5 h-4=5" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
