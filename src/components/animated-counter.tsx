import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "@/hooks/use-motion";

function format(n: number) {
  return n.toLocaleString("en-US");
}

export function AnimatedCounter({
  value,
  suffix = "",
  duration = 1800,
  className = "",
}: {
  value: number;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const { ref, visible } = useInView<HTMLSpanElement>(0.4);
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(0);
  const frame = useRef(0);

  useEffect(() => {
    if (!visible) return;
    if (reduced) {
      setDisplay(value);
      return;
    }
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 4);
      setDisplay(Math.round(value * eased));
      if (t < 1) frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame.current);
  }, [visible, value, duration, reduced]);

  return (
    <span ref={ref} className={`num-display tabular-nums ${className}`}>
      {format(display)}
      {suffix}
    </span>
  );
}

/** A counter that keeps drifting upward to feel live. */
export function LiveCounter({
  value,
  drift,
  className = "",
}: {
  value: number;
  drift: number;
  className?: string;
}) {
  const [current, setCurrent] = useState(value);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(
      () => setCurrent((c) => c + Math.floor(Math.random() * drift) + 1),
      4200 + Math.random() * 2600,
    );
    return () => clearInterval(id);
  }, [drift, reduced]);

  return (
    <span className={`num-display tabular-nums ${className}`}>
      <AnimatedCounter value={current} duration={1200} />
    </span>
  );
}
