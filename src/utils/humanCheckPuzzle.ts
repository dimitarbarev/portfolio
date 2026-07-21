export interface HumanCheckPuzzle {
  prompt: string
  answer: number
}

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function createHumanCheckPuzzle(): HumanCheckPuzzle {
  const variant = randomInt(0, 2)

  if (variant === 0) {
    const a = randomInt(2, 12)
    const b = randomInt(2, 12)
    return {
      prompt: `What is ${a} + ${b}?`,
      answer: a + b,
    }
  }

  if (variant === 1) {
    const a = randomInt(12, 24)
    const b = randomInt(2, 9)
    return {
      prompt: `What is ${a} − ${b}?`,
      answer: a - b,
    }
  }

  const a = randomInt(2, 9)
  const b = randomInt(2, 9)
  return {
    prompt: `What is ${a} × ${b}?`,
    answer: a * b,
  }
}
