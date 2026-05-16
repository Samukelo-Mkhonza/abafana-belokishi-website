import { useState } from 'react';
import { motion } from 'framer-motion';
import { MdPhone, MdEmail, MdChat } from 'react-icons/md';

const inView = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
});

const CONTACT_INFO = [
  { icon: <MdPhone />, label: 'Phone / WhatsApp', value: '062 530 2863', href: 'tel:+27625302863' },
  { icon: <MdEmail />, label: 'Email', value: 'abafanabelokishipodcasters@gmail.com', href: 'mailto:abafanabelokishipodcasters@gmail.com' },
  { icon: <MdChat />, label: 'WhatsApp / Messenger', value: 'Abafana Belokishi_Ent', href: 'https://wa.me/27625302863' },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', service: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = e => {
    e.preventDefault();
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\nService: ${form.service}\n\n${form.message}`);
    window.location.href = `mailto:abafanabelokishipodcasters@gmail.com?subject=Booking Enquiry from ${encodeURIComponent(form.name)}&body=${body}`;
    setSent(true);
  };

  return (
    <section id="contact" className="contact section dot-grid">
      <div className="container">
        <motion.p className="section-label" {...inView(0)}>— Get in Touch</motion.p>
        <motion.h2 className="section-title" {...inView(0.1)} style={{ marginBottom: '3rem' }}>
          Book &amp; Enquire
        </motion.h2>

        <div className="contact__grid">
          <motion.div {...inView(0.15)}>
            <p style={{ opacity: 0.6, fontWeight: 300, lineHeight: 1.8, marginBottom: '2.5rem', fontSize: '1.02rem' }}>
              Whether you&apos;re looking to book an artist, collaborate on a podcast episode,
              or explore a partnership — we want to hear from you. Fill in the form or reach
              us directly on any channel below.
            </p>

            {CONTACT_INFO.map(({ icon, label, value, href }) => (
              <div key={label} className="contact__info-item">
                <div className="contact__info-icon" aria-hidden="true">{icon}</div>
                <div>
                  <span className="contact__info-label">{label}</span>
                  <a href={href} className="contact__info-value" target="_blank" rel="noreferrer">
                    {value}
                  </a>
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div {...inView(0.25)}>
            {sent ? (
              <div style={{ padding: '2rem', border: '1px solid var(--border)', textAlign: 'center' }}>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>
                  Enquiry Sent
                </p>
                <p style={{ opacity: 0.5, fontSize: '0.9rem' }}>
                  Your email client opened with the pre-filled message. We&apos;ll be in touch shortly.
                </p>
              </div>
            ) : (
              <form className="contact__form" onSubmit={handleSubmit} noValidate>
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="you@example.com"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="service">Service / Enquiry Type</label>
                  <select
                    id="service"
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select a service</option>
                    <option value="Artist Booking">Artist Booking</option>
                    <option value="Podcast Collaboration">Podcast Collaboration</option>
                    <option value="Brand Partnership">Brand Partnership</option>
                    <option value="Event / Show">Event / Show</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    placeholder="Tell us about your project, event, or vision..."
                  />
                </div>

                <button type="submit" className="btn btn--dark" style={{ alignSelf: 'flex-start' }}>
                  Send Enquiry
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
