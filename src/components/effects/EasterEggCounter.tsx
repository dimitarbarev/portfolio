import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles } from 'lucide-react'

interface EasterEggCounterProps {
  score: number
  percent: number
  visible: boolean
}

export function EasterEggCounter({ score, percent, visible }: EasterEggCounterProps) {
  return (
    <AnimatePresence>
      {visible && score > 0 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          className="fixed bottom-6 right-6 z-50 glass rounded-full px-4 py-2 flex items-center gap-2 text-xs text-text-muted"
        >
          <Sparkles className="h-3.5 w-3.5 text-purple-light" />
          <span>
            Exploration <span className="text-purple-light font-medium">{percent}%</span>
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
