import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  Terminal,
  Github,
  ArrowRight,
  Lock,
  Mail,
  User,
  Eye,
  EyeOff,
  CheckCircle2,
  Shield,
} from "lucide-react";
import { AmbientBackdrop } from "@/components/ambient-backdrop";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Log In — ABTalks 60-Day Public Build Challenge" },
      {
        name: "description",
        content:
          "Log in or create your builder profile to start your 60-day public coding challenge.",
      },
    ],
  }),
  component: LoginPage,
});

export function LoginPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const userData = {
        name: name.trim() || email.split("@")[0] || "Builder",
        email: email || "builder@abtalks.dev",
        loggedIn: true,
        joinedAt: new Date().toISOString(),
        currentDay: 1,
        streak: 0,
        isFirstTime: true,
      };
      localStorage.setItem("abtalks_user", JSON.stringify(userData));
      window.dispatchEvent(new Event("abtalks_auth_change"));
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        navigate({ to: "/dashboard" });
      }, 600);
    }, 800);
  };

  const handleSocialAuth = (provider: "github" | "google") => {
    setLoading(true);
    setTimeout(() => {
      const userData = {
        name: provider === "github" ? "GitHub Builder" : "Google Builder",
        email: `builder@${provider}.com`,
        loggedIn: true,
        joinedAt: new Date().toISOString(),
        currentDay: 1,
        streak: 0,
        isFirstTime: true,
      };
      localStorage.setItem("abtalks_user", JSON.stringify(userData));
      window.dispatchEvent(new Event("abtalks_auth_change"));
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        navigate({ to: "/dashboard" });
      }, 600);
    }, 700);
  };

  return (
    <div className="relative flex min-h-screen flex-col justify-between overflow-hidden bg-background px-4 py-8 text-foreground sm:px-6">
      <AmbientBackdrop />

      {/* Top Header */}
      <header className="mx-auto flex w-full max-w-5xl items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-primary/40 bg-primary/15 shadow-[0_0_15px_rgba(0,0,0,0.2)]">
            <Terminal className="h-5 w-5 text-primary" aria-hidden="true" />
          </span>
          <span className="font-logo text-2xl font-black tracking-[0.12em] text-foreground">
            ABTALKS
          </span>
        </Link>

        <Link
          to="/"
          className="rounded-full border border-border px-4 py-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
        >
          ← Back to Home
        </Link>
      </header>

      {/* Center Auth Card */}
      <main className="mx-auto my-auto w-full max-w-md pt-8 pb-12">
        <div className="card-surface glass-panel relative overflow-hidden rounded-3xl p-6 shadow-2xl sm:p-8">
          {/* Subtle Glow */}
          <div className="pointer-events-none absolute -top-24 -left-24 h-48 w-48 rounded-full bg-primary/20 blur-3xl" />

          {/* Title Header */}
          <div className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <h1 className="mt-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              {mode === "login" ? "Welcome back, Builder" : "Join the 60-Day Challenge"}
            </h1>
            <p className="mt-2 text-xs text-muted-foreground sm:text-sm">
              {mode === "login"
                ? "Enter your details to access your daily streak and proof."
                : "Build daily, share your work, and prove your skills to top teams."}
            </p>
          </div>

          {/* Mode Tabs */}
          <div className="mt-6 grid grid-cols-2 rounded-xl bg-secondary/60 p-1">
            <button
              type="button"
              onClick={() => setMode("login")}
              className={`rounded-lg py-2 text-xs font-bold transition-all ${
                mode === "login"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setMode("register")}
              className={`rounded-lg py-2 text-xs font-bold transition-all ${
                mode === "register"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Auth Form */}
          <form onSubmit={handleAuth} className="mt-6 space-y-4">
            {mode === "register" && (
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    required
                    placeholder="Sudarsh Vimal"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background/50 pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="email"
                  required
                  placeholder="builder@abtalks.dev"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background/50 pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-muted-foreground">
                  Password
                </label>
                {mode === "login" && (
                  <a href="#" className="text-[11px] font-medium text-primary hover:underline">
                    Forgot password?
                  </a>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background/50 pl-10 pr-10 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || success}
              className="group mt-2 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl grad-primary text-sm font-bold text-primary-foreground shadow-[0_10px_30px_-10px_var(--color-primary)] transition-all hover:brightness-110 active:scale-[0.99] disabled:opacity-70"
            >
              {loading ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
              ) : success ? (
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-5 w-5" /> Authenticated!
                </span>
              ) : (
                <>
                  {mode === "login" ? "Sign In" : "Start 60-Day Challenge"}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>

          {/* Social Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-border" />
            <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
              Or continue with
            </span>
            <div className="h-px flex-1 bg-border" />
          </div>

          {/* Social Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => handleSocialAuth("github")}
              className="flex items-center justify-center gap-2 rounded-xl border border-border bg-background/60 py-2.5 text-xs font-semibold transition-all hover:border-primary/50 hover:bg-secondary"
            >
              <Github className="h-4 w-4" />
              GitHub
            </button>
            <button
              type="button"
              onClick={() => handleSocialAuth("google")}
              className="flex items-center justify-center gap-2 rounded-xl border border-border bg-background/60 py-2.5 text-xs font-semibold transition-all hover:border-primary/50 hover:bg-secondary"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              Google
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mx-auto text-center text-xs text-muted-foreground">
        <p>© {new Date().getFullYear()} ABTalks. Build in public every day.</p>
      </footer>
    </div>
  );
}
