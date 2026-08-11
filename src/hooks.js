import { useEffect, useState } from "react";

export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener?.("change", update);
    return () => media.removeEventListener?.("change", update);
  }, []);

  return reduced;
}

export function useLenis(enabled = true) {
  useEffect(() => {
    if (!enabled) return;

    let lenis;
    let rafId;

    import("lenis").then(({ default: Lenis }) => {
      lenis = new Lenis({
        smoothWheel: true,
        syncTouch: false,
        lerp: 0.09
      });

      const raf = (time) => {
        lenis?.raf(time);
        rafId = requestAnimationFrame(raf);
      };

      rafId = requestAnimationFrame(raf);
    });

    return () => {
      cancelAnimationFrame(rafId);
      lenis?.destroy();
    };
  }, [enabled]);
}