import type { HTMLAttributes } from "react";
import { GlassCard } from "./glass-card";

export function Skeleton({ className = "", ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`skeleton-shimmer rounded-xl bg-muted/60 ${className}`}
      {...props}
    />
  );
}

export function SkeletonCard({ className = "" }: { className?: string }) {
  return (
    <GlassCard className={`p-6 space-y-4 ${className}`}>
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-24 rounded-md" />
        <Skeleton className="h-5 w-14 rounded-full" />
      </div>
      <Skeleton className="h-6 w-3/4 rounded-lg" />
      <Skeleton className="h-4 w-5/6 rounded-md" />
      <Skeleton className="h-10 w-full rounded-xl" />
    </GlassCard>
  );
}

export function SkeletonDashboard() {
  return (
    <div className="mx-auto max-w-5xl px-4 pt-28 pb-12 space-y-6 sm:px-6">
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-48 rounded-lg" />
        <Skeleton className="h-8 w-28 rounded-full" />
      </div>
      <div className="grid gap-6 sm:grid-cols-2 pt-2">
        <SkeletonCard />
        <SkeletonCard />
      </div>
    </div>
  );
}

export function SkeletonPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 pt-28 pb-12 space-y-6 sm:px-6">
      <div className="space-y-2">
        <Skeleton className="h-8 w-64 rounded-lg" />
        <Skeleton className="h-4 w-40 rounded-md" />
      </div>
      <div className="grid gap-6 sm:grid-cols-2 pt-2">
        <SkeletonCard />
        <SkeletonCard />
      </div>
    </div>
  );
}
