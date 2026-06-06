import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import type { NavItem, SectionId } from '@/types'
import { scrollToSection } from '@/utils/scroll'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  items: NavItem[]
  activeSection: SectionId
}

export function MobileMenu({ isOpen, onClose, items, activeSection }: MobileMenuProps) {
  const handleNav = (id: SectionId) => {
    scrollToSection(id)
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-void/80 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.nav
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 bottom-0 z-[80] w-72 glass-strong p-6 flex flex-col"
          >
            <div className="flex justify-end mb-8">
              <button
                onClick={onClose}
                className="p-2 text-text-muted hover:text-text-primary transition-colors"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex flex-col gap-1">
              {items.map((item, i) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => handleNav(item.id)}
                  className={`text-left px-4 py-3 rounded-lg text-sm transition-colors ${
                    activeSection === item.id
                      ? 'text-purple-light bg-purple/10'
                      : 'text-text-secondary hover:text-text-primary hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </motion.button>
              ))}
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  )
}
