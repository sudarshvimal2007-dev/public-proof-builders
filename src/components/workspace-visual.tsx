import { Code2, GitBranch, Linkedin, Trophy, TrendingUp } from "lucide-react";
import { useIsDesktop, useReducedMotion } from "@/hooks/use-motion";

const stages = [
  { id: "build", label: "Building", icon: Code2 },
  { id: "commit", label: "Commit pushed", icon: GitBranch },
  { id: "share", label: "Posted publicly", icon: Linkedin },
  { id: "achieve", label: "Achievement unlocked", icon: Trophy },
  { id: "progress", label: "Progress recorded", icon: TrendingUp },
];

const codeLines = [
  { indent: 0, w: "62%", accent: true },
  { indent: 1, w: "78%" },
  { indent: 1, w: "54%" },
  { indent: 2, w: "68%", accent: true },
  { indent: 2, w: "44%" },
  { indent: 1, w: "72%" },
  { indent: 0, w: "36%" },
];

/**
 * Animated developer-workspace visualisation.
 * `stage` (0..1) is driven by page scroll on desktop; mobile renders a
 * lightweight static mockup with a slow ambient glow only.
 */
export function WorkspaceVisual({ progress = 0 }: { progress?: number }) {
  const isDesktop = useIsDesktop();
  const reduced = useReducedMotion();
  const animated = isDesktop && !reduced;
  const index = Math.min(stages.length - 1, Math.floor(progress * stages.length));
  const stage = stages[animated ? index : 0]!;
  const StageIcon = stage.icon;
  const dayProgress = animated ? 20 + progress * 60 : 20;

  return (
    <div
      aria-hidden="true"
      className="relative w-full select-none"
      style={
        animated
          ? {
              transform: `perspective(1400px) rotateX(${10 - progress * 8}deg) translateY(${
                progress * -22
              }px) scale(${1 + progress * 0.02})`,
              transformStyle: "preserve-3d",
              transition: "transform 0.25s linear",
            }
          : undefined
      }
    >
      <div className={`relative ${animated ? "animate-float-soft" : ""}`}>
        {/* screen */}
        <div className="card-surface glow-ring overflow-hidden rounded-2xl p-2 sm:rounded-3xl sm:p-3">
          <div className="overflow-hidden rounded-xl bg-surface-2/80 sm:rounded-2xl">
            {/* window chrome */}
            <div className="flex items-center gap-2 border-b border-border px-3 py-2">
              <span className="h-2 w-2 rounded-full bg-destructive/70" />
              <span className="h-2 w-2 rounded-full bg-warning/70" />
              <span className="h-2 w-2 rounded-full bg-primary/70" />
              <span className="label-mono ml-2 truncate">abtalks / day-12</span>
              <span className="ml-auto flex items-center gap-1.5 rounded-full bg-primary/12 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-primary">
                <StageIcon className="h-3 w-3" />
                <span className="hidden sm:inline">{stage.label}</span>
              </span>
            </div>

            <div className="grid gap-3 p-3 sm:grid-cols-[1.35fr_1fr] sm:gap-4 sm:p-4">
              {/* editor */}
              <div className="space-y-2">
                {codeLines.map((line, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="label-mono w-3 text-[9px] opacity-50">{i + 1}</span>
                    <span
                      className={`h-2 rounded-full ${
                        line.accent ? "bg-primary/45" : "bg-foreground/12"
                      }`}
                      style={{
                        width: line.w,
                        marginLeft: `${line.indent * 12}px`,
                        opacity: animated ? (index >= 1 ? 0.55 : 1) : 1,
                        transition: "opacity 0.5s ease",
                      }}
                    />
                  </div>
                ))}
                <div className="flex items-center gap-1.5 pt-1">
                  <span className="label-mono text-[9px] opacity-50">›</span>
                  <span
                    className="h-3 w-1.5 rounded-sm bg-primary"
                    style={{ animation: "caret-scan 1.1s steps(2) infinite" }}
                  />
                </div>
              </div>

              {/* side panel */}
              <div className="space-y-2.5">
                <div className="rounded-xl border border-border bg-surface p-3">
                  <p className="label-mono text-[9px]">Day 12 / 60</p>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-foreground/10">
                    <div
                      className="h-full rounded-full grad-primary"
                      style={{ width: `${dayProgress}%`, transition: "width 0.4s ease-out" }}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-xl border border-border bg-surface p-3">
                  <GitBranch
                    className={`h-4 w-4 ${index >= 1 ? "text-primary" : "text-muted-foreground"}`}
                  />
                  <span className="text-[11px] text-muted-foreground">commit 8f2c41a</span>
                  {index >= 1 && (
                    <span className="ml-auto text-[11px] font-semibold text-primary">✓</span>
                  )}
                </div>
                <div className="flex items-center gap-2 rounded-xl border border-border bg-surface p-3">
                  <Linkedin
                    className={`h-4 w-4 ${index >= 2 ? "text-primary" : "text-muted-foreground"}`}
                  />
                  <span className="text-[11px] text-muted-foreground">public post</span>
                  {index >= 2 && (
                    <span className="ml-auto text-[11px] font-semibold text-primary">✓</span>
                  )}
                </div>
                <div
                  className={`flex items-center gap-2 rounded-xl border p-3 transition-colors duration-500 ${
                    index >= 3
                      ? "border-primary/35 bg-primary/10"
                      : "border-border bg-surface"
                  }`}
                >
                  <Trophy
                    className={`h-4 w-4 ${index >= 3 ? "text-primary" : "text-muted-foreground"}`}
                  />
                  <span className="text-[11px] text-muted-foreground">Consistency Starter</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* laptop base */}
        <div className="mx-auto h-2.5 w-[86%] rounded-b-2xl border border-t-0 border-border bg-surface-2/90" />
        <div className="mx-auto mt-1 h-6 w-[55%] rounded-full bg-primary/12 blur-xl" />
      </div>
    </div>
  );
}
