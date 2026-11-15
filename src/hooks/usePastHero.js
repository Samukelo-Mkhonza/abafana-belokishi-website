import { useSyncExternalStore } from 'react';

// The corner widgets sit in the bottom 30% of the window. They wait until the
// hero's buttons and "Out now" sleeve have scrolled up out of that band.
const BAND = 0.7;

function subscribe(onChange) {
  let frame = 0;
  const schedule = () => {
    if (frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      onChange();
    });
  };
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
  return () => {
    cancelAnimationFrame(frame);
    window.removeEventListener('scroll', schedule);
    window.removeEventListener('resize', schedule);
  };
}

function isPast() {
  const foot = document.querySelector('[data-hero-foot]');
  // A page without the hero has nothing to keep clear of.
  if (!foot) return true;
  return foot.getBoundingClientRect().bottom <= window.innerHeight * BAND;
}

// True once the foot of the hero no longer sits where the corner widgets go.
export function usePastHero() {
  return useSyncExternalStore(subscribe, isPast, () => false);
}
