import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const inView = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.1 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
};

const STATS = [
  { target: 5, suffix: '+', label: 'Years Active' },
  { target: 20, suffix: '+', label: 'Releases' },
  { target: 50, suffix: 'K+', label: 'Monthly Listeners' },
];

function Counter({ target, suffix }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let frame;
    const start = performance.now();
    const duration = 1400;
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(ease * target));
      if (progress < 1) frame = requestAnimationFrame(tick);
      else setCount(target);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [isInView, target]);

  return (
    <span ref={ref} className="about__stat-num">
      {count}{suffix}
    </span>
  );
}

export default function About() {
  return (
    <section id="about" className="about section dot-grid">
      <div className="container">
        <motion.p className="section-label" {...inView}>
          — Our Story
        </motion.p>

        <div className="about__grid">
          <motion.div className="about__quote-block" {...inView}>
            <blockquote className="about__quote">
              We are not just making music. We are documenting a generation.
            </blockquote>
            <p className="about__quote-attr">— Abafana Belokishi Entertainment</p>
            <div className="about__circle-deco">
              <img
                src="/images/64058f4f-59c0-4ddb-8649-b082d04a4149.jpg"
                alt="Abafana Belokishi Entertainment"
                className="about__circle-logo"
              />
            </div>
          </motion.div>

          <motion.div
            className="about__body"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <p>
              Born in the heart of KwaZulu-Natal, Abafana Belokishi Entertainment was built
              by artists, for artists. We rose from the streets, the community halls, and
              the late-night recording sessions where dreams are currency and hustle is the
              only language spoken.
            </p>
            <p>
              Our name means "The Boys of the Township" — a testament to where we come from
              and the culture that shaped us. We are a music label, podcast network, and
              creative collective that refuses to let South African stories go untold.
            </p>
            <p>
              From Amapiano to Hip-Hop, from long-form conversation to short-form content,
              Abafana Belokishi is the platform where the township speaks — and the world
              listens.
            </p>

            <div className="about__stat-row">
              {STATS.map(({ target, suffix, label }) => (
                <div key={label}>
                  <Counter target={target} suffix={suffix} />
                  <span className="about__stat-label">{label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
