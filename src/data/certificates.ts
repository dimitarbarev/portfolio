import type { Certificate } from '@/types'

export const CERTIFICATES: Certificate[] = [
  {
    id: 'fontys-diploma',
    title: 'Bachelor of Science — Software Engineering',
    issuer: 'Fontys University of Applied Sciences',
    year: '2026',
    description: 'Official diploma certificate.',
    href: '/diploma_Fontys_2026.pdf',
    downloadFilename: 'diploma_Fontys_2026.pdf',
  },
  {
    id: 'fadata-plsql-ai',
    title: 'PL/SQL + AI Tech Academy — Certificate of Completion',
    issuer: 'Fadata',
    year: '2026',
    description:
      'Oracle SQL, PL/SQL, relational database design, and applied AI.',
    href: '/certificate_Fadata_2026.pdf',
    downloadFilename: 'certificate_Fadata_2026.pdf',
    viewImage: '/certificate_Fadata_2026.jpg',
  },
]
