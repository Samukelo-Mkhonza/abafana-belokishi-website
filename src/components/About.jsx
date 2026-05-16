import { motion } from 'framer-motion';

const inView = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
};

const STATS = [
  { num: '5+', label: 'Years Active' },
  { num: '20+', label: 'Releases' },
  { num: '50K+', label: 'Monthly Listeners' },
];

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
            <div className="about__circle-deco" aria-hidden="true" />
          </motion.div>

          <motion.div
            className="about__body"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <p>
              Born in the heart of KwaZulu-Natal, Abafana Belokishi Entertainment was built
              by artists, for artists. We rose from the streets, the community halls, and
              the late-night recording sessions where dreams are currency and hustle is the
              only language spoken.
            </p>
            <p>
              Our name means "boys of beauty" — a testament to the richness of township
              culture and the artistry that flourishes within it. We are a music label,
              podcast network, and creative collective that refuses to let South African
              stories go untold.
            </p>
            <p>
              From Amapiano to Hip-Hop, from long-form conversation to short-form content,
              Abafana Belokishi is the platform where the township speaks — and the world
              listens.
            </p>

            <div className="about__stat-row">
              {STATS.map(({ num, label }) => (
                <div key={label}>
                  <span className="about__stat-num">{num}</span>
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
