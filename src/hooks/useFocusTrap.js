import { useEffect, useRef } from 'react';

const FOCUSABLE =
  'a[href], button:not([disabled]), iframe, input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

// Keeps Tab inside `ref` while active, closes on Escape, and hands focus back to
// whatever had it before (usually the button that opened the panel).
export function useFocusTrap(ref, active, onEscape) {
  const onEscapeRef = useRef(onEscape);

  useEffect(() => {
    onEscapeRef.current = onEscape;
  });

  useEffect(() => {
    if (!active) return undefined;
    const previouslyFocused = document.activeElement;
    const panel = ref.current;
    const first = panel?.querySelector('[data-autofocus]') ?? panel;
    first?.focus({ preventScroll: true });

    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onEscapeRef.current?.();
        return;
      }
      if (e.key !== 'Tab' || !panel) return;
      const items = [...panel.querySelectorAll(FOCUSABLE)];
      if (items.length === 0) {
        e.preventDefault();
        return;
      }
      const firstItem = items[0];
      const lastItem = items[items.length - 1];
      const current = document.activeElement;
      if (!panel.contains(current)) {
        e.preventDefault();
        (e.shiftKey ? lastItem : firstItem).focus();
      } else if (e.shiftKey && (current === firstItem || current === panel)) {
        e.preventDefault();
        lastItem.focus();
      } else if (!e.shiftKey && current === lastItem) {
        e.preventDefault();
        firstItem.focus();
      }
    };

    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      if (previouslyFocused instanceof HTMLElement && previouslyFocused.isConnected) previouslyFocused.focus({ preventScroll: true });
    };
  }, [ref, active]);
}
