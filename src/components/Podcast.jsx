import { MdArrowOutward } from 'react-icons/md';
import Embed from './ui/Embed';
import PlatformIcon from './ui/PlatformIcon';
import Reveal from './ui/Reveal';
import { CHANNELS } from '../data/site';

// Where the show goes out. Both rows are the same size whatever their labels say.
const WATCH = [
  { platform: 'YouTube', note: 'Full episodes', href: CHANNELS.youtube },
  { platform: 'TikTok', note: 'Short clips', href: CHANNELS.tiktok },
];

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
            {/* The episode is named underneath, so the still is left clear of type. */}
            <Embed
              bare
              src={CHANNELS.podcastEpisodeEmbed}
              ratio="16 / 9"
              title="episode 1 with Nosipho Ncayiyana"
              provider="YouTube"
              poster={CHANNELS.podcastEpisodeThumb}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            />
            <div className="podcast__episode">
              <p className="podcast__episode-no">Episode 1</p>
              <h3 className="podcast__episode-guest">Nosipho Ncayiyana</h3>
              <p className="podcast__episode-topic">On ukugudlana, mental health and therapy.</p>
            </div>
          </Reveal>

          <Reveal className="podcast__copy" delay={0.1}>
            <p className="podcast__lede">
              Long conversations about music and life ekasi. Start with the first episode.
            </p>
            <h3 className="podcast__heading">Where to watch</h3>
            <ul className="podcast__channels">
              {WATCH.map(({ platform, note, href }) => (
                <li key={platform}>
                  <a className="link-row" href={href} target="_blank" rel="noreferrer" aria-label={`${note} on ${platform}`}>
                    <PlatformIcon platform={platform} className="link-row__icon" />
                    <span className="link-row__text">
                      <span className="link-row__name">{platform}</span>
                      <span className="link-row__note">{note}</span>
                    </span>
                    <MdArrowOutward aria-hidden="true" className="link-row__arrow" />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
