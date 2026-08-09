import { useState } from "react";
import { Quote, Star, Heart } from "lucide-react";
import { testimonials } from "@/data/abtalks";
import { SectionHeading } from "./reveal";
import { useReducedMotion } from "@/hooks/use-motion";

function TestimonialCard({ t, index }: { t: typeof testimonials[0]; index: number }) {
  const [likes, setLikes] = useState(t.likes || 25);
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    if (!liked) {
      setLikes((prev) => prev + 1);
      setLiked(true);
    } else {
      setLikes((prev) => prev - 1);
      setLiked(false);
    }
  };

  // Render 5 Star Icons formatted
  const fullStars = Math.floor(t.rating || 5);
  const hasHalfStar = (t.rating || 5) % 1 !== 0;

  return (
    <li
      className="card-surface lift group/card relative w-[310px] shrink-0 p-6 sm:w-[380px] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_15px_35px_rgba(0,0,0,0.4)] border border-border/80 hover:border-primary/50"
    >
      {/* Top Header: Quote & Star Rating Badge */}
      <div className="flex items-center justify-between">
        <Quote className="h-5 w-5 text-primary/70 group-hover/card:text-primary transition-colors" aria-hidden="true" />
        
        {/* Star Rating Badge */}
        <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 px-2.5 py-1 text-xs font-bold text-amber-400 shadow-sm">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, idx) => (
              <Star
                key={idx}
                className={`h-3 w-3 ${
                  idx < fullStars
                    ? "fill-amber-400 text-amber-400"
                    : idx === fullStars && hasHalfStar
                    ? "fill-amber-400/50 text-amber-400"
                    : "text-muted/40"
                }`}
              />
            ))}
          </div>
          <span>{t.rating?.toFixed(1) || "5.0"}</span>
        </div>
      </div>

      <p className="mt-4 text-[15px] leading-relaxed text-foreground/90">"{t.quote}"</p>

      {/* User Info & Interactive Like Button */}
      <div className="mt-5 flex items-center justify-between border-t border-border/60 pt-4">
        <div className="flex items-center gap-3">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-primary/30 to-primary/10 border border-primary/30 text-[11px] font-extrabold text-foreground shadow-sm">
            {t.name.slice(0, 2).toUpperCase()}
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-foreground">{t.name}</p>
            <p className="truncate text-[11px] font-semibold text-muted-foreground">{t.role}</p>
          </div>
        </div>

        {/* Micro-interaction Like Button */}
        <button
          type="button"
          onClick={handleLike}
          className={`group/like flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold transition-all duration-200 active:scale-90 ${
            liked
              ? "border-rose-500/40 bg-rose-500/15 text-rose-400 shadow-sm"
              : "border-border/80 bg-background/50 text-muted-foreground hover:border-rose-500/30 hover:text-rose-400"
          }`}
          title="Mark review as helpful"
        >
          <Heart
            className={`h-3.5 w-3.5 transition-transform duration-300 group-hover/like:scale-125 ${
              liked ? "fill-rose-500 text-rose-500 animate-bounce" : ""
            }`}
          />
          <span>{likes}</span>
        </button>
      </div>
    </li>
  );
}

export function TestimonialsSection() {
  const reduced = useReducedMotion();
  const row = [...testimonials, ...testimonials];

  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Student Reviews & Feedback"
          title="What 60 days actually changed."
          subtitle="Real notes from students mid-challenge. Verified proof, real outcomes, zero fluff."
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
            <TestimonialCard key={`${t.name}-${i}`} t={t} index={i} />
          ))}
        </ul>
      </div>
    </section>
  );
}
