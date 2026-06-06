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
  headline: 'Building at the intersection of',
  headlineAccent: 'intelligence & impact',
  subheadline:
    'Software engineer, AI researcher, and systems architect crafting experiences that push boundaries.',
  ctaPrimary: 'Explore the journey',
  ctaSecondary: 'View project lab',
}

export const PLACEHOLDER_JOURNEY: JourneyMilestone[] = [
  {
    id: 'j1',
    type: 'origin',
    year: '20XX',
    title: 'Origins',
    location: 'Country A',
    description:
      'Early curiosity about how things work — dismantling gadgets, writing first programs, asking why systems behave the way they do.',
    highlight: 'First computer',
  },
  {
    id: 'j2',
    type: 'education',
    year: '20XX',
    title: 'University Foundation',
    location: 'Country B',
    description:
      'Formal education in computer science with focus on algorithms, distributed systems, and research methodology.',
    highlight: 'Dean\'s List',
  },
  {
    id: 'j3',
    type: 'career',
    year: '20XX',
    title: 'Industry Entry',
    location: 'Country C',
    description:
      'Transition from academia to industry — shipping production systems, learning scale, and collaborating across time zones.',
  },
  {
    id: 'j4',
    type: 'personal',
    year: '20XX',
    title: 'Endurance Discipline',
    description:
      'Parallel pursuit of endurance sports — applying the same rigor and long-term thinking to physical challenges.',
    highlight: 'First marathon',
  },
]

export const PLACEHOLDER_EXPERIENCE: ExperienceEntry[] = [
  {
    id: 'e1',
    type: 'internship',
    period: '20XX — 20XX',
    title: 'Software Engineering Intern',
    organization: 'Tech Company Alpha',
    description:
      'Built microservices for data pipeline ingestion. Reduced processing latency by placeholder%. Collaborated with cross-functional teams.',
    tags: ['Python', 'AWS', 'Microservices'],
  },
  {
    id: 'e2',
    type: 'research',
    period: '20XX — 20XX',
    title: 'Research Assistant',
    organization: 'University Lab',
    description:
      'Conducted experiments on ML model efficiency. Co-authored internal technical reports and benchmark suites.',
    tags: ['PyTorch', 'Research', 'Benchmarking'],
  },
  {
    id: 'e3',
    type: 'leadership',
    period: '20XX — Present',
    title: 'Technical Lead',
    organization: 'Engineering Team Beta',
    description:
      'Led architecture decisions for cloud-native platform. Mentored junior engineers and established engineering standards.',
    tags: ['Architecture', 'Leadership', 'Cloud'],
  },
  {
    id: 'e4',
    type: 'university',
    period: '20XX — 20XX',
    title: 'Capstone Project Lead',
    organization: 'University',
    description:
      'Designed and delivered full-stack application serving placeholder users. Presented at university showcase.',
    tags: ['React', 'Node.js', 'PostgreSQL'],
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
