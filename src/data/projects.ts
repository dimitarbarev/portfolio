import type { Project } from '@/types'

import asmlTdd from '@/assets/projects/asml/tdd-cycle.png'
import asmlSystem from '@/assets/projects/asml/system-visualization.webp'
import asmlNoisyNeighbor from '@/assets/projects/asml/noisy-neighbor.webp'
import asmlSequence from '@/assets/projects/asml/sequence-diagram.webp'

import ocrBanner from '@/assets/projects/fraunhofer/project-banner.webp'
import ocrArchitecture from '@/assets/projects/fraunhofer/architecture-diagram.webp'

import dimotionArchitecture from '@/assets/projects/dimotion/architecture-diagram.webp'
import dimotionPipeline from '@/assets/projects/dimotion/github-actions-pipeline.webp'

export const PROJECTS: Project[] = [
  {
    id: 'asml-prioritization',
    title: 'Enterprise Request Prioritization Library',
    subtitle: 'Solving the Noisy Neighbor Problem',
    category: 'Enterprise Software • Architecture',
    organization: 'ASML',
    organizationLink: 'https://www.asml.com',
    year: '2024 – 2025',
    description:
      'A reusable Java prioritization library developed during my internship at ASML to ensure fairness between clients, intelligently schedule requests, and prevent high-volume consumers from degrading system performance.',
    tags: [
      'Java',
      'Concurrency',
      'Thread Pools',
      'CompletableFuture',
      'JUnit',
      'TDD',
      'Software Architecture',
    ],
    featured: true,
    accent: '#f59e0b',
    glow: 'enterprise',
    coverImage: asmlSystem,
    images: [
      { src: asmlSystem, alt: 'System visualization diagram', width: 1052, height: 857 },
      { src: asmlNoisyNeighbor, alt: 'Noisy Neighbor illustration', width: 509, height: 339 },
      { src: asmlTdd, alt: 'TDD cycle diagram', width: 1024, height: 680 },
      { src: asmlSequence, alt: 'Sequence diagram', width: 1509, height: 455 },
    ],
    tabs: {
      overview:
        'Developed a reusable enterprise-grade Java library focused on mitigating the Noisy Neighbor problem.\n\nThe library intelligently distributes incoming requests through priority-aware scheduling while maintaining fairness across clients and maximizing processing throughput.\n\nThe project emphasized software architecture, concurrency, scalability, maintainability, and automated testing.',
      architecture:
        'Core components:\n\n- Scheduler\n- Priority Buckets\n- Client Queues\n- Processing Pools\n- Shared Processing Pool\n- Fair Request Selection Logic\n\nRequests are routed through priority-specific processing pools while preserving fairness and avoiding resource starvation.',
      outcomes:
        '- Built a reusable Java prioritization framework\n- Mitigated Noisy Neighbor effects\n- Implemented concurrent request processing\n- Achieved extensive automated test coverage\n- Presented results internally at ASML',
      learnings:
        '- Concurrent programming\n- Thread-safe design\n- Enterprise architecture\n- Test Driven Development\n- Reusable library design\n- Software scalability',
    },
  },
  {
    id: 'fraunhofer-ocr',
    title: 'Benchmarking OCR Models for Insurance Invoices',
    subtitle: 'Improving document understanding through systematic evaluation',
    category: 'AI Research • Document Intelligence',
    organization: 'Fraunhofer',
    organizationLink: 'https://www.iao.fraunhofer.de',
    year: '2026',
    description:
      'Applied research project focused on benchmarking OCR architectures, evaluating extraction quality, and identifying optimal document-processing pipelines for industrial insurance workflows.',
    tags: [
      'Python',
      'OCR',
      'Computer Vision',
      'AI',
      'Benchmarking',
      'Research',
      'Streamlit',
      'Data Analysis',
    ],
    featured: true,
    accent: '#a855f7',
    glow: 'research',
    coverImage: ocrBanner,
    images: [
      { src: ocrBanner, alt: 'OCR Benchmarking project banner', width: 1105, height: 737 },
      { src: ocrArchitecture, alt: 'OCR Workbench architecture diagram', width: 1536, height: 1024 },
    ],
    tabs: {
      overview:
        'Research project conducted at Fraunhofer.\n\nThe goal was to design an evaluation platform capable of helping technical specialists compare OCR models and improve information extraction from scanned car repair invoices.\n\nThe work focused on:\n\n- Text extraction\n- Numerical extraction\n- Punctuation extraction\n- Calculation validation\n- Business-oriented evaluation\n\nThe platform was designed to complement existing industrial insurance processing systems.',
      architecture:
        'The platform contains:\n\n- OCR Engine Abstraction Layer\n- Ground Truth Generation\n- Segment Labeling\n- Evaluation Engine\n- Numeric Validation Service\n- Benchmarking Module\n- Metrics Layer\n\nEvaluation metrics include:\n\n- Precision\n- Recall\n- F1\n- WER\n- CER\n- Soft WER\n- Levenshtein Rate',
      outcomes:
        '- Benchmarked multiple OCR architectures\n- Built a complete evaluation workbench\n- Identified strengths and weaknesses of different models\n- Produced data-driven recommendations\n- Improved understanding of document AI systems',
      learnings:
        '- OCR technologies\n- AI evaluation methodologies\n- Experimental research\n- Performance benchmarking\n- Computer vision\n- Data-driven decision making',
    },
    publicationLink:
      'https://medium.com/@mitkobarev/a-reproducible-ocr-benchmarking-system-for-scanned-car-repair-invoices-fff3f80c06f1',
  },
  {
    id: 'dimotion',
    title: 'Dimotion Collaboration Platform',
    subtitle: 'Building a cloud-native collaboration ecosystem',
    category: 'Cloud • Full Stack • Enterprise Software',
    organization: 'Personal Project',
    year: '2025',
    description:
      'A full-stack collaboration platform built using a microservice architecture that enables teams to collaborate, share content, manage boards, and communicate through scalable cloud-native services.',
    tags: [
      'Spring Boot',
      'React',
      'Docker',
      'RabbitMQ',
      'MySQL',
      'AWS',
      'Auth0',
      'GitHub Actions',
      'OWASP',
      'Semgrep',
      'Gitleaks',
      'CI/CD',
    ],
    featured: true,
    accent: '#06b6d4',
    glow: 'cloud',
    coverImage: dimotionArchitecture,
    images: [
      { src: dimotionArchitecture, alt: 'Architecture diagram', width: 1584, height: 1456 },
      { src: dimotionPipeline, alt: 'GitHub Actions security pipeline screenshot', width: 2990, height: 1686 },
    ],
    tabs: {
      overview:
        'Dimotion was developed as part of the Enterprise Software semester.\n\nThe goal was to build a scalable collaboration platform where teams can:\n\n- Create boards\n- Manage content\n- Share media\n- Collaborate efficiently\n\nThe project evolved from a simple application into a complete microservice ecosystem.',
      architecture:
        'Architecture consists of:\n\n- React Frontend\n- API Gateway\n- Collaboration Service\n- Media Service\n- RabbitMQ\n- Independent Databases\n- Auth0 Authentication\n\nCommunication between services follows an event-driven approach.',
      outcomes:
        '- Built a complete full-stack platform\n- Implemented microservice architecture\n- Added secure authentication\n- Created CI/CD pipelines\n- Integrated automated security scanning\n- Containerized all services',
      learnings:
        '- Cloud architecture\n- Event-driven systems\n- Microservices\n- DevOps\n- Security engineering\n- CI/CD automation',
    },
  },
]
