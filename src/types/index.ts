export interface Expense {
  id: string;
  amount: number;
  description: string;
  category: string;
  date: string;
  createdAt: Date;
}

export interface Budget {
  category: string;
  limit: number;
  spent: number;
}

export const EXPENSE_CATEGORIES = [
  "Food & Dining",
  "Travel",
  "Shopping",
  "Entertainment",
  "Bills & Utilities",
  "Healthcare",
  "Education",
  "Other",
] as const;

export type ExpenseCategory = (typeof EXPENSE_CATEGORIES)[number];
