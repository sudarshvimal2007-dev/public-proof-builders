import { useState, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/navbar";
import { AmbientBackdrop } from "@/components/ambient-backdrop";
import { Footer } from "@/components/footer";
import { RecruiterSection, CTASection } from "@/components/landing-sections";
import { TestimonialsSection } from "@/components/testimonials";
import { GlassCard } from "@/components/glass-card";
import { SkeletonPage } from "@/components/skeleton";
import { Users, ShieldCheck, HeartHandshake, Briefcase, Sparkles, ArrowRight } from "lucide-react";

const title = "About — ABTalks Public Proof Builders";
const description =
  "The story and mission behind ABTalks. Empowering college students in India to build publicly, gain real proof of execution, and connect directly with hiring managers.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
    ],
  }),
  component: AboutPage,
});

const values = [
  {
    icon: ShieldCheck,
    title: "Proof Over Certificates",
    desc: "We believe a public commit log and live demo links carry 100x more weight than a generic completion PDF.",
  },
  {
    icon: Users,
    title: "Peer Accountability",
    desc: "Building alone is hard. Building alongside thousands of ambitious students across India makes consistency infectious.",
  },
  {
    icon: Briefcase,
    title: "Direct Recruiter Pipeline",
    desc: "We bridge the gap between engineering talent and hiring managers by letting recruiters evaluate verified proof.",
  },
  {
    icon: HeartHandshake,
    title: "Open Community",
    desc: "Democratizing engineering access. No high tuition, no gatekeeping — just open building and shared growth.",
  },
];

function AboutPage() {
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
            <Sparkles className="h-3.5 w-3.5" />
            <span>The ABTalks Mission</span>
          </div>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Empowering the Next Generation of <br className="hidden sm:inline" />
            <span className="text-gradient">Indian Engineers.</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
            ABTalks was born out of a simple observation: college students study theory for years,
            yet struggle to demonstrate execution. We built the 60-Day Challenge to change that
            forever.
          </p>
        </section>

        {/* Core Values Grid */}
        <section className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => {
            const Icon = v.icon;
            return (
              <GlassCard key={v.title} className="p-6">
                <div className="grid h-11 w-11 place-items-center rounded-xl border border-primary/30 bg-primary/10">
                  <Icon className="h-5.5 w-5.5 text-primary" />
                </div>
                <h3 className="mt-5 text-lg font-bold">{v.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{v.desc}</p>
              </GlassCard>
            );
          })}
        </section>

        {/* Recruiter Partnership Section */}
        <RecruiterSection />

        {/* Student Testimonials */}
        <TestimonialsSection />

        <CTASection />
      </main>

      <Footer />
    </div>
  );
}
