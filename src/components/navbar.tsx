import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  Menu,
  X,
  Terminal,
  ArrowUpRight,
  User,
  LogOut,
  LayoutDashboard,
  Flame,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

const navLinks = [
  { label: "Challenge", href: "/#challenge", isRoute: false },
  { label: "How It Works", href: "/#how-it-works", isRoute: false },
  { label: "Leaderboard", href: "/#leaderboard", isRoute: false },
  { label: "About", href: "/#about", isRoute: false },
  { label: "Dashboard", href: "/dashboard", isRoute: true },
];

export function Navbar() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("Challenge");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState<{ name: string; email: string } | null>(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const checkAuth = () => {
    try {
      const stored = localStorage.getItem("abtalks_user");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.loggedIn) {
          setIsLoggedIn(true);
          setUserProfile({
            name: parsed.name || "Builder",
            email: parsed.email || "builder@abtalks.dev",
          });
          return;
        }
      }
      setIsLoggedIn(false);
      setUserProfile(null);
    } catch {
      setIsLoggedIn(false);
      setUserProfile(null);
    }
  };

  useEffect(() => {
    checkAuth();
    window.addEventListener("abtalks_auth_change", checkAuth);
    window.addEventListener("storage", checkAuth);
    return () => {
      window.removeEventListener("abtalks_auth_change", checkAuth);
      window.removeEventListener("storage", checkAuth);
    };
  }, []);

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

  // Click outside listener for profile dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("abtalks_user");
    window.dispatchEvent(new Event("abtalks_auth_change"));
    setUserMenuOpen(false);
    navigate({ to: "/" });
  };

  const getInitials = (name: string) => {
    const parts = name.trim().split(" ");
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return name.slice(0, 2).toUpperCase();
  };

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
          className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-18"
        >
          {/* Logo */}
          <Link
            to="/"
            className="flex shrink-0 min-w-0 items-center gap-2.5"
            onClick={() => setOpen(false)}
          >
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-primary/35 bg-primary/14">
              <Terminal className="h-4.5 w-4.5 text-primary" aria-hidden="true" />
            </span>
            <span className="font-logo text-xl font-extrabold tracking-[0.12em] text-foreground sm:text-2xl">
              ABTALKS
            </span>
          </Link>

          {/* Centered Navigation Links (including Dashboard) */}
          <ul className="hidden flex-1 items-center justify-center gap-2 lg:flex">
            {navLinks.map((link) => (
              <li key={link.label}>
                {link.isRoute ? (
                  <Link
                    to="/dashboard"
                    onClick={() => setActive(link.label)}
                    className={`relative rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                      active === link.label
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {link.label}
                    <span
                      className={`absolute inset-x-4 -bottom-0.5 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent transition-opacity duration-300 ${
                        active === link.label ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  </Link>
                ) : (
                  <a
                    href={link.href}
                    onClick={() => setActive(link.label)}
                    className={`relative rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                      active === link.label
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {link.label}
                    <span
                      className={`absolute inset-x-4 -bottom-0.5 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent transition-opacity duration-300 ${
                        active === link.label ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  </a>
                )}
              </li>
            ))}
          </ul>

          {/* Right Action Items */}
          <div className="flex shrink-0 items-center gap-3">
            <ThemeToggle />

            {isLoggedIn && userProfile ? (
              /* Logged In Profile Menu Trigger */
              <div className="relative" ref={menuRef}>
                <button
                  type="button"
                  onClick={() => setUserMenuOpen((v) => !v)}
                  className="group flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 p-1 pr-3 text-xs font-semibold text-foreground transition-all hover:border-primary/60 hover:bg-primary/20 focus:outline-none focus:ring-2 focus:ring-primary/40"
                  aria-expanded={userMenuOpen}
                  aria-label="User profile menu"
                >
                  <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground shadow-sm">
                    {getInitials(userProfile.name)}
                    <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-background bg-emerald-500" />
                  </span>
                  <span className="hidden max-w-[100px] truncate text-xs font-bold sm:inline-block">
                    {userProfile.name.split(" ")[0]}
                  </span>
                  <ChevronDown
                    className={`h-3.5 w-3.5 text-muted-foreground transition-transform duration-200 ${
                      userMenuOpen ? "rotate-180 text-foreground" : ""
                    }`}
                  />
                </button>

                {/* Animated Glassmorphism Dropdown Menu */}
                {userMenuOpen && (
                  <div className="animate-pop-in absolute right-0 top-12 z-50 w-70 origin-top-right overflow-hidden rounded-3xl border border-primary/30 bg-background/55 p-3 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.85)] backdrop-blur-2xl backdrop-saturate-200">
                    {/* Ambient Glow Orbs */}
                    <div className="pointer-events-none absolute -top-12 -left-12 h-32 w-32 rounded-full bg-primary/25 blur-2xl" />
                    <div className="pointer-events-none absolute -bottom-12 -right-12 h-32 w-32 rounded-full bg-primary/20 blur-2xl" />

                    {/* User Header Badge */}
                    <div className="relative rounded-2xl border border-primary/25 bg-primary/10 p-3 backdrop-blur-md">
                      <div className="flex items-center gap-3">
                        <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-black text-primary-foreground shadow-[0_0_15px_rgba(0,0,0,0.3)]">
                          {getInitials(userProfile.name)}
                          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background bg-emerald-400" />
                        </div>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-extrabold text-foreground">
                            {userProfile.name}
                          </p>
                          <p className="truncate text-[11px] text-muted-foreground">
                            {userProfile.email}
                          </p>
                        </div>
                      </div>
                      <div className="mt-3 flex items-center justify-between rounded-xl border border-primary/20 bg-background/60 px-3 py-1.5 backdrop-blur-md">
                        <span className="text-[11px] font-semibold text-muted-foreground">
                          Challenge Streak
                        </span>
                        <span className="flex items-center gap-1 text-[11px] font-bold text-primary">
                          <Flame className="h-3.5 w-3.5 fill-primary/30" />
                          12 Days 🔥
                        </span>
                      </div>
                    </div>

                    {/* Menu Options with Frosted Glass FX */}
                    <div className="relative mt-2 space-y-1">
                      <Link
                        to="/dashboard"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-3 rounded-xl px-3 py-2 text-xs font-bold text-foreground transition-all hover:bg-primary/15 hover:backdrop-blur-lg hover:translate-x-0.5"
                      >
                        <div className="grid h-7 w-7 place-items-center rounded-lg border border-primary/30 bg-primary/10">
                          <LayoutDashboard className="h-3.5 w-3.5 text-primary" />
                        </div>
                        <span>Dashboard</span>
                      </Link>

                      <Link
                        to="/day/$day"
                        params={{ day: "12" }}
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-3 rounded-xl px-3 py-2 text-xs font-bold text-foreground transition-all hover:bg-primary/15 hover:backdrop-blur-lg hover:translate-x-0.5"
                      >
                        <div className="grid h-7 w-7 place-items-center rounded-lg border border-warning/30 bg-warning/10">
                          <Sparkles className="h-3.5 w-3.5 text-warning" />
                        </div>
                        <span>Today's Task (Day 12)</span>
                      </Link>

                      <Link
                        to="/dashboard"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-3 rounded-xl px-3 py-2 text-xs font-bold text-foreground transition-all hover:bg-primary/15 hover:backdrop-blur-lg hover:translate-x-0.5"
                      >
                        <div className="grid h-7 w-7 place-items-center rounded-lg border border-border bg-background/50">
                          <User className="h-3.5 w-3.5 text-muted-foreground" />
                        </div>
                        <span>Profile & Settings</span>
                      </Link>

                      <div className="my-1.5 h-px bg-border/60" />

                      <button
                        type="button"
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-xs font-bold text-destructive transition-all hover:bg-destructive/15 hover:backdrop-blur-lg hover:translate-x-0.5"
                      >
                        <div className="grid h-7 w-7 place-items-center rounded-lg border border-destructive/30 bg-destructive/10">
                          <LogOut className="h-3.5 w-3.5 text-destructive" />
                        </div>
                        <span>Log Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* First-Time Log In Button */
              <Link
                to="/login"
                className="items-center gap-1.5 rounded-full grad-primary px-5 py-2 text-sm font-bold text-primary-foreground shadow-[0_4px_16px_-4px_var(--color-primary)] transition-all hover:brightness-110 active:scale-[0.98] inline-flex"
              >
                Log In
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            )}

            {/* Mobile Menu Toggle */}
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

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-x-0 top-16 z-40 origin-top px-3 transition-all duration-300 lg:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none -translate-y-2 opacity-0"
        }`}
      >
        <div className="glass-panel overflow-hidden rounded-3xl p-3 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.8)]">
          <ul className="space-y-1">
            {navLinks.map((link) => (
              <li key={link.label}>
                {link.isRoute ? (
                  <Link
                    to="/dashboard"
                    onClick={() => {
                      setActive(link.label);
                      setOpen(false);
                    }}
                    className="flex min-h-12 items-center justify-between rounded-2xl px-4 text-base font-medium text-foreground transition-colors hover:bg-secondary"
                  >
                    {link.label}
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                  </Link>
                ) : (
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
                )}
              </li>
            ))}
          </ul>

          <div className="mt-3 border-t border-border pt-3">
            {isLoggedIn && userProfile ? (
              <div className="space-y-2">
                <div className="flex items-center gap-3 rounded-2xl border border-primary/20 bg-primary/10 p-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground">
                    {getInitials(userProfile.name)}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-foreground">
                      {userProfile.name}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">{userProfile.email}</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    handleLogout();
                    setOpen(false);
                  }}
                  className="flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl border border-destructive/30 bg-destructive/10 text-sm font-semibold text-destructive"
                >
                  <LogOut className="h-4 w-4" />
                  Log Out
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="flex min-h-12 items-center justify-center rounded-2xl grad-primary text-sm font-semibold text-primary-foreground"
              >
                Log In
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
