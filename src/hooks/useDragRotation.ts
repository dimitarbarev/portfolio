import { useCallback, useEffect, useRef, useState } from 'react'

interface UseDragRotationOptions {
  activeIndex: number
  itemCount: number
  onIndexChange: (index: number) => void
  onDragStart?: () => void
  onDragEnd?: () => void
  sensitivity?: number
}

/**
 * Horizontal swipe / drag for carousels.
 *
 * React's onTouchMove is passive, so preventDefault cannot stop the page from
 * stealing the gesture. We bind native pointer + non-passive touchmove on the
 * node instead — that is what makes swipe work on real phones.
 */
export function useDragRotation({
  activeIndex,
  itemCount,
  onIndexChange,
  onDragStart,
  onDragEnd,
  sensitivity = 0.008,
}: UseDragRotationOptions) {
  const [dragOffset, setDragOffset] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const nodeRef = useRef<HTMLDivElement | null>(null)

  const isDraggingRef = useRef(false)
  const startXRef = useRef(0)
  const startYRef = useRef(0)
  const accumulatedRef = useRef(0)
  const axisRef = useRef<'x' | 'y' | null>(null)
  const swipedRef = useRef(false)

  const latestRef = useRef({
    activeIndex,
    itemCount,
    onIndexChange,
    onDragStart,
    onDragEnd,
    sensitivity,
  })
  latestRef.current = {
    activeIndex,
    itemCount,
    onIndexChange,
    onDragStart,
    onDragEnd,
    sensitivity,
  }

  useEffect(() => {
    const node = nodeRef.current
    if (!node) return

    const begin = (clientX: number, clientY: number) => {
      isDraggingRef.current = true
      swipedRef.current = false
      axisRef.current = null
      startXRef.current = clientX
      startYRef.current = clientY
      accumulatedRef.current = 0
      setIsDragging(true)
      latestRef.current.onDragStart?.()
    }

    const update = (clientX: number, clientY: number) => {
      if (!isDraggingRef.current) return
      const dx = clientX - startXRef.current
      const dy = clientY - startYRef.current
      if (!axisRef.current) {
        if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return
        axisRef.current = Math.abs(dx) >= Math.abs(dy) ? 'x' : 'y'
      }
      if (axisRef.current !== 'x') return
      accumulatedRef.current = dx
      setDragOffset(dx * latestRef.current.sensitivity)
    }

    const finish = () => {
      if (!isDraggingRef.current) return
      isDraggingRef.current = false
      setIsDragging(false)

      const { activeIndex: index, itemCount: count, onIndexChange: change, onDragEnd: end } =
        latestRef.current
      const delta = accumulatedRef.current
      if (axisRef.current === 'x' && Math.abs(delta) > 40) {
        swipedRef.current = true
        if (delta > 0) change((index - 1 + count) % count)
        else change((index + 1) % count)
      }

      accumulatedRef.current = 0
      axisRef.current = null
      setDragOffset(0)
      end?.()
    }

    const onPointerDown = (e: PointerEvent) => {
      if (e.button !== 0) return
      if ((e.target as HTMLElement | null)?.closest('button, a')) return
      node.setPointerCapture(e.pointerId)
      begin(e.clientX, e.clientY)
    }

    const onPointerMove = (e: PointerEvent) => {
      update(e.clientX, e.clientY)
    }

    const onTouchMove = (e: TouchEvent) => {
      if (!isDraggingRef.current) return
      const touch = e.touches[0]
      if (!touch) return
      update(touch.clientX, touch.clientY)
      if (axisRef.current === 'x') e.preventDefault()
    }

    node.addEventListener('pointerdown', onPointerDown)
    node.addEventListener('pointermove', onPointerMove)
    node.addEventListener('pointerup', finish)
    node.addEventListener('pointercancel', finish)
    node.addEventListener('touchmove', onTouchMove, { passive: false })

    return () => {
      node.removeEventListener('pointerdown', onPointerDown)
      node.removeEventListener('pointermove', onPointerMove)
      node.removeEventListener('pointerup', finish)
      node.removeEventListener('pointercancel', finish)
      node.removeEventListener('touchmove', onTouchMove)
    }
  }, [])

  const consumeSwipe = useCallback(() => {
    const swiped = swipedRef.current
    swipedRef.current = false
    return swiped
  }, [])

  return {
    dragOffset,
    isDragging,
    nodeRef,
    consumeSwipe,
    goNext: () => onIndexChange((activeIndex + 1) % itemCount),
    goPrev: () => onIndexChange((activeIndex - 1 + itemCount) % itemCount),
  }
}
