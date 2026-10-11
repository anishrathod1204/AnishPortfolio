import { useRef, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useTrackProgress } from '../hooks/sectionProgress';
import { EASE } from './fx';

/**
 * A section of the series. Fades up once as it enters the viewport (cheap — no
 * scroll-linked transforms on huge layers) and reports viewing progress for the
 * Continue Exploring row.
 */
export default function Scene({ id, children, className = '' }: { id: string; children: ReactNode; className?: string }) {
  const ref = useRef<HTMLElement>(null);
  useTrackProgress(id, ref);

  return (
    <motion.section
      id={id}
      ref={ref}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.04 }}
      transition={{ duration: 0.8, ease: EASE }}
      className={`relative scroll-mt-16 py-16 sm:py-24 ${className}`}
    >
      {children}
    </motion.section>
  );
}
