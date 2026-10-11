import { useEffect, useMemo, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from 'react';
import { motion } from 'framer-motion';
import { profile, projects, sectionMeta, skillCategories, type Project, type SectionId } from '../data/portfolio';
import { useScrollLock, useSmoothScroll } from '../hooks/smoothScroll';
import { setSoundEnabled, useSound } from '../hooks/sound';
import { EASE } from './fx';

type Item = { id: string; label: string; hint: string; group: string; run: () => void };

/** Ctrl/⌘ + K — search the whole portfolio and jump anywhere. */
export default function CommandPalette({
  order,
  onClose,
  onOpenProject,
  onOpenResume,
  onReplay,
}: {
  order: SectionId[];
  onClose: () => void;
  onOpenProject: (p: Project) => void;
  onOpenResume: () => void;
  onReplay: () => void;
}) {
  useScrollLock(true);
  const { scrollTo } = useSmoothScroll();
  const { enabled } = useSound();
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);

  const items = useMemo<Item[]>(() => {
    const go = (id: string) => () => scrollTo(`#${id}`);
    const list: Item[] = [{ id: 'home', label: 'Home', hint: 'Back to the top', group: 'Navigate', run: () => scrollTo(0, { offset: 0 }) }];
    order.forEach((id) => list.push({ id: `s-${id}`, label: sectionMeta[id].card, hint: sectionMeta[id].meta, group: 'Navigate', run: go(id) }));
    list.push({ id: 'contact-form', label: 'Request an Episode', hint: 'Send a message', group: 'Navigate', run: go('request') });
    projects.forEach((p) => list.push({ id: `p-${p.id}`, label: p.title, hint: p.genre, group: 'Originals', run: () => onOpenProject(p) }));
    skillCategories.forEach((c) => c.skills.forEach((s) => list.push({ id: `k-${s.name}`, label: s.name, hint: `Skill · ${c.title}`, group: 'Skills', run: go('skills') })));
    list.push(
      { id: 'resume', label: 'View Resume', hint: 'Open the PDF viewer', group: 'Actions', run: onOpenResume },
      {
        id: 'download',
        label: 'Download Resume',
        hint: 'PDF',
        group: 'Actions',
        run: () => {
          const a = document.createElement('a');
          a.href = profile.resumePdf;
          a.download = 'Anish_Rathod_Resume.pdf';
          a.click();
        },
      },
      { id: 'github', label: 'GitHub', hint: 'Opens in a new tab', group: 'Links', run: () => window.open(profile.links.github, '_blank', 'noopener') },
      { id: 'linkedin', label: 'LinkedIn', hint: 'Opens in a new tab', group: 'Links', run: () => window.open(profile.links.linkedin, '_blank', 'noopener') },
      { id: 'email', label: 'Email Anish', hint: profile.email, group: 'Links', run: () => (window.location.href = `mailto:${profile.email}`) },
      { id: 'sound', label: enabled ? 'Mute sound' : 'Turn sound on', hint: 'Sound effects', group: 'Actions', run: () => setSoundEnabled(!enabled) },
      { id: 'replay', label: 'Replay opening', hint: 'Watch the titles again', group: 'Actions', run: onReplay },
    );
    return list;
  }, [order, scrollTo, onOpenProject, onOpenResume, onReplay, enabled]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items.filter((i) => i.group === 'Navigate' || i.group === 'Originals' || i.group === 'Actions');
    return items.filter((i) => `${i.label} ${i.hint} ${i.group}`.toLowerCase().includes(q)).slice(0, 30);
  }, [items, query]);

  useEffect(() => setActive(0), [query]);

  useEffect(() => {
    listRef.current?.querySelector<HTMLElement>(`[data-i="${active}"]`)?.scrollIntoView({ block: 'nearest' });
  }, [active]);

  const choose = (item: Item | undefined) => {
    if (!item) return;
    onClose();
    // let the overlay release its scroll lock before running navigation
    window.setTimeout(item.run, 320);
  };

  const onKey = (e: ReactKeyboardEvent) => {
    if (e.key === 'Escape') onClose();
    else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((a) => Math.min(results.length - 1, a + 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((a) => Math.max(0, a - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      choose(results[active]);
    }
  };

  let lastGroup = '';
  return (
    <motion.div
      className="fixed inset-0 z-[165] flex items-start justify-center px-3 pt-[12vh] sm:px-6"
      role="dialog"
      aria-modal="true"
      aria-label="Search"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onKeyDown={onKey}
    >
      <div className="absolute inset-0 bg-black/80" onClick={onClose} />
      <motion.div
        className="relative w-full max-w-xl overflow-hidden rounded-2xl bg-ink-2 shadow-[0_30px_100px_rgba(0,0,0,0.8)] ring-1 ring-white/15"
        initial={{ opacity: 0, y: -16, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -10, scale: 0.98 }}
        transition={{ duration: 0.3, ease: EASE }}
      >
        <div className="flex items-center gap-3 border-b border-white/10 px-4">
          <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-smoke" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-3.5-3.5" />
          </svg>
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects, skills, sections…"
            aria-label="Search"
            className="h-14 w-full bg-transparent text-base text-bone placeholder:text-smoke focus:outline-none"
          />
          <kbd className="hidden rounded border border-white/20 px-1.5 py-0.5 text-[10px] text-smoke sm:block">ESC</kbd>
        </div>
        <div ref={listRef} data-lenis-prevent className="max-h-[52vh] overflow-y-auto overscroll-contain p-2">
          {results.length === 0 && <p className="px-3 py-8 text-center text-sm text-mist">No results for “{query}”.</p>}
          {results.map((r, i) => {
            const header = r.group !== lastGroup ? r.group : null;
            lastGroup = r.group;
            return (
              <div key={r.id}>
                {header && <p className="px-3 pb-1 pt-3 text-[10px] font-bold uppercase tracking-[0.26em] text-smoke">{header}</p>}
                <button
                  type="button"
                  data-i={i}
                  onMouseMove={() => setActive(i)}
                  onClick={() => choose(r)}
                  className={`flex w-full items-center justify-between gap-4 rounded-lg px-3 py-2.5 text-left transition-colors ${i === active ? 'bg-white/10' : ''}`}
                >
                  <span className="text-sm font-medium text-bone">{r.label}</span>
                  <span className="truncate text-xs text-smoke">{r.hint}</span>
                </button>
              </div>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}
