import { useState, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Flame, Sparkles } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { AmbientBackdrop } from "@/components/ambient-backdrop";
import { Footer } from "@/components/footer";
import {
  AchievementStrip,
  ChallengeProgress,
  LeaderboardPreview,
  StateNotice,
  StreakCard,
  SubmissionStatus,
  TaskCard,
} from "@/components/dashboard-cards";
import { GlassCard } from "@/components/glass-card";
import { dashboardStates, student, submission, type DashboardStateId } from "@/data/abtalks";

const title = "Dashboard — ABTalks 60-Day Challenge";
const description =
  "Your ABTalks daily home: current streak, today's task, challenge progress, proof submissions, achievements and leaderboard standing.";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Dashboard,
});

const stateConfig: Record<
  DashboardStateId,
  { day: number; streak: number; best: number; github: boolean; linkedin: boolean; locked: boolean }
> = {
  active: { day: 12, streak: 12, best: 18, github: submission.github === "submitted", linkedin: false, locked: false },
  "first-day": { day: 1, streak: 0, best: 0, github: false, linkedin: false, locked: false },
  missed: { day: 12, streak: 0, best: 11, github: false, linkedin: false, locked: false },
  empty: { day: 1, streak: 0, best: 0, github: false, linkedin: false, locked: true },
};

function Dashboard() {
  const [state, setState] = useState<DashboardStateId>("first-day");
  const [userName, setUserName] = useState<string>(student.firstName);
  const [userStreak, setUserStreak] = useState<number | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("abtalks_user");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed?.name) {
          setUserName(parsed.name.split(" ")[0]);
        }
        // Force first-day state for first-time login users
        if (!parsed?.currentDay || parsed?.currentDay === 1 || parsed?.isFirstTime) {
          setState("first-day");
        } else if (parsed?.currentDay === 12) {
          setState("active");
        }
        if (typeof parsed?.streak === "number") {
          setUserStreak(parsed.streak);
        }
      } else {
        setState("first-day");
      }
    } catch {
      setState("first-day");
    }
  }, []);

  const cfg = {
    ...stateConfig[state],
    ...(userStreak !== null ? { streak: userStreak } : {}),
  };

  const handleProofUpdate = ({ github, linkedin }: { github: boolean; linkedin: boolean }) => {
    if (github && linkedin && cfg.day === 1) {
      setUserStreak(1);
      try {
        const stored = localStorage.getItem("abtalks_user");
        if (stored) {
          const parsed = JSON.parse(stored);
          parsed.streak = 1;
          localStorage.setItem("abtalks_user", JSON.stringify(parsed));
        }
      } catch {}
    }
  };

  return (
    <div className="relative min-h-screen">
      <AmbientBackdrop />
      <Navbar />

      <main className="mx-auto max-w-6xl px-4 pt-24 pb-16 sm:px-6 lg:pt-32">
        {/* header */}
        <header className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 sm:flex sm:flex-wrap sm:items-center sm:justify-between">
          <div className="min-w-0">
            <p className="label-mono">Day {cfg.day} of {student.totalDays}</p>
            <h1 className="mt-2 text-3xl font-bold text-balance sm:text-4xl">
              Good evening, {userName}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {cfg.streak > 0
                ? "You're on track. One task, two proofs, day closed."
                : "Fresh page today — one commit puts you back on the board."}
            </p>
          </div>
          <div className="glass-panel flex shrink-0 items-center gap-2 rounded-full px-3.5 py-2">
            <Flame
              className={`h-4 w-4 ${cfg.streak ? "animate-flame text-flame" : "text-muted-foreground"}`}
              aria-hidden="true"
            />
            <span className="num-display text-sm font-bold">{cfg.streak} DAY STREAK</span>
          </div>
        </header>

        {/* mocked state switcher */}
        <div className="hide-scrollbar mt-6 flex gap-2 overflow-x-auto pb-1">
          {dashboardStates.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setState(s.id)}
              aria-pressed={state === s.id}
              className={`flex min-h-10 shrink-0 items-center gap-2 rounded-full border px-4 text-[13px] font-medium transition-colors ${
                state === s.id
                  ? "border-primary/40 bg-primary/12 text-primary"
                  : "border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {s.label}
              <span className="label-mono text-[9px] normal-case opacity-70">{s.hint}</span>
            </button>
          ))}
        </div>

        <div className="mt-6 space-y-4 lg:grid lg:grid-cols-[1.35fr_1fr] lg:items-start lg:gap-6 lg:space-y-0">
          <div className="min-w-0 space-y-4">
            <StateNotice state={state} />
            {state === "empty" ? <TaskCard locked /> : <TaskCard />}
            <SubmissionStatus day={cfg.day} github={cfg.github} linkedin={cfg.linkedin} onProofUpdate={handleProofUpdate} />
            <AchievementStrip />
          </div>

          <div className="min-w-0 space-y-4">
            <StreakCard streak={cfg.streak} best={cfg.best} />
            <ChallengeProgress day={cfg.day} total={student.totalDays} />
            <LeaderboardPreview />
            <GlassCard className="p-6">
              <p className="label-mono">XP earned</p>
              <div className="mt-3 flex items-end gap-2">
                <span className="num-display text-4xl leading-none font-bold">{student.xp}</span>
                <Sparkles className="mb-1 h-4 w-4 text-primary" aria-hidden="true" />
              </div>
              <p className="mt-3 text-[13px] text-muted-foreground">
                +50 XP for every completed day, +100 at each milestone.
              </p>
              <Link
                to="/day/$day"
                params={{ day: String(cfg.day) }}
                className="group mt-5 flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-border text-sm font-semibold transition-colors hover:border-primary/50 hover:text-primary"
              >
                OPEN DAY {cfg.day}
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </GlassCard>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
