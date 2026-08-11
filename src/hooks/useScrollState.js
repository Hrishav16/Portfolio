import { useEffect, useRef } from "react";

export function useScrollState() {
  const scroll = useRef({ y: 0, velocity: 0 });

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      const currentY = window.scrollY;
      const velocity = currentY - lastY;
      lastY = currentY;

      scroll.current.y = currentY;
      scroll.current.velocity = velocity;

      if (!ticking) {
        requestAnimationFrame(() => {
          // You could optionally apply some dampening to velocity here
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return scroll;
}
