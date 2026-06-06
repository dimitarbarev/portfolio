import type {
  AthleticAchievement,
  ContactField,
  DeskResource,
  ExperienceEntry,
  JourneyMilestone,
  LeadershipItem,
  Project,
  ResearchItem,
  SkillNode,
  SocialLink,
} from '@/types'

export const PLACEHOLDER_HERO = {
  headline: 'Hi, I am Dimitar!',
  headlineLine2: "That's my space!",
  headlineAccent: 'Welcome on board!',
  subheadline:
    'Software engineer, AI researcher, endurance athlete, public speaker, and explorer.',
  ctaPrimary: 'Explore the Journey',
  ctaSecondary: 'View Projects',
}

export const PLACEHOLDER_JOURNEY: JourneyMilestone[] = [
  {
    id: 'bulgaria',
    flag: '🇧🇬',
    country: 'Bulgaria',
    title: 'Advanced Mathematics',
    period: '2017 – 2022',
    location: 'Sofia, Bulgaria',
    description:
      'Built strong foundations in mathematics, technology, leadership, and problem solving at the Sofia High School of Mathematics.',
    highlights: [
      'Mathematics & Information Technologies',
      'Student Leadership',
      'Volleyball Team Captain',
    ],
    accent: '#16a34a',
  },
  {
    id: 'netherlands',
    flag: '🇳🇱',
    country: 'Netherlands',
    title: 'Software Engineering',
    period: '2022 – 2026',
    location: 'Eindhoven, Netherlands',
    description:
      'Studying Software Engineering at Fontys University while developing software systems, technical expertise, and professional skills.',
    highlights: [
      'Bachelor of Software Engineering',
      'University Ambassador Abroad',
      'Enterprise Architecture',
      'SCRUM Methodology',
      'Cloud & Distributed Systems',
    ],
    accent: '#ff7a00',
  },
  {
    id: 'australia',
    flag: '🇦🇺',
    country: 'Australia',
    title: 'IT Management',
    period: '2025',
    location: 'Melbourne, Australia',
    description:
      'Exchange semester focused on leadership, communication, project management, and personal development at Victoria University.',
    highlights: [
      'Leadership Development',
      'International Experience',
      'Communication Skills',
    ],
    accent: '#f5b301',
  },
  {
    id: 'germany',
    flag: '🇩🇪',
    country: 'Germany',
    title: 'Applied AI Research',
    period: '2026',
    location: 'Stuttgart, Germany',
    description:
      'Conducting bachelor thesis research on OCR benchmarking and AI systems evaluation at Fraunhofer IAO.',
    highlights: [
      'Artificial Intelligence',
      'OCR Research',
      'Applied Research',
      'Industrial Innovation',
    ],
    accent: '#e23b2e',
  },
]

export const PLACEHOLDER_EXPERIENCE: ExperienceEntry[] = [
  // ---- Internships ----
  {
    id: 'exp-asml',
    type: 'internship',
    period: '2024 – 2025',
    title: 'Java Software Developer Intern',
    organization: 'ASML',
    location: 'Eindhoven, Netherlands',
    flag: '🇳🇱',
    description:
      'Designed and developed a Java prioritization library used to solve the Noisy Neighbor problem within enterprise-scale systems. Worked with software architecture, testing, documentation, and agile development practices.',
    tags: ['Java', 'Software Architecture', 'SCRUM', 'TDD', 'Enterprise Systems', 'Open Source'],
    link: 'https://www.asml.com',
    featured: true,
    accent: '#2563eb',
    logo: 'ASML',
  },
  {
    id: 'exp-ccep',
    type: 'internship',
    period: '2025',
    title: 'AI Adoption Specialist Intern',
    organization: 'Coca-Cola Europacific Partners',
    location: 'Melbourne, Australia',
    flag: '🇦🇺',
    description:
      'Supported AI adoption initiatives across business departments by evaluating AI tools, organizing awareness activities, and promoting responsible AI usage.',
    tags: ['Artificial Intelligence', 'Business Technology', 'Change Management', 'Innovation', 'AI Adoption'],
    link: 'https://www.cocacolaep.com',
    featured: true,
    accent: '#f40009',
    logo: 'CC',
  },
  {
    id: 'exp-fraunhofer-sa',
    type: 'internship',
    period: '2026',
    title: 'Scientific Assistant',
    organization: 'Fraunhofer IAO',
    location: 'Stuttgart, Germany',
    flag: '🇩🇪',
    description:
      'Conducting applied AI research focused on OCR benchmarking, agentic AI systems, model evaluation, and industrial AI applications for private-sector clients.',
    tags: ['Artificial Intelligence', 'OCR', 'Research', 'Agentic AI', 'Benchmarking', 'Applied Research'],
    link: 'https://www.iao.fraunhofer.de',
    featured: true,
    accent: '#179c7d',
    logo: 'FH',
  },

  // ---- Research ----
  {
    id: 'exp-ocr-thesis',
    type: 'research',
    period: '2026',
    title: 'OCR Benchmarking Research',
    organization: 'Fraunhofer IAO',
    location: 'Stuttgart, Germany',
    flag: '🇩🇪',
    description:
      'Bachelor thesis focused on evaluating and benchmarking OCR models for insurance invoice processing, comparing performance across multiple evaluation metrics and real-world datasets.',
    tags: ['OCR', 'Computer Vision', 'Evaluation', 'Research', 'AI'],
    link: 'https://www.iao.fraunhofer.de',
    featured: true,
    accent: '#179c7d',
    logo: 'FH',
  },
  {
    id: 'exp-federated',
    type: 'research',
    period: '2025',
    title: 'Federated Learning Platform',
    organization: 'Fontys University',
    description:
      'Contributed to an EU-funded project focused on developing a federated learning ecosystem capable of training AI models while preserving data privacy.',
    tags: ['Federated Learning', 'AI', 'Distributed Systems', 'Cloud', 'Privacy'],
    link: 'https://www.fontys.edu',
    accent: '#e6007e',
    logo: 'F',
  },

  // ---- Leadership ----
  {
    id: 'exp-toastmasters',
    type: 'leadership',
    period: '2024 – Present',
    title: 'Active Member',
    organization: 'Toastmasters International',
    description:
      'Active public speaker participating in speeches, evaluations, competitions, and leadership activities while continuously developing communication and presentation skills.',
    tags: ['Public Speaking', 'Leadership', 'Communication', 'Competitions'],
    link: 'https://en.wikipedia.org/wiki/Toastmasters_International',
    accent: '#004165',
    logo: 'TM',
  },
  {
    id: 'exp-ambassador',
    type: 'leadership',
    period: '2025',
    title: 'University Ambassador Abroad',
    organization: 'Fontys University',
    description:
      'Represented the university internationally and contributed to strengthening student engagement and social media presence across multiple European initiatives.',
    tags: ['Representation', 'Leadership', 'Community', 'Brand Ambassador'],
    link: 'https://www.fontys.edu',
    accent: '#e6007e',
    logo: 'F',
  },
  {
    id: 'exp-debate',
    type: 'leadership',
    period: '2025',
    title: 'Debates Club Munich',
    organization: 'TUM — Technical University of Munich',
    location: 'Munich, Germany',
    flag: '🇩🇪',
    description:
      'Active member of the university debating club, competing in two international debate competitions in Munich and Vienna while sharpening persuasion, critical thinking, and public speaking.',
    tags: ['Debating', 'Communication', 'Critical Thinking'],
    link: 'https://www.tum.de',
    accent: '#3070b3',
    logo: 'TUM',
  },

  // ---- University ----
  {
    id: 'exp-exchange',
    type: 'university',
    period: '2025',
    title: 'Exchange Semester',
    organization: 'Victoria University',
    location: 'Melbourne, Australia',
    flag: '🇦🇺',
    description:
      'Studied leadership, project management, communication, and personal branding while experiencing a new academic and cultural environment.',
    tags: ['International Experience', 'Leadership', 'Project Management', 'Communication'],
    link: 'https://www.vu.edu.au',
    accent: '#e4002b',
    logo: 'VU',
  },
  {
    id: 'exp-bachelor',
    type: 'university',
    period: '2022 – 2026',
    title: 'Bachelor of Software Engineering',
    organization: 'Fontys University',
    location: 'Eindhoven, Netherlands',
    flag: '🇳🇱',
    description:
      'Focused on software engineering, cloud computing, distributed systems, DevOps, software architecture, and modern software development methodologies.',
    tags: ['Software Engineering', 'Cloud', 'Architecture', 'DevOps', 'Distributed Systems'],
    link: 'https://www.fontys.edu',
    accent: '#e6007e',
    logo: 'F',
  },

  // ---- Entrepreneurship ----
  {
    id: 'exp-math-teacher',
    type: 'entrepreneurship',
    period: '2021 – 2026',
    title: 'Private Mathematics Teacher',
    organization: 'Self-Employed',
    description:
      'Provided mathematics tutoring to students of different age groups, helping them prepare for exams, competitions, and academic success.',
    tags: ['Entrepreneurship', 'Teaching', 'Mathematics', 'Mentoring'],
    accent: '#f59e0b',
    logo: 'M',
  },
]

export const PLACEHOLDER_PROJECTS: Project[] = [
  {
    id: 'p1',
    title: 'Distributed Inference Platform',
    subtitle: 'Scalable ML serving at the edge',
    category: 'Cloud · AI',
    year: '20XX',
    description:
      'A cloud-native platform for deploying and scaling machine learning models with sub-100ms latency targets.',
    tags: ['Kubernetes', 'gRPC', 'Python', 'TensorRT'],
    featured: true,
    tabs: {
      overview:
        'Placeholder overview: system designed to handle variable load patterns with auto-scaling inference workers.',
      architecture:
        'Placeholder architecture: event-driven pipeline with model registry, inference gateway, and observability layer.',
      outcomes:
        'Placeholder outcomes: reduced deployment time by X%, achieved Y% uptime SLA across Z regions.',
      learnings:
        'Placeholder learnings: importance of model versioning, cold-start mitigation strategies, cost-performance tradeoffs.',
    },
  },
  {
    id: 'p2',
    title: 'Research Visualization Suite',
    subtitle: 'Interactive data exploration for scientists',
    category: 'Frontend · Research',
    year: '20XX',
    description:
      'Web-based toolkit for visualizing experimental results and running comparative benchmarks in real-time.',
    tags: ['React', 'D3.js', 'WebGL', 'TypeScript'],
    tabs: {
      overview: 'Placeholder overview of the visualization suite purpose and users.',
      architecture: 'Placeholder architecture with client-side rendering and WebSocket data streams.',
      outcomes: 'Placeholder outcomes from researcher adoption and workflow improvements.',
      learnings: 'Placeholder learnings about performance with large datasets and UX for scientists.',
    },
  },
  {
    id: 'p3',
    title: 'Real-time Collaboration Engine',
    subtitle: 'Multiplayer document editing infrastructure',
    category: 'Backend · Architecture',
    year: '20XX',
    description:
      'Conflict-free replicated data type implementation for real-time collaborative editing with offline support.',
    tags: ['CRDT', 'WebSockets', 'Rust', 'Redis'],
    tabs: {
      overview: 'Placeholder overview of collaboration requirements and constraints.',
      architecture: 'Placeholder CRDT architecture with operational transformation fallback.',
      outcomes: 'Placeholder sync latency and conflict resolution metrics.',
      learnings: 'Placeholder learnings on consistency models and network partition handling.',
    },
  },
]

export const PLACEHOLDER_RESEARCH: ResearchItem[] = [
  {
    id: 'r1',
    type: 'thesis',
    title: 'Efficient Neural Architecture Search for Edge Devices',
    year: '20XX',
    abstract:
      'Placeholder abstract exploring automated architecture discovery under strict compute and memory constraints for edge deployment.',
    tags: ['NAS', 'Edge AI', 'Optimization'],
    status: 'published',
  },
  {
    id: 'r2',
    type: 'paper',
    title: 'Benchmarking Transformer Inference on Heterogeneous Hardware',
    year: '20XX',
    abstract:
      'Placeholder abstract presenting systematic evaluation framework across GPU, TPU, and custom accelerator configurations.',
    tags: ['Benchmarking', 'Transformers', 'Hardware'],
    status: 'preprint',
  },
  {
    id: 'r3',
    type: 'experiment',
    title: 'Quantization Impact on Model Fairness Metrics',
    year: '20XX',
    abstract:
      'Placeholder abstract investigating whether post-training quantization affects fairness across demographic subgroups.',
    tags: ['Quantization', 'Fairness', 'ML'],
    status: 'in-progress',
  },
]

export const PLACEHOLDER_SKILLS: SkillNode[] = [
  { id: 's1', name: 'Python', category: 'backend', x: 0.2, y: 0.3, connections: ['s2', 's5'], size: 'lg' },
  { id: 's2', name: 'TypeScript', category: 'frontend', x: 0.5, y: 0.2, connections: ['s1', 's3'], size: 'lg' },
  { id: 's3', name: 'React', category: 'frontend', x: 0.7, y: 0.35, connections: ['s2', 's8'], size: 'md' },
  { id: 's4', name: 'AWS', category: 'cloud', x: 0.3, y: 0.55, connections: ['s1', 's6'], size: 'lg' },
  { id: 's5', name: 'PyTorch', category: 'ai', x: 0.15, y: 0.65, connections: ['s1', 's7'], size: 'md' },
  { id: 's6', name: 'Kubernetes', category: 'devops', x: 0.45, y: 0.7, connections: ['s4', 's8'], size: 'md' },
  { id: 's7', name: 'ML Systems', category: 'ai', x: 0.25, y: 0.8, connections: ['s5', 's8'], size: 'lg' },
  { id: 's8', name: 'System Design', category: 'architecture', x: 0.6, y: 0.6, connections: ['s3', 's4', 's6', 's7'], size: 'lg' },
  { id: 's9', name: 'Public Speaking', category: 'leadership', x: 0.8, y: 0.75, connections: ['s10'], size: 'md' },
  { id: 's10', name: 'Mentoring', category: 'leadership', x: 0.85, y: 0.5, connections: ['s8', 's9'], size: 'md' },
]

export const PLACEHOLDER_LEADERSHIP: LeadershipItem[] = [
  {
    id: 'l1',
    type: 'speaking',
    title: 'Conference Talk — Scaling ML Infrastructure',
    period: '20XX',
    description: 'Delivered technical presentation on production ML systems to audience of placeholder attendees.',
    metric: 'XX+ attendees',
  },
  {
    id: 'l2',
    type: 'toastmasters',
    title: 'Toastmasters — Competent Communicator',
    period: '20XX — Present',
    description: 'Developed public speaking and leadership skills through structured program and regular practice.',
    metric: 'XX speeches',
  },
  {
    id: 'l3',
    type: 'mentoring',
    title: 'Engineering Mentor Program',
    period: '20XX — Present',
    description: 'Mentored placeholder junior engineers on career growth, code quality, and system design thinking.',
    metric: 'X mentees',
  },
  {
    id: 'l4',
    type: 'team',
    title: 'Cross-functional Team Lead',
    period: '20XX — 20XX',
    description: 'Led distributed team of placeholder engineers across multiple time zones on platform modernization.',
    metric: 'X engineers',
  },
]

export const PLACEHOLDER_ATHLETICS: AthleticAchievement[] = [
  {
    id: 'a1',
    type: 'running',
    title: 'Marathon — City Name',
    date: '20XX',
    metric: 'X:XX:XX',
    description: 'Placeholder marathon completion with negative split strategy in final 10K.',
  },
  {
    id: 'a2',
    type: 'triathlon',
    title: 'Olympic Distance Triathlon',
    date: '20XX',
    metric: 'X:XX:XX',
    description: 'Swim-bike-run event demonstrating transition efficiency and pacing discipline.',
  },
  {
    id: 'a3',
    type: 'ironman',
    title: 'Ironman 70.3 — Location',
    date: '20XX',
    metric: 'X:XX:XX',
    description: 'Half Ironman distance — a test of endurance, nutrition strategy, and mental resilience.',
  },
  {
    id: 'a4',
    type: 'endurance',
    title: 'Ultra Trail Run',
    date: '20XX',
    metric: 'XX km',
    description: 'Mountain trail ultra showcasing altitude adaptation and sustained effort management.',
  },
]

export const PLACEHOLDER_DESK: DeskResource[] = [
  {
    id: 'd1',
    label: 'CV / Resume',
    description: 'Downloadable professional summary',
    icon: 'file-text',
    href: '#',
    category: 'professional',
  },
  {
    id: 'd2',
    label: 'GitHub',
    description: 'Open source contributions & projects',
    icon: 'github',
    href: '#',
    category: 'social',
  },
  {
    id: 'd3',
    label: 'LinkedIn',
    description: 'Professional network & experience',
    icon: 'linkedin',
    href: '#',
    category: 'social',
  },
  {
    id: 'd4',
    label: 'Medium',
    description: 'Technical writing & essays',
    icon: 'book-open',
    href: '#',
    category: 'research',
  },
  {
    id: 'd5',
    label: 'Strava',
    description: 'Athletic achievements & training',
    icon: 'activity',
    href: '#',
    category: 'athletic',
  },
  {
    id: 'd6',
    label: 'Research Papers',
    description: 'Publications & preprints',
    icon: 'graduation-cap',
    href: '#',
    category: 'research',
  },
  {
    id: 'd7',
    label: 'Certifications',
    description: 'Cloud & architecture credentials',
    icon: 'award',
    href: '#',
    category: 'professional',
  },
]

export const PLACEHOLDER_SOCIAL: SocialLink[] = [
  { id: 'soc1', label: 'GitHub', href: '#', icon: 'github' },
  { id: 'soc2', label: 'LinkedIn', href: '#', icon: 'linkedin' },
  { id: 'soc3', label: 'Twitter', href: '#', icon: 'twitter' },
  { id: 'soc4', label: 'Email', href: 'mailto:hello@placeholder.dev', icon: 'mail' },
]

export const PLACEHOLDER_CONTACT_FIELDS: ContactField[] = [
  { id: 'name', label: 'Name', type: 'text', placeholder: 'Your name', required: true },
  { id: 'email', label: 'Email', type: 'email', placeholder: 'you@example.com', required: true },
  {
    id: 'message',
    label: 'Message',
    type: 'textarea',
    placeholder: 'Tell me about your project or opportunity...',
    required: true,
  },
]
