import Reveal from './ui/Reveal';
import { ARTISTS } from '../data/artists';
import { RELEASES, FIRST_RELEASE_YEAR } from '../data/releases';

// Every figure is derived from the catalogue so it can't drift out of date.
const STATS = [
  { value: FIRST_RELEASE_YEAR, label: 'First release' },
  { value: RELEASES.length, label: 'Releases' },
  { value: ARTISTS.length, label: 'Artists' },
];

export default function About() {
  return (
    <section id="about" className="section about" aria-labelledby="about-title">
      <div className="container about__grid">
        <Reveal className="about__lead">
          <p className="eyebrow">About the label</p>
          <h2 id="about-title" className="about__quote">
            Abafana Belokishi means "the boys of the township".
          </h2>
        </Reveal>

        <Reveal className="about__body prose" delay={0.1}>
          <p>
            Abafana Belokishi Entertainment is a record label and podcast from Harding in
            KwaZulu-Natal. King Fergo started it. The first release was SBWL, a single he made
            with Structure in May 2020.
          </p>
          <p>
            There are four artists on the roster now. King Fergo and Structure mostly make
            amapiano. SAB and Assign rap, and King Fergo does too on his hip-hop singles. The
            podcast goes out on YouTube, with short clips on TikTok.
          </p>

          <dl className="stats">
            {STATS.map(({ value, label }) => (
              <div key={label} className="stat">
                <dt className="stat__label">{label}</dt>
                <dd className="stat__num">{value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
