"use client";
import { useTheme } from "@/providers/ThemeProvider";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

export const DarkModeToggle = ({ className }: { className?: string }) => {
  const { isDark, toggle } = useTheme();

  return (
    <Button
      className={cn("flex items-center justify-between", className)}
      variant="outline"
      onClick={() => toggle()}
    >
      {isDark ? <Sun size={12} /> : <Moon size={12} />}
    </Button>
  );
};
