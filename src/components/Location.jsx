import { motion } from 'framer-motion';

const inView = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function Location() {
  return (
    <section id="location" className="location section dot-grid">
      <div className="container">
        <div className="section-header">
          <motion.h2 className="section-title" {...inView(0.1)}>Our Location</motion.h2>
          <div className="section-rule" aria-hidden="true" />
          <motion.p className="section-label" {...inView(0)}>— Find Us</motion.p>
        </div>

        <motion.p className="location__desc" {...inView(0.2)}>
          Rooted in Harding, KwaZulu-Natal — a small town with a big sound. This is where
          Abafana Belokishi was born, where our artists create, and where our story continues
          to unfold. Come find us in the heart of the South Coast.
        </motion.p>

        <motion.div className="location__map" {...inView(0.3)}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3853.7536699735588!2d29.79992658161901!3d-30.625382533930477!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1ef5ee902da94e91%3A0xe8eaa517fd903bc5!2sHarding%2C%204680!5e0!3m2!1sen!2sza!4v1779626504640!5m2!1sen!2sza"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Abafana Belokishi Location — Harding, KwaZulu-Natal"
          />
        </motion.div>
      </div>
    </section>
  );
}
