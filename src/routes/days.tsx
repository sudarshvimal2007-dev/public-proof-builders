import { useState, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/navbar";
import { AmbientBackdrop } from "@/components/ambient-backdrop";
import { Footer } from "@/components/footer";
import {
  WhySection,
  ProgressSection,
  AchievementsSection,
  CTASection,
} from "@/components/landing-sections";
import { GlassCard } from "@/components/glass-card";
import { SkeletonPage } from "@/components/skeleton";
import { Flame, CheckCircle2, ShieldCheck, ArrowRight, Zap, Target } from "lucide-react";

const title = "The 60-Day Days — ABTalks";
const description =
  "Everything you need to know about the ABTalks 60-Day Public Build Days. Daily coding, GitHub commits, LinkedIn proofs, and proof of execution.";

export const Route = createFileRoute("/days")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
    ],
  }),
  component: DaysPage,
});

const challengeRules = [
  {
    icon: Flame,
    title: "1 Task per Day",
    desc: "Every midnight a new problem or feature spec unlocks. You have 24 hours to design and implement your solution.",
  },
  {
    icon: CheckCircle2,
    title: "Dual-Proof Verification",
    desc: "Submit your GitHub commit URL and LinkedIn build breakdown. Double proof proves both execution & communication.",
  },
  {
    icon: ShieldCheck,
    title: "Strict 1-Freeze Grace",
    desc: "Maintain your streak unbroken. You get exactly 1 streak freeze per month for emergencies.",
  },
  {
    icon: Target,
    title: "Recruiter Portfolio",
    desc: "Every day adds to your verified public proof log. Hiring partners look at proof, not resume buzzwords.",
  },
];

function DaysPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 400);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="relative min-h-screen">
        <AmbientBackdrop />
        <Navbar />
        <SkeletonPage />
        <Footer />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      <AmbientBackdrop />
      <Navbar />

      <main className="mx-auto max-w-6xl px-4 pt-24 pb-16 sm:px-6 lg:pt-32">
        {/* Header Hero */}
        <section className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary">
            <Zap className="h-3.5 w-3.5 fill-primary/30" />
            <span>The 60-Day Public Proof Standard</span>
          </div>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Turn 60 Ordinary Days Into <br className="hidden sm:inline" />
            <span className="text-gradient">Unshakeable Proof.</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
            No endless lectures. No passive tutorials. A daily discipline of building real software,
            committing code, and publishing proof.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/dashboard"
              className="grad-primary inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-primary-foreground shadow-lg transition-transform hover:scale-105"
            >
              Start 60-Day Challenge
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/how-it-works"
              className="glass-panel inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-foreground transition-all hover:border-primary/40"
            >
              How It Works
            </Link>
          </div>
        </section>

        {/* Rules Grid */}
        <section className="mt-20">
          <h2 className="text-center text-2xl font-bold sm:text-3xl">Challenge Guidelines</h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            The non-negotiables of building in public.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {challengeRules.map((rule) => {
              const Icon = rule.icon;
              return (
                <GlassCard key={rule.title} className="p-6">
                  <div className="grid h-10 w-10 place-items-center rounded-xl border border-primary/30 bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="mt-4 text-lg font-bold">{rule.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{rule.desc}</p>
                </GlassCard>
              );
            })}
          </div>
        </section>

        {/* Why & Progress Sections */}
        <WhySection />
        <ProgressSection />
        <AchievementsSection />

        <CTASection />
      </main>

      <Footer />
    </div>
  );
}
