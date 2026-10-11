import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { certifications, experience, projects } from '../data/portfolio';
import { useReducedMotionPref } from '../hooks/useMedia';
import { EASE } from './fx';

/** Counts up from 0 once, when scrolled into view. Writes straight to the DOM — no re-renders. */
function CountUp({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotionPref();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduced) {
      el.textContent = String(to);
      return;
    }
    let raf = 0;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const run = (now: number) => {
        const p = Math.min(1, (now - start) / 1400);
        el.textContent = String(Math.round(to * (1 - Math.pow(1 - p, 3))));
        if (p < 1) raf = requestAnimationFrame(run);
      };
      raf = requestAnimationFrame(run);
    });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to, reduced]);

  return <span ref={ref}>0</span>;
}

const STATS = [
  { to: projects.length, label: 'Originals', sub: 'End-to-end projects' },
  { to: experience.length, label: 'Internships', sub: 'Analytics & Design' },
  { to: certifications.length, label: 'Certifications', sub: 'AWS · Honeywell · Web3' },
  { to: 1, label: 'Published Paper', sub: 'Co-authored research' },
];

export default function Stats() {
  return (
    <section aria-label="At a glance" className="gutter py-14 sm:py-20">
      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-white/10 ring-1 ring-white/10 lg:grid-cols-4">
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            className="bg-ink-2 p-6 sm:p-8"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-8% 0px' }}
            transition={{ duration: 0.7, delay: i * 0.08, ease: EASE }}
          >
            <p className="font-display text-[clamp(3.2rem,8vw,6rem)] leading-none text-bone">
              <CountUp to={s.to} />
            </p>
            <p className="mt-3 text-[11px] font-bold uppercase tracking-[0.28em] text-crimson-2">{s.label}</p>
            <p className="mt-1 text-xs text-mist">{s.sub}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
