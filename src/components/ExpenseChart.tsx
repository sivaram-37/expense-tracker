"use client";
import { useExpenseStore } from "../stores/useExpenseStore";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { PieChart as PieChartIcon } from "lucide-react";
import type { PieLabelRenderProps } from "recharts";
import EmptyStateCard from "./EmptyStateCard";
import OuterCard from "@/layout/OuterCard";

export const CATEGORY_STYLES: Record<string, string> = {
  "Food & Dining": "#EF4444",
  Travel: "#3B82F6",
  Shopping: "#F59E0B",
  Entertainment: "#8E24AA",
  "Bills & Utilities": "#10B981",
  Healthcare: "#EC4899",
  Education: "#8B5CF6",
  Other: "#84CC16",
};

// Custom label function for pie chart
const renderCustomLabel = ({ name, percent }: PieLabelRenderProps) => {
  if (percent === undefined) return name; // fallback
  return `${name} ${(percent * 100).toFixed(0)}%`;
};

// Custom tooltip formatter
const formatTooltip = (value: number, name: string) => {
  return [`₹${value.toFixed(2)}`, name === "value" ? "Amount" : name];
};

export default function ExpenseChart() {
  const { getExpensesByCategory, expenses } = useExpenseStore();

  const expensesByCategory = getExpensesByCategory();

  // Prepare data for pie chart
  const pieData = Object.entries(expensesByCategory).map(([category, amount]) => ({
    name: category,
    value: amount,
  }));

  // Prepare data for monthly chart
  const monthlyData = () => {
    const months: { [key: string]: { month: string; amount: number } } = {};
    expenses.forEach((expense) => {
      const date = new Date(expense.date);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
      const monthName = date.toLocaleDateString("en-US", { month: "short", year: "2-digit" });

      if (!months[monthKey]) {
        months[monthKey] = { month: monthName, amount: 0 };
      }
      months[monthKey].amount += expense.amount;
    });

    return Object.values(months).slice(-6); // Last 6 months
  };

  if (pieData.length === 0) {
    return (
      <EmptyStateCard
        icon={<PieChartIcon />}
        title="No data to display"
        description="Add some expenses to see your spending analytics."
      />
    );
  }

  return (
    <div className="space-y-5">
      {/* Category Distribution */}
      <OuterCard>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
          Expense Distribution by Category
        </h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value">
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={CATEGORY_STYLES[entry.name] ?? "#06B6D4"} />
                ))}
              </Pie>
              <Tooltip formatter={formatTooltip} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </OuterCard>

      {/* Monthly Trend */}
      <OuterCard>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
          Monthly Spending Trend
        </h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData()}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} tickFormatter={(value) => `₹${value}`} />
              <Tooltip
                formatter={(value: number) => [`₹${value.toFixed(2)}`, "Amount"]}
                labelStyle={{ color: "#374151" }}
                contentStyle={{
                  backgroundColor: "#F9FAFB",
                  border: "1px solid #E5E7EB",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Bar dataKey="amount" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </OuterCard>
    </div>
  );
}
