import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, Terminal, ArrowUpRight } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

const navLinks = [
  { label: "Challenge", href: "/#challenge" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Leaderboard", href: "/#leaderboard" },
  { label: "About", href: "/#about" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("Challenge");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`border-b transition-all duration-500 ${
          scrolled
            ? "glass-panel border-border/80 shadow-[0_10px_30px_-24px_rgba(0,0,0,0.9)]"
            : "border-transparent bg-transparent backdrop-blur-[2px]"
        }`}
      >
        <nav
          aria-label="Main"
          className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-4 sm:px-6 lg:h-18"
        >
          <Link
            to="/"
            className="flex min-w-0 items-center gap-2"
            onClick={() => setOpen(false)}
          >
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-primary/30 bg-primary/12">
              <Terminal className="h-4 w-4 text-primary" aria-hidden="true" />
            </span>
            <span className="font-display truncate text-[15px] font-bold tracking-[0.14em]">
              ABTALKS
            </span>
          </Link>

          <ul className="ml-6 hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={() => setActive(link.label)}
                  className={`relative rounded-full px-4 py-2 text-sm transition-colors ${
                    active === link.label
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute inset-x-4 -bottom-0.5 h-px bg-gradient-to-r from-transparent via-primary to-transparent transition-opacity duration-300 ${
                      active === link.label ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </a>
              </li>
            ))}
          </ul>

          <div className="ml-auto flex items-center gap-2">
            <Link
              to="/dashboard"
              className="hidden items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm text-muted-foreground transition-colors hover:border-border-strong hover:text-foreground lg:inline-flex"
            >
              Dashboard
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              className="glass-panel grid h-10 w-10 place-items-center rounded-full lg:hidden"
            >
              {open ? (
                <X className="h-[18px] w-[18px]" aria-hidden="true" />
              ) : (
                <Menu className="h-[18px] w-[18px]" aria-hidden="true" />
              )}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-x-0 top-16 z-40 origin-top px-3 transition-all duration-300 lg:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none -translate-y-2 opacity-0"
        }`}
      >
        <div className="glass-panel overflow-hidden rounded-3xl p-3 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.8)]">
          <ul className="space-y-1">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={() => {
                    setActive(link.label);
                    setOpen(false);
                  }}
                  className="flex min-h-12 items-center justify-between rounded-2xl px-4 text-base font-medium text-foreground transition-colors hover:bg-secondary"
                >
                  {link.label}
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <Link
              to="/dashboard"
              onClick={() => setOpen(false)}
              className="flex min-h-12 items-center justify-center rounded-2xl border border-border text-sm font-semibold"
            >
              Dashboard
            </Link>
            <Link
              to="/day/$day"
              params={{ day: "12" }}
              onClick={() => setOpen(false)}
              className="flex min-h-12 items-center justify-center rounded-2xl bg-primary text-sm font-semibold text-primary-foreground"
            >
              Today's task
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
