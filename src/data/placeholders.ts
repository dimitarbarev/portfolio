import type {
  ContactField,
  ExperienceEntry,
  JourneyMilestone,
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
