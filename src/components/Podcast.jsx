import { FaYoutube, FaTiktok } from 'react-icons/fa';
import Embed from './ui/Embed';
import Reveal from './ui/Reveal';
import { CHANNELS } from '../data/site';

export default function Podcast() {
  return (
    <section id="podcast" className="section podcast" aria-labelledby="podcast-title">
      <div className="container">
        <Reveal>
          <p className="eyebrow">The podcast</p>
          <h2 id="podcast-title" className="podcast__title">
            <span className="podcast__title-label">Abafana Belokishi</span>{' '}
            <span className="podcast__title-word">Podcast</span>
          </h2>
        </Reveal>

        <div className="podcast__grid">
          <Reveal className="podcast__player">
            <Embed
              src={CHANNELS.podcastEpisodeEmbed}
              ratio="16 / 9"
              title="episode 1 with Nosipho Ncayiyana"
              provider="YouTube"
              poster={CHANNELS.podcastEpisodeThumb}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            />
            <p className="podcast__caption">
              <span>Episode 1</span> Nosipho Ncayiyana
            </p>
          </Reveal>

          <Reveal className="podcast__copy" delay={0.1}>
            <p className="podcast__lede">
              Long conversations about music and life ekasi. Full episodes go up on YouTube and
              short clips go on TikTok. Start with the first episode: Nosipho Ncayiyana on
              ukugudlana, mental health and therapy.
            </p>
            <div className="btn-row">
              <a href={CHANNELS.youtube} target="_blank" rel="noreferrer" className="btn btn--primary">
                <FaYoutube aria-hidden="true" /> Watch on YouTube
              </a>
              <a href={CHANNELS.tiktok} target="_blank" rel="noreferrer" className="btn btn--ghost">
                <FaTiktok aria-hidden="true" /> Clips on TikTok
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
