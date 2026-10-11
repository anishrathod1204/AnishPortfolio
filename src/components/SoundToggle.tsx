import { toggleSound, useSound } from '../hooks/sound';

/** Always-visible sound switch (bottom-left). Shows a gentle prompt until audio is unlocked. */
export default function SoundToggle() {
  const { enabled, unlocked } = useSound();
  const label = !unlocked ? 'Tap for sound' : enabled ? 'Sound on' : 'Sound off';
  const on = enabled && unlocked;

  return (
    <button
      type="button"
      data-sfx="off"
      onClick={toggleSound}
      aria-pressed={on}
      aria-label={enabled ? 'Mute sound effects' : 'Turn on sound effects'}
      className="glass fixed bottom-4 left-4 z-[160] flex min-h-10 items-center gap-2 rounded-full px-3.5 text-[10px] font-bold uppercase tracking-[0.22em] text-bone transition hover:bg-white/15 sm:bottom-6 sm:left-6"
    >
      <span className="flex h-4 items-end gap-[2px]" aria-hidden>
        {[0.55, 1, 0.7, 0.9].map((h, i) => (
          <span
            key={i}
            className={`w-[2px] origin-bottom rounded-full ${on ? 'bg-crimson-2 animate-[eq_1.1s_ease-in-out_infinite]' : 'bg-smoke'}`}
            style={{ height: `${h * 100}%`, animationDelay: `${i * 0.13}s`, transform: on ? undefined : 'scaleY(0.35)' }}
          />
        ))}
      </span>
      {label}
    </button>
  );
}
