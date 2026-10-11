import { motion, useScroll, useSpring } from 'framer-motion';

/** Thin crimson progress line across the very top of the page. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });
  return <motion.div aria-hidden className="fixed inset-x-0 top-0 z-[65] h-[2px] origin-left bg-gradient-to-r from-crimson via-crimson-2 to-[#ffb547]" style={{ scaleX }} />;
}
