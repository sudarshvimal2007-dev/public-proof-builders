import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CircleCheck,
  Circle,
  Clock,
  Flame,
  Github,
  Linkedin,
  Lock,
  Target,
  TrendingUp,
  Trophy,
  Zap,
} from "lucide-react";
import { GlassCard } from "@/components/glass-card";
import { ProgressBar, ProgressRing } from "@/components/progress-ring";
import { achievements, leaderboard, student, todayTask } from "@/data/abtalks";
import type { DashboardStateId } from "@/data/abtalks";
import { useInView } from "@/hooks/use-motion";

/* ---------- Streak ---------- */

export function StreakCard({ streak, best }: { streak: number; best: number }) {
  const isZero = streak === 0;
  return (
    <GlassCard className="p-6">
      <div className="flex items-start justify-between">
        <p className="label-mono">Current streak</p>
        <Flame
          className={`h-5 w-5 ${isZero ? "text-muted-foreground" : "animate-flame text-flame"}`}
          aria-hidden="true"
        />
      </div>
      <div className="relative mt-4 flex items-end gap-3">
        {!isZero && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-6 left-2 h-24 w-24 rounded-full bg-flame/20 blur-2xl"
          />
        )}
        <span className="num-display text-6xl leading-none font-bold">{streak}</span>
        <span className="label-mono pb-1.5">day{streak === 1 ? "" : "s"}</span>
      </div>
      <p className="mt-4 text-sm text-muted-foreground">
        {isZero ? "Start your first day today." : `Best: ${best} days`}
      </p>
    </GlassCard>
  );
}

/* ---------- Challenge progress ---------- */

export function ChallengeProgress({ day, total }: { day: number; total: number }) {
  const { ref, visible } = useInView<HTMLDivElement>(0.3);
  const pct = Math.round((day / total) * 100);

  return (
    <GlassCard className="p-6">
      <div ref={ref} className="flex items-center gap-6">
        <ProgressRing value={visible ? pct : 0} size={104} stroke={8}>
          <span className="num-display block text-xl font-bold">{pct}%</span>
        </ProgressRing>
        <div className="min-w-0 flex-1">
          <p className="label-mono">Challenge progress</p>
          <p className="num-display mt-1 text-2xl font-bold">
            Day {day} <span className="text-muted-foreground">/ {total}</span>
          </p>
          <ProgressBar value={pct} animate={visible} className="mt-4" />
          <p className="mt-2 text-[13px] text-muted-foreground">
            {total - day} days left in your challenge
          </p>
        </div>
      </div>
    </GlassCard>
  );
}

/* ---------- Today's task ---------- */

export function TaskCard({ locked = false }: { locked?: boolean }) {
  return (
    <GlassCard tilt className="p-6 lg:p-7">
      <div className="flex items-center justify-between gap-3">
        <span className="label-mono">Today · Day {todayTask.day}</span>
        <span className="flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-[11px] font-semibold text-primary">
          <Target className="h-3 w-3" aria-hidden="true" />
          In progress
        </span>
      </div>

      <h2 className="mt-4 text-2xl leading-tight font-bold">{todayTask.title}</h2>
      <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{todayTask.summary}</p>

      <dl className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-2xl border border-border bg-surface p-3.5">
          <dt className="label-mono flex items-center gap-1.5 text-[10px]">
            <TrendingUp className="h-3 w-3" aria-hidden="true" /> Difficulty
          </dt>
          <dd className="mt-1.5 text-sm font-semibold">{todayTask.difficulty}</dd>
        </div>
        <div className="rounded-2xl border border-border bg-surface p-3.5">
          <dt className="label-mono flex items-center gap-1.5 text-[10px]">
            <Clock className="h-3 w-3" aria-hidden="true" /> Est. time
          </dt>
          <dd className="mt-1.5 text-sm font-semibold">{todayTask.time}</dd>
        </div>
      </dl>

      <ul className="mt-4 flex flex-wrap gap-2">
        {todayTask.skills.map((skill) => (
          <li
            key={skill}
            className="rounded-full border border-border bg-secondary/60 px-3 py-1.5 text-[12px] text-muted-foreground"
          >
            {skill}
          </li>
        ))}
      </ul>

      {locked ? (
        <p className="mt-6 flex items-center gap-2 rounded-2xl border border-border bg-secondary/50 px-4 py-3 text-sm text-muted-foreground">
          <Lock className="h-4 w-4 shrink-0" aria-hidden="true" />
          Finish onboarding to unlock Day 1.
        </p>
      ) : (
        <Link
          to="/day/$day"
          params={{ day: String(todayTask.day) }}
          className="group mt-6 flex min-h-13 w-full items-center justify-center gap-2 rounded-2xl fill-gradient-primary text-sm font-bold tracking-wide text-primary-foreground shadow-[0_16px_40px_-18px_var(--color-primary)] transition-transform active:scale-[0.99]"
        >
          VIEW TODAY'S TASK
          <ArrowRight
            className="h-4 w-4 transition-transform group-hover:translate-x-1"
            aria-hidden="true"
          />
        </Link>
      )}
    </GlassCard>
  );
}

/* ---------- Submission status ---------- */

export function SubmissionStatus({
  github,
  linkedin,
}: {
  github: boolean;
  linkedin: boolean;
}) {
  const count = Number(github) + Number(linkedin);
  const rows = [
    { icon: Github, label: "GitHub", done: github, doneText: "Commit submitted", pendingText: "Commit not submitted" },
    { icon: Linkedin, label: "LinkedIn", done: linkedin, doneText: "Post submitted", pendingText: "Post not submitted" },
  ];

  return (
    <GlassCard className="p-6">
      <div className="flex items-center justify-between gap-3">
        <p className="label-mono">Today's proof</p>
        <span
          className={`num-display rounded-full px-2.5 py-1 text-[12px] font-bold ${
            count === 2
              ? "bg-primary/15 text-primary"
              : "bg-warning/15 text-warning"
          }`}
        >
          {count} / 2
        </span>
      </div>

      <ul className="mt-4 space-y-2.5">
        {rows.map((row) => (
          <li
            key={row.label}
            className={`flex items-center gap-3 rounded-2xl border p-4 ${
              row.done
                ? "border-primary/25 bg-primary/8"
                : "border-warning/30 bg-warning/8"
            }`}
          >
            <row.icon className="h-5 w-5 shrink-0 text-foreground" aria-hidden="true" />
            <div className="min-w-0">
              <p className="text-sm font-semibold">{row.label}</p>
              <p
                className={`truncate text-[13px] ${
                  row.done ? "text-primary" : "text-warning"
                }`}
              >
                {row.done ? row.doneText : row.pendingText}
              </p>
            </div>
            {row.done ? (
              <CircleCheck className="ml-auto h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
            ) : (
              <Circle className="ml-auto h-5 w-5 shrink-0 text-warning" aria-hidden="true" />
            )}
          </li>
        ))}
      </ul>

      {count < 2 && (
        <p className="mt-4 text-[13px] text-muted-foreground">
          Day 12 counts once both proofs are in. One more to go.
        </p>
      )}
    </GlassCard>
  );
}

/* ---------- Achievements strip ---------- */

export function AchievementStrip() {
  return (
    <section aria-label="Achievements">
      <div className="flex items-center justify-between px-1">
        <p className="label-mono">Achievements</p>
        <p className="label-mono text-[10px]">
          {achievements.filter((a) => a.unlocked).length} / {achievements.length} unlocked
        </p>
      </div>
      <ul className="hide-scrollbar mt-3 flex gap-3 overflow-x-auto pb-1">
        {achievements.map((a) => (
          <li
            key={a.id}
            className={`card-surface w-[172px] shrink-0 p-4 ${a.unlocked ? "" : "opacity-60"}`}
          >
            <span
              className={`grid h-10 w-10 place-items-center rounded-xl text-lg ${
                a.unlocked
                  ? "border border-primary/30 bg-primary/12"
                  : "border border-border bg-secondary grayscale"
              }`}
            >
              {a.emoji}
            </span>
            <p className="mt-3 text-sm leading-snug font-semibold">{a.title}</p>
            <p className="label-mono mt-1 text-[9px] leading-relaxed normal-case">
              {a.requirement}
            </p>
            {!a.unlocked && typeof a.progress === "number" && (
              <div className="mt-3 h-1 overflow-hidden rounded-full bg-foreground/10">
                <div className="h-full rounded-full bg-primary/60" style={{ width: `${a.progress}%` }} />
              </div>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ---------- Leaderboard preview ---------- */

export function LeaderboardPreview() {
  return (
    <GlassCard className="p-6">
      <p className="label-mono">Your standing</p>
      <div className="mt-4 flex items-end gap-4">
        <span className="num-display text-5xl leading-none font-bold">#{student.rank}</span>
        <span className="flex items-center gap-1.5 pb-1 text-sm font-semibold">
          <Flame className="h-4 w-4 text-flame" aria-hidden="true" />
          {student.streak} days
        </span>
      </div>
      <p className="mt-4 rounded-2xl border border-primary/25 bg-primary/8 px-4 py-3 text-sm">
        <span className="font-semibold text-primary">{student.daysToNextRank} days</span> to reach #
        {student.nextRank}
      </p>

      <ul className="mt-5 space-y-2 border-t border-border pt-4">
        {leaderboard.slice(0, 3).map((row) => (
          <li key={row.rank} className="flex items-center gap-3 text-sm">
            <span className="num-display w-6 text-muted-foreground">
              {String(row.rank).padStart(2, "0")}
            </span>
            <span className="min-w-0 flex-1 truncate">{row.name}</span>
            <span className="flex items-center gap-1 font-semibold">
              <Flame className="h-3.5 w-3.5 text-flame" aria-hidden="true" />
              {row.streak}
            </span>
          </li>
        ))}
      </ul>

      <a
        href="/#leaderboard"
        className="group mt-5 flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl border border-border text-sm font-semibold transition-colors hover:border-primary/50 hover:text-primary"
      >
        VIEW LEADERBOARD
        <ArrowRight
          className="h-4 w-4 transition-transform group-hover:translate-x-1"
          aria-hidden="true"
        />
      </a>
    </GlassCard>
  );
}

/* ---------- State-specific notices ---------- */

export function StateNotice({ state }: { state: DashboardStateId }) {
  if (state === "missed") {
    return (
      <GlassCard className="p-5" spotlight={false}>
        <div className="flex items-start gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-secondary">
            <Zap className="h-5 w-5 text-warning" aria-hidden="true" />
          </span>
          <div>
            <p className="font-semibold">Your streak ended at 11 days.</p>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              Today is a fresh start. Eleven days of work is still on your record — commit once
              today and the counter begins climbing again.
            </p>
          </div>
        </div>
      </GlassCard>
    );
  }

  if (state === "first-day") {
    return (
      <GlassCard className="p-5" spotlight={false}>
        <div className="flex items-start gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-primary/12">
            <Trophy className="h-5 w-5 text-primary" aria-hidden="true" />
          </span>
          <div>
            <p className="font-semibold">Day 1 of 60 starts now.</p>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              Finish today's task, push one commit, post once. That is the whole loop.
            </p>
          </div>
        </div>
      </GlassCard>
    );
  }

  if (state === "empty") {
    return (
      <GlassCard className="p-6" spotlight={false}>
        <p className="label-mono">Set up your profile</p>
        <p className="mt-3 font-semibold">Three steps before Day 1 unlocks.</p>
        <ol className="mt-4 space-y-2.5">
          {[
            { label: "Connect your GitHub username", done: true },
            { label: "Add your LinkedIn profile", done: false },
            { label: "Pick your challenge track", done: false },
          ].map((step) => (
            <li
              key={step.label}
              className="flex min-h-12 items-center gap-3 rounded-2xl border border-border bg-surface px-4 text-sm"
            >
              {step.done ? (
                <CircleCheck className="h-4.5 w-4.5 shrink-0 text-primary" aria-hidden="true" />
              ) : (
                <Circle className="h-4.5 w-4.5 shrink-0 text-muted-foreground" aria-hidden="true" />
              )}
              <span className={step.done ? "text-muted-foreground line-through" : ""}>
                {step.label}
              </span>
            </li>
          ))}
        </ol>
      </GlassCard>
    );
  }

  return null;
}
