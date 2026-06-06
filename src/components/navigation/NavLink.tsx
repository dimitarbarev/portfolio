import { motion } from 'framer-motion'
import type { SectionId } from '@/types'
import { scrollToSection } from '@/utils/scroll'
import { cn } from '@/utils/cn'

interface NavLinkProps {
  id: SectionId
  label: string
  isActive: boolean
  onClick?: () => void
}

export function NavLink({ id, label, isActive, onClick }: NavLinkProps) {
  const handleClick = () => {
    scrollToSection(id)
    onClick?.()
  }

  return (
    <button
      onClick={handleClick}
      className={cn(
        'relative px-3 py-1.5 text-sm transition-colors duration-300',
        isActive ? 'text-text-primary' : 'text-text-muted hover:text-text-secondary',
      )}
    >
      {label}
      {isActive && (
        <motion.div
          layoutId="nav-indicator"
          className="absolute inset-x-1 -bottom-0.5 h-px bg-gradient-to-r from-purple to-blue"
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />
      )}
    </button>
  )
}
