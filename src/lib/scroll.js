// Smooth-scrolls to an in-page anchor and moves focus there so keyboard and
// screen-reader users land in the same place as everyone else.
export function scrollToHash(e, href) {
  const target = document.querySelector(href);
  if (!target) return;
  e?.preventDefault();
  const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
  if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
  target.focus({ preventScroll: true });
  history.replaceState(null, '', href);
}
