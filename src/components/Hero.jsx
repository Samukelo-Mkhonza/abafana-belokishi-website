import { useState, useCallback } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Waveform from './Waveform';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function Hero() {
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 700], ['0%', '25%']);
  const [mouse, setMouse] = useState({ x: 50, y: 50 });

  const handleMouseMove = useCallback((e) => {
    const r = e.currentTarget.getBoundingClientRect();
    setMouse({
      x: ((e.clientX - r.left) / r.width) * 100,
      y: ((e.clientY - r.top) / r.height) * 100,
    });
  }, []);

  return (
    <section id="hero" className="hero" onMouseMove={handleMouseMove}>
      <motion.div
        className="hero__banner-bg"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(/images/fb9a3bbb-3559-4926-8317-7e59d5913691.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.07,
          pointerEvents: 'none',
          y: bgY,
        }}
        aria-hidden="true"
      />

      <div
        className="hero__mouse-glow"
        style={{ '--mx': `${mouse.x}%`, '--my': `${mouse.y}%` }}
        aria-hidden="true"
      />

      <div className="hero__bg-circle" aria-hidden="true" />
      <span className="hero__ab-mono" aria-hidden="true">AB</span>

      <div className="hero__waveform-top" aria-hidden="true">
        <Waveform className="waveform-svg" />
      </div>

      <div className="container">
        <div className="hero__content">
          <motion.p className="hero__eyebrow" {...fadeUp(0.1)}>
            Abafana Belokishi Entertainment
          </motion.p>

          <motion.h1 className="hero__title" {...fadeUp(0.25)}>
            Born from<br />
            <em>the</em> Township.<br />
            Built for<br />
            <em>the</em> World.
          </motion.h1>

          <motion.p className="hero__tagline" {...fadeUp(0.4)}>
            A KwaZulu-Natal entertainment powerhouse amplifying South African voices
            through music, podcasting, and culture.
          </motion.p>

          <motion.div className="hero__ctas" {...fadeUp(0.55)}>
            <a
              href="#artists"
              className="btn btn--primary"
              onClick={e => {
                e.preventDefault();
                document.querySelector('#artists')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Meet the Artists
            </a>
            <a
              href="#podcast"
              className="btn btn--outline"
              onClick={e => {
                e.preventDefault();
                document.querySelector('#podcast')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Listen to the Podcast
            </a>
          </motion.div>
        </div>
      </div>

      <div className="hero__waveform" aria-hidden="true">
        <Waveform className="waveform-svg" />
      </div>

      <div className="scroll-indicator" aria-hidden="true">
        <div className="scroll-indicator__line" />
        <span className="scroll-indicator__label">Scroll</span>
      </div>
    </section>
  );
}
