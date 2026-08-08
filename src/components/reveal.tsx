import type { ElementType, ReactNode } from "react";
import { useInView } from "@/hooks/use-motion";

export function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: ElementType;
}) {
  const { ref, visible } = useInView<HTMLDivElement>(0.15);
  return (
    <Tag
      ref={ref}
      data-visible={visible}
      style={{ transitionDelay: `${delay}ms` }}
      className={`reveal ${className}`}
    >
      {children}
    </Tag>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
}: {
  eyebrow: string;
  title: ReactNode;
  subtitle?: string;
  align?: "left" | "center";
}) {
  return (
    <Reveal className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <div
        className={`flex items-center gap-2 ${align === "center" ? "justify-center" : ""}`}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_12px_var(--color-primary)]" />
        <span className="label-mono">{eyebrow}</span>
      </div>
      <h2 className="mt-4 text-3xl leading-[1.08] font-bold sm:text-4xl lg:text-5xl">{title}</h2>
      {subtitle && (
        <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground sm:text-base">
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
