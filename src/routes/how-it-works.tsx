import { useState, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/navbar";
import { AmbientBackdrop } from "@/components/ambient-backdrop";
import { Footer } from "@/components/footer";
import { JourneySection, CTASection } from "@/components/landing-sections";
import { GlassCard } from "@/components/glass-card";
import { SkeletonPage } from "@/components/skeleton";
import { Terminal, ShieldCheck, ArrowRight, Sparkles, CheckCircle2, Share2, Code2 } from "lucide-react";

const title = "How It Works — ABTalks";
const description = "Learn the 4-step workflow of the ABTalks 60-Day Challenge: Receive daily task, build code, commit to GitHub, post on LinkedIn, and build verified proof.";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
    ],
  }),
  component: HowItWorksPage,
});

const workflowSteps = [
  {
    number: "01",
    icon: Terminal,
    title: "Daily Task Unlock",
    desc: "Every day at 00:00 IST, a targeted engineering challenge opens up — ranging from frontend micro-apps to backend API design and optimization.",
  },
  {
    number: "02",
    icon: Code2,
    title: "Build & Commit",
    desc: "Write clean, modular code. Push your commits to a dedicated public GitHub repository with atomic commit messages.",
  },
  {
    number: "03",
    icon: Share2,
    title: "Public LinkedIn Proof",
    desc: "Share a concise technical summary on LinkedIn tagging #ABTalks #BuildInPublic. Explain what you built, trade-offs, and learnings.",
  },
  {
    number: "04",
    icon: ShieldCheck,
    title: "Verified Streak Counter",
    desc: "Paste both proof URLs on your ABTalks dashboard. Your daily streak increments and updates your standing on the global leaderboard.",
  },
];

export function HowItWorksPage() {
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
        {/* Hero Header */}
        <section className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Simple 4-Step Daily Rhythm</span>
          </div>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            From Code Snippets to <br className="hidden sm:inline" />
            <span className="text-gradient">Verified Career Proof.</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
            Understand how daily coding, GitHub commits, and public proof posts combine into an unbeatable builder portfolio.
          </p>
        </section>

        {/* 4 Steps Detailed Breakdown */}
        <section className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {workflowSteps.map((step) => {
            const Icon = step.icon;
            return (
              <GlassCard key={step.number} className="relative p-6">
                <span className="absolute top-4 right-4 text-2xl font-black text-primary/20">
                  {step.number}
                </span>
                <div className="grid h-11 w-11 place-items-center rounded-xl border border-primary/30 bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mt-5 text-lg font-bold">{step.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{step.desc}</p>
              </GlassCard>
            );
          })}
        </section>

        {/* Interactive Timeline Section */}
        <JourneySection />

        {/* FAQ Section */}
        <section className="mt-16 rounded-3xl border border-border/80 bg-card/60 p-8 backdrop-blur-xl">
          <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <div>
              <h4 className="flex items-center gap-2 text-sm font-bold text-foreground">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                What if I miss a day?
              </h4>
              <p className="mt-2 text-xs text-muted-foreground">
                You get 1 streak freeze per month. If you miss a second day without a freeze, your active streak resets to 0, but your total proof log remains intact.
              </p>
            </div>
            <div>
              <h4 className="flex items-center gap-2 text-sm font-bold text-foreground">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                Can I use any programming language?
              </h4>
              <p className="mt-2 text-xs text-muted-foreground">
                Yes! Tasks specify functional requirements. You are free to implement using React, Next.js, Node.js, Python, Go, or any stack of your choice.
              </p>
            </div>
            <div>
              <h4 className="flex items-center gap-2 text-sm font-bold text-foreground">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                How do recruiters see my proof?
              </h4>
              <p className="mt-2 text-xs text-muted-foreground">
                Recruiters access a dedicated dashboard with verified GitHub commits, code diffs, and your daily LinkedIn logs sorted by consistency.
              </p>
            </div>
            <div>
              <h4 className="flex items-center gap-2 text-sm font-bold text-foreground">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                Is ABTalks free to join?
              </h4>
              <p className="mt-2 text-xs text-muted-foreground">
                Yes, 100% free for college students across India. All you need is a GitHub account and a LinkedIn profile.
              </p>
            </div>
          </div>
        </section>

        <CTASection />
      </main>

      <Footer />
    </div>
  );
}
