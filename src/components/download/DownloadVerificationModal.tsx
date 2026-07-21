import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Bot, Check, Loader2, ShieldCheck, X } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { triggerFileDownload } from '@/utils/downloadFile'
import {
  createHumanCheckPuzzle,
  type HumanCheckPuzzle,
} from '@/utils/humanCheckPuzzle'
import { cn } from '@/utils/cn'

export interface DownloadRequest {
  href: string
  filename: string
  label: string
}

interface DownloadVerificationModalProps {
  request: DownloadRequest
  onClose: () => void
}

type Step = 'idle' | 'checking' | 'challenge' | 'verified' | 'failed'

export function DownloadVerificationModal({
  request,
  onClose,
}: DownloadVerificationModalProps) {
  const [step, setStep] = useState<Step>('idle')
  const [puzzle, setPuzzle] = useState<HumanCheckPuzzle>(() => createHumanCheckPuzzle())
  const [answer, setAnswer] = useState('')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onClose])

  const resetChallenge = () => {
    setPuzzle(createHumanCheckPuzzle())
    setAnswer('')
    setError(null)
  }

  const handleCheckboxClick = () => {
    if (step !== 'idle') return
    setStep('checking')
    window.setTimeout(() => {
      setStep('challenge')
      resetChallenge()
    }, 700)
  }

  const handleVerify = () => {
    const parsed = Number(answer.trim())
    if (!Number.isFinite(parsed)) {
      setError('Enter a number to continue.')
      setStep('failed')
      return
    }

    if (parsed !== puzzle.answer) {
      setError('That answer is incorrect. Try again.')
      setStep('failed')
      resetChallenge()
      return
    }

    setError(null)
    setStep('verified')
    window.setTimeout(() => {
      triggerFileDownload(request.href, request.filename)
      onClose()
    }, 650)
  }

  const isChecked = step === 'verified'
  const showChallenge = step === 'challenge' || step === 'failed'
  const isBusy = step === 'checking' || step === 'verified'

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-void/90 backdrop-blur-md" />
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 320, damping: 28 }}
        onClick={(event) => event.stopPropagation()}
        className="relative w-full max-w-md glass-strong rounded-2xl p-6 md:p-7"
        style={{
          boxShadow:
            '0 40px 100px -30px rgba(168,85,247,0.2), inset 0 1px 0 rgba(255,255,255,0.08)',
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-text-muted hover:text-text-primary transition-colors"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-3 mb-5 pr-8">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple/15 text-purple-light shrink-0">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-display text-xl font-semibold text-text-primary">
              Verify download
            </h3>
            <p className="text-sm text-text-muted mt-0.5">
              Quick check before downloading{' '}
              <span className="text-purple-light">{request.label}</span>
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-border-subtle bg-void-surface/70 p-4">
          <div className="flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={handleCheckboxClick}
              disabled={isBusy || isChecked}
              className={cn(
                'flex items-center gap-3 text-left transition-opacity',
                (isBusy || isChecked) && 'cursor-default',
              )}
            >
              <span
                className={cn(
                  'flex h-7 w-7 items-center justify-center rounded border transition-all',
                  isChecked
                    ? 'border-green-400/60 bg-green-500/20 text-green-300'
                    : 'border-border-subtle bg-void hover:border-purple/40',
                )}
              >
                {step === 'checking' ? (
                  <Loader2 className="h-4 w-4 animate-spin text-purple-light" />
                ) : isChecked ? (
                  <Check className="h-4 w-4" />
                ) : null}
              </span>
              <span className="text-sm font-medium text-text-primary">
                I&apos;m not a robot
              </span>
            </button>

            <div className="flex flex-col items-end gap-1 shrink-0">
              <Bot className="h-7 w-7 text-text-muted" />
              <span className="text-[10px] uppercase tracking-wider text-text-muted">
                Human check
              </span>
            </div>
          </div>

          {showChallenge && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-4 border-t border-border-subtle pt-4"
            >
              <p className="text-sm text-text-secondary mb-3">{puzzle.prompt}</p>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  inputMode="numeric"
                  value={answer}
                  onChange={(event) => setAnswer(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') handleVerify()
                  }}
                  placeholder="Your answer"
                  className="flex-1 rounded-lg border border-border-subtle bg-void px-3 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-purple/40"
                  autoFocus
                />
                <Button
                  type="button"
                  size="sm"
                  onClick={handleVerify}
                  className="sm:min-w-[104px]"
                >
                  Verify
                </Button>
              </div>
              {error && (
                <p className="mt-2 text-xs text-red-400">{error}</p>
              )}
            </motion.div>
          )}

          {step === 'verified' && (
            <p className="mt-4 text-sm text-green-300">
              Verified. Starting download…
            </p>
          )}
        </div>

        <p className="mt-4 text-xs text-text-muted leading-relaxed">
          This quick puzzle helps keep automated scrapers from bulk-downloading
          personal documents.
        </p>
      </motion.div>
    </motion.div>
  )
}
