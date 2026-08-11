import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useReducedMotion } from "../hooks";

export default function MagneticButton({ children, className, onClick, ...props }) {
  const buttonRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !window.matchMedia("(pointer:fine)").matches) return;

    const button = buttonRef.current;
    if (!button) return;

    const handleMouseMove = (e) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      // Move a maximum of 10-15px
      gsap.to(button, {
        x: x * 0.2,
        y: y * 0.2,
        duration: 0.6,
        ease: "power3.out"
      });
    };

    const handleMouseLeave = () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: "elastic.out(1, 0.3)"
      });
    };

    button.addEventListener("mousemove", handleMouseMove);
    button.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      button.removeEventListener("mousemove", handleMouseMove);
      button.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [reducedMotion]);

  return (
    <button ref={buttonRef} className={className} onClick={onClick} {...props}>
      {children}
    </button>
  );
}
