import { Moon, Sun } from "lucide-react";
import { useTheme } from "./theme-provider";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      title={isDark ? "Switch to Bright Mode" : "Switch to Dark Mode"}
      aria-label={isDark ? "Switch to Bright Mode" : "Switch to Dark Mode"}
      className={`relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/80 bg-background/80 text-foreground transition-all duration-200 hover:border-primary/50 hover:bg-secondary/60 focus:outline-none focus:ring-2 focus:ring-primary/40 active:scale-95 ${className}`}
    >
      {isDark ? (
        <Sun className="h-4 w-4 text-amber-400 transition-transform duration-300" />
      ) : (
        <Moon className="h-4 w-4 text-indigo-400 transition-transform duration-300" />
      )}
      <span className="sr-only">{isDark ? "Bright Mode" : "Dark Mode"}</span>
    </button>
  );
}
