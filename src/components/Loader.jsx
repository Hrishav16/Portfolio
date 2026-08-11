import { useEffect, useState } from "react";

export default function Loader({ reducedMotion }) {
  const [progress, setProgress] = useState(reducedMotion ? 100 : 0);
  const [done, setDone] = useState(reducedMotion);

  useEffect(() => {
    if (reducedMotion) return;
    const timer = setInterval(() => {
      setProgress((p) => {
        const next = Math.min(p + Math.floor(Math.random() * 12) + 4, 100);
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => setDone(true), 350);
        }
        return next;
      });
    }, 90);

    return () => clearInterval(timer);
  }, [reducedMotion]);

  if (done) return null;

  return (
    <div className="loader" aria-label="Loading portfolio" role="status">
      <div className="loader__top">
        <span>HKM / 001</span>
        <span>{progress}%</span>
      </div>
      <div className="loader__name">HRISHAV KUMAR MAHATO</div>
      <div className="loader__bottom">
        <span>COMPUTING × AI</span>
        <span>INITIALIZING EXPERIENCE</span>
      </div>
      <div className="loader__bar">
        <span style={{ transform: `scaleX(${progress / 100})` }} />
      </div>
    </div>
  );
}