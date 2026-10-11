import { lazy, Suspense, useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { viewerProfiles, type ProfileId, type Project, type SectionId } from './data/portfolio';
import { SmoothScrollProvider, useSmoothScroll } from './hooks/smoothScroll';
import { bindGlobalSfx, sfx } from './hooks/sound';
import CustomCursor from './components/CustomCursor';
import CursorGlow from './components/CursorGlow';
import SoundToggle from './components/SoundToggle';
import ScrollProgress from './components/ScrollProgress';
import Marquee from './components/Marquee';
import Stats from './components/Stats';
import MyList from './components/MyList';
import ContactForm from './components/ContactForm';
import OpeningSequence from './components/OpeningSequence';
import ProfileSelector from './components/ProfileSelector';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ContinueWatching from './components/ContinueWatching';
import Scene from './components/Scene';
import About from './components/About';
import Seasons from './components/Seasons';
import Originals from './components/Originals';
import TopPicks from './components/TopPicks';
import Skills from './components/Skills';
import Achievements from './components/Achievements';
import ResumeSection from './components/ResumeViewer';
import FinalCTA from './components/FinalCTA';
import { EASE } from './components/fx';

// Overlays are only needed on demand — split them out of the first load.
const PlayIntro = lazy(() => import('./components/PlayIntro'));
const ProjectModal = lazy(() => import('./components/ProjectModal'));
const ResumeModal = lazy(() => import('./components/ResumeModal'));
const CommandPalette = lazy(() => import('./components/CommandPalette'));

type Stage = 'opening' | 'profiles' | 'home';

const STORAGE_KEY = 'anish-series-profile';

function readStoredProfile(): ProfileId | null {
  try {
    const v = sessionStorage.getItem(STORAGE_KEY);
    return viewerProfiles.some((p) => p.id === v) ? (v as ProfileId) : null;
  } catch {
    return null;
  }
}

export default function App() {
  return (
    <SmoothScrollProvider>
      <Series />
    </SmoothScrollProvider>
  );
}

function Series() {
  const stored = readStoredProfile();
  const [stage, setStage] = useState<Stage>(stored ? 'home' : 'opening');
  const [profileId, setProfileId] = useState<ProfileId>(stored ?? 'anish');
  const [playing, setPlaying] = useState(false);
  const [project, setProject] = useState<Project | null>(null);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const { scrollTo, lock, unlock } = useSmoothScroll();

  const order = viewerProfiles.find((p) => p.id === profileId)!.order;

  // toasts requested from anywhere (e.g. My List) + Ctrl/⌘+K and "/" to search
  useEffect(() => {
    const onToast = (e: Event) => setToast((e as CustomEvent<string>).detail);
    const onKey = (e: KeyboardEvent) => {
      if (stage !== 'home') return;
      const tag = (e.target as HTMLElement | null)?.tagName;
      const typing = tag === 'INPUT' || tag === 'TEXTAREA';
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen((o) => !o);
      } else if (e.key === '/' && !typing) {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('anish-toast', onToast);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('anish-toast', onToast);
      window.removeEventListener('keydown', onKey);
    };
  }, [stage]);

  // global hover/click sounds + audio unlock on first gesture
  useEffect(() => bindGlobalSfx(), []);

  // overlay open/close sounds (skip the very first render)
  const overlaysOpen = playing || project !== null || resumeOpen || searchOpen;
  const wasOpen = useRef(false);
  useEffect(() => {
    if (overlaysOpen && !wasOpen.current) sfx.open();
    if (!overlaysOpen && wasOpen.current) sfx.close();
    wasOpen.current = overlaysOpen;
  }, [overlaysOpen]);

  useEffect(() => {
    if (stage === 'home') return;
    lock();
    return unlock;
  }, [stage, lock, unlock]);

  const pickProfile = useCallback(
    (id: ProfileId) => {
      setProfileId(id);
      try {
        sessionStorage.setItem(STORAGE_KEY, id);
      } catch {
        /* storage unavailable — profile simply won't persist */
      }
      if (stage !== 'home') {
        sfx.boom();
        window.scrollTo(0, 0);
        setStage('home');
      } else {
        const p = viewerProfiles.find((v) => v.id === id)!;
        setToast(`Now watching as ${p.name} — ${p.blurb.toLowerCase()}`);
        scrollTo(0, { offset: 0 });
      }
    },
    [stage, scrollTo],
  );

  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(null), 3200);
    return () => clearTimeout(t);
  }, [toast]);

  const closeIntro = useCallback(() => setPlaying(false), []);
  const closeProject = useCallback(() => setProject(null), []);
  const closeResume = useCallback(() => setResumeOpen(false), []);
  const closeSearch = useCallback(() => setSearchOpen(false), []);
  const openResume = useCallback(() => setResumeOpen(true), []);
  const replay = useCallback(() => setStage('opening'), []);

  const sections: Record<SectionId, ReactNode> = {
    about: <About />,
    journey: <Seasons onOpenProject={setProject} />,
    originals: <Originals onOpen={setProject} />,
    picks: <TopPicks />,
    skills: <Skills />,
    moments: <Achievements />,
    story: <ResumeSection onView={() => setResumeOpen(true)} />,
  };

  return (
    <LayoutGroup>
      <CursorGlow />
      <div className="grain" aria-hidden />
      <CustomCursor />
      <SoundToggle />

      <AnimatePresence>
        {stage === 'opening' && <OpeningSequence key="opening" onDone={() => setStage('profiles')} />}
        {stage === 'profiles' && <ProfileSelector key="profiles" onPick={pickProfile} />}
      </AnimatePresence>

      {stage === 'home' && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: EASE }}>
          <ScrollProgress />
          <Navbar order={order} profileId={profileId} onSwitch={pickProfile} onSearch={() => setSearchOpen(true)} />
          <main>
            <Hero key={`hero-${profileId}`} onPlay={() => setPlaying(true)} onResume={() => setResumeOpen(true)} profileId={profileId} />
            <ContinueWatching order={order} />
            <Marquee />
            <Stats />
            <MyList onOpen={setProject} />
            {order.map((id) => (
              <Scene key={id} id={id} className={id === 'originals' ? '!py-0 sm:!py-0' : ''}>
                {sections[id]}
              </Scene>
            ))}
            <ContactForm />
            <FinalCTA onReplay={() => setStage('opening')} />
          </main>
        </motion.div>
      )}

      <Suspense fallback={null}>
        <AnimatePresence>{playing && <PlayIntro key="intro" onClose={closeIntro} />}</AnimatePresence>
        <AnimatePresence>{project && <ProjectModal key="project" project={project} onClose={closeProject} onSwitch={setProject} />}</AnimatePresence>
        <AnimatePresence>{resumeOpen && <ResumeModal key="resume" onClose={closeResume} />}</AnimatePresence>
        <AnimatePresence>{searchOpen && <CommandPalette key="search" order={order} onClose={closeSearch} onOpenProject={setProject} onOpenResume={openResume} onReplay={replay} />}</AnimatePresence>
      </Suspense>

      <AnimatePresence>
        {toast && (
          <motion.div
            role="status"
            className="glass fixed bottom-6 left-1/2 z-[150] w-[min(92vw,420px)] -translate-x-1/2 rounded-xl px-5 py-3 text-center text-sm text-bone"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </LayoutGroup>
  );
}
