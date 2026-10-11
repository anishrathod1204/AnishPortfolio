import { motion } from 'framer-motion';
import { projects, type Episode, type Project } from '../data/portfolio';
import { useSmoothScroll } from '../hooks/smoothScroll';
import { EASE, Tilt } from './fx';
import { PosterBackdrop } from './Poster';

export default function EpisodeCard({ episode, index, onOpenProject }: { episode: Episode; index: number; onOpenProject: (p: Project) => void }) {
  const [season, ep] = episode.code.split(' ');
  const { scrollTo } = useSmoothScroll();
  const target = episode.target;
  const go = () => {
    if (!target) return;
    if ('project' in target) {
      const p = projects.find((x) => x.id === target.project);
      if (p) onOpenProject(p);
    } else {
      scrollTo(`#${target.section}`);
    }
  };
  return (
    <motion.article
      className="w-[80vw] shrink-0 snap-start sm:w-[52vw] md:w-[38vw] lg:w-[30vw] xl:w-[26vw]"
      initial={{ opacity: 0, y: 30, rotateY: -8 }}
      animate={{ opacity: 1, y: 0, rotateY: 0 }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: EASE }}
    >
      <Tilt max={7} className="group h-full rounded-xl">
        <div onClick={go} className={`flex h-full flex-col overflow-hidden rounded-xl bg-ink-2 ring-1 ring-white/10 transition duration-500 group-hover:ring-crimson-2/60 ${target ? 'cursor-pointer' : ''}`}>
          <div className="relative aspect-video overflow-hidden">
            <div className="absolute inset-0 transition-transform duration-[1.2s] ease-[var(--ease-cine)] group-hover:scale-110">
              <PosterBackdrop palette={episode.palette}>
                <span className="absolute -bottom-6 right-2 font-display text-[7.5rem] leading-none text-white/[0.09]">{ep}</span>
              </PosterBackdrop>
            </div>
            <div className="absolute left-4 top-4 flex items-center gap-2">
              <span className="rounded bg-black/60 px-2 py-0.5 text-[10px] font-bold tracking-[0.2em] text-bone">{season}</span>
              <span className="text-[10px] font-bold tracking-[0.2em] text-bone/80">EPISODE {ep.replace('E', '')}</span>
            </div>
            <h4 className="absolute bottom-4 left-4 right-4 font-display text-3xl leading-none tracking-wide text-bone [transform:translateZ(30px)] sm:text-4xl">{episode.title}</h4>
          </div>
          <div className="flex flex-1 flex-col p-4">
            <div className="mb-2 flex items-center justify-between text-[11px] text-smoke">
              <span className="font-semibold text-mist">{episode.runtime}</span>
              <button
                type="button"
                data-cursor="play"
                aria-label={`Watch ${episode.title}`}
                onClick={(e) => {
                  e.stopPropagation();
                  go();
                }}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 text-[11px] text-bone transition hover:scale-110 hover:border-bone hover:bg-bone hover:text-ink group-hover:border-bone"
              >
                ▶
              </button>
            </div>
            <p className="text-sm leading-relaxed text-bone/80">{episode.description}</p>
            <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
              {episode.tags.map((t) => (
                <span key={t} className="rounded-full bg-white/[0.06] px-2.5 py-1 text-[11px] text-mist">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Tilt>
    </motion.article>
  );
}
