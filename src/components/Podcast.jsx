import { motion } from 'framer-motion';
import { FaPlay } from 'react-icons/fa';
import Waveform from './Waveform';

const EPISODES = [
  {
    num: '013',
    title: 'The Future of Amapiano',
    desc: 'Where is the genre headed? We break it down.',
    duration: '52:14',
    date: 'May 2024',
  },
  {
    num: '012',
    title: 'The Township Takeover',
    desc: 'How South African township culture is reshaping global music.',
    duration: '48:32',
    date: 'Apr 2024',
  },
  {
    num: '011',
    title: 'Building from Nothing',
    desc: 'An honest conversation about independent artistry and survival.',
    duration: '61:07',
    date: 'Mar 2024',
  },
  {
    num: '010',
    title: 'Music Business 101',
    desc: 'Contracts, royalties, and what no one tells you when you sign.',
    duration: '55:43',
    date: 'Feb 2024',
  },
  {
    num: '009',
    title: 'Voices from the Yard',
    desc: 'Community voices on the power of local music scenes.',
    duration: '44:21',
    date: 'Jan 2024',
  },
];

export default function Podcast() {
  return (
    <section id="podcast" className="podcast section">
      <div className="podcast__waveform-bg" aria-hidden="true">
        <Waveform className="waveform-svg" />
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="section-header">
          <motion.h2
            className="section-title"
            style={{ color: '#f5f4f0' }}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            Podcast
          </motion.h2>
          <div className="section-rule" aria-hidden="true" />
          <motion.p
            className="section-label"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.5 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ marginBottom: 0, color: '#f5f4f0' }}
          >
            Latest Episodes
          </motion.p>
        </div>

        <div className="podcast__episodes" role="list">
          {EPISODES.map((ep, i) => (
            <motion.div
              key={ep.num}
              className="podcast__ep"
              role="listitem"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              tabIndex={0}
              aria-label={`Episode ${ep.num}: ${ep.title}, ${ep.duration}`}
            >
              <span className="podcast__ep-num">{ep.num}</span>

              <div className="podcast__ep-play" aria-hidden="true">
                <FaPlay />
              </div>

              <div>
                <div className="podcast__ep-title">{ep.title}</div>
                <div className="podcast__ep-meta">{ep.desc} · {ep.date}</div>
              </div>

              <div className="podcast__mini-wave" aria-hidden="true">
                {[14, 22, 10, 18, 8].map((h, j) => (
                  <span key={j} style={{ height: `${h}px` }} />
                ))}
              </div>

              <span className="podcast__ep-duration">{ep.duration}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
