"use client";
import { useState } from "react";
import { useExpenseStore } from "../stores/useExpenseStore";
import { Settings, AlertTriangle } from "lucide-react";
import OuterCard from "@/components/OuterCard";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import LoadingCard from "./loadingCard";

export default function BudgetManager() {
  const { budgets, updateBudget, getBudgetStatus, _hasHydrated } = useExpenseStore();
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [newLimit, setNewLimit] = useState("");

  if (!_hasHydrated) return <LoadingCard />;

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
    <OuterCard includeHeader>
      <div className="space-y-2 sm:space-y-6">
        {budgets.map((budget) => {
          const status = getBudgetStatus(budget.category);
          const percentage = budget.limit > 0 ? (status.spent / budget.limit) * 100 : 0;
          const isOverBudget = status.spent > budget.limit;
          const isNearLimit = percentage > 80 && !isOverBudget;

          return (
            <div
              key={budget.category}
              className="p-2 sm:p-4 bg-gray-200 dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium text-gray-900 dark:text-white">{budget.category}</h3>
                  {isOverBudget && <AlertTriangle className="w-5 h-5 text-red-500" />}
                  {isNearLimit && <AlertTriangle className="w-5 h-5 text-yellow-500" />}
                </div>

                {editingCategory === budget.category ? (
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={newLimit}
                      inputMode="decimal"
                      pattern="^\d+(\.\d{0,2})?$"
                      onChange={(e) => setNewLimit(e.target.value)}
                      className="w-24 h-8 px-2 py-1 text-sm border border-gray-500 dark:border-gray-400 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      placeholder="Limit"
                    />
                    <Button
                      onClick={() => handleUpdateBudget(budget.category)}
                      className="px-2 py-1 h-8 text-white text-sm rounded">
                      Save
                    </Button>
                    <Button
                      onClick={() => setEditingCategory(null)}
                      className="px-2 py-1 h-8 text-sm rounded bg-gray-300 hover:bg-gray-400/40 dark:bg-gray-600 hover:dark:bg-gray-700/60 border border-gray-500 dark:border-gray-400"
                      variant={"outline"}>
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <Button
                    variant={"ghost"}
                    onClick={() => startEditing(budget.category, budget.limit)}
                    className="w-5 h-5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                    <Settings className="w-5 h-5" />
                  </Button>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex flex-col sm:flex-row sm:justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    Spent: ₹ {status.spent.toFixed(2)}
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">
                    Budget: ₹ {budget.limit.toFixed(2)}
                  </span>
                </div>

                <div className="w-full bg-gray-400 dark:bg-gray-600 rounded-full h-2">
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
                  <span
                    className={`${
                      isOverBudget
                        ? "text-red-600 dark:text-red-400"
                        : isNearLimit
                        ? "text-yellow-600 dark:text-yellow-400"
                        : "text-green-600 dark:text-green-400"
                    }`}>
                    ₹ {status.remaining.toFixed(2)} remaining
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </OuterCard>
  );
}
