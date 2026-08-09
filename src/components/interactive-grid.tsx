import { useEffect, useState } from "react";

export function InteractiveGrid() {
  const [mousePos, setMousePos] = useState({ x: "50%", y: "50%" });

  useEffect(() => {
    // Only add mouse listener on devices with mouse pointer
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let rafId: number;
    const handleMouseMove = (e: MouseEvent) => {
      rafId = requestAnimationFrame(() => {
        setMousePos({
          x: `${e.clientX}px`,
          y: `${e.clientY}px`,
        });
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="interactive-grid-container" aria-hidden="true">
      <div
        className="interactive-grid-spotlight"
        style={
          {
            "--grid-mouse-x": mousePos.x,
            "--grid-mouse-y": mousePos.y,
          } as React.CSSProperties
        }
      />
    </div>
  );
}
