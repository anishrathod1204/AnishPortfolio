import { motion } from 'framer-motion';
import { projects, type Project } from '../data/portfolio';
import { toggleList, useMyList } from '../hooks/myList';
import { EASE } from './fx';
import { PosterBackdrop } from './Poster';

/** "+ My List" toggle used on project cards and in the project overlay. */
export function MyListButton({ project, solid = false }: { project: Project; solid?: boolean }) {
  const saved = useMyList().includes(project.id);
  return (
    <button
      type="button"
      data-cursor="link"
      aria-pressed={saved}
      onClick={(e) => {
        e.stopPropagation();
        toggleList(project.id, project.title);
      }}
      onKeyDown={(e) => e.stopPropagation()}
      className={`flex min-h-11 items-center gap-2 rounded-md px-4 text-sm font-semibold transition ${
        solid
          ? saved
            ? 'bg-crimson text-white hover:bg-crimson-2'
            : 'border border-white/25 text-bone hover:border-bone'
          : saved
            ? 'border border-crimson-2 bg-black/50 text-crimson-2'
            : 'border border-white/25 bg-black/50 text-bone hover:border-bone'
      }`}
    >
      <span aria-hidden className="text-base leading-none">{saved ? '✓' : '＋'}</span>
      {saved ? 'In My List' : 'My List'}
    </button>
  );
}

/** A row of the projects the visitor saved. Renders nothing until something is added. */
export default function MyList({ onOpen }: { onOpen: (p: Project) => void }) {
  const ids = useMyList();
  const saved = projects.filter((p) => ids.includes(p.id));
  if (saved.length === 0) return null;

  return (
    <section aria-label="My List" className="gutter pb-4 pt-2">
      <h2 className="mb-4 font-sans text-lg font-semibold tracking-tight text-bone sm:text-2xl">
        My List <span className="text-sm font-normal text-mist">· {saved.length} saved</span>
      </h2>
      <div className="rail flex gap-3 overflow-x-auto pb-2">
        {saved.map((p) => (
          <motion.div
            key={p.id}
            className="relative aspect-video w-[72vw] shrink-0 overflow-hidden rounded-lg ring-1 ring-white/10 sm:w-[300px]"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <PosterBackdrop palette={p.palette} />
            <button type="button" onClick={() => onOpen(p)} data-cursor="play" className="absolute inset-0 flex flex-col justify-end p-4 text-left" aria-label={`Open ${p.title}`}>
              <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-bone/70">{p.genre}</span>
              <span className="font-display text-3xl leading-none text-bone">{p.title}</span>
            </button>
            <button
              type="button"
              onClick={() => toggleList(p.id, p.title)}
              aria-label={`Remove ${p.title} from My List`}
              className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-xs text-bone transition hover:bg-black"
            >
              ✕
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
