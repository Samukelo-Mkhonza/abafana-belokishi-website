import { useEffect } from 'react';

let locks = 0;

// Locking only <body> is not enough: the page keeps scrolling on iOS and with
// programmatic scrolls, because <html> is the scrolling element. The count lets
// a dialog opened on top of the menu close without unlocking the page.
export function useScrollLock(active) {
  useEffect(() => {
    if (!active) return undefined;
    const html = document.documentElement;
    if (locks === 0) {
      const scrollbar = window.innerWidth - html.clientWidth;
      html.style.setProperty('--scrollbar-gap', `${scrollbar}px`);
      html.classList.add('scroll-locked');
    }
    locks += 1;
    return () => {
      locks -= 1;
      if (locks === 0) {
        html.classList.remove('scroll-locked');
        html.style.removeProperty('--scrollbar-gap');
      }
    };
  }, [active]);
}
