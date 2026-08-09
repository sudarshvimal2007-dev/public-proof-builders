import type { HTMLAttributes } from "react";
import { GlassCard } from "./glass-card";

export function Skeleton({ className = "", ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`skeleton-shimmer rounded-xl bg-secondary/80 ${className}`}
      {...props}
    />
  );
}

export function SkeletonCard({ className = "" }: { className?: string }) {
  return (
    <GlassCard className={`p-6 space-y-4 ${className}`}>
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-6 w-16 rounded-full" />
      </div>
      <Skeleton className="h-7 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <div className="grid grid-cols-2 gap-3 pt-2">
        <Skeleton className="h-14 rounded-2xl" />
        <Skeleton className="h-14 rounded-2xl" />
      </div>
      <Skeleton className="h-12 w-full rounded-2xl" />
    </GlassCard>
  );
}

export function SkeletonHero() {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-28 pb-16 space-y-8 sm:px-6">
      <div className="mx-auto max-w-3xl text-center space-y-4">
        <Skeleton className="mx-auto h-8 w-48 rounded-full" />
        <Skeleton className="mx-auto h-12 w-4/5 sm:h-16" />
        <Skeleton className="mx-auto h-6 w-3/5" />
        <div className="flex justify-center gap-3 pt-4">
          <Skeleton className="h-12 w-40 rounded-2xl" />
          <Skeleton className="h-12 w-40 rounded-2xl" />
        </div>
      </div>
      <div className="grid gap-6 sm:grid-cols-3 pt-8">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    </div>
  );
}

export function SkeletonDashboard() {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-28 pb-16 space-y-6 sm:px-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-9 w-64" />
        </div>
        <Skeleton className="h-10 w-36 rounded-full" />
      </div>
      <div className="flex gap-2">
        <Skeleton className="h-9 w-24 rounded-full" />
        <Skeleton className="h-9 w-24 rounded-full" />
        <Skeleton className="h-9 w-24 rounded-full" />
      </div>
      <div className="grid gap-6 lg:grid-cols-[1.35fr_1fr]">
        <div className="space-y-4">
          <SkeletonCard />
          <SkeletonCard />
        </div>
        <div className="space-y-4">
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </div>
    </div>
  );
}

export function SkeletonPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-28 pb-16 space-y-6 sm:px-6">
      <div className="space-y-3">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-10 w-2/3 max-w-lg" />
        <Skeleton className="h-5 w-1/2 max-w-md" />
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 pt-6">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    </div>
  );
}
