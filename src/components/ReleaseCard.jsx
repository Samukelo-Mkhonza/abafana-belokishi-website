import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ReleaseCard({ title, artist, type, image, links = [], letter, index = 0, onClick }) {
  const cardRef = useRef(null);
  const glareRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    const glare = glareRef.current;
    if (!card) return;

    // Scroll-triggered entrance
    const anim = gsap.fromTo(
      card,
      { opacity: 0, y: 70, scale: 0.88, rotationX: 8 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotationX: 0,
        duration: 0.9,
        delay: (index % 4) * 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      }
    );

    if (window.matchMedia('(hover: none)').matches) {
      return () => { anim.scrollTrigger?.kill(); anim.kill(); };
    }

    const onMove = (e) => {
      const rect = card.getBoundingClientRect();
      const dx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const dy = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

      gsap.to(card, {
        rotationY: dx * 18,
        rotationX: -dy * 14,
        transformPerspective: 900,
        boxShadow: `${-dx * 24}px ${dy * 18}px 55px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06)`,
        ease: 'power2.out',
        duration: 0.35,
        overwrite: 'auto',
      });

      if (glare) {
        const gx = ((e.clientX - rect.left) / rect.width) * 100;
        const gy = ((e.clientY - rect.top) / rect.height) * 100;
        gsap.set(glare, {
          opacity: 1,
          background: `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.22) 0%, transparent 60%)`,
        });
      }
    };

    const onEnter = () => {
      gsap.to(card, {
        scale: 1.05,
        transformPerspective: 900,
        duration: 0.35,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    };

    const onLeave = () => {
      gsap.to(card, {
        rotationY: 0,
        rotationX: 0,
        scale: 1,
        boxShadow: '0px 0px 0px rgba(0,0,0,0)',
        ease: 'elastic.out(1, 0.6)',
        duration: 1,
        overwrite: 'auto',
      });
      if (glare) gsap.to(glare, { opacity: 0, duration: 0.6 });
    };

    const onMouseDown = () => {
      gsap.to(card, {
        scale: 0.96,
        duration: 0.12,
        ease: 'power2.in',
        overwrite: 'auto',
      });
    };

    const onMouseUp = () => {
      gsap.to(card, {
        scale: 1.05,
        duration: 0.2,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    };

    card.addEventListener('mousemove', onMove);
    card.addEventListener('mouseenter', onEnter);
    card.addEventListener('mouseleave', onLeave);
    card.addEventListener('mousedown', onMouseDown);
    card.addEventListener('mouseup', onMouseUp);

    return () => {
      card.removeEventListener('mousemove', onMove);
      card.removeEventListener('mouseenter', onEnter);
      card.removeEventListener('mouseleave', onLeave);
      card.removeEventListener('mousedown', onMouseDown);
      card.removeEventListener('mouseup', onMouseUp);
      anim.scrollTrigger?.kill();
      anim.kill();
    };
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="release-card"
      onClick={onClick}
      style={{ cursor: 'pointer', opacity: 0 }}
      role="button"
      tabIndex={0}
      onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && onClick?.()}
      aria-label={`View details for ${title}`}
    >
      <div className="release-card__artwork" aria-hidden="true">
        {image
          ? <img src={image} alt={title} loading="lazy" />
          : <span className="release-card__artwork-letter">{letter || title.charAt(0)}</span>
        }
      </div>
      <div className="release-card__overlay">
        <span className="release-card__type">{type}</span>
        <h3 className="release-card__title">{title}</h3>
        {artist && <span className="release-card__artist">{artist}</span>}
        <div className="release-card__links">
          {links.map(link => (
            <span key={link.label} className="release-card__link">
              {link.label}
            </span>
          ))}
        </div>
      </div>
      <div ref={glareRef} className="release-card__glare" aria-hidden="true" />
    </div>
  );
}
