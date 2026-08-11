export default function SectionHeading({ number, eyebrow, title }) {
  return (
    <div className="section-heading reveal">
      <span className="section-number">{number}</span>
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
    </div>
  );
}