import { useRef, useEffect, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';
import Reveal from './ui/Reveal';

const STATS = [
  { target: 5, suffix: '+', label: 'Years active' },
  { target: 20, suffix: '+', label: 'Releases' },
  { target: 50, suffix: 'K+', label: 'Monthly listeners' },
];

function Counter({ target, suffix }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();
  const [count, setCount] = useState(reduce ? target : 0);

  useEffect(() => {
    if (!isInView || reduce) return;
    let frame;
    const start = performance.now();
    const duration = 1400;
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      setCount(Math.floor((1 - Math.pow(1 - progress, 3)) * target));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [isInView, reduce, target]);

  return (
    <span ref={ref} className="stat__num" aria-hidden="true">
      {count}{suffix}
    </span>
  );
}

export default function About() {
  return (
    <section id="about" className="section about" aria-labelledby="about-title">
      <div className="container about__grid">
        <Reveal className="about__lead">
          <p className="eyebrow">Our story</p>
          <h2 id="about-title" className="about__quote">
            We are not just making music. We are documenting a generation.
          </h2>
        </Reveal>

        <Reveal className="about__body prose" delay={0.1}>
          <p>
            Born in the heart of KwaZulu-Natal, Abafana Belokishi Entertainment was built
            by artists, for artists. We rose from the streets, the community halls, and
            the late-night recording sessions where dreams are currency and hustle is the
            only language spoken.
          </p>
          <p>
            Our name means &ldquo;The Boys of the Township&rdquo; — a testament to where we come from
            and the culture that shaped us. We are a music label, podcast network, and
            creative collective that refuses to let South African stories go untold.
          </p>
          <p>
            From Amapiano to Hip-Hop, from long-form conversation to short-form content,
            Abafana Belokishi is the platform where the township speaks — and the world
            listens.
          </p>

          <dl className="stats">
            {STATS.map(({ target, suffix, label }) => (
              <div key={label} className="stat">
                <dt className="stat__label">{label}</dt>
                <dd>
                  <Counter target={target} suffix={suffix} />
                  <span className="sr-only">{target}{suffix}</span>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
