import { useRef } from "react";
import { gsap } from "gsap";
import MagneticButton from "./MagneticButton";
import TextReveal from "./TextReveal";

export default function Project({ project, index, reducedMotion }) {
  const media = useRef(null);

  const onMove = (e) => {
    if (reducedMotion || !media.current) return;
    const r = media.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    
    // Add cinematic chromatic distortion/filter in CSS, just handle 3D transform here
    gsap.to(media.current, { 
      rotateY: x * 15, 
      rotateX: -y * 15, 
      z: 50,
      scale: 1.05,
      filter: `drop-shadow(${x * -20}px ${y * -20}px 25px rgba(131,234,255,0.15))`,
      duration: 0.5, 
      overwrite: true 
    });
  };

  const onLeave = () => {
    if (!media.current) return;
    gsap.to(media.current, { 
      rotateY: 0, 
      rotateX: 0, 
      z: 0,
      scale: 1,
      filter: `drop-shadow(0px 0px 0px rgba(131,234,255,0))`,
      duration: 0.7, 
      ease: "power3.out" 
    });
  };

  return (
    <article className="project reveal" onMouseMove={onMove} onMouseLeave={onLeave}>
      <div className="project__meta">
        <span>{project.number}</span>
        <span>{project.label}</span>
      </div>

      <div className="project__body">
        <div ref={media} className="project__media" data-cursor="VIEW" style={{ transformStyle: 'preserve-3d', perspective: 1000 }}>
          <div className="project__placeholder">
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{project.title}</strong>
          </div>
          <img
            src={project.image}
            alt=""
            loading="lazy"
            onError={(e) => { e.currentTarget.style.display = "none"; }}
          />
        </div>

        <div className="project__copy">
          <TextReveal text={project.title} elementType="h3" />
          <p>{project.description}</p>
          <div className="tag-list">
            {project.tech.map((tag) => <span key={tag}>{tag}</span>)}
          </div>
          <div className="project__links">
            <MagneticButton as="a" href={project.github} aria-label={`${project.title} GitHub`}>GITHUB ↗</MagneticButton>
            <MagneticButton as="a" href={project.live} aria-label={`${project.title} live demo`}>LIVE ↗</MagneticButton>
          </div>
        </div>
      </div>
    </article>
  );
}