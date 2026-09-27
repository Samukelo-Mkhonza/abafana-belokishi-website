import { useRef, useState } from 'react';
import { MdPhone, MdEmail, MdPlace } from 'react-icons/md';
import { FaWhatsapp } from 'react-icons/fa';
import SectionHeader from './ui/SectionHeader';
import Reveal from './ui/Reveal';
import Embed from './ui/Embed';
import { CONTACT, MAP, whatsappLink } from '../data/site';
import { SERVICES, validateEnquiry, enquiryText } from '../lib/validateEnquiry';

const EMPTY = { name: '', email: '', service: '', message: '' };
const FIELD_ORDER = ['name', 'email', 'service', 'message'];

const CHANNELS = [
  { icon: MdPhone, label: 'Phone', value: CONTACT.phoneDisplay, href: CONTACT.phoneHref },
  { icon: FaWhatsapp, label: 'WhatsApp', value: CONTACT.whatsappHandle, href: whatsappLink(), external: true },
  { icon: MdEmail, label: 'Email', value: CONTACT.email, href: `mailto:${CONTACT.email}` },
];

function Field({ id, label, error, children }) {
  return (
    <div className={`field${error ? ' field--error' : ''}`}>
      <label htmlFor={id}>{label}</label>
      {children}
      {error && (
        <p className="field__error" id={`${id}-error`}>
          {error}
        </p>
      )}
    </div>
  );
}

export default function Contact() {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const formRef = useRef(null);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((errs) => ({ ...errs, [name]: undefined }));
  };

  const check = () => {
    const found = validateEnquiry(form);
    setErrors(found);
    const first = FIELD_ORDER.find((k) => found[k]);
    if (first) formRef.current?.elements[first]?.focus();
    return !first;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!check()) return;
    const subject = encodeURIComponent(`Booking enquiry from ${form.name}`);
    window.location.href = `mailto:${CONTACT.email}?subject=${subject}&body=${encodeURIComponent(enquiryText(form))}`;
    setSent(true);
  };

  const onWhatsApp = () => {
    if (!check()) return;
    window.open(whatsappLink(enquiryText(form)), '_blank', 'noopener');
    setSent(true);
  };

  const describe = (name) => (errors[name] ? `${name}-error` : undefined);

  return (
    <section id="contact" className="section section--alt" aria-labelledby="contact-title">
      <div className="container">
        <SectionHeader
          id="contact-title"
          eyebrow="Get in touch"
          title="Book & enquire"
          intro="Whether you're looking to book an artist, collaborate on a podcast episode, or explore a partnership — we want to hear from you."
        />

        <div className="contact__grid">
          <Reveal className="contact__aside">
            <ul className="channel-list">
              {CHANNELS.map(({ icon: Icon, label, value, href, external }) => (
                <li key={label}>
                  <a
                    className="channel"
                    href={href}
                    {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
                  >
                    <span className="channel__icon" aria-hidden="true"><Icon /></span>
                    <span className="channel__text">
                      <span className="channel__label">{label}</span>
                      <span className="channel__value">{value}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="location-card">
              <p className="location-card__title">
                <MdPlace aria-hidden="true" /> {MAP.label}
              </p>
              <p className="muted">
                Rooted in Harding — a small town with a big sound. This is where Abafana
                Belokishi was born, where our artists create, and where our story continues
                to unfold.
              </p>
              <Embed src={MAP.embed} height={220} title="map of Harding" action="Show" provider="Google Maps" allow="fullscreen" />
              <a className="text-link" href={MAP.link} target="_blank" rel="noreferrer">
                Open in Google Maps <span aria-hidden="true">↗</span>
              </a>
            </div>
          </Reveal>

          <Reveal className="card contact__form-card" delay={0.1}>
            {sent ? (
              <div className="form-success" role="status">
                <h3 className="form-success__title">Thanks, {form.name.split(' ')[0]} — enquiry ready</h3>
                <p className="muted">
                  Your email or WhatsApp app should have opened with your message filled in. Hit
                  send there and we&apos;ll get back to you shortly.
                </p>
                <p className="muted">
                  Nothing opened? Email <a className="text-link" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> or
                  call <a className="text-link" href={CONTACT.phoneHref}>{CONTACT.phoneDisplay}</a>.
                </p>
                <button type="button" className="btn btn--ghost btn--sm" onClick={() => { setForm(EMPTY); setSent(false); }}>
                  Send another enquiry
                </button>
              </div>
            ) : (
              <form ref={formRef} className="form" onSubmit={onSubmit} noValidate>
                <div className="form__row">
                  <Field id="name" label="Full name" error={errors.name}>
                    <input id="name" name="name" type="text" autoComplete="name" value={form.name} onChange={onChange}
                      required aria-invalid={!!errors.name} aria-describedby={describe('name')} />
                  </Field>
                  <Field id="email" label="Email address" error={errors.email}>
                    <input id="email" name="email" type="email" autoComplete="email" inputMode="email" value={form.email}
                      onChange={onChange} required aria-invalid={!!errors.email} aria-describedby={describe('email')} />
                  </Field>
                </div>

                <Field id="service" label="What's it about?" error={errors.service}>
                  <select id="service" name="service" value={form.service} onChange={onChange} required
                    aria-invalid={!!errors.service} aria-describedby={describe('service')}>
                    <option value="">Select an enquiry type</option>
                    {SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </Field>

                <Field id="message" label="Message" error={errors.message}>
                  <textarea id="message" name="message" rows={5} value={form.message} onChange={onChange} required
                    placeholder="Tell us about your event, dates, venue or idea…"
                    aria-invalid={!!errors.message} aria-describedby={describe('message')} />
                </Field>

                <div className="form__actions">
                  <button type="submit" className="btn btn--primary">
                    <MdEmail aria-hidden="true" /> Send enquiry
                  </button>
                  <button type="button" className="btn btn--whatsapp" onClick={onWhatsApp}>
                    <FaWhatsapp aria-hidden="true" /> Send on WhatsApp
                  </button>
                </div>
                <p className="form__note">
                  Opens your email or WhatsApp app with the message filled in. Nothing is stored on this site.
                </p>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
