import { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useFinePointer, useReducedMotionPref } from '../hooks/useMedia';

/** A soft crimson light that trails the pointer behind the content (desktop only, transform-only). */
export default function CursorGlow() {
  const fine = useFinePointer();
  const reduced = useReducedMotionPref();
  const x = useMotionValue(-1000);
  const y = useMotionValue(-1000);
  const sx = useSpring(x, { stiffness: 70, damping: 20, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 70, damping: 20, mass: 0.6 });
  const enabled = fine && !reduced;

  useEffect(() => {
    if (!enabled) return;
    const move = (e: PointerEvent) => {
      x.set(e.clientX - 320);
      y.set(e.clientY - 320);
    };
    window.addEventListener('pointermove', move, { passive: true });
    return () => window.removeEventListener('pointermove', move);
  }, [enabled, x, y]);

  if (!enabled) return null;
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-0 h-[640px] w-[640px] rounded-full"
      style={{ x: sx, y: sy, background: 'radial-gradient(closest-side, rgba(229,19,43,0.11), rgba(229,19,43,0.04) 55%, transparent)', willChange: 'transform' }}
    />
  );
}
