import { useEffect, useRef } from "react";

export default function Cursor({ reducedMotion }) {
  const dot = useRef(null);

  useEffect(() => {
    if (reducedMotion || !window.matchMedia("(pointer:fine)").matches) return;

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    const move = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const loop = () => {
      if (dot.current) dot.current.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0)`;
      requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", move, { passive: true });
    const id = requestAnimationFrame(loop);

    const activate = (e) => {
      if (e.target.closest("a,button,[data-cursor]")) document.body.classList.add("cursor-hover");
    };
    const deactivate = () => document.body.classList.remove("cursor-hover");

    document.addEventListener("pointerover", activate);
    document.addEventListener("pointerout", deactivate);

    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", activate);
      document.removeEventListener("pointerout", deactivate);
    };
  }, [reducedMotion]);

  if (reducedMotion) return null;

  return (
    <span ref={dot} className="cursor-dot" aria-hidden="true" />
  );
}