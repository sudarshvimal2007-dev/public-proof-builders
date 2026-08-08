/** Layered ambient background: base tone, drifting green glow, subtle grid. */
export function AmbientBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-background" />
      <div className="grid-backdrop absolute inset-0 opacity-70 [mask-image:radial-gradient(ellipse_at_50%_0%,black,transparent_75%)]" />
      <div className="animate-ambient absolute -top-40 left-1/2 h-[520px] w-[860px] -translate-x-1/2 rounded-full bg-primary/12 blur-[130px] sm:bg-primary/14" />
      <div
        className="animate-ambient absolute top-[48%] -left-40 hidden h-[420px] w-[620px] rounded-full bg-primary/8 blur-[140px] lg:block"
        style={{ animationDelay: "-8s" }}
      />
      <div
        className="animate-ambient absolute right-[-10%] bottom-[-10%] hidden h-[460px] w-[640px] rounded-full bg-primary-soft/10 blur-[150px] lg:block"
        style={{ animationDelay: "-14s" }}
      />
    </div>
  );
}
