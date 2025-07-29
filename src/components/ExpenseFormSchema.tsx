import z from "zod";

export const expenseFormSchema = z.object({
  amount: z.string().optional(),
  description: z.string().optional(),
  category: z.string().optional(),
  date: z.any().optional(),
});

export type ExpenseFormType = z.infer<typeof expenseFormSchema>;
