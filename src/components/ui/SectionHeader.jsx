import Reveal from './Reveal';

export default function SectionHeader({ eyebrow, title, intro, id, action }) {
  return (
    <Reveal className="section-header">
      <div className="section-header__text">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2 className="section-title" id={id}>{title}</h2>
        {intro && <p className="section-intro">{intro}</p>}
      </div>
      {action && <div className="section-header__action">{action}</div>}
    </Reveal>
  );
}
