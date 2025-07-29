"use client";

import { Plus, IndianRupee, AlertCircle } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { expenseFormSchema, ExpenseFormType } from "./ExpenseFormSchema";
import { cn } from "@/lib/utils";
import DatePicker from "./ui/date-picker";
import { CategoryDropdown } from "./CategoryDropdown";
import { useState } from "react";
import { useExpenseStore } from "@/stores/useExpenseStore";
import { redirect } from "next/navigation";

const style = {
  label: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1",
  input:
    "w-full px-2 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent",
};

export default function ExpenseForm() {
  const { addExpense } = useExpenseStore();

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();

  //   if (!amount || !description) return;

  //   addExpense({
  //     amount: parseFloat(amount),
  //     description: description.trim(),
  //     category,
  //     date,
  //   });
  // };

  const form = useForm({
    resolver: zodResolver(expenseFormSchema),
    mode: "all",
    reValidateMode: "onChange",
    defaultValues: {
      amount: "",
      category: "",
      date: undefined,
      description: "",
    },
  });

  const [error, setError] = useState<string[] | null>(null);

  const handleSubmit = (data: ExpenseFormType) => {
    const errorArray = [];
    setError(null);

    if (!form.getValues("amount")) errorArray.push("Amount is required.");
    if (!form.getValues("date")) errorArray.push("Date is required.");
    if (!form.getValues("description")) errorArray.push("Description is required.");
    if (!form.getValues("category")) errorArray.push("Category is required.");

    if (errorArray.length > 0) setError(errorArray);
    else {
      addExpense({
        amount: parseFloat(data.amount || ""),
        description: data.description || "",
        category: data.category || "",
        date: data.date,
      });

      redirect("/expenses");
    }
  };

  return (
    <div className="card animate-fade-in">
      <h2 className="text-[17px] sm:text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
        <Plus className="w-5 h-5 text-blue-600" />
        Add New Expense
      </h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={style.label}>Amount</FormLabel>
                  <FormControl className="relative">
                    <div className="relative">
                      <IndianRupee className="absolute left-1 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        {...field}
                        placeholder="0.00"
                        step="0.01"
                        inputMode="decimal" // shows number keyboard on mobile
                        pattern="^\d+(\.\d{0,2})?$"
                        className={cn(style.input, "pl-5")}
                        onInput={(e) => {
                          const input = e.target as HTMLInputElement;
                          const value = input.value;

                          // Allow only digits and a single decimal point
                          if (!/^\d*\.?\d{0,2}$/.test(value)) {
                            const trimmed = value
                              .replace(/[^0-9.]/g, "") // remove non-numeric
                              .replace(/^([^\.]*\.)|\./g, "$1"); // keep only first dot
                            const [intPart, decPart] = trimmed.split(".");
                            input.value =
                              intPart + (decPart !== undefined ? `.${decPart.slice(0, 2)}` : "");
                          }
                        }}
                      />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={() => (
                <FormItem>
                  <FormLabel className={style.label}>Date</FormLabel>
                  <FormControl>
                    <DatePicker selectedDate={(date) => form.setValue("date", date)} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={style.label}>Description</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="What did you spend on?" className={style.input} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={() => (
              <FormItem>
                <FormLabel className={style.label}>Category</FormLabel>
                <FormControl>
                  <CategoryDropdown selectCategory={(val) => form.setValue("category", val)} />
                </FormControl>
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full text-[16px] text-white font-bold cursor-pointer hover:bg-blue-600 dark:hover:bg-blue-700">
            Add Expense
          </Button>

          {error?.length && (
            <div className="px-4 py-3 rounded-md bg-gray-200 dark:bg-gray-950">
              {error.map((err, ind) => (
                <span
                  key={ind}
                  className="text-sm flex items-center gap-2 text-red-600 dark:text-red-500 py-1">
                  <AlertCircle size={22} />
                  {err}
                </span>
              ))}
            </div>
          )}
        </form>
      </Form>
    </div>
  );
}
