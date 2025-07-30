"use client";
import { useState } from "react";
import { useExpenseStore } from "../stores/useExpenseStore";
import { Settings, Target, AlertTriangle } from "lucide-react";

export default function BudgetManager() {
  const { budgets, updateBudget, getBudgetStatus } = useExpenseStore();
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [newLimit, setNewLimit] = useState("");

  const handleUpdateBudget = (category: string) => {
    const limit = parseFloat(newLimit);
    if (limit > 0) {
      updateBudget(category, limit);
      setEditingCategory(null);
      setNewLimit("");
    }
  };

  const startEditing = (category: string, currentLimit: number) => {
    setEditingCategory(category);
    setNewLimit(currentLimit.toString());
  };

  return (
    <div className="card animate-fade-in">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
        <Target className="w-5 h-5 text-green-600" />
        Budget Manager
      </h2>

      <div className="space-y-4">
        {budgets.map((budget) => {
          const status = getBudgetStatus(budget.category);
          const percentage = budget.limit > 0 ? (status.spent / budget.limit) * 100 : 0;
          const isOverBudget = status.spent > budget.limit;
          const isNearLimit = percentage > 80 && !isOverBudget;

          return (
            <div key={budget.category} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium text-gray-900 dark:text-white">{budget.category}</h3>
                  {isOverBudget && <AlertTriangle className="w-4 h-4 text-red-500" />}
                  {isNearLimit && <AlertTriangle className="w-4 h-4 text-yellow-500" />}
                </div>

                {editingCategory === budget.category ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={newLimit}
                      onChange={(e) => setNewLimit(e.target.value)}
                      className="w-24 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      placeholder="Limit"
                    />
                    <button
                      onClick={() => handleUpdateBudget(budget.category)}
                      className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
                      Save
                    </button>
                    <button
                      onClick={() => setEditingCategory(null)}
                      className="px-3 py-1 bg-gray-200 dark:bg-gray-600 text-gray-900 dark:text-gray-200 text-sm rounded hover:bg-gray-300 dark:hover:bg-gray-500">
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => startEditing(budget.category, budget.limit)}
                    className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                    <Settings className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    Spent: ₹{status.spent.toFixed(2)}
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">
                    Budget: ₹{budget.limit.toFixed(2)}
                  </span>
                </div>

                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      isOverBudget ? "bg-red-500" : isNearLimit ? "bg-yellow-500" : "bg-green-500"
                    }`}
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                  />
                </div>

                <div className="flex justify-between text-xs">
                  <span
                    className={`${
                      isOverBudget
                        ? "text-red-600 dark:text-red-400"
                        : isNearLimit
                        ? "text-yellow-600 dark:text-yellow-400"
                        : "text-green-600 dark:text-green-400"
                    }`}>
                    {percentage.toFixed(1)}% used
                  </span>
                  <span className="text-gray-500 dark:text-gray-400">
                    ₹{status.remaining.toFixed(2)} remaining
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
