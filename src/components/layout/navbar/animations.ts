import { Variants } from 'framer-motion';

export const raysVariants: Variants = {
  hidden: {
    strokeOpacity: 0,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
  visible: {
    strokeOpacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

export const rayVariant: Variants = {
  hidden: {
    pathLength: 0,
    opacity: 0,
    // Start from center of the circle
    scale: 0,
  },
  visible: {
    pathLength: 1,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
      // Customize timing for each property
      pathLength: { duration: 0.3 },
      opacity: { duration: 0.2 },
      scale: { duration: 0.3 },
    },
  },
};

export const shineVariant: Variants = {
  hidden: {
    opacity: 0,
    scale: 2,
    strokeDasharray: '20, 1000',
    strokeDashoffset: 0,
    filter: 'blur(0px)',
  },
  visible: {
    opacity: [0, 1, 0],
    strokeDashoffset: [0, -50, -100],
    filter: ['blur(2px)', 'blur(2px)', 'blur(0px)'],
    transition: {
      duration: 0.75,
      ease: 'linear',
    },
  },
};
