import type { ReactNode } from "react";
import { useRef, type MouseEvent } from "react";
import { useIsDesktop, useReducedMotion } from "@/hooks/use-motion";

type GlassCardProps = {
  children: ReactNode;
  className?: string;
  /** spotlight follows cursor on desktop */
  spotlight?: boolean;
  /** subtle 3d tilt on desktop */
  tilt?: boolean;
  as?: "div" | "article" | "section" | "li";
};

export function GlassCard({
  children,
  className = "",
  spotlight = true,
  tilt = false,
  as: Tag = "div",
}: GlassCardProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isDesktop = useIsDesktop();
  const reduced = useReducedMotion();
  const interactive = isDesktop && !reduced;

  const onMove = (event: MouseEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el || !interactive) return;
    const rect = el.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    el.style.setProperty("--mx", `${x}px`);
    el.style.setProperty("--my", `${y}px`);
    if (tilt) {
      const rx = ((y / rect.height) * 2 - 1) * -4;
      const ry = ((x / rect.width) * 2 - 1) * 4;
      el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
    }
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "";
  };

  return (
    <Tag
      // @ts-expect-error polymorphic ref
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`card-surface lift group overflow-hidden ${className}`}
    >
      {spotlight && interactive && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(340px circle at var(--mx, 50%) var(--my, 0%), color-mix(in oklab, var(--color-primary) 14%, transparent), transparent 70%)",
          }}
        />
      )}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-60"
      />
      <div className="relative">{children}</div>
    </Tag>
  );
}
