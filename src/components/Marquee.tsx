const WORDS = [
  'Full-Stack Development',
  'Machine Learning',
  'Data Analytics',
  'React.js',
  'TypeScript',
  'Python',
  'Scikit-Learn',
  'Tailwind CSS',
  'AWS',
  'Cloud-Native Design',
  'Published Researcher',
];

/** Endless ticker of the resume's headline skills — pure CSS translateX, so it costs almost nothing. */
export default function Marquee() {
  const row = WORDS.map((w, i) => (
    <span key={w} className="flex shrink-0 items-center gap-8 pr-8 sm:gap-12 sm:pr-12">
      <span className={`font-display text-[clamp(2.6rem,7vw,5.5rem)] leading-none tracking-wide ${i % 2 ? 'text-outline' : 'text-bone'}`}>{w}</span>
      <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-crimson-2 sm:h-7 sm:w-7" aria-hidden>
        <path d="M12 0 L14.6 9.4 L24 12 L14.6 14.6 L12 24 L9.4 14.6 L0 12 L9.4 9.4 Z" fill="currentColor" />
      </svg>
    </span>
  ));
  return (
    <section aria-label="Skills ticker" className="marquee relative overflow-hidden border-y border-white/5 py-6 sm:py-8">
      <div className="marquee-track" aria-hidden>
        {row}
        {row}
      </div>
      <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-ink to-transparent sm:w-40" />
      <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-ink to-transparent sm:w-40" />
    </section>
  );
}
