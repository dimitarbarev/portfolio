import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Menu } from 'lucide-react'
import { NavLink } from './NavLink'
import { MobileMenu } from './MobileMenu'
import { ProgressIndicator } from './ProgressIndicator'
import { NAV_ITEMS, SITE_NAME } from '@/utils/constants'
import { useActiveSection } from '@/hooks/useActiveSection'
import { scrollToSection } from '@/utils/scroll'
import { fadeInDown } from '@/animations/variants'
import { cn } from '@/utils/cn'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const activeSection = useActiveSection()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const visibleNavItems = NAV_ITEMS.filter((item) => item.id !== 'hero')

  return (
    <>
      <ProgressIndicator />
      <motion.header
        variants={fadeInDown}
        initial="hidden"
        animate="visible"
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled ? 'glass-strong py-3' : 'bg-transparent py-5',
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 md:px-8">
          <button
            onClick={() => scrollToSection('hero')}
            className="font-display text-lg font-semibold tracking-tight text-text-primary hover:text-purple-light transition-colors"
          >
            {SITE_NAME}
            <span className="text-purple">.</span>
          </button>

          <nav className="hidden lg:flex items-center gap-1">
            {visibleNavItems.map((item) => (
              <NavLink
                key={item.id}
                id={item.id}
                label={item.label}
                isActive={activeSection === item.id}
              />
            ))}
          </nav>

          <button
            onClick={() => scrollToSection('contact')}
            className="hidden md:inline-flex items-center rounded-full bg-gradient-to-r from-purple/80 to-blue/80 px-5 py-2 text-sm font-medium text-white transition-all hover:shadow-lg hover:shadow-purple/20"
          >
            Get in touch
          </button>

          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden p-2 text-text-secondary hover:text-text-primary"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </motion.header>

      <MobileMenu
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        items={visibleNavItems}
        activeSection={activeSection}
      />
    </>
  )
}
