import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Expense, Budget, EXPENSE_CATEGORIES } from "../types";

interface ExpenseStore {
  expenses: Expense[];
  budgets: Budget[];
  addExpense: (expense: Omit<Expense, "id" | "createdAt">) => void;
  deleteExpense: (id: string) => void;
  updateBudget: (category: string, limit: number) => void;
  getTotalExpenses: () => number;
  getExpensesByCategory: () => Record<string, number>;
  getBudgetStatus: (category: string) => { spent: number; limit: number; remaining: number };
  getRecentExpenses: (count: number) => Expense[];
}

export const useExpenseStore = create<ExpenseStore>()(
  persist(
    (set, get) => ({
      expenses: [],
      budgets: EXPENSE_CATEGORIES.map((cat) => ({
        category: cat,
        limit: 1000,
        spent: 0,
      })),

      addExpense: (expenseData) =>
        set((state) => {
          const newExpense: Expense = {
            ...expenseData,
            id: Date.now().toString(),
            createdAt: new Date(),
          };

          const updatedBudgets = state.budgets.map((budget) =>
            budget.category === expenseData.category
              ? { ...budget, spent: budget.spent + expenseData.amount }
              : budget
          );

          return {
            expenses: [newExpense, ...state.expenses],
            budgets: updatedBudgets,
          };
        }),

      deleteExpense: (id) =>
        set((state) => {
          const expenseToDelete = state.expenses.find((e) => e.id === id);
          if (!expenseToDelete) return state;

          const updatedBudgets = state.budgets.map((budget) =>
            budget.category === expenseToDelete.category
              ? { ...budget, spent: Math.max(0, budget.spent - expenseToDelete.amount) }
              : budget
          );

          return {
            expenses: state.expenses.filter((e) => e.id !== id),
            budgets: updatedBudgets,
          };
        }),

      updateBudget: (category, limit) =>
        set((state) => ({
          budgets: state.budgets.map((budget) =>
            budget.category === category ? { ...budget, limit } : budget
          ),
        })),

      getTotalExpenses: () => {
        const { expenses } = get();
        return expenses.reduce((total, expense) => total + expense.amount, 0);
      },

      getExpensesByCategory: () => {
        const { expenses } = get();
        return expenses.reduce((acc, expense) => {
          acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
          return acc;
        }, {} as Record<string, number>);
      },

      getBudgetStatus: (category) => {
        const { budgets } = get();
        const budget = budgets.find((b) => b.category === category);
        if (!budget) return { spent: 0, limit: 0, remaining: 0 };

        return {
          spent: budget.spent,
          limit: budget.limit,
          remaining: Math.max(0, budget.limit - budget.spent),
        };
      },

      getRecentExpenses: (count) => {
        const { expenses } = get();
        return expenses.slice(0, count);
      },
    }),
    {
      name: "expense-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
