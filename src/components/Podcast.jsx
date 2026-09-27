import { FaYoutube, FaTiktok } from 'react-icons/fa';
import Embed from './ui/Embed';
import Reveal from './ui/Reveal';
import Waveform from './Waveform';
import { CHANNELS } from '../data/site';
import { asset } from '../lib/asset';

export default function Podcast() {
  return (
    <section id="podcast" className="section podcast" aria-labelledby="podcast-title">
      <div className="podcast__bg" aria-hidden="true">
        <img
          src={asset('images/web/podcast-banner.webp')}
          srcSet={`${asset('images/web/podcast-banner-sm.webp')} 800w, ${asset('images/web/podcast-banner.webp')} 1600w`}
          sizes="100vw"
          alt=""
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className="container podcast__grid">
        <Reveal className="podcast__copy">
          <p className="eyebrow eyebrow--accent">The podcast</p>
          <h2 id="podcast-title" className="section-title">Abafana Belokishi Podcast</h2>
          <p className="podcast__lede">
            Real conversations about music, culture, and the journey of building something
            from the ground up. New episodes live on YouTube.
          </p>
          <div className="btn-row">
            <a href={CHANNELS.youtube} target="_blank" rel="noreferrer" className="btn btn--youtube">
              <FaYoutube aria-hidden="true" /> Watch on YouTube
            </a>
            <a href={CHANNELS.tiktok} target="_blank" rel="noreferrer" className="btn btn--ghost">
              <FaTiktok aria-hidden="true" /> Clips on TikTok
            </a>
          </div>
        </Reveal>

        <Reveal className="podcast__player" delay={0.1}>
          <Embed
            src={CHANNELS.podcastEpisodeEmbed}
            ratio="16 / 9"
            title="the latest podcast episode"
            provider="YouTube"
            poster={CHANNELS.podcastEpisodeThumb}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          />
        </Reveal>
      </div>

      <div className="podcast__waveform" aria-hidden="true">
        <Waveform />
      </div>
    </section>
  );
}
