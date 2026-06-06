import { useCallback, useRef, useState } from 'react'
import { UNIVERSE_SCENE_COUNT } from '@/data/universeScenes'

interface UseDragRotationOptions {
  activeIndex: number
  onIndexChange: (index: number) => void
  onDragStart?: () => void
  onDragEnd?: () => void
  sensitivity?: number
}

export function useDragRotation({
  activeIndex,
  onIndexChange,
  onDragStart,
  onDragEnd,
  sensitivity = 0.008,
}: UseDragRotationOptions) {
  const [dragOffset, setDragOffset] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const startXRef = useRef(0)
  const accumulatedRef = useRef(0)

  const handlePointerDown = useCallback(
    (clientX: number) => {
      setIsDragging(true)
      startXRef.current = clientX
      accumulatedRef.current = 0
      onDragStart?.()
    },
    [onDragStart],
  )

  const handlePointerMove = useCallback(
    (clientX: number) => {
      if (!isDragging) return
      const delta = clientX - startXRef.current
      accumulatedRef.current = delta
      setDragOffset(delta * sensitivity)
    },
    [isDragging, sensitivity],
  )

  const handlePointerUp = useCallback(() => {
    if (!isDragging) return
    setIsDragging(false)

    const threshold = 60
    const delta = accumulatedRef.current

    if (Math.abs(delta) > threshold) {
      if (delta > 0) {
        onIndexChange((activeIndex - 1 + UNIVERSE_SCENE_COUNT) % UNIVERSE_SCENE_COUNT)
      } else {
        onIndexChange((activeIndex + 1) % UNIVERSE_SCENE_COUNT)
      }
    }

    setDragOffset(0)
    accumulatedRef.current = 0
    onDragEnd?.()
  }, [isDragging, activeIndex, onIndexChange, onDragEnd])

  const bindDrag = useCallback(
    () => ({
      onPointerDown: (e: React.PointerEvent) => {
        e.currentTarget.setPointerCapture(e.pointerId)
        handlePointerDown(e.clientX)
      },
      onPointerMove: (e: React.PointerEvent) => handlePointerMove(e.clientX),
      onPointerUp: () => handlePointerUp(),
      onPointerCancel: () => handlePointerUp(),
    }),
    [handlePointerDown, handlePointerMove, handlePointerUp],
  )

  return {
    dragOffset,
    isDragging,
    bindDrag,
    goNext: () => onIndexChange((activeIndex + 1) % UNIVERSE_SCENE_COUNT),
    goPrev: () => onIndexChange((activeIndex - 1 + UNIVERSE_SCENE_COUNT) % UNIVERSE_SCENE_COUNT),
  }
}
