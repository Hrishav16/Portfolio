import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Loader from "./components/Loader";
import Cursor from "./components/Cursor";
import Navbar from "./components/Navbar";
import WebGLHero from "./components/WebGLHero";
import SectionHeading from "./components/SectionHeading";
import Project from "./components/Project";
import { profile, skills, projects } from "./data";
import { useLenis, useReducedMotion } from "./hooks";
import MagneticButton from "./components/MagneticButton";
import TextReveal from "./components/TextReveal";

gsap.registerPlugin(ScrollTrigger);

import GlobalCanvas from "./components/GlobalCanvas";

function App() {
  const reducedMotion = useReducedMotion();
  const [ready, setReady] = useState(reducedMotion);

  useLenis(!reducedMotion);

  useEffect(() => {
    if (!reducedMotion) {
      const timer = setTimeout(() => setReady(true), 1500);
      return () => clearTimeout(timer);
    }
  }, [reducedMotion]);

  useEffect(() => {
    if (!ready || reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray(".reveal").forEach((el) => {
        gsap.fromTo(el,
          { y: 55, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 1.05, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 86%", once: true }
          }
        );
      });

      gsap.to(".hero__orb", {
        yPercent: 18,
        rotate: 8,
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
    });

    return () => ctx.revert();
  }, [ready, reducedMotion]);

  return (
    <>
      <GlobalCanvas />
      <Loader reducedMotion={reducedMotion} />
      <Cursor reducedMotion={reducedMotion} />
      <Navbar />

      <main id="main-content">
        <section id="home" className="hero">
          {/* WebGLHeroScene renders globally behind this */}
          <div className="hero__grid" aria-hidden="true" />
          <div className="hero__orb" aria-hidden="true" >
            <img src="images/profile.jpg" alt="Profile" />
          </div>
          <div className="hero__content">
            <p className="eyebrow hero__eyebrow">COMPUTING × ARTIFICIAL INTELLIGENCE</p>
            <h1>
              <span>HRISHAV</span>
              <span>KUMAR</span>
              <span>MAHATO<span className="accent">.</span></span>
            </h1>
            <div className="hero__bottom">
              <p>Building intelligent systems, interactive experiences and digital products.</p>
              <button onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}>
                SCROLL TO EXPLORE <span>↓</span>
              </button>
            </div>
          </div>
          <div className="hero__index">001 / 005</div>
        </section>

        <section id="about" className="section about">
          <SectionHeading number="01" eyebrow="A LITTLE CONTEXT" title="ABOUT ME" />
          <div className="about__grid">
            <div className="portrait-wrap reveal">
              <div className="portrait-placeholder">
                <img src="images/profile.jpg" alt="Profile" />
              </div>
            </div>
            <div className="about__copy reveal">
              <p className="lead">
                I’m {profile.name}, a Computing with AI student at {profile.institution}.
                I’m interested in the space where intelligent technology meets thoughtful digital design.
              </p>
              <p>
                I enjoy learning by building — from Java applications and object-oriented systems
                to modern web interfaces, AI experiments and interactive experiences.
              </p>
              <p>
                This portfolio is a living workspace for the things I learn, build and experiment with.
              </p>
              <div className="about__facts">
                <div><span>EDUCATION</span><strong>{profile.education}</strong></div>
                <div><span>INTERESTS</span><strong>AI · WEB · CREATIVE TECH</strong></div>
              </div>
            </div>
          </div>
        </section>

        <section id="work" className="section work">
          <SectionHeading number="02" eyebrow="SELECTED WORK" title="PROJECTS" />
          <div className="projects">
            {projects.map((project, index) => (
              <Project key={project.number} project={project} index={index} reducedMotion={reducedMotion} />
            ))}
          </div>
        </section>

        <section className="section skills">
          <SectionHeading number="03" eyebrow="THE TOOLBOX" title="SKILLS" />
          <div className="skills__intro reveal">
            <p className="display">LEARN.<br /><span>BUILD.</span><br />REPEAT.</p>
            <p>
              A growing toolkit across programming, AI, web development and creative technology.
              The list represents areas I’m learning and working with, not claims of mastery.
            </p>
          </div>
          <div className="skill-cloud reveal">
            {skills.map((skill) => (
              <button key={skill.name} className="skill" data-cursor="HOVER" title={skill.note}>
                <span>{skill.name}</span><small>{skill.group}</small>
              </button>
            ))}
          </div>
        </section>

        <section id="experiments" className="section experiment">
          <SectionHeading number="04" eyebrow="DIGITAL PLAYGROUND" title="COMPUTING × AI" />
          <div className="experiment__grid">
            <div className="experiment__copy reveal">
              <span className="mono">EXPERIMENT / 01</span>
              <h3>FROM INPUT<br />TO <em>INTELLIGENCE.</em></h3>
              <p>
                Artificial intelligence turns data into patterns, predictions and useful outputs.
                This visual is a lightweight representation of that journey — not a literal model.
              </p>
              <div className="flow">
                <span>INPUT</span><i>→</i><span>PROCESS</span><i>→</i><span>MODEL</span><i>→</i><span>OUTPUT</span>
              </div>
            </div>
            {/* The WebGL Neural Network renders globally behind this section */}
            <div className="experiment__visual" style={{ minHeight: "400px" }}></div>
          </div>
        </section>

        <section className="section journey">
          <SectionHeading number="05" eyebrow="STILL IN PROGRESS" title="MY JOURNEY" />
          <div className="timeline">
            {[
              ["01", "LEARNING", "Building foundations in computing and AI.", "NOW"],
              ["02", "BUILDING", "Turning concepts into small applications and projects.", "NEXT"],
              ["03", "EXPERIMENTING", "Exploring interaction, WebGL and creative technology.", "NEXT"],
              ["04", "IMPROVING", "Iterating, testing and becoming a better developer.", "ALWAYS"]
            ].map(([n, title, copy, status]) => (
              <div className="timeline__item reveal" key={n}>
                <span>{n}</span><div><small>{status}</small><h3>{title}</h3><p>{copy}</p></div>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="contact">
          <div className="contact__noise" aria-hidden="true" />
          <span className="eyebrow">06 / GET IN TOUCH</span>
          <h2>
            <TextReveal text="LET'S BUILD" elementType="span" />
            <br />
            <em><TextReveal text="SOMETHING." elementType="span" /></em>
          </h2>
          <p>Have an idea, project or experiment in mind?</p>
          <MagneticButton as="a" className="contact__mail" href={`mailto:${profile.email}`}>{profile.email} ↗</MagneticButton>
          <div className="contact__social">
            <MagneticButton as="a" href={profile.github} target="_blank" rel="noreferrer">GITHUB ↗</MagneticButton>
            <MagneticButton as="a" href={profile.linkedin} target="_blank" rel="noreferrer">LINKEDIN ↗</MagneticButton>
            <MagneticButton as="a" href={profile.resume}>RESUME ↗</MagneticButton>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div><strong>HRISHAV KUMAR MAHATO</strong><span>COMPUTING × AI</span></div>
        <span>© {new Date().getFullYear()} / ALL RIGHTS RESERVED</span>
      </footer>
    </>
  );
}

export default App;