import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/navbar";
import { AmbientBackdrop } from "@/components/ambient-backdrop";
import { Hero } from "@/components/hero";
import {
  AchievementsSection,
  CTASection,
  JourneySection,
  LeaderboardSection,
  ProgressSection,
  RecruiterSection,
  StatsSection,
  WhySection,
} from "@/components/landing-sections";
import { TestimonialsSection } from "@/components/testimonials";
import { Footer } from "@/components/footer";

const title = "ABTalks — Build Your Edge in 60 Days";
const description =
  "A 60-day public build challenge for Indian college students. Build daily, commit to GitHub, share on LinkedIn, and turn consistency into proof.";

export const Route = createFileRoute("/")({
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
  component: Landing,
});

function Landing() {
  return (
    <div className="relative min-h-screen">
      <AmbientBackdrop />
      <Navbar />
      <main>
        <Hero />
        <WhySection />
        <JourneySection />
        <StatsSection />
        <ProgressSection />
        <AchievementsSection />
        <LeaderboardSection />
        <RecruiterSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
