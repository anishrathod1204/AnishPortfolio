import { useEffect, useSyncExternalStore, type RefObject } from 'react';

/**
 * Tracks how much of each section the visitor has actually watched (0–1),
 * so the "Continue Exploring" progress bars reflect real viewing, not fake numbers.
 */
const progress: Record<string, number> = {};
const listeners = new Set<() => void>();
let snapshot = { ...progress };

function set(id: string, value: number) {
  if ((progress[id] ?? 0) >= value) return;
  progress[id] = value;
  snapshot = { ...progress };
  listeners.forEach((l) => l());
}

export function useWatchProgress() {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => snapshot,
    () => snapshot,
  );
}

const tracked = new Map<string, HTMLElement>();
let queued = false;
let bound = false;

function measureAll() {
  queued = false;
  const vh = window.innerHeight;
  tracked.forEach((el, id) => {
    const r = el.getBoundingClientRect();
    const seen = (vh - r.top) / (r.height + vh * 0.25);
    set(id, Math.min(1, Math.max(0, seen)));
  });
}

function schedule() {
  if (!queued) {
    queued = true;
    requestAnimationFrame(measureAll);
  }
}

export function useTrackProgress(id: string, ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    tracked.set(id, el);
    if (!bound) {
      bound = true;
      window.addEventListener('scroll', schedule, { passive: true });
      window.addEventListener('resize', schedule, { passive: true });
    }
    schedule();
    return () => {
      tracked.delete(id);
      if (tracked.size === 0) {
        bound = false;
        window.removeEventListener('scroll', schedule);
        window.removeEventListener('resize', schedule);
      }
    };
  }, [id, ref]);
}
