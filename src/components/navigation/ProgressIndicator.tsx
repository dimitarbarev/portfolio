import { motion } from 'framer-motion'
import { useScrollProgress } from '@/hooks/useScrollProgress'

export function ProgressIndicator() {
  const progress = useScrollProgress()

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[2px] bg-transparent">
      <motion.div
        className="h-full bg-gradient-to-r from-purple via-blue to-blue-electric origin-left"
        style={{ scaleX: progress }}
      />
    </div>
  )
}
