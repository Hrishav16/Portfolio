import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useReducedMotion } from "../hooks";

export default function TextReveal({ text, elementType: Element = "div", className }) {
  const containerRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !containerRef.current) return;

    const chars = containerRef.current.querySelectorAll('.reveal-char');
    
    gsap.fromTo(chars, 
      { opacity: 0, y: 50, filter: "blur(10px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        stagger: 0.05,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          once: true
        }
      }
    );
  }, [reducedMotion]);

  // Split text into characters for animation
  const splitText = text.split('').map((char, index) => (
    <span 
      key={index} 
      className="reveal-char" 
      style={{ display: "inline-block", whiteSpace: char === " " ? "pre" : "normal" }}
    >
      {char}
    </span>
  ));

  return (
    <Element ref={containerRef} className={className}>
      {reducedMotion ? text : splitText}
    </Element>
  );
}
