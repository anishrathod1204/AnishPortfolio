import { useSyncExternalStore } from 'react';

/** "My List" — projects the visitor saved. Lives in localStorage, never leaves the browser. */
const KEY = 'anish-my-list';

function read(): string[] {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) ?? '[]') as unknown;
    return Array.isArray(v) ? v.filter((x): x is string => typeof x === 'string') : [];
  } catch {
    return [];
  }
}

let ids: string[] = read();
const listeners = new Set<() => void>();

export function toggleList(id: string, title: string) {
  const has = ids.includes(id);
  ids = has ? ids.filter((x) => x !== id) : [...ids, id];
  try {
    localStorage.setItem(KEY, JSON.stringify(ids));
  } catch {
    /* storage unavailable — list lasts for this visit only */
  }
  listeners.forEach((l) => l());
  window.dispatchEvent(new CustomEvent<string>('anish-toast', { detail: has ? `Removed ${title} from My List` : `Added ${title} to My List` }));
}

export function useMyList(): string[] {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => ids,
    () => ids,
  );
}
