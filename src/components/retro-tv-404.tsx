import { Link } from "@tanstack/react-router";
import { RefreshCw, Home, WifiOff } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

export function RetroTV404({
  title = "Page Not Found",
  subtitle = "The page you are looking for doesn't exist or lost signal.",
  isOffline = false,
  onRetry,
}: {
  title?: string;
  subtitle?: string;
  isOffline?: boolean;
  onRetry?: () => void;
}) {
  const digit1 = isOffline ? "O" : "4";
  const digit2 = isOffline ? "F" : "0";
  const digit3 = isOffline ? "F" : "4";
  const screenText = isOffline ? "OFFLINE" : "NOT FOUND";

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-background p-4 text-foreground overflow-hidden">
      {/* Background glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[450px] w-[450px] rounded-full bg-primary/10 blur-[120px]" />

      {/* Top Header controls */}
      <div className="absolute top-6 right-6 z-50 flex items-center gap-3">
        <ThemeToggle />
      </div>

      {/* Offline Alert Badge */}
      {isOffline && (
        <div className="animate-bounce mb-4 flex items-center gap-2 rounded-full border border-warning/40 bg-warning/15 px-4 py-1.5 text-xs font-bold text-warning shadow-lg">
          <WifiOff className="h-4 w-4" />
          <span>NO NETWORK CONNECTION</span>
        </div>
      )}

      {/* Retro TV 404 Animation */}
      <div className="retro-tv-wrapper relative flex items-center justify-center scale-90 sm:scale-100">
        <div className="main_wrapper">
          <div className="main">
            <div className="antenna">
              <div className="antenna_shadow" />
              <div className="a1" />
              <div className="a1d" />
              <div className="a2" />
              <div className="a2d" />
              <div className="a_base" />
            </div>
            <div className="tv">
              <div className="cruve">
                <svg
                  className="curve_svg"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 189.929 189.929"
                  xmlSpace="preserve"
                >
                  <path d="M70.343,70.343c-30.554,30.553-44.806,72.7-39.102,115.635l-29.738,3.951C-5.442,137.659,11.917,86.34,49.129,49.13 C86.34,11.918,137.664-5.445,189.928,1.502l-3.95,29.738C143.041,25.54,100.895,39.789,70.343,70.343z" />
                </svg>
              </div>
              <div className="display_div">
                <div className="screen_out">
                  <div className="screen_out1">
                    <div className="screen">
                      <span className="notfound_text">{screenText}</span>
                    </div>
                    <div className="screenM">
                      <span className="notfound_text">{screenText}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lines">
                <div className="line1" />
                <div className="line2" />
                <div className="line3" />
              </div>
              <div className="buttons_div">
                <div className="b1">
                  <div />
                </div>
                <div className="b2" />
                <div className="speakers">
                  <div className="g1">
                    <div className="g11" />
                    <div className="g12" />
                    <div className="g13" />
                  </div>
                  <div className="g" />
                  <div className="g" />
                </div>
              </div>
            </div>
            <div className="bottom">
              <div className="base1" />
              <div className="base2" />
              <div className="base3" />
            </div>
          </div>
          <div className="text_404">
            <div className="text_4041">{digit1}</div>
            <div className="text_4042">{digit2}</div>
            <div className="text_4043">{digit3}</div>
          </div>
        </div>
      </div>

      {/* Description & Navigation Buttons */}
      <div className="mt-8 text-center max-w-md px-4 space-y-3 z-10">
        <h1 className="text-2xl font-black tracking-tight sm:text-3xl">{title}</h1>
        <p className="text-sm text-muted-foreground leading-relaxed">{subtitle}</p>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
          {onRetry && (
            <button
              type="button"
              onClick={onRetry}
              className="flex items-center gap-2 rounded-xl grad-primary px-5 py-2.5 text-xs font-bold text-primary-foreground shadow-md transition-transform active:scale-95"
            >
              <RefreshCw className="h-4 w-4" />
              Retry Signal
            </button>
          )}

          <Link
            to="/"
            className="flex items-center gap-2 rounded-xl border border-border bg-surface px-5 py-2.5 text-xs font-bold text-foreground transition-all hover:border-primary/50 hover:bg-secondary"
          >
            <Home className="h-4 w-4" />
            Back to Safety
          </Link>
        </div>
      </div>
    </div>
  );
}
