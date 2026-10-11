import { useSyncExternalStore } from 'react';

/**
 * Tiny synthesized UI-sound engine (Web Audio API). No audio files — every sound is
 * generated from oscillators and filtered noise, so it adds zero bytes to the bundle's assets.
 *
 * Browsers only allow audio after a user gesture, so nothing plays until the visitor's first
 * click / tap / key press. The choice (on / off) is remembered in localStorage.
 */

const KEY = 'anish-sound';

type Ctor = typeof AudioContext;

let ctx: AudioContext | null = null;
let noiseBuf: AudioBuffer | null = null;
let enabled = true;
let unlocked = false;
let unlockedAt = 0;

try {
  enabled = localStorage.getItem(KEY) !== 'off';
} catch {
  /* storage unavailable — default to on */
}

type State = { enabled: boolean; unlocked: boolean };
let snapshot: State = { enabled, unlocked };
const listeners = new Set<() => void>();

function emit() {
  snapshot = { enabled, unlocked };
  listeners.forEach((l) => l());
}

type Bus = { c: AudioContext; m: GainNode; send: GainNode };
let bus: Bus | null = null;

/** Generated impulse response → a short, glassy reverb tail that makes every sound feel "produced". */
function makeReverb(c: AudioContext): ConvolverNode {
  const len = Math.floor(c.sampleRate * 1.9);
  const ir = c.createBuffer(2, len, c.sampleRate);
  for (let ch = 0; ch < 2; ch++) {
    const d = ir.getChannelData(ch);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3.2);
  }
  const conv = c.createConvolver();
  conv.buffer = ir;
  return conv;
}

function graph(): Bus | null {
  if (!enabled || !unlocked || document.hidden) return null;
  if (!ctx) {
    const C: Ctor | undefined = window.AudioContext ?? (window as unknown as { webkitAudioContext?: Ctor }).webkitAudioContext;
    if (!C) return null;
    ctx = new C();
    const m = ctx.createGain();
    m.gain.value = 0.85;
    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -16;
    comp.ratio.value = 4;
    m.connect(comp);
    comp.connect(ctx.destination);
    const send = ctx.createGain();
    const wet = ctx.createGain();
    wet.gain.value = 0.55;
    const conv = makeReverb(ctx);
    send.connect(conv);
    conv.connect(wet);
    wet.connect(m);
    bus = { c: ctx, m, send };
    // 2 seconds of white noise, reused by every whoosh
    noiseBuf = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
    const data = noiseBuf.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
  }
  if (ctx.state === 'suspended') void ctx.resume();
  return bus;
}

/** One enveloped oscillator. `wet` (0–1) sends a copy to the reverb. */
function tone(type: OscillatorType, f0: number, f1: number, dur: number, vol: number, delay = 0, wet = 0, attack = 0.01) {
  const g = graph();
  if (!g) return;
  const { c, m, send } = g;
  const t = c.currentTime + delay;
  const o = c.createOscillator();
  const env = c.createGain();
  o.type = type;
  o.frequency.setValueAtTime(f0, t);
  if (f1 !== f0) o.frequency.exponentialRampToValueAtTime(Math.max(1, f1), t + dur);
  env.gain.setValueAtTime(0.0001, t);
  env.gain.exponentialRampToValueAtTime(vol, t + Math.min(attack, dur * 0.6));
  env.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(env);
  env.connect(m);
  if (wet > 0) {
    const w = c.createGain();
    w.gain.value = wet;
    env.connect(w);
    w.connect(send);
  }
  o.start(t);
  o.stop(t + dur + 0.05);
}

/** Band-passed noise sweep with optional stereo pan movement — the "whoosh" building block. */
function sweep(f0: number, f1: number, dur: number, vol: number, q = 1, delay = 0, wet = 0, pan0 = 0, pan1 = 0) {
  const g = graph();
  if (!g || !noiseBuf) return;
  const { c, m, send } = g;
  const t = c.currentTime + delay;
  const src = c.createBufferSource();
  src.buffer = noiseBuf;
  const filter = c.createBiquadFilter();
  filter.type = 'bandpass';
  filter.Q.value = q;
  filter.frequency.setValueAtTime(f0, t);
  filter.frequency.exponentialRampToValueAtTime(Math.max(20, f1), t + dur);
  const env = c.createGain();
  env.gain.setValueAtTime(0.0001, t);
  env.gain.exponentialRampToValueAtTime(vol, t + dur * 0.4);
  env.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  src.connect(filter);
  filter.connect(env);
  let out: AudioNode = env;
  if ((pan0 !== 0 || pan1 !== 0) && typeof c.createStereoPanner === 'function') {
    const p = c.createStereoPanner();
    p.pan.setValueAtTime(pan0, t);
    p.pan.linearRampToValueAtTime(pan1, t + dur);
    env.connect(p);
    out = p;
  }
  out.connect(m);
  if (wet > 0) {
    const w = c.createGain();
    w.gain.value = wet;
    out.connect(w);
    w.connect(send);
  }
  src.start(t, Math.random() * 1.2, dur + 0.05);
}

/** Soft sine + octave-triangle "glass pluck". */
function pluck(freq: number, dur: number, vol: number, delay = 0, wet = 0.3) {
  tone('sine', freq, freq, dur, vol, delay, wet, 0.004);
  tone('triangle', freq * 2, freq * 2, dur * 0.55, vol * 0.3, delay, wet, 0.004);
}

// A-minor-pentatonic: hovering across the page plays a gentle, never-clashing melody.
const SCALE = [523.25, 587.33, 659.25, 783.99, 880, 1046.5, 1174.66];
let lastNote = -1;
function nextNote(): number {
  let i = lastNote;
  while (i === lastNote) i = Math.floor(Math.random() * SCALE.length);
  lastNote = i;
  return SCALE[i];
}

/** One heavy "tudum" hit: sub drop + body + a burst of low noise. */
function hit(delay: number, vol: number) {
  tone('sine', 110, 38, 1.4, 0.62 * vol, delay, 0.12);
  tone('sine', 55, 32, 1.9, 0.5 * vol, delay, 0.05);
  tone('triangle', 240, 60, 0.28, 0.12 * vol, delay);
  sweep(60, 520, 0.5, 0.12 * vol, 0.7, delay, 0.2);
}

/** Shimmering A-minor(add9) chord that blooms after the hit. */
function bloom(delay: number, vol: number, dur: number) {
  [220, 329.63, 440, 659.25, 987.77].forEach((f, i) => tone('sine', f, f * 1.004, dur, vol, delay + i * 0.045, 0.7, 0.35));
  sweep(300, 5200, dur * 0.85, vol * 1.6, 0.8, delay, 0.5, -0.55, 0.55);
}

let lastHover = 0;

export const sfx = {
  /** glassy pentatonic ping when the pointer lands on something clickable */
  hover() {
    const now = performance.now();
    if (now - lastHover < 90) return;
    lastHover = now;
    pluck(nextNote(), 0.16, 0.026, 0, 0.35);
  },
  /** tactile click: low thock + bright tick + a note */
  click() {
    tone('sine', 210, 70, 0.08, 0.17);
    sweep(3200, 7000, 0.05, 0.05, 0.7);
    pluck(1318.5, 0.2, 0.04, 0.012, 0.3);
  },
  /** stereo-panned air whoosh for scroll / section jumps */
  whoosh() {
    sweep(200, 3400, 0.65, 0.12, 0.9, 0, 0.3, -0.75, 0.75);
    tone('sine', 140, 460, 0.6, 0.03, 0, 0.2, 0.2);
  },
  /** the signature double-hit + bloom — entering the series */
  boom() {
    hit(0, 1);
    hit(0.34, 1.1);
    bloom(0.34, 0.032, 2.8);
  },
  /** cinematic riser for the opening titles */
  swell() {
    sweep(100, 2600, 2.3, 0.1, 0.7, 0, 0.4, -0.45, 0.45);
    [110, 164.81, 220, 329.63].forEach((f, i) => tone('sine', f, f * 2, 2.3, 0.04, i * 0.05, 0.5, 1.5));
  },
  /** the name reveal: impact + shimmer */
  reveal() {
    tone('sine', 62, 38, 1.9, 0.52, 0, 0.2);
    sweep(150, 4600, 1.5, 0.09, 0.9, 0, 0.4, -0.6, 0.6);
    bloom(0.05, 0.02, 2.2);
  },
  /** overlay opens: rising arpeggio */
  open() {
    pluck(659.25, 0.34, 0.05, 0, 0.4);
    pluck(783.99, 0.34, 0.045, 0.06, 0.4);
    pluck(987.77, 0.5, 0.045, 0.12, 0.45);
    sweep(500, 2600, 0.38, 0.04, 1, 0, 0.3, -0.3, 0.3);
  },
  /** overlay closes: falling arpeggio */
  close() {
    pluck(987.77, 0.28, 0.04, 0, 0.35);
    pluck(783.99, 0.28, 0.035, 0.06, 0.35);
    pluck(659.25, 0.4, 0.035, 0.12, 0.4);
    sweep(2200, 300, 0.32, 0.03, 1, 0, 0.2, 0.3, -0.3);
  },
  /** slide change in the highlight reel */
  tick() {
    pluck(1567.98, 0.12, 0.03, 0, 0.35);
  },
  /** played once, the first time audio is unlocked / switched on */
  chime() {
    pluck(659.25, 0.55, 0.05, 0, 0.5);
    pluck(987.77, 0.75, 0.045, 0.1, 0.5);
    pluck(1318.5, 1.0, 0.035, 0.2, 0.55);
  },
};

export function setSoundEnabled(next: boolean) {
  enabled = next;
  try {
    localStorage.setItem(KEY, next ? 'on' : 'off');
  } catch {
    /* ignore */
  }
  emit();
  if (next) sfx.chime();
}

export function toggleSound() {
  // the very first click also unlocks audio — don't let it immediately flip the setting
  if (performance.now() - unlockedAt < 500) return;
  setSoundEnabled(!enabled);
}

/**
 * Wires up the global behaviour: unlock audio on the first gesture, then play hover / click
 * sounds for anything interactive via event delegation (no per-component code needed).
 */
export function bindGlobalSfx(): () => void {
  const SELECTOR = 'a,button,[role="button"],[data-cursor]';
  let lastEl: Element | null = null;

  const unlock = () => {
    if (unlocked) return;
    unlocked = true;
    unlockedAt = performance.now();
    emit();
    sfx.chime();
  };
  const over = (e: PointerEvent) => {
    if (e.pointerType !== 'mouse') return;
    const el = (e.target as Element | null)?.closest(SELECTOR) ?? null;
    if (el && el !== lastEl) sfx.hover();
    lastEl = el;
  };
  const click = (e: MouseEvent) => {
    const el = (e.target as Element | null)?.closest(SELECTOR);
    if (el && !el.closest('[data-sfx="off"]')) sfx.click();
  };

  window.addEventListener('pointerdown', unlock, { passive: true });
  window.addEventListener('keydown', unlock);
  window.addEventListener('pointerover', over, { passive: true });
  window.addEventListener('click', click);
  return () => {
    window.removeEventListener('pointerdown', unlock);
    window.removeEventListener('keydown', unlock);
    window.removeEventListener('pointerover', over);
    window.removeEventListener('click', click);
  };
}

export function useSound(): State {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => snapshot,
    () => snapshot,
  );
}
