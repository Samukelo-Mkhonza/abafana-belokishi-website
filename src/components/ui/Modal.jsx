import { useRef } from 'react';
import { createPortal } from 'react-dom';
import { m } from 'framer-motion';
import { MdClose } from 'react-icons/md';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import { useScrollLock } from '../../hooks/useScrollLock';

// Render inside <AnimatePresence> so the exit animation plays.
export default function Modal({ label, onClose, className = '', children }) {
  const panelRef = useRef(null);
  useFocusTrap(panelRef, true, onClose);
  useScrollLock(true);

  return createPortal(
    <m.div
      className="modal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      <m.div
        ref={panelRef}
        className={`modal__panel ${className}`}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        tabIndex={-1}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 24 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className="icon-btn modal__close" onClick={onClose} aria-label="Close">
          <MdClose aria-hidden="true" />
        </button>
        {children}
      </m.div>
    </m.div>,
    document.body,
  );
}
