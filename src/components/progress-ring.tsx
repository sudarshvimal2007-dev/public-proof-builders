import type { ReactNode } from "react";

export function ProgressRing({
  value,
  size = 160,
  stroke = 10,
  children,
}: {
  value: number;
  size?: number;
  stroke?: number;
  children?: ReactNode;
}) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (Math.min(100, Math.max(0, value)) / 100) * c;

  return (
    <div className="relative grid place-items-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90" aria-hidden="true">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          strokeWidth={stroke}
          stroke="color-mix(in oklab, var(--color-foreground) 10%, transparent)"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          strokeWidth={stroke}
          strokeLinecap="round"
          stroke="var(--color-primary)"
          strokeDasharray={c}
          strokeDashoffset={offset}
          style={{
            transition: "stroke-dashoffset 1.6s cubic-bezier(0.16,1,0.3,1)",
            filter: "drop-shadow(0 0 8px color-mix(in oklab, var(--color-primary) 55%, transparent))",
          }}
        />
      </svg>
      <div className="absolute text-center">{children}</div>
    </div>
  );
}

export function ProgressBar({
  value,
  animate = true,
  className = "",
}: {
  value: number;
  animate?: boolean;
  className?: string;
}) {
  return (
    <div className={`h-2.5 overflow-hidden rounded-full bg-foreground/10 ${className}`}>
      <div
        className="h-full rounded-full bg-[var(--gradient-primary)] shadow-[0_0_16px_-3px_var(--color-primary)]"
        style={{
          width: `${animate ? value : 0}%`,
          transition: "width 1.5s cubic-bezier(0.16,1,0.3,1)",
        }}
      />
    </div>
  );
}
