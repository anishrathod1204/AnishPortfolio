/**
 * Central portfolio data — generated from Anish's resume (Anish_Rathod_Resume_Final.pdf).
 * Every fact on the site comes from this file. Update it here and the whole site follows.
 * Nothing here should be added unless it appears on the resume.
 */

export type Palette = { from: string; via: string; to: string; accent: string };

export const profile = {
  fullName: 'Anish Rathod',
  displayName: 'Anish Rathod',
  firstName: 'ANISH',
  seriesTag: 'THE SERIES',
  /** Fictional studio card shown at the very start of the opening sequence. */
  originalLabel: 'ANISH RATHOD ORIGINAL',
  role: 'Full-Stack Developer',
  tagline: ['Full-Stack', 'Machine Learning', 'Data Analytics'],
  intro:
    'A pre-final year Computer Science Engineering student building full-stack web apps, machine learning systems and data analytics pipelines — four end-to-end production-grade projects, from data pipelines to polished interfaces.',
  location: 'Pune',
  email: 'anishrathod.despu.cse@gmail.com',
  phone: '9326807207',
  links: {
    linkedin: 'https://www.linkedin.com/in/anish-rathod-a79720236',
    github: 'https://github.com/anishrathod1204',
  },
  resumePdf: '/assets/Anish_Rathod_Resume.pdf',
  portrait: {
    src: '/assets/portrait-720.webp',
    srcSet: '/assets/portrait-420.webp 420w, /assets/portrait-720.webp 720w, /assets/portrait-1100.webp 1100w',
    alt: 'Portrait of Anish Rathod',
  },
  interests: ['Cloud-Native Design', 'Scalable System Design', 'Full-Stack Development'],
};

export const education = [
  {
    school: 'Deccan Education Society',
    place: 'Pune',
    degree: 'B.Tech in Computer Science Engineering',
    period: 'August 2023 – Present',
    score: 'Pre-final year',
  },
  {
    school: "JSPM's RSCOE",
    place: 'Tathawade',
    degree: 'Diploma in Computer Science Engineering',
    period: 'July 2020 – May 2023',
    score: 'Completed',
  },
];

export const experience = [
  {
    company: 'Zaalima Development Pvt. Ltd.',
    role: 'Data Analytics Intern',
    place: 'Remote',
    period: 'Aug 2026 – Nov 2026',
    points: [
      'Selected for a performance-based Data Analytics internship at Zaalima Development, working on live data-driven projects under flexible working hours.',
      'Evaluated periodically on work quality, deadline adherence, and teamwork, with responsibilities spanning data analysis and reporting.',
    ],
  },
  {
    company: 'Diamond Mindglance Pvt. Ltd.',
    role: 'Web Designer Intern',
    place: '',
    period: '6 Weeks',
    points: [
      'Designed and developed fully responsive web pages following clean UI/UX principles, improving visual consistency and layout structure across the product.',
      'Applied modern front-end best practices to enhance usability, accessibility, and overall user experience in a professional team environment.',
    ],
  },
];

export type Metric = { value: string; label: string };

export type Project = {
  id: string;
  title: string;
  year: string;
  genre: string;
  logline: string;
  stack: string[];
  build: string[];
  features: string[];
  metrics: Metric[];
  /** Omit when the repository isn't public / isn't on the resume — the GitHub button is hidden instead of linking to a 404. */
  github?: string;
  palette: Palette;
  motif: 'shield' | 'flow' | 'tenants' | 'scan';
};

export const projects: Project[] = [
  {
    id: 'diabetessense',
    title: 'DiabetesSense',
    year: 'ML',
    genre: 'Machine Learning • Healthcare • React',
    logline: 'An ML-powered risk predictor for Type-2 Diabetes & CVD comorbidity, built on the CDC NHANES dataset.',
    stack: ['Python', 'Scikit-Learn', 'Pandas', 'NumPy', 'React 18', 'Vite', 'Recharts', 'Vercel'],
    build: [
      'Built an end-to-end ML system predicting concurrent Type-2 Diabetes & CVD risk using the CDC NHANES dataset with lifestyle and biochemical markers.',
      'Engineered feature extraction and preprocessing pipelines with Pandas & NumPy; trained classification models with scikit-learn achieving strong validation metrics.',
      'Developed an interactive React 18 + Vite frontend with Recharts visualisations and custom Glassmorphism UI; deployed on Vercel.',
    ],
    features: [
      'Concurrent Type-2 Diabetes & CVD risk prediction',
      'Feature extraction & preprocessing pipelines',
      'Interactive Recharts visualisations',
      'Custom Glassmorphism UI',
      'Deployed on Vercel',
    ],
    metrics: [
      { value: '2', label: 'conditions predicted together — Type-2 Diabetes & CVD' },
      { value: 'NHANES', label: 'CDC dataset with lifestyle & biochemical markers' },
      { value: 'React 18', label: 'Vite frontend with Recharts' },
      { value: 'Vercel', label: 'deployed live' },
    ],
    palette: { from: '#03150f', via: '#0d5a40', to: '#050a08', accent: '#46e3a8' },
    motif: 'tenants',
  },
  {
    id: 'phishguard',
    title: 'PhishGuard',
    year: 'ML',
    genre: 'Machine Learning • Security • Real-Time',
    logline: 'An ML ensemble phishing URL detector with real-time risk scoring and a full analytics dashboard.',
    stack: ['Python', 'Scikit-Learn', 'React', 'Tailwind CSS v4', 'Framer Motion'],
    build: [
      'Engineered extraction of 40+ URL features powering a 4-model ML ensemble with high phishing detection accuracy, including HTTPS-aware logic.',
      'Designed a real-time risk gauge, threat indicator breakdown, and analytics dashboard with full scan history; deployed live with Tailwind CSS v4 and Framer Motion.',
    ],
    features: [
      '40+ URL features extracted',
      '4-model ML ensemble',
      'HTTPS-aware detection logic',
      'Real-time risk gauge & threat indicator breakdown',
      'Analytics dashboard with full scan history',
    ],
    metrics: [
      { value: '40+', label: 'URL features extracted' },
      { value: '4', label: 'models in the ensemble' },
      { value: 'Live', label: 'real-time risk scoring, deployed' },
    ],
    palette: { from: '#2a0610', via: '#7a0f24', to: '#0b0710', accent: '#ff3d5a' },
    motif: 'shield',
  },
  {
    id: 'feedaneed',
    title: 'FeedaNeed',
    year: 'Full-Stack',
    genre: 'Full-Stack • TypeScript • Role-Based Auth',
    logline: 'A full-stack food donation platform connecting donors, recipients and admins with role-based access.',
    stack: ['TypeScript', 'React', 'Tailwind CSS', 'Vercel'],
    build: [
      'Architected a donor-recipient-admin role-based platform with personalised dashboards, real-time analytics, and in-app notifications for tracking donation activity.',
      'Built with TypeScript for end-to-end type safety across a large component tree; fully responsive animated UI deployed on Vercel.',
    ],
    features: [
      'Donor, recipient & admin roles',
      'Personalised dashboards',
      'Real-time analytics',
      'In-app notifications',
      'Fully responsive animated UI',
    ],
    metrics: [
      { value: '3', label: 'roles — donor, recipient, admin' },
      { value: 'TypeScript', label: 'end-to-end type safety' },
      { value: 'Real-time', label: 'analytics & in-app notifications' },
      { value: 'Vercel', label: 'deployed live' },
    ],
    palette: { from: '#1a0d02', via: '#8a4a07', to: '#0a0806', accent: '#ffb547' },
    motif: 'flow',
  },
  {
    id: 'alpr-research',
    title: 'Hybrid ML Licence Plate Recognition',
    year: 'Research',
    genre: 'Research Paper • Computer Vision • Apr – Jun 2026',
    logline: 'A co-authored, published research paper on a hybrid machine learning-based Automatic License Plate Recognition system.',
    stack: ['HOG', 'LBP', 'OCR', 'SVM', 'Random Forest', 'CNN', 'K-Means'],
    build: [
      'Co-authored a published research paper on a multi-stage ALPR pipeline (HOG, LBP, OCR, SVM, Random Forest, CNN, K-Means).',
      'Designed the pipeline to improve recognition robustness under challenging real-world conditions, including varying lighting and motion blur.',
    ],
    features: [
      'Multi-stage ALPR pipeline',
      'HOG & LBP feature extraction',
      'SVM, Random Forest & CNN classification',
      'K-Means clustering',
      'Robust to varying lighting and motion blur',
    ],
    metrics: [
      { value: '7', label: 'techniques in the pipeline' },
      { value: '1', label: 'published research paper' },
      { value: 'Co-author', label: 'Apr 2026 – Jun 2026' },
    ],
    palette: { from: '#04121f', via: '#0f4c6e', to: '#05080d', accent: '#4cc9ff' },
    motif: 'scan',
  },
];

export type Achievement = {
  id: string;
  title: string;
  org: string;
  detail: string;
  laurel: string;
  link?: string;
};

export const achievements: Achievement[] = [
  {
    id: 'research-paper',
    title: 'Published Research',
    org: 'ALPR Research Paper',
    detail: 'Co-authored a published paper on a hybrid machine learning-based Automatic License Plate Recognition system (Apr – Jun 2026).',
    laurel: 'Co-Author',
  },
  {
    id: 'zaalima',
    title: 'Selected Intern',
    org: 'Zaalima Development',
    detail: 'Selected for a performance-based Data Analytics internship working on live data-driven projects.',
    laurel: 'Performance-Based',
  },
  {
    id: 'projects',
    title: '4 Projects',
    org: 'End-to-End • Production-Grade',
    detail: 'Four end-to-end projects across full-stack web development, machine learning and research.',
    laurel: 'Production-Grade',
  },
  {
    id: 'honeywell',
    title: 'AI · 80 Hours',
    org: 'Honeywell Future Skills Edge',
    detail: 'Completed the Honeywell Future Skills Edge Program in Artificial Intelligence (80 hours).',
    laurel: 'AI Program',
  },
  {
    id: 'web3',
    title: 'Web3 Hackathon',
    org: 'Blockchain & Web3',
    detail: 'Hands-on blockchain and Web3 development at a hackathon.',
    laurel: 'Hackathon',
  },
];

export type Certification = { issuer: string; name: string; link?: string };

/** The resume lists these without public credential links — add `link: '…'` to any entry to make its card clickable. */
export const certifications: Certification[] = [
  { issuer: 'Honeywell', name: 'Future Skills Edge Program – Artificial Intelligence (80 Hours)' },
  { issuer: 'AWS Academy', name: 'Graduate – Microservices and CI/CD Pipeline Builder' },
  { issuer: 'AWS Academy', name: 'Graduate – Cloud Foundations' },
  { issuer: 'Web3 Hackathon', name: 'Hands-on Blockchain & Web3 Development' },
];

export type Skill = { name: string; mono: string; note?: string };
export type SkillCategory = { id: string; title: string; subtitle: string; skills: Skill[] };

export const skillCategories: SkillCategory[] = [
  {
    id: 'languages',
    title: 'Languages',
    subtitle: 'Programming & web',
    skills: [
      { name: 'Python', mono: 'Py' },
      { name: 'Java', mono: 'Jv' },
      { name: 'C++', mono: 'C+' },
      { name: 'JavaScript', mono: 'Js' },
      { name: 'TypeScript', mono: 'Ts' },
    ],
  },
  {
    id: 'frontend',
    title: 'Frontend',
    subtitle: 'Interfaces & the web platform',
    skills: [
      { name: 'React.js', mono: 'Re' },
      { name: 'Tailwind CSS', mono: 'Tw' },
    ],
  },
  {
    id: 'ml',
    title: 'Machine Learning',
    subtitle: 'Models & data tooling',
    skills: [
      { name: 'Scikit-Learn', mono: 'Sk' },
      { name: 'Random Forest', mono: 'Rf' },
      { name: 'GBM', mono: 'Gb' },
      { name: 'Decision Tree', mono: 'Dt' },
      { name: 'Logistic Regression', mono: 'Lr' },
      { name: 'Pandas', mono: 'Pd' },
      { name: 'NumPy', mono: 'Np' },
      { name: 'Matplotlib', mono: 'Mp' },
    ],
  },
  {
    id: 'cloud',
    title: 'Data & Cloud Tools',
    subtitle: 'Shipping & infrastructure',
    skills: [
      { name: 'AWS', mono: 'Aw', note: 'Cloud Foundations • Microservices • CI/CD' },
      { name: 'Git', mono: 'Gt' },
      { name: 'GitHub', mono: 'Gh' },
      { name: 'Vercel', mono: 'Vc' },
      { name: 'Postman', mono: 'Pm' },
    ],
  },
  {
    id: 'databases',
    title: 'Databases',
    subtitle: 'Data management & APIs',
    skills: [
      { name: 'SQL', mono: 'Sq' },
      { name: 'Oracle', mono: 'Or' },
      { name: 'REST APIs', mono: 'Ap' },
    ],
  },
  {
    id: 'interests',
    title: 'Coming Soon',
    subtitle: 'Coming soon to the series',
    skills: [
      { name: 'FastAPI', mono: 'Fa', note: 'Planned' },
      { name: 'Cloud-Native Design', mono: 'Cn' },
      { name: 'Scalable System Design', mono: 'Sd' },
    ],
  },
];

/**
 * Factual cross-references shown when a skill card is hovered/tapped:
 * where the skill appears in the projects, experience or certifications on the resume.
 */
export const skillEvidence: Record<string, string[]> = {
  Python: ['DiabetesSense', 'PhishGuard', 'Hybrid ALPR research paper'],
  'C++': ['Programming skill on the resume'],
  Java: ['Programming skill on the resume'],
  JavaScript: ['FeedaNeed', 'Web Designer Intern — Diamond Mindglance'],
  TypeScript: ['FeedaNeed'],
  'React.js': ['DiabetesSense', 'PhishGuard', 'FeedaNeed'],
  'Tailwind CSS': ['PhishGuard (v4)'],
  'Scikit-Learn': ['DiabetesSense', 'PhishGuard'],
  'Random Forest': ['Hybrid ALPR research paper'],
  Pandas: ['DiabetesSense'],
  NumPy: ['DiabetesSense'],
  Matplotlib: ['Data Analytics Intern — Zaalima'],
  AWS: ['AWS Academy — Cloud Foundations', 'AWS Academy — Microservices & CI/CD'],
  Vercel: ['DiabetesSense', 'PhishGuard', 'FeedaNeed'],
  SQL: ['Data Analytics Intern — Zaalima'],
  'REST APIs': ['Database Management on the resume'],
  FastAPI: ['Planned next on the resume'],
  'Cloud-Native Design': ['AWS Academy certifications'],
};

/** What the episode's ▶ button does: open a project, or jump to a section of the page. */
export type EpisodeTarget = { project: string } | { section: SectionId };

export type Episode = {
  code: string;
  target?: EpisodeTarget;
  title: string;
  description: string;
  tags: string[];
  runtime: string;
  palette: Palette;
};

export type Season = {
  number: number;
  title: string;
  period: string;
  synopsis: string;
  episodes: Episode[];
};

const crimson: Palette = { from: '#24060b', via: '#6e0d1d', to: '#09070a', accent: '#ff3d5a' };
const amber: Palette = { from: '#1c1003', via: '#6b3c06', to: '#0a0806', accent: '#ffb547' };
const ocean: Palette = { from: '#04121f', via: '#0f4c6e', to: '#05080d', accent: '#4cc9ff' };
const violet: Palette = { from: '#120822', via: '#3d1a6e', to: '#07060c', accent: '#b98bff' };
const jade: Palette = { from: '#03150f', via: '#0d5a40', to: '#050a08', accent: '#46e3a8' };

export const seasons: Season[] = [
  {
    number: 1,
    title: 'The Beginning',
    period: '2020 – 2023',
    synopsis: "Diploma years at JSPM's RSCOE, Tathawade — where the Computer Science story starts.",
    episodes: [
      {
        code: 'S01 E01',
        target: { section: 'story' },
        title: 'The Foundation',
        description: "Diploma in Computer Science Engineering at JSPM's RSCOE, Tathawade.",
        tags: ['Diploma', 'Computer Science'],
        runtime: 'Jul 2020 – May 2023',
        palette: amber,
      },
    ],
  },
  {
    number: 2,
    title: 'Enter: B.Tech',
    period: '2023 – Present',
    synopsis: 'B.Tech in Computer Science Engineering at Deccan Education Society, Pune.',
    episodes: [
      {
        code: 'S02 E01',
        target: { section: 'story' },
        title: 'The Engineer',
        description: 'Pre-final year B.Tech in Computer Science Engineering at Deccan Education Society, Pune.',
        tags: ['B.Tech', 'Computer Science'],
        runtime: 'Aug 2023 – Present',
        palette: violet,
      },
      {
        code: 'S02 E02',
        target: { section: 'moments' },
        title: 'The Certified',
        description: 'AWS Academy Graduate in Cloud Foundations and in Microservices & CI/CD Pipeline Builder.',
        tags: ['AWS', 'Cloud Foundations', 'CI/CD'],
        runtime: '2 certificates',
        palette: ocean,
      },
      {
        code: 'S02 E03',
        target: { section: 'moments' },
        title: 'The AI Student',
        description: 'Honeywell Future Skills Edge Program in Artificial Intelligence (80 hours), plus a hands-on Web3 hackathon.',
        tags: ['AI', 'Honeywell', 'Web3'],
        runtime: '80 hours',
        palette: jade,
      },
    ],
  },
  {
    number: 3,
    title: 'First Take',
    period: 'Internship',
    synopsis: 'A professional first step into building real interfaces as a Web Designer Intern.',
    episodes: [
      {
        code: 'S03 E01',
        target: { section: 'story' },
        title: 'The Designer',
        description: 'Designed and developed fully responsive web pages following clean UI/UX principles at Diamond Mindglance Pvt. Ltd.',
        tags: ['UI/UX', 'Responsive', 'Front-End'],
        runtime: '6 Weeks',
        palette: crimson,
      },
      {
        code: 'S03 E02',
        target: { section: 'story' },
        title: 'The Craftsman',
        description: 'Applied modern front-end best practices to improve usability, accessibility and overall user experience in a professional team.',
        tags: ['Accessibility', 'Usability'],
        runtime: 'Diamond Mindglance',
        palette: violet,
      },
    ],
  },
  {
    number: 4,
    title: 'Building Real Products',
    period: '2026',
    synopsis: 'Four end-to-end projects — two ML systems, a full-stack platform and a published research paper.',
    episodes: [
      {
        code: 'S04 E01',
        target: { project: 'diabetessense' },
        title: 'The Health-Tech Builder',
        description: 'DiabetesSense — an ML system predicting concurrent Type-2 Diabetes & CVD risk from the CDC NHANES dataset.',
        tags: ['Scikit-Learn', 'React 18', 'Recharts'],
        runtime: 'DiabetesSense',
        palette: jade,
      },
      {
        code: 'S04 E02',
        target: { project: 'phishguard' },
        title: 'The Defender',
        description: 'PhishGuard — 40+ URL features powering a 4-model ensemble with real-time risk scoring.',
        tags: ['ML Ensemble', 'Tailwind v4', 'Framer Motion'],
        runtime: 'PhishGuard',
        palette: crimson,
      },
      {
        code: 'S04 E03',
        target: { project: 'feedaneed' },
        title: 'The Giver',
        description: 'FeedaNeed — a donor-recipient-admin food donation platform with role-based auth, built in TypeScript.',
        tags: ['TypeScript', 'Role-Based Auth'],
        runtime: 'FeedaNeed',
        palette: amber,
      },
      {
        code: 'S04 E04',
        target: { project: 'alpr-research' },
        title: 'The Researcher',
        description: 'Co-authored a published research paper on a hybrid ML-based Automatic License Plate Recognition system.',
        tags: ['HOG', 'CNN', 'SVM', 'K-Means'],
        runtime: 'Apr – Jun 2026',
        palette: ocean,
      },
    ],
  },
  {
    number: 5,
    title: 'Now Streaming',
    period: 'Aug – Nov 2026',
    synopsis: 'A performance-based Data Analytics internship — and the next arc of the story.',
    episodes: [
      {
        code: 'S05 E01',
        target: { section: 'story' },
        title: 'The Analyst',
        description: 'Data Analytics Intern at Zaalima Development Pvt. Ltd. — live data-driven projects, analysis and reporting.',
        tags: ['Data Analytics', 'Reporting', 'Remote'],
        runtime: 'Aug 2026 – Nov 2026',
        palette: ocean,
      },
      {
        code: 'S05 E02',
        target: { section: 'skills' },
        title: 'The Next Chapter',
        description: 'Cloud-native, scalable system design — with FastAPI planned next.',
        tags: ['Cloud-Native', 'System Design', 'FastAPI'],
        runtime: 'In production',
        palette: violet,
      },
    ],
  },
];

export type TopPick = { label: string; title: string; detail: string; palette: Palette };

export const topPicks: TopPick[] = [
  { label: 'The health-tech Original', title: 'DiabetesSense', detail: 'Type-2 Diabetes & CVD risk • CDC NHANES', palette: jade },
  { label: 'The security Original', title: 'PhishGuard', detail: '40+ URL features • 4-model ensemble', palette: crimson },
  { label: 'The full-stack Original', title: 'FeedaNeed', detail: 'Donor • Recipient • Admin', palette: amber },
  { label: 'Published', title: 'ALPR Paper', detail: 'Co-authored research • Apr – Jun 2026', palette: ocean },
  { label: 'Now streaming', title: 'Data Analytics', detail: 'Intern at Zaalima Development • Remote', palette: violet },
  { label: 'The design arc', title: 'Web Designer', detail: 'Intern at Diamond Mindglance • 6 weeks', palette: crimson },
  { label: 'Cloud credential', title: 'AWS Academy', detail: 'Cloud Foundations • Microservices & CI/CD', palette: amber },
  { label: 'AI credential', title: 'Honeywell AI', detail: 'Future Skills Edge • 80 hours', palette: jade },
  { label: 'Hackathon', title: 'Web3', detail: 'Hands-on blockchain & Web3 development', palette: ocean },
  { label: 'Current focus', title: 'Cloud-Native', detail: 'with scalable system design', palette: violet },
];

/** Slides for the "▶ Play Intro" cinematic sequence. */
export type IntroSlide = { kicker: string; title: string; lines: string[]; chips?: string[] };

export const introSlides: IntroSlide[] = [
  {
    kicker: 'Education',
    title: 'B.Tech · CSE',
    lines: ['Deccan Education Society, Pune', 'August 2023 – Present'],
    chips: ['Pre-final year'],
  },
  {
    kicker: 'Skills',
    title: 'Full-stack meets ML.',
    lines: ['Python, Java, C++, JavaScript, TypeScript', 'React.js, Tailwind CSS · Scikit-Learn, Pandas, NumPy'],
    chips: ['Python', 'TypeScript', 'React.js', 'Scikit-Learn', 'AWS', 'SQL'],
  },
  {
    kicker: 'Experience',
    title: 'Two Internships',
    lines: ['Data Analytics Intern · Zaalima Development · Aug – Nov 2026', 'Web Designer Intern · Diamond Mindglance · 6 Weeks'],
  },
  {
    kicker: 'Projects',
    title: 'Four Originals',
    lines: ['DiabetesSense — Type-2 Diabetes & CVD risk predictor', 'PhishGuard — 4-model phishing URL detector', 'FeedaNeed — role-based food donation platform'],
  },
  {
    kicker: 'Research',
    title: 'Published.',
    lines: ['Co-authored a research paper on Hybrid ML-based', 'Automatic License Plate Recognition'],
  },
  {
    kicker: 'Certified',
    title: '4 Certifications',
    lines: ['Honeywell Future Skills Edge · AI (80 Hours)', 'AWS Academy · Cloud Foundations · Microservices & CI/CD', 'Web3 Hackathon'],
  },
  {
    kicker: 'Current mission',
    title: 'Now exploring',
    lines: ['Cloud-native, scalable system design · FastAPI (planned)'],
  },
];

export type ProfileId = 'anish' | 'recruiter' | 'developer' | 'creative';
export type SectionId = 'about' | 'journey' | 'originals' | 'picks' | 'skills' | 'moments' | 'story';

export const viewerProfiles: {
  id: ProfileId;
  name: string;
  blurb: string;
  color: string;
  order: SectionId[];
}[] = [
  {
    id: 'anish',
    name: 'Anish',
    blurb: 'The full series, in order',
    color: '#e5132b',
    order: ['about', 'journey', 'originals', 'picks', 'skills', 'moments', 'story'],
  },
  {
    id: 'recruiter',
    name: 'Recruiter',
    blurb: 'Resume, achievements & skills first',
    color: '#4cc9ff',
    order: ['story', 'moments', 'skills', 'originals', 'about', 'journey', 'picks'],
  },
  {
    id: 'developer',
    name: 'Developer',
    blurb: 'Projects, stack & GitHub first',
    color: '#46e3a8',
    order: ['originals', 'skills', 'journey', 'moments', 'about', 'picks', 'story'],
  },
  {
    id: 'creative',
    name: 'Creative',
    blurb: 'The story arc & highlights first',
    color: '#ffb547',
    order: ['journey', 'picks', 'originals', 'moments', 'about', 'skills', 'story'],
  },
];

export const sectionMeta: Record<SectionId, { nav: string; card: string; meta: string; palette: Palette }> = {
  about: { nav: 'About', card: 'About Me', meta: 'The Pilot • Education & experience', palette: violet },
  journey: { nav: 'Journey', card: 'My Journey', meta: `${seasons.length} Seasons • ${seasons.reduce((n, s) => n + s.episodes.length, 0)} Episodes`, palette: amber },
  originals: { nav: 'Originals', card: 'My Projects', meta: `${projects.length} Originals`, palette: crimson },
  picks: { nav: 'Top Picks', card: 'Top Picks', meta: 'Top 10 from the resume', palette: jade },
  skills: { nav: 'Skills', card: 'My Skills', meta: `${skillCategories.length} Categories`, palette: ocean },
  moments: { nav: 'Moments', card: 'My Achievements', meta: `${achievements.length} Moments • ${certifications.length} Certifications`, palette: crimson },
  story: { nav: 'Resume', card: 'The Full Story', meta: 'Resume • View & download', palette: violet },
};
