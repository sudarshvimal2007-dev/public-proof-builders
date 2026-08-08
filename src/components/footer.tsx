import { Link } from "@tanstack/react-router";
import { Github, Linkedin, Terminal } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-lg border border-primary/35 bg-primary/14">
                <Terminal className="h-4.5 w-4.5 text-primary" aria-hidden="true" />
              </span>
              <span className="font-logo text-xl font-extrabold tracking-[0.12em] text-foreground">ABTALKS</span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              A 60-day public build challenge for Indian college students. Learn, build, commit,
              share — and end up with proof instead of promises.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://github.com"
                aria-label="ABTalks on GitHub"
                className="grid h-10 w-10 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
              >
                <Github className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href="https://linkedin.com"
                aria-label="ABTalks on LinkedIn"
                className="grid h-10 w-10 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
              >
                <Linkedin className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          <nav aria-label="Platform">
            <p className="label-mono">Platform</p>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a href="/#challenge" className="text-muted-foreground hover:text-foreground">
                  Challenge
                </a>
              </li>
              <li>
                <a href="/#leaderboard" className="text-muted-foreground hover:text-foreground">
                  Leaderboard
                </a>
              </li>
              <li>
                <a href="/#how-it-works" className="text-muted-foreground hover:text-foreground">
                  How It Works
                </a>
              </li>
              <li>
                <a href="/#about" className="text-muted-foreground hover:text-foreground">
                  About
                </a>
              </li>
            </ul>
          </nav>

          <nav aria-label="Your challenge">
            <p className="label-mono">Your challenge</p>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <Link to="/dashboard" className="text-muted-foreground hover:text-foreground">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/day/$day"
                  params={{ day: "12" }}
                  className="text-muted-foreground hover:text-foreground"
                >
                  Today's task
                </Link>
              </li>
            </ul>
            <div className="mt-6 flex items-center gap-3">
              <ThemeToggle />
              <span className="text-[12px] text-muted-foreground">Dark by default</span>
            </div>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-border pt-6 text-[12px] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} ABTalks. Built in public.</p>
          <p className="label-mono text-[10px]">Don't just learn. Build in public.</p>
        </div>
      </div>
    </footer>
  );
}
