export const projectsData = [
  {
    id: 'dada-design',
    title: 'Dada Design Studio',
    subtitle: 'Architecture & Spatial Design Practice Monograph',
    badge: 'Production Deployed Client Work',
    badgeType: 'production',
    category: 'Web Architecture & Studio Portfolio',
    role: 'Lead Frontend Engineer & UI Architect',
    timeline: 'Client Project • Production Deployed',
    overview:
      'Architected and engineered a bespoke digital portfolio monograph reflecting structural minimalism, architectural grid hierarchy, and fluid visual transitions tailored for high-end clientele.',
    image: '/projects/dada-actual.png',
    liveUrl: 'https://www.dadadesignstudio.in/',
    githubUrl: null,
    techStack: [
      { name: 'React.js', role: 'UI Framework' },
      { name: 'CSS3 Modules', role: 'Custom Layout & Design System' },
      { name: 'GSAP Motion', role: 'Fluid Viewport Transitions' },
      { name: 'Responsive Web', role: 'Cross-Device Layout' },
      { name: 'Vercel Edge', role: 'Global CDN Deployment' }
    ],
    architectureOverview:
      'Engineered with a minimalist design philosophy focusing on content-first architecture, zero layout shifts (CLS < 0.01), and high-resolution spatial photography optimization with custom lazy-loading pipeline.',
    features: [
      {
        title: 'Architectural Spatial Galleries',
        description: 'Interactive project galleries with responsive grid transitions and high-resolution viewport zoom.'
      },
      {
        title: 'Editorial Monochromatic Typography',
        description: 'Bespoke typographical hierarchy crafted specifically for architectural discerning clientele.'
      },
      {
        title: 'Fluid Viewport Animations',
        description: 'Subtle entrance and transition choreographies powered by hardware-accelerated CSS and GSAP.'
      },
      {
        title: 'Zero-Lag Image Pipeline',
        description: 'Progressive image delivery ensuring sub-second paint times even with large architectural render assets.'
      }
    ],
    technicalHighlights: [
      'Sub-second First Contentful Paint (FCP) achieved through modular CSS and tree-shaken asset bundles.',
      'Custom grid system inspired by Swiss design principles and architectural blueprints.',
      'Fully responsive touch-friendly navigation optimized for mobile, tablet, and ultra-wide displays.'
    ]
  },
  {
    id: 'ptunes-player',
    title: 'Ptunes Music Player',
    subtitle: 'Audio Streaming & High-Performance Offline Player',
    badge: 'Featured Mobile App',
    badgeType: 'mobile',
    category: 'Mobile Audio Engineering',
    role: 'Mobile Software Engineer',
    timeline: 'Cross-Platform Flutter Project',
    overview:
      'An aesthetically refined mobile music player featuring dynamic real-time audio visualizers, background playback service with lock screen integration, and offline local caching.',
    image: null,
    liveUrl: null,
    githubUrl: 'https://github.com/PRj2903',
    techStack: [
      { name: 'Flutter', role: 'Cross-Platform UI' },
      { name: 'Audio Service', role: 'Background OS Audio Controller' },
      { name: 'SQLite / Local Storage', role: 'Local Playlist & Track Cache' },
      { name: 'flutter_bloc', role: 'Predictable State Management' },
      { name: 'Just Audio', role: 'Gapless Audio Engine' }
    ],
    architectureOverview:
      'Built using Clean BLoC architecture separating UI Presentation, Domain Business Logic, and Data Layer. Employs asynchronous audio isolates and local database persistence for instant offline startup times.',
    features: [
      {
        title: 'Real-time Audio Waveform Visualizer',
        description: 'Hardware-accelerated visualizer canvas rendering smooth spectrum animations synced with live decibel output.'
      },
      {
        title: 'Background Playback & Lock Screen Controls',
        description: 'Native media session integration with notification tray controls, artwork rendering, and headset action listener.'
      },
      {
        title: 'Offline-First Local Storage',
        description: 'Reliable local persistence for offline track caching, user favorites, and smart playlists.'
      },
      {
        title: 'Adaptive Theming & Dynamic Palette',
        description: 'Automatic UI palette extraction from current album art for an immersive listening aesthetic.'
      }
    ],
    technicalHighlights: [
      'Zero audio stuttering via dedicated background audio isolate handling decoding and streaming.',
      'BLoC pattern ensures robust state transitions between Play, Pause, Buffer, and Error states.',
      'Optimized memory footprint handling thousands of local audio files with lazy list virtualization.'
    ]
  },
  {
    id: 'studymate',
    title: 'StudyMate',
    subtitle: 'Academic Schedule & Productivity Management System',
    badge: 'Full-Stack Mobile App',
    badgeType: 'fullstack',
    category: 'Education & Productivity',
    role: 'Full-Stack Developer (Flutter + Spring Boot)',
    timeline: 'Full-Stack Engineering Project',
    overview:
      'A student companion application streamlining academic timetables, course progress, study timers, and performance forecasting backed by an enterprise Spring Boot REST API.',
    image: null,
    liveUrl: null,
    githubUrl: 'https://github.com/PRj2903',
    techStack: [
      { name: 'Flutter', role: 'Mobile Client Frontend' },
      { name: 'Spring Boot', role: 'Java RESTful Backend API' },
      { name: 'MySQL / PostgreSQL', role: 'Relational Database Layer' },
      { name: 'JWT Auth', role: 'Stateless Security & Tokens' },
      { name: 'Provider', role: 'Client State Architecture' }
    ],
    architectureOverview:
      'Layered microservice-ready backend design following Controller-Service-Repository DTO patterns with Spring Security JWT authentication and an intuitive reactive Flutter client.',
    features: [
      {
        title: 'Intelligent Academic Timetable',
        description: 'Dynamic lecture and lab schedule tracker with conflict detection and automated class reminders.'
      },
      {
        title: 'Pomodoro Focus Timer & Analytics',
        description: 'Customizable study intervals with session history, daily focus heatmaps, and productivity charts.'
      },
      {
        title: 'GPA / Target Grade Forecaster',
        description: 'Predictive algorithm calculating required marks per assignment to achieve target semester GPA.'
      },
      {
        title: 'Cloud Sync & Multi-Device Session',
        description: 'Stateless JWT authentication allowing seamless session continuity between devices.'
      }
    ],
    technicalHighlights: [
      'RESTful Spring Boot endpoints with validated DTO payloads and global exception handler.',
      'Local caching via SQLite / SharedPreferences for offline reading with background sync upon reconnection.',
      'Clean UI adhering to Material 3 design tokens with dark/light mode toggle.'
    ]
  },
  {
    id: 'flashcard-app',
    title: 'Flashcard Learning App',
    subtitle: 'Spaced Repetition & Cognitive Mastery Tool',
    badge: 'EdTech Mobile App',
    badgeType: 'mobile',
    category: 'EdTech & Cognitive Science',
    role: 'Flutter Developer',
    timeline: 'Mobile Application',
    overview:
      'An interactive spaced repetition learning tool implementing the SuperMemo SM-2 algorithm to optimize memory retention with customizable decks, cloud sync, and mastery analytics.',
    image: null,
    liveUrl: null,
    githubUrl: 'https://github.com/PRj2903',
    techStack: [
      { name: 'Flutter', role: 'Cross-Platform UI' },
      { name: 'Firebase Firestore', role: 'Real-time NoSQL Database' },
      { name: 'SM-2 Algorithm', role: 'Spaced Repetition Engine' },
      { name: 'Cloud Functions', role: 'Serverless Deck Optimization' }
    ],
    architectureOverview:
      'Reactive mobile architecture built around real-time Firestore streams and local offline cache, running client-side algorithmic interval scheduling.',
    features: [
      {
        title: 'SuperMemo SM-2 Spaced Repetition',
        description: 'Scientifically proven algorithm adjusting repetition intervals based on user-rated recall difficulty (0-5).'
      },
      {
        title: 'Interactive Flip Card Canvas',
        description: '3D perspective card flipping gestures with smooth tactile feedback and keyboard shortcuts.'
      },
      {
        title: 'Deck Creation & Tag Categorization',
        description: 'Create, search, filter, and share study decks across engineering, computer science, and language subjects.'
      },
      {
        title: 'Retention & Streak Analytics',
        description: 'Visual progress charts showcasing memory retention curve, daily review streak, and mastery percentages.'
      }
    ],
    technicalHighlights: [
      'Real-time Firestore listeners coupled with offline persistence for zero-interruption study sessions on the go.',
      'Custom 3D Matrix4 card flip transformation rendered at smooth 60fps.',
      'Modular deck schema supporting rich text and code block formatting.'
    ]
  }
];
