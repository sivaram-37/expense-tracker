"use client";

import * as React from "react";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const categoryPair = [
  {
    value: "Food & Dining",
    label: "Food & Dining",
  },
  {
    value: "Transportation",
    label: "Transportation",
  },
  {
    value: "Shopping",
    label: "Shopping",
  },
  {
    value: "Entertainment",
    label: "Entertainment",
  },
  {
    value: "Bills & Utilities",
    label: "Bills & Utilities",
  },
  {
    value: "Healthcare",
    label: "Healthcare",
  },
  {
    value: "Travel",
    label: "Travel",
  },
  {
    value: "Education",
    label: "Education",
  },
  {
    value: "Other",
    label: "Other",
  },
];

type CategoryDropdownType = {
  selectCategory: (val: string) => void;
};

export function CategoryDropdown({ selectCategory }: CategoryDropdownType) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full cursor-pointer justify-between border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent">
          {value
            ? categoryPair.find((category) => category.value === value)?.label
            : "Select Category..."}
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="max-w-[300px] p-0 ">
        <Command>
          <CommandInput placeholder="Search category..." />
          <CommandList>
            <CommandEmpty>No category found.</CommandEmpty>
            <CommandGroup>
              {categoryPair.map((category) => (
                <CommandItem
                  key={category.value}
                  value={category.value}
                  className="cursor-pointer"
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    selectCategory(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}>
                  <CheckIcon
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === category.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {category.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
