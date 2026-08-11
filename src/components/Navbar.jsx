import { useEffect, useState } from "react";

const items = [
  ["HOME", "home"],
  ["ABOUT", "about"],
  ["WORK", "work"],
  ["EXPERIMENTS", "experiments"],
  ["CONTACT", "contact"]
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 70);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <header className={`nav ${visible ? "nav--visible" : ""}`}>
        <button className="brand" onClick={() => go("home")} aria-label="Go to home">
          HKM<span>.</span>
        </button>
        <nav className="nav__links" aria-label="Primary navigation">
          {items.map(([label,id]) => (
            <button key={id} onClick={() => go(id)}>{label}</button>
          ))}
        </nav>
        <button
          className={`menu-button ${open ? "is-open" : ""}`}
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          <span /><span />
          <b>{open ? "CLOSE" : "MENU"}</b>
        </button>
      </header>

      <div id="mobile-menu" className={`mobile-menu ${open ? "is-open" : ""}`}>
        {items.map(([label,id], i) => (
          <button key={id} onClick={() => go(id)}>
            <span>0{i+1}</span>{label}
          </button>
        ))}
      </div>
    </>
  );
}