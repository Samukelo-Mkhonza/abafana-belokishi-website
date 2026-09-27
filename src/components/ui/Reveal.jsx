import { m } from 'framer-motion';

// Fades content up once as it scrolls into view. MotionConfig in App turns
// this into a no-op for visitors who prefer reduced motion.
export default function Reveal({ as = 'div', delay = 0, y = 24, children, ...props }) {
  const Component = m[as];
  return (
    <Component
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-64px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    >
      {children}
    </Component>
  );
}
