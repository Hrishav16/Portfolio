import { useMemo } from "react";

const nodes = [
  [12, 48], [28, 25], [28, 70], [48, 17], [48, 47], [48, 78],
  [70, 30], [70, 65], [88, 48]
];

const links = [
  [0,1],[0,2],[1,3],[1,4],[2,4],[2,5],[3,6],[4,6],[4,7],[5,7],[6,8],[7,8]
];

export default function NeuralScene({ reducedMotion }) {
  const lines = useMemo(
    () => links.map(([a,b], i) => (
      <line
        key={i}
        x1={`${nodes[a][0]}%`} y1={`${nodes[a][1]}%`}
        x2={`${nodes[b][0]}%`} y2={`${nodes[b][1]}%`}
        className="neural-line"
      />
    )),
    []
  );

  return (
    <div className={`neural ${reducedMotion ? "is-reduced" : ""}`} aria-hidden="true">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none">
        {lines}
      </svg>
      {nodes.map(([x,y], i) => (
        <span key={i} className={`neural-node n${i}`} style={{ left: `${x}%`, top: `${y}%` }} />
      ))}
      <div className="neural-label input">INPUT</div>
      <div className="neural-label process">PROCESS</div>
      <div className="neural-label model">MODEL</div>
      <div className="neural-label output">OUTPUT</div>
    </div>
  );
}