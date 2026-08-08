import { useEffect, useState } from "react";
import { ChevronDown, ShieldCheck } from "lucide-react";
import { AnimatedCounter } from "./animated-counter";
import { WorkspaceVisual } from "./workspace-visual";
import { heroPhrases, platformStats } from "@/data/abtalks";
import { useIsDesktop, useReducedMotion, useScrollProgress } from "@/hooks/use-motion";

function RotatingPhrase() {
  const [index, setIndex] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % heroPhrases.length), 2600);
    return () => clearInterval(id);
  }, [reduced]);

  return (
    <span className="relative inline-grid h-[1.2em] overflow-hidden align-bottom">
      <span className="invisible col-start-1 row-start-1 whitespace-nowrap">
        {heroPhrases.reduce((a, b) => (b.length > a.length ? b : a))}
      </span>
      {heroPhrases.map((phrase, i) => (
        <span
          key={phrase}
          aria-hidden={i !== index}
          className="col-start-1 row-start-1 whitespace-nowrap text-primary"
          style={{
            animation:
              i === index
                ? "slide-up-blur-in 0.7s cubic-bezier(0.16,1,0.3,1) both"
                : "slide-up-blur-out 0.6s cubic-bezier(0.16,1,0.3,1) both",
            visibility: i === index || i === (index - 1 + heroPhrases.length) % heroPhrases.length ? "visible" : "hidden",
          }}
        >
          {phrase}
        </span>
      ))}
    </span>
  );
}

export function Hero() {
  const { ref, progress } = useScrollProgress<HTMLDivElement>();
  const isDesktop = useIsDesktop();

  return (
    <section
      ref={ref}
      className="relative mx-auto max-w-6xl px-4 pt-28 pb-16 sm:px-6 lg:pt-40 lg:pb-24"
    >
      <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-12">
        <div className="relative z-10">
          <div className="glass-panel inline-flex items-center gap-2 rounded-full px-3 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_10px_var(--color-primary)]" />
            <span className="label-mono text-[10px]">60-day public build challenge</span>
          </div>

          <h1 className="mt-6 text-[clamp(2.6rem,11vw,4rem)] leading-[0.96] font-bold lg:text-[4.4rem]">
            <span className="text-gradient block">BUILD YOUR</span>
            <span className="block">EDGE.</span>
          </h1>

          <p className="font-display mt-5 text-2xl font-semibold sm:text-3xl">
            Build <RotatingPhrase />
          </p>

          <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-muted-foreground sm:text-base">
            Don't just learn to code. Build every day, prove your progress, and get recognized for
            the work you put in.
          </p>

          <dl className="mt-9 grid grid-cols-3 gap-3 border-t border-border pt-6 sm:gap-6">
            {platformStats.map((stat) => (
              <div key={stat.label} className="min-w-0">
                <dd>
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    className="block text-xl leading-none font-bold sm:text-2xl"
                  />
                </dd>
                <dt className="mt-1.5 truncate text-[11px] text-muted-foreground sm:text-xs">
                  {stat.label}
                </dt>
              </div>
            ))}
          </dl>

          <p className="mt-6 flex items-center gap-2 text-[13px] text-muted-foreground">
            <ShieldCheck className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
            Every day is verified by a GitHub commit and a public post.
          </p>
        </div>

        <div className="relative lg:pl-4">
          <WorkspaceVisual progress={isDesktop ? progress : 0} />
        </div>
      </div>

      <div className="mt-14 flex flex-col items-center gap-2 lg:mt-20">
        <span className="label-mono text-[9px]">Scroll to see how it works</span>
        <span className="relative h-9 w-5 overflow-hidden rounded-full border border-border">
          <ChevronDown
            className="absolute inset-x-0 mx-auto h-3.5 w-3.5 text-primary"
            style={{ animation: "scroll-hint 1.9s ease-in-out infinite" }}
            aria-hidden="true"
          />
        </span>
      </div>
    </section>
  );
}
