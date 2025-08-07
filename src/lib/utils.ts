import { clsx, type ClassValue } from "clsx";
import { PieLabelRenderProps } from "recharts";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Custom label function for pie chart
export const renderCustomLabel = ({ name, percent }: PieLabelRenderProps) => {
  if (percent === undefined) return name; // fallback
  return `${name} ${(percent * 100).toFixed(0)}%`;
};

// Custom tooltip formatter
export const formatTooltip = (value: number, name: string) => {
  return [`₹ ${value.toFixed(2)}`, name === "value" ? "Amount" : name];
};
