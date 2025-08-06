"use client";

import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";
import { CalendarDays } from "lucide-react";
import { Calendar } from "./calendar";

type DatePickerType = {
  selectedDate: (val: Date | undefined) => void;
};

const DatePicker = ({ selectedDate }: DatePickerType) => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          id="date"
          className="w-full cursor-pointer justify-between font-normal border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent">
          {date ? date.toLocaleDateString() : "Select date"}
          <CalendarDays />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={`overflow-hidden p-0 w-full`} align="start">
        <Calendar
          mode="single"
          selected={date}
          captionLayout="dropdown"
          onSelect={(date) => {
            setDate(date);
            setOpen(false);
            selectedDate(date);
          }}
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
