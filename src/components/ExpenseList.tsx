"use client";
import { useExpenseStore } from "../stores/useExpenseStore";
import { Trash2, Calendar, Tags } from "lucide-react";
import EmptyStateCard from "./EmptyStateCard";
import { Button } from "./ui/button";
import OuterCard from "@/components/OuterCard";

export const CATEGORY_STYLES: Record<string, string> = {
  "Food & Dining": "bg-[#D94A1E] text-[#FFF3E0]",
  Travel: "bg-[#005F99] text-[#E0F7FA]",
  Shopping: "bg-[#D81B60] text-[#FCE4EC]",
  Entertainment: "bg-[#8E24AA] text-[#F3E5F5]",
  "Bills & Utilities": "bg-[#059669] text-[#D1FAE5]",
  Healthcare: "bg-[#F8E68C] text-[#8D4F2B]",
  Education: "bg-[#BDECF3] text-[#345C68]",
  Other: "bg-[#A16207] text-[#FEF3C7]",
};

export default function ExpenseList() {
  const { expenses, deleteExpense } = useExpenseStore();

  return (
    <OuterCard includeHeader>
      <div className="space-y-2 sm:space-y-4">
        {expenses.length === 0 ? (
          <EmptyStateCard
            icon={<Tags />}
            title="No expenses yet"
            description="Add your first expense to get started tracking your spending."
            outerCardStyle="bg-gray-200 dark:bg-gray-800"
          />
        ) : (
          expenses.map((expense) => (
            <div
              key={expense.id}
              className="flex flex-col sm:flex-row sm:items-center border justify-between gap-2 p-3 bg-gray-200 dark:bg-gray-800 rounded-lg hover:bg-gray-300/60 dark:hover:bg-gray-700/60 transition-colors animate-slide-up">
              {/* Left section */}
              <div className="flex flex-col flex-1 gap-2">
                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      CATEGORY_STYLES[expense.category]
                    }`}>
                    {expense.category}
                  </span>
                  {/* Delete icon for small screens */}
                  <div className="sm:hidden">
                    <Button
                      variant={"ghost"}
                      onClick={() => deleteExpense(expense.id)}
                      className="p-1 text-red-500 hover:text-red-100 hover:bg-red-600 dark:hover:bg-red-500 rounded-lg transition-colors"
                      aria-label="Delete expense">
                      <Trash2 className="w-5 h-5" />
                    </Button>
                  </div>
                </div>

                <p className="text-sm text-gray-900 dark:text-white">{expense.description}</p>

                <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                  <Calendar className="w-3 h-3" />
                  {new Date(expense.date).toLocaleDateString()}
                </div>
              </div>

              {/* Right section */}
              <div className="flex items-center justify-between sm:justify-end gap-2">
                <span className="text-lg font-bold text-number">₹ {expense.amount.toFixed(2)}</span>
                {/* Delete icon for larger screens */}
                <div className="hidden sm:block">
                  <Button
                    variant={"ghost"}
                    onClick={() => deleteExpense(expense.id)}
                    className="text-red-500 hover:text-red-100 hover:bg-red-600 dark:hover:bg-red-500 rounded-lg transition-colors"
                    aria-label="Delete expense">
                    <Trash2 className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </OuterCard>
  );
}
