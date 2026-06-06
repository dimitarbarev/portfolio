export const EASE_PREMIUM = [0.22, 1, 0.36, 1] as const

export const TRANSITION_DEFAULT = {
  duration: 0.6,
  ease: EASE_PREMIUM,
}

export const TRANSITION_FAST = {
  duration: 0.3,
  ease: EASE_PREMIUM,
}

export const TRANSITION_SLOW = {
  duration: 1,
  ease: EASE_PREMIUM,
}

export const SPRING_SMOOTH = {
  type: 'spring' as const,
  stiffness: 100,
  damping: 20,
}

export const SPRING_SNAPPY = {
  type: 'spring' as const,
  stiffness: 300,
  damping: 30,
}
