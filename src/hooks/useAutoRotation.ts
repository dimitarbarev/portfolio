import { useCallback, useEffect, useRef } from 'react'
import { AUTO_ROTATION_INTERVAL_MS, AUTO_ROTATION_RESUME_MS } from '@/data/universeScenes'

interface UseAutoRotationOptions {
  onTick: () => void
  enabled: boolean
  onPause?: () => void
  onResume?: () => void
}

export function useAutoRotation({
  onTick,
  enabled,
  onPause,
  onResume,
}: UseAutoRotationOptions) {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const pausedRef = useRef(!enabled)
  const onTickRef = useRef(onTick)

  onTickRef.current = onTick

  const clearTimers = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current)
      resumeTimeoutRef.current = null
    }
  }, [])

  const startRotation = useCallback(() => {
    clearTimers()
    if (pausedRef.current) return
    intervalRef.current = setInterval(() => onTickRef.current(), AUTO_ROTATION_INTERVAL_MS)
  }, [clearTimers])

  const pause = useCallback(() => {
    pausedRef.current = true
    clearTimers()
    onPause?.()
  }, [clearTimers, onPause])

  const scheduleResume = useCallback(() => {
    clearTimers()
    resumeTimeoutRef.current = setTimeout(() => {
      pausedRef.current = false
      onResume?.()
      startRotation()
    }, AUTO_ROTATION_RESUME_MS)
  }, [clearTimers, onResume, startRotation])

  useEffect(() => {
    pausedRef.current = !enabled
    if (enabled) {
      startRotation()
    } else {
      clearTimers()
    }
    return clearTimers
  }, [enabled, startRotation, clearTimers])

  return { pause, scheduleResume, startRotation }
}
