import { useState } from 'react';
import { FaPlay } from 'react-icons/fa';
import PlatformIcon from './PlatformIcon';

// Third-party players are heavy (0.5–1 MB each) and set tracking cookies, so
// nothing loads from the provider until the visitor asks for it.
export default function Embed({
  src,
  title,
  provider,
  height,
  ratio,
  poster,
  // A compact embed is a single bar until it is played, then opens to its full height.
  compact = false,
  // A bare embed shows only the play button over its poster; whatever names it sits outside.
  bare = false,
  action = 'Play',
  allow = 'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture',
  className = '',
}) {
  const [active, setActive] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const idle = compact && !active;
  const style = idle ? undefined : ratio ? { aspectRatio: ratio } : { height };

  return (
    <div className={`embed ${loaded ? 'embed--loaded' : ''} ${idle ? 'embed--compact' : ''} ${bare ? 'embed--bare' : ''} ${className}`} style={style}>
      {active ? (
        <>
          {!loaded && <div className="embed__skeleton" aria-hidden="true" />}
          <iframe
            src={src}
            title={title}
            allow={allow}
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
            onLoad={() => setLoaded(true)}
          />
        </>
      ) : (
        <button
          type="button"
          className="embed__facade"
          onClick={() => setActive(true)}
          style={poster ? { backgroundImage: `url("${poster}")` } : undefined}
        >
          <span className="embed__play" aria-hidden="true"><FaPlay /></span>
          <span className="embed__text">
            <span className="embed__label">
              <PlatformIcon platform={provider} />
              {action} {title}
            </span>
            <span className="embed__note">Loads the {provider} player</span>
          </span>
        </button>
      )}
    </div>
  );
}
