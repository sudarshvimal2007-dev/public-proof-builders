import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/navbar";
import { AmbientBackdrop } from "@/components/ambient-backdrop";
import { Footer } from "@/components/footer";
import { LeaderboardSection, StatsSection, CTASection } from "@/components/landing-sections";
import { GlassCard } from "@/components/glass-card";
import { Trophy, Flame, Award, ArrowUpRight, Search, Filter } from "lucide-react";
import { leaderboard } from "@/data/abtalks";

const title = "Public Leaderboard — ABTalks 60-Day Challenge";
const description = "Live rankings of Indian college builders participating in the ABTalks 60-Day Challenge. Filter by streak, college, and domain.";

export const Route = createFileRoute("/leaderboard")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
    ],
  }),
  component: LeaderboardPage,
});

function LeaderboardPage() {
  const top3 = leaderboard.slice(0, 3);

  return (
    <div className="relative min-h-screen">
      <AmbientBackdrop />
      <Navbar />

      <main className="mx-auto max-w-6xl px-4 pt-24 pb-16 sm:px-6 lg:pt-32">
        {/* Header Hero */}
        <section className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary">
            <Trophy className="h-3.5 w-3.5" />
            <span>Real-Time Proof Rankings</span>
          </div>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Public Hall of <span className="text-gradient">Consistency.</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
            Rankings powered strictly by verified GitHub commits and public build proof. No secret algorithms, no manual boosts.
          </p>
        </section>

        {/* Top 3 Podium Spotlight */}
        <section className="mt-12 grid gap-4 sm:grid-cols-3">
          {top3.map((builder, i) => (
            <GlassCard key={builder.name} className="relative p-6 text-center">
              <div className="absolute top-4 right-4 grid h-8 w-8 place-items-center rounded-full bg-primary/20 text-xs font-extrabold text-primary">
                #{i + 1}
              </div>
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-xl font-extrabold text-primary-foreground shadow-lg">
                {builder.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <h3 className="mt-4 text-lg font-bold">{builder.name}</h3>
              <p className="text-xs text-muted-foreground">{builder.college}</p>
              <div className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-extrabold text-primary">
                <Flame className="h-3.5 w-3.5 fill-primary/30" />
                {builder.streak} Day Streak
              </div>
            </GlassCard>
          ))}
        </section>

        {/* Live Platform Stats */}
        <StatsSection />

        {/* Main Leaderboard Table */}
        <LeaderboardSection />

        <CTASection />
      </main>

      <Footer />
    </div>
  );
}
