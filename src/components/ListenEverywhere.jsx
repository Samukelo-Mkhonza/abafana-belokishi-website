import { useRef, useState } from 'react';
import { FaSpotify, FaSoundcloud, FaYoutube } from 'react-icons/fa';
import Embed from './ui/Embed';
import { CHANNELS } from '../data/site';
import { YT_PLAYLIST_URL, YT_PLAYLIST_EMBED_SRC } from '../data/releases';

const TABS = [
  {
    id: 'spotify',
    label: 'Spotify',
    icon: FaSpotify,
    title: 'Abafana Belokishi: The Playlist',
    src: CHANNELS.spotifyPlaylistEmbed,
    height: 352,
    href: CHANNELS.spotifyPlaylist,
    cta: 'Open the playlist on Spotify',
  },
  {
    id: 'soundcloud',
    label: 'SoundCloud',
    icon: FaSoundcloud,
    title: 'Assign on SoundCloud',
    src: CHANNELS.soundcloudEmbed,
    height: 352,
    href: CHANNELS.soundcloud,
    cta: 'Open Assign on SoundCloud',
  },
  {
    id: 'youtube',
    label: 'YouTube',
    icon: FaYoutube,
    title: 'The Get Back on YouTube',
    src: YT_PLAYLIST_EMBED_SRC,
    ratio: '16 / 9',
    href: YT_PLAYLIST_URL,
    cta: 'Open The Get Back on YouTube',
  },
];

export default function ListenEverywhere() {
  const [active, setActive] = useState(TABS[0].id);
  const tabRefs = useRef([]);
  const tab = TABS.find((t) => t.id === active);

  const onKeyDown = (e, i) => {
    const dir = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
    if (!dir) return;
    e.preventDefault();
    const next = (i + dir + TABS.length) % TABS.length;
    setActive(TABS[next].id);
    tabRefs.current[next]?.focus();
  };

  return (
    <div className="listen">
      <div className="listen__intro">
        <h3 className="listen__title">Where to listen</h3>
        <p className="muted">The label playlist on Spotify, Assign on SoundCloud and The Get Back on YouTube.</p>
        <div role="tablist" aria-label="Streaming platform" className="segmented">
          {TABS.map(({ id, label, icon: Icon }, i) => (
            <button
              key={id}
              ref={(el) => (tabRefs.current[i] = el)}
              type="button"
              role="tab"
              id={`listen-tab-${id}`}
              aria-selected={active === id}
              aria-controls="listen-panel"
              tabIndex={active === id ? 0 : -1}
              className="segmented__btn"
              onClick={() => setActive(id)}
              onKeyDown={(e) => onKeyDown(e, i)}
            >
              <Icon aria-hidden="true" /> {label}
            </button>
          ))}
        </div>
        <a href={tab.href} target="_blank" rel="noreferrer" className="text-link">
          {tab.cta} <span aria-hidden="true">↗</span>
        </a>
      </div>

      <div id="listen-panel" role="tabpanel" aria-labelledby={`listen-tab-${tab.id}`} className="listen__player">
        <Embed key={tab.id} src={tab.src} height={tab.height} ratio={tab.ratio} title={tab.title} provider={tab.label} />
      </div>
    </div>
  );
}
