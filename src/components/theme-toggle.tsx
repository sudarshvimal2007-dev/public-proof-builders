import { Moon, Sun, Laptop } from "lucide-react";
import { useTheme, type ThemeMode } from "./theme-provider";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, setTheme } = useTheme();

  const options: { mode: ThemeMode; icon: typeof Sun; label: string }[] = [
    { mode: "light", icon: Sun, label: "Light" },
    { mode: "dark", icon: Moon, label: "Dark" },
    { mode: "system", icon: Laptop, label: "System" },
  ];

  return (
    <div
      className={`glass-panel inline-flex items-center gap-1 rounded-full p-1 border border-border/80 bg-background/80 ${className}`}
      aria-label="Select Theme"
    >
      {options.map(({ mode, icon: Icon, label }) => {
        const active = theme === mode;
        return (
          <button
            key={mode}
            type="button"
            onClick={() => setTheme(mode)}
            title={`Switch to ${label} theme`}
            aria-pressed={active}
            className={`flex h-7 w-7 items-center justify-center rounded-full transition-all duration-200 ${
              active
                ? "bg-primary text-primary-foreground shadow-sm scale-105 font-bold"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
            }`}
          >
            <Icon className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="sr-only">{label} theme</span>
          </button>
        );
      })}
    </div>
  );
}
