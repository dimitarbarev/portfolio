import type { SkillNode } from '@/types'

function link(a: SkillNode, b: SkillNode) {
  if (!a.connections.includes(b.id)) a.connections.push(b.id)
  if (!b.connections.includes(a.id)) b.connections.push(a.id)
}

function node(
  partial: Omit<SkillNode, 'connections'> & { connections?: string[] },
): SkillNode {
  return { connections: [], ...partial }
}

// ─── Center — Architecture bridge ───────────────────────────────────────────
const systemDesign = node({
  id: 'system-design',
  name: 'System Design',
  category: 'architecture',
  cluster: 'center',
  x: 0.5,
  y: 0.52,
  size: 'xl',
  description:
    'Central skill connecting backend engineering, AI systems, cloud deployment, architecture, and team leadership.',
})
const softwareArchitecture = node({
  id: 'software-architecture',
  name: 'Software Architecture',
  category: 'architecture',
  cluster: 'center',
  x: 0.64,
  y: 0.4,
  size: 'md',
  description:
    'Focused on maintainability, modularity, scalability, and clean software design across backend and AI systems.',
})
const distributedSystems = node({
  id: 'distributed-systems',
  name: 'Distributed Systems',
  category: 'architecture',
  cluster: 'center',
  x: 0.36,
  y: 0.6,
  size: 'sm',
})
const scalability = node({
  id: 'scalability',
  name: 'Scalability',
  category: 'architecture',
  cluster: 'center',
  x: 0.64,
  y: 0.62,
  size: 'sm',
})

// ─── Left — Software Engineering ────────────────────────────────────────────
const java = node({
  id: 'java',
  name: 'Java',
  category: 'backend',
  cluster: 'engineering',
  x: 0.12,
  y: 0.5,
  size: 'lg',
  description:
    'Primary engineering language used in university projects, ASML internship, Dimotion backend services, and software architecture work.',
})
const springBoot = node({
  id: 'spring-boot',
  name: 'Spring Boot',
  category: 'backend',
  cluster: 'engineering',
  x: 0.12,
  y: 0.32,
  size: 'lg',
  description:
    'Used to build scalable backend services, REST APIs, authentication flows, microservices, and distributed applications.',
})
const restApis = node({
  id: 'rest-apis',
  name: 'REST APIs',
  category: 'backend',
  cluster: 'engineering',
  x: 0.22,
  y: 0.54,
  size: 'sm',
})
const microservices = node({
  id: 'microservices',
  name: 'Microservices',
  category: 'backend',
  cluster: 'engineering',
  x: 0.08,
  y: 0.6,
  size: 'sm',
})
const sql = node({
  id: 'sql',
  name: 'SQL',
  category: 'backend',
  cluster: 'engineering',
  x: 0.08,
  y: 0.68,
  size: 'sm',
})
const ood = node({
  id: 'ood',
  name: 'Object-Oriented Design',
  category: 'backend',
  cluster: 'engineering',
  x: 0.22,
  y: 0.38,
  size: 'sm',
})

// ─── Top — AI & Research ────────────────────────────────────────────────────
const ocrResearch = node({
  id: 'ocr-research',
  name: 'OCR Research',
  category: 'ai',
  cluster: 'ai',
  x: 0.5,
  y: 0.15,
  size: 'lg',
  description:
    'Applied research at Fraunhofer benchmarking OCR models for car insurance invoice processing.',
})
const agenticAi = node({
  id: 'agentic-ai',
  name: 'Agentic AI',
  category: 'ai',
  cluster: 'ai',
  x: 0.36,
  y: 0.2,
  size: 'md',
  description:
    'Built and tested agentic workflows for OCR post-processing, model output comparison, and optimization.',
})
const python = node({
  id: 'python',
  name: 'Python',
  category: 'ai',
  cluster: 'ai',
  x: 0.64,
  y: 0.2,
  size: 'md',
  description:
    'Used for AI experimentation, OCR evaluation pipelines, automation, and research tooling.',
})
const llms = node({
  id: 'llms',
  name: 'LLMs',
  category: 'ai',
  cluster: 'ai',
  x: 0.26,
  y: 0.14,
  size: 'sm',
})
const computerVision = node({
  id: 'computer-vision',
  name: 'Computer Vision',
  category: 'ai',
  cluster: 'ai',
  x: 0.42,
  y: 0.1,
  size: 'sm',
})
const modelBenchmarking = node({
  id: 'model-benchmarking',
  name: 'Model Benchmarking',
  category: 'ai',
  cluster: 'ai',
  x: 0.58,
  y: 0.1,
  size: 'sm',
})
const federatedLearning = node({
  id: 'federated-learning',
  name: 'Federated Learning',
  category: 'ai',
  cluster: 'ai',
  x: 0.74,
  y: 0.24,
  size: 'sm',
  description:
    'Developed a distributed machine learning platform simulating thousands of clients.',
})

// ─── Bottom — Cloud & DevOps ────────────────────────────────────────────────
const docker = node({
  id: 'docker',
  name: 'Docker',
  category: 'cloud',
  cluster: 'cloud',
  x: 0.32,
  y: 0.8,
  size: 'md',
  description:
    'Used for containerizing backend services, databases, and local development environments.',
})
const kubernetes = node({
  id: 'kubernetes',
  name: 'Kubernetes',
  category: 'cloud',
  cluster: 'cloud',
  x: 0.5,
  y: 0.88,
  size: 'md',
  description:
    'Worked with orchestration concepts, cloud-native deployment, and distributed system deployment.',
})
const aws = node({
  id: 'aws',
  name: 'AWS',
  category: 'cloud',
  cluster: 'cloud',
  x: 0.68,
  y: 0.8,
  size: 'md',
})
const ciCd = node({
  id: 'ci-cd',
  name: 'CI/CD',
  category: 'devops',
  cluster: 'cloud',
  x: 0.4,
  y: 0.93,
  size: 'sm',
})
const githubActions = node({
  id: 'github-actions',
  name: 'GitHub Actions',
  category: 'devops',
  cluster: 'cloud',
  x: 0.6,
  y: 0.93,
  size: 'sm',
})
const git = node({
  id: 'git',
  name: 'Git',
  category: 'devops',
  cluster: 'cloud',
  x: 0.2,
  y: 0.88,
  size: 'sm',
})
const securityScanning = node({
  id: 'security-scanning',
  name: 'Security Scanning',
  category: 'devops',
  cluster: 'cloud',
  x: 0.76,
  y: 0.9,
  size: 'sm',
  description:
    'Integrated OWASP, Semgrep, Gitleaks, and CodeQL into CI pipelines for secure delivery.',
})

// ─── Right — Leadership & Communication ─────────────────────────────────────
const publicSpeaking = node({
  id: 'public-speaking',
  name: 'Public Speaking',
  category: 'leadership',
  cluster: 'leadership',
  x: 0.88,
  y: 0.5,
  size: 'lg',
  description:
    'Toastmasters experience, presentations, competitions, workshops, and stakeholder communication.',
})
const dataStorytelling = node({
  id: 'data-storytelling',
  name: 'Data Storytelling',
  category: 'leadership',
  cluster: 'leadership',
  x: 0.9,
  y: 0.4,
  size: 'sm',
  description:
    'Translating technical results, OCR benchmarks, and system metrics into clear narratives for diverse audiences.',
})
const scrum = node({
  id: 'scrum',
  name: 'Scrum',
  category: 'leadership',
  cluster: 'leadership',
  x: 0.76,
  y: 0.58,
  size: 'md',
  description:
    'Used in university teams, internships, project planning, sprint work, and team coordination.',
})
const stakeholderManagement = node({
  id: 'stakeholder-management',
  name: 'Stakeholder Management',
  category: 'leadership',
  cluster: 'leadership',
  x: 0.92,
  y: 0.58,
  size: 'sm',
  description:
    'Experience working with supervisors, researchers, clients, students, and cross-functional teams.',
})
const mentoring = node({
  id: 'mentoring',
  name: 'Mentoring',
  category: 'leadership',
  cluster: 'leadership',
  x: 0.88,
  y: 0.68,
  size: 'sm',
})
const projectPlanning = node({
  id: 'project-planning',
  name: 'Project Planning',
  category: 'leadership',
  cluster: 'leadership',
  x: 0.76,
  y: 0.4,
  size: 'sm',
})
const teamCollaboration = node({
  id: 'team-collaboration',
  name: 'Team Collaboration',
  category: 'leadership',
  cluster: 'leadership',
  x: 0.8,
  y: 0.7,
  size: 'sm',
})

const allNodes = [
  systemDesign,
  softwareArchitecture,
  distributedSystems,
  scalability,
  java,
  springBoot,
  restApis,
  microservices,
  sql,
  ood,
  ocrResearch,
  agenticAi,
  python,
  llms,
  computerVision,
  modelBenchmarking,
  federatedLearning,
  docker,
  kubernetes,
  aws,
  ciCd,
  githubActions,
  git,
  securityScanning,
  publicSpeaking,
  dataStorytelling,
  scrum,
  stakeholderManagement,
  mentoring,
  projectPlanning,
  teamCollaboration,
]

// ─── Center hub — System Design as bridge ─────────────────────────────────────
;[
  java,
  springBoot,
  microservices,
  softwareArchitecture,
  distributedSystems,
  scalability,
  agenticAi,
  scrum,
  publicSpeaking,
].forEach((n) => link(systemDesign, n))

link(softwareArchitecture, distributedSystems)
link(softwareArchitecture, scalability)
link(softwareArchitecture, java)
link(softwareArchitecture, springBoot)
link(softwareArchitecture, docker)
link(softwareArchitecture, kubernetes)
link(softwareArchitecture, agenticAi)

// ─── Engineering cluster ──────────────────────────────────────────────────────
;[java, springBoot, restApis, microservices, sql].forEach((n, i, arr) => {
  if (i < arr.length - 1) link(n, arr[i + 1])
})
link(ood, java)

// ─── AI cluster ───────────────────────────────────────────────────────────────
link(ocrResearch, agenticAi)
link(ocrResearch, python)
link(ocrResearch, computerVision)
link(ocrResearch, modelBenchmarking)
link(agenticAi, llms)
link(python, federatedLearning)

// ─── Cloud & DevOps cluster ───────────────────────────────────────────────────
;[docker, kubernetes, aws, ciCd, githubActions].forEach((n, i, arr) => {
  if (i < arr.length - 1) link(n, arr[i + 1])
})
link(git, ciCd)
link(securityScanning, ciCd)
link(microservices, docker)
link(microservices, kubernetes)
link(aws, systemDesign)

// ─── Leadership cluster ─────────────────────────────────────────────────────
;[publicSpeaking, dataStorytelling, stakeholderManagement, scrum, mentoring].forEach(
  (n, i, arr) => {
    if (i < arr.length - 1) link(n, arr[i + 1])
  },
)
link(projectPlanning, scrum)
link(teamCollaboration, scrum)

export const SKILLS_CONSTELLATION: SkillNode[] = allNodes

export const SKILLS_BY_ID: Record<string, SkillNode> = Object.fromEntries(
  allNodes.map((n) => [n.id, n]),
)

export const SKILL_CLUSTER_LABELS: Record<
  SkillNode['cluster'],
  {
    label: string
    x: number
    y: number
    color: string
    glowX?: number
    glowY?: number
    glowRx?: number
    glowRy?: number
  }
> = {
  center: { label: 'Architecture', x: 50, y: 68, color: '#818cf8' },
  engineering: { label: 'Software Engineering', x: 10, y: 72, color: '#3b82f6' },
  ai: { label: 'AI & Research', x: 50, y: 8, color: '#a855f7' },
  cloud: { label: 'Cloud & DevOps', x: 50, y: 97, color: '#14b8a6' },
  leadership: {
    label: 'Leadership',
    x: 90,
    y: 32,
    glowX: 83,
    glowY: 54,
    glowRx: 20,
    glowRy: 20,
    color: '#ec4899',
  },
  personal: { label: '', x: 0, y: 0, color: '#f59e0b' },
}
