import { useEffect, useId, useRef, useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { MdChat, MdClose, MdSend } from 'react-icons/md';
import { useFocusTrap } from '../hooks/useFocusTrap';
import { scrollToHash } from '../lib/scroll';
import { reply, WELCOME, QUICK_REPLIES } from '../lib/chatbot';

function Message({ from, text, links, onInternalLink }) {
  return (
    <li className={`chat__msg chat__msg--${from}`}>
      <span className="sr-only">{from === 'bot' ? 'Abafana Belokishi:' : 'You:'} </span>
      <p>{text}</p>
      {links?.length > 0 && (
        <ul className="chat__links">
          {links.map(({ label, href, external }) => (
            <li key={href}>
              {external ? (
                <a href={href} target="_blank" rel="noreferrer" className="chat__link">{label}</a>
              ) : (
                <a href={href} className="chat__link" onClick={(e) => onInternalLink(e, href)}>{label}</a>
              )}
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

// Answers come from src/lib/chatbot.js, which only reads the site's own data:
// nothing a visitor types leaves the browser.
export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([{ id: 0, from: 'bot', ...WELCOME }]);
  const [draft, setDraft] = useState('');
  const panelRef = useRef(null);
  const logRef = useRef(null);
  const launcherRef = useRef(null);
  const wasOpen = useRef(false);
  const nextId = useRef(1);
  const panelId = useId();
  const titleId = useId();
  const inputId = useId();

  useFocusTrap(panelRef, open, () => setOpen(false));

  // Safari doesn't focus a button on click, so the trap can't be relied on to
  // hand focus back to the launcher.
  useEffect(() => {
    if (wasOpen.current && !open) launcherRef.current?.focus({ preventScroll: true });
    wasOpen.current = open;
  }, [open]);

  useEffect(() => {
    const log = logRef.current;
    if (log) log.scrollTop = log.scrollHeight;
  }, [messages, open]);

  const ask = (question) => {
    const text = question.trim();
    if (!text) return;
    const answer = reply(text);
    const questionId = nextId.current++;
    const answerId = nextId.current++;
    setMessages((list) => [
      ...list,
      { id: questionId, from: 'user', text },
      { id: answerId, from: 'bot', text: answer.text, links: answer.links },
    ]);
    setDraft('');
  };

  // Close first so the focus trap hands focus back before we move it on to the section.
  const goTo = (e, href) => {
    e.preventDefault();
    setOpen(false);
    requestAnimationFrame(() => scrollToHash(null, href));
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <m.div
            ref={panelRef}
            id={panelId}
            className="chat"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            tabIndex={-1}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <header className="chat__header">
              <div>
                <h2 id={titleId} className="chat__title">Ask Abafana Belokishi</h2>
                <p className="chat__note">Answers come from this website. Nothing you type is sent anywhere.</p>
              </div>
              <button type="button" className="icon-btn icon-btn--sm" onClick={() => setOpen(false)} aria-label="Close chat">
                <MdClose aria-hidden="true" />
              </button>
            </header>

            <ol ref={logRef} className="chat__log" role="log" aria-live="polite" aria-label="Conversation">
              {messages.map(({ id, ...msg }) => (
                <Message key={id} {...msg} onInternalLink={goTo} />
              ))}
            </ol>

            <div className="chat__chips" role="group" aria-label="Suggested questions">
              {QUICK_REPLIES.map((q) => (
                <button key={q} type="button" className="chat__chip" onClick={() => ask(q)}>{q}</button>
              ))}
            </div>

            <form
              className="chat__form"
              onSubmit={(e) => {
                e.preventDefault();
                ask(draft);
              }}
            >
              <label htmlFor={inputId} className="sr-only">Ask a question</label>
              <input
                id={inputId}
                className="chat__input"
                type="text"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Ask about artists, music, bookings…"
                maxLength={200}
                autoComplete="off"
                enterKeyHint="send"
                data-autofocus
              />
              <button type="submit" className="icon-btn chat__send" aria-label="Send" disabled={!draft.trim()}>
                <MdSend aria-hidden="true" />
              </button>
            </form>
          </m.div>
        )}
      </AnimatePresence>

      <button
        ref={launcherRef}
        type="button"
        className="chat-launcher"
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        onClick={() => setOpen((o) => !o)}
      >
        {open ? <MdClose aria-hidden="true" /> : <MdChat aria-hidden="true" />}
        <span className="chat-launcher__label">{open ? 'Close chat' : 'Ask us'}</span>
      </button>
    </>
  );
}
