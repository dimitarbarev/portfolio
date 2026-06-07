import { DESK_RESOURCES } from '@/data/desk'

const CONNECT_ORDER = ['linkedin', 'github'] as const

export const CONTACT_CONNECT_LINKS = CONNECT_ORDER.map((id) => {
  const resource = DESK_RESOURCES.find((r) => r.id === id)
  if (!resource) throw new Error(`Missing desk resource: ${id}`)
  return {
    id: resource.id,
    label: resource.label,
    href: resource.href,
    icon: resource.icon,
  }
})

export const CONTACT_FIELD_LIMITS = {
  name: 100,
  email: 255,
  message: 2000,
} as const
