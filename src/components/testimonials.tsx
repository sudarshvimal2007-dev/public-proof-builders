import { useState } from "react";
import { Star, Heart, CheckCircle2 } from "lucide-react";
import { testimonials } from "@/data/abtalks";
import { useReducedMotion } from "@/hooks/use-motion";

function TestimonialCard({ t, index }: { t: typeof testimonials[0]; index: number }) {
  const [likes, setLikes] = useState(t.likes || 30);
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

  // Avatar initials e.g. AM, DJ, PS, RK
  const initials = t.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <li className="card-surface lift group/card relative w-[320px] shrink-0 p-5 sm:w-[380px] rounded-3xl border border-white/10 bg-surface/80 backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] hover:border-primary/50 hover:shadow-[0_20px_45px_rgba(0,0,0,0.5)]">
      {/* Card Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-3">
          {/* Avatar Circle */}
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-primary/40 to-primary/10 border border-white/20 text-xs font-black text-foreground shadow-inner">
            {initials}
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-foreground tracking-wide">
              {t.name} {t.college && <span className="text-muted-foreground">• {t.college}</span>}
            </p>
            {/* Star Icons below name */}
            <div className="mt-0.5 flex items-center gap-0.5">
              {[...Array(5)].map((_, idx) => (
                <Star
                  key={idx}
                  className={`h-3 w-3 ${
                    idx < fullStars ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Top Right Proof Badge */}
        <span className="inline-flex items-center gap-1 shrink-0 rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-[11px] font-semibold text-foreground shadow-sm">
          {t.proofBadge || "LinkedIn ✓"}
        </span>
      </div>

      {/* Quote Content */}
      <p className="mt-4 text-[14px] leading-relaxed font-medium text-foreground/90">
        "{t.quote}"
      </p>

      {/* Bottom Proof Status & Heart Micro-interaction */}
      <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-3.5 text-xs">
        <div className="flex items-center gap-1.5 font-semibold text-emerald-400 text-[11px]">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Proof: {t.proofType || "GitHub + LinkedIn"}</span>
        </div>

        {/* Micro-interaction Heart Like Button */}
        <button
          type="button"
          onClick={handleLike}
          className={`group/like flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-semibold transition-all duration-200 active:scale-90 ${
            liked
              ? "border-rose-500/40 bg-rose-500/20 text-rose-400 shadow-sm"
              : "border-white/10 bg-background/40 text-muted-foreground hover:border-rose-500/30 hover:text-rose-400"
          }`}
          title="Mark proof as helpful"
        >
          <Heart
            className={`h-3 w-3 transition-transform duration-300 group-hover/like:scale-125 ${
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
  const row = [...testimonials, ...testimonials, ...testimonials];

  return (
    <section className="py-20 lg:py-28 overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Wall of Proof Header with Live Indicator */}
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-emerald-400 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>WALL OF PROOF</span>
            <span className="rounded bg-emerald-400/20 px-1.5 py-0.5 text-[10px] font-bold text-emerald-300">
              LIVE
            </span>
          </div>

          <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            Real Proof. Real Commits. <br className="hidden sm:inline" />
            <span className="text-gradient">Zero Excuses.</span>
          </h2>

          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Hover any proof card to inspect. Automatically streaming real student updates across India.
          </p>
        </div>
      </div>

      {/* Automatic Moving Marquee Motion */}
      <div
        className="group relative mt-10 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]"
        aria-label="Wall of Proof Live Stream"
      >
        <ul
          className="flex w-max gap-5 px-4 hide-scrollbar sm:px-6"
          style={
            reduced
              ? { overflowX: "auto" }
              : {
                  animation: "marquee-x 35s linear infinite",
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

      {/* Screenshot Bottom Tech Chips */}
      <div className="mt-10 flex flex-wrap items-center justify-center gap-3 px-4 text-xs font-bold text-foreground">
        <span className="rounded-full border border-white/15 bg-background/60 backdrop-blur-md px-4 py-2 shadow-sm">
          100% mobile-first
        </span>
        <span className="rounded-full border border-white/15 bg-background/60 backdrop-blur-md px-4 py-2 shadow-sm">
          Neomorphism • Glass • Liquid
        </span>
        <span className="rounded-full border border-white/15 bg-background/60 backdrop-blur-md px-4 py-2 shadow-sm">
          Framer Motion 60fps
        </span>
        <span className="rounded-full border border-white/15 bg-background/60 backdrop-blur-md px-4 py-2 shadow-sm">
          Parallax + 3D tilt
        </span>
      </div>
    </section>
  );
}
