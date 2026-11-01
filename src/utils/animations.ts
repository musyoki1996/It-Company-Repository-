import { Variants } from 'framer-motion';

/**
 * Premium corporate deliberate easing curves:
 * A weighted cubic-bezier [0.25, 0.1, 0.25, 1.0] providing physical mass,
 * smooth onset, and a deliberate, grounded deceleration into resting position.
 */
export const CORPORATE_EASE = [0.25, 0.1, 0.25, 1.0] as const;

/**
 * Container variant that coordinates staggered entry of children cards
 */
export const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.06,
    },
  },
};

/**
 * Weighty card entry variant:
 * Combines gentle physical elevation (y: 20px), subtle mass anchoring (scale: 0.985 -> 1),
 * and calibrated deliberate duration (0.65s) with a smooth ease-in-out curve.
 */
export const deliberateCardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 22,
    scale: 0.985,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.65,
      ease: CORPORATE_EASE,
    },
  },
};

/**
 * Slightly longer sequence for featured project showcases & hero modules
 */
export const deliberateHeroVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 28,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: CORPORATE_EASE,
    },
  },
};

/**
 * Hover interaction with deliberate damping (no bouncy cartoon feel)
 */
export const subtleCardHover = {
  y: -3,
  transition: {
    duration: 0.35,
    ease: CORPORATE_EASE,
  },
};
