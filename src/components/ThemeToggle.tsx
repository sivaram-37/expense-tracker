"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Prevent rendering on server
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleThemeChange = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <Button variant="outline" size="icon" onClick={handleThemeChange} className="cursor-pointer">
      <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
    </Button>
  );
}
