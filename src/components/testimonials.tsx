import { Quote } from "lucide-react";
import { testimonials } from "@/data/abtalks";
import { SectionHeading } from "./reveal";
import { useReducedMotion } from "@/hooks/use-motion";

export function TestimonialsSection() {
  const reduced = useReducedMotion();
  const row = [...testimonials, ...testimonials];

  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Students"
          title="What 60 days actually changed."
          subtitle="Real notes from students mid-challenge. No overnight-success stories."
        />
      </div>

      <div
        className="group relative mt-10 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]"
        aria-label="Student testimonials"
      >
        <ul
          className="flex w-max gap-4 px-4 hide-scrollbar sm:px-6"
          style={
            reduced
              ? { overflowX: "auto" }
              : {
                  animation: "marquee-x 46s linear infinite",
                  animationPlayState: "running",
                }
          }
          onMouseEnter={(e) => {
            e.currentTarget.style.animationPlayState = "paused";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.animationPlayState = "running";
          }}
        >
          {row.map((t, i) => (
            <li
              key={`${t.name}-${i}`}
              className="card-surface lift w-[300px] shrink-0 p-6 sm:w-[380px]"
            >
              <Quote className="h-5 w-5 text-primary/70" aria-hidden="true" />
              <p className="mt-4 text-[15px] leading-relaxed text-foreground/90">"{t.quote}"</p>
              <div className="mt-5 flex items-center gap-3 border-t border-border pt-4">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-secondary text-[11px] font-bold">
                  {t.name.slice(0, 2).toUpperCase()}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{t.name}</p>
                  <p className="truncate text-[12px] text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
