import type { Variants } from 'framer-motion'

export const sectionIntro: Variants = {
  hidden: {
    opacity: 0,
    y: 34,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.58,
      ease: 'easeOut',
    },
  },
}

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.08,
      staggerChildren: 0.08,
    },
  },
}

export const cardReveal: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.96,
    y: 28,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.48,
      ease: 'easeOut',
    },
  },
}

export const revealViewport = {
  amount: 0.28,
  once: true,
}
