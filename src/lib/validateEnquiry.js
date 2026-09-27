const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const SERVICES = ['Artist Booking', 'Podcast Collaboration', 'Brand Partnership', 'Event / Show', 'Other'];

export function validateEnquiry({ name, email, service, message }) {
  const errors = {};
  if (!name.trim()) errors.name = 'Please tell us your name.';
  if (!email.trim()) errors.email = 'Please add an email address so we can reply.';
  else if (!EMAIL.test(email.trim())) errors.email = 'That email address doesn’t look right.';
  if (!service) errors.service = 'Choose what you’re enquiring about.';
  if (message.trim().length < 10) errors.message = 'Add a few details (at least 10 characters).';
  return errors;
}

export function enquiryText({ name, email, service, message }) {
  return `Name: ${name}\nEmail: ${email}\nService: ${service}\n\n${message}`;
}
