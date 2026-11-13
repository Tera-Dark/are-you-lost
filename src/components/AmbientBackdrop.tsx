import { motion } from 'motion/react';
import type { MoodType, SceneLocation } from '../types/narrative';

interface AmbientBackdropProps {
  mood: MoodType;
  scene: SceneLocation;
  isTitle: boolean;
  focusActive: boolean;
}

interface MoodPalette {
  baseBg: string;
  primaryGlow: string;
  secondaryGlow: string;
  breathDuration: number;
  breathMin: number;
  breathMax: number;
}

const PALETTES: Record<MoodType, MoodPalette> = {
  rain: {
    baseBg: '#0B0D12',
    primaryGlow:
      'radial-gradient(ellipse 75% 55% at 50% 22%, rgba(108, 154, 210, 0.17) 0%, rgba(108, 154, 210, 0.04) 48%, transparent 74%)',
    secondaryGlow:
      'radial-gradient(circle at 62% 34%, rgba(226, 168, 86, 0.11) 0%, transparent 56%)',
    breathDuration: 6.2,
    breathMin: 0.72,
    breathMax: 1.0,
  },
  night: {
    baseBg: '#0C0C10',
    primaryGlow:
      'radial-gradient(ellipse 70% 52% at 50% 26%, rgba(226, 168, 86, 0.12) 0%, rgba(226, 168, 86, 0.03) 50%, transparent 74%)',
    secondaryGlow:
      'radial-gradient(circle at 35% 75%, rgba(114, 138, 178, 0.07) 0%, transparent 58%)',
    breathDuration: 7.0,
    breathMin: 0.74,
    breathMax: 1.0,
  },
  tension: {
    baseBg: '#0D0B10',
    primaryGlow:
      'radial-gradient(ellipse 72% 50% at 46% 24%, rgba(98, 146, 214, 0.16) 0%, rgba(98, 146, 214, 0.04) 46%, transparent 72%)',
    secondaryGlow:
      'radial-gradient(ellipse 68% 48% at 58% 68%, rgba(198, 88, 66, 0.12) 0%, transparent 64%)',
    breathDuration: 4.4,
    breathMin: 0.7,
    breathMax: 1.0,
  },
  memory: {
    baseBg: '#100E0C',
    primaryGlow:
      'radial-gradient(ellipse 74% 56% at 52% 28%, rgba(232, 168, 78, 0.21) 0%, rgba(226, 168, 86, 0.06) 48%, transparent 74%)',
    secondaryGlow:
      'radial-gradient(ellipse 80% 45% at 50% 82%, rgba(208, 134, 62, 0.11) 0%, transparent 66%)',
    breathDuration: 6.5,
    breathMin: 0.8,
    breathMax: 1.0,
  },
  stillness: {
    baseBg: '#0B0F12',
    primaryGlow:
      'radial-gradient(ellipse 72% 54% at 50% 26%, rgba(102, 156, 164, 0.15) 0%, rgba(102, 156, 164, 0.03) 48%, transparent 74%)',
    secondaryGlow:
      'radial-gradient(circle at 50% 52%, rgba(226, 168, 86, 0.13) 0%, transparent 60%)',
    breathDuration: 7.8,
    breathMin: 0.76,
    breathMax: 1.0,
  },
  dawn: {
    baseBg: '#120F0E',
    primaryGlow:
      'radial-gradient(ellipse 92% 60% at 52% 22%, rgba(242, 178, 92, 0.24) 0%, rgba(226, 142, 92, 0.09) 46%, transparent 76%)',
    secondaryGlow:
      'radial-gradient(ellipse 85% 50% at 50% 88%, rgba(218, 146, 86, 0.14) 0%, transparent 68%)',
    breathDuration: 6.8,
    breathMin: 0.82,
    breathMax: 1.0,
  },
};

export function AmbientBackdrop({
  mood,
  scene,
  isTitle,
  focusActive,
}: AmbientBackdropProps) {
  const activeMood: MoodType = isTitle ? 'night' : mood;
  const palette = PALETTES[activeMood];

  // Slightly warmer upper horizon during dawn_bridge or store scenes
  const warmFloor =
    !isTitle && (scene === 'store' || scene === 'dawn_bridge' || mood === 'memory');

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden transition-colors duration-[1400ms]"
      style={{ backgroundColor: palette.baseBg }}
    >
      {/* Primary atmospheric skylight / horizon wash */}
      <motion.div
        key={`primary-${activeMood}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: 'easeInOut' }}
        className="absolute inset-0"
        style={{ background: palette.primaryGlow }}
      />

      {/* Breathing practical light / warm lamp halo */}
      <motion.div
        key={`breath-${activeMood}`}
        animate={{
          opacity: [palette.breathMin, palette.breathMax, palette.breathMin],
          scale: [0.97, 1.04, 0.97],
        }}
        transition={{
          duration: palette.breathDuration,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute inset-0 will-change-transform"
        style={{ background: palette.secondaryGlow }}
      />

      {/* Subtle warm candle/lamp presence in cozy or dawn spaces */}
      <motion.div
        animate={{ opacity: warmFloor ? 0.85 : 0.25 }}
        transition={{ duration: 1.4, ease: 'easeInOut' }}
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 42%, rgba(226, 168, 86, 0.08) 0%, transparent 62%)',
        }}
      />

      {/* Soft central reading-plane warmth when an inner reflection hits */}
      <motion.div
        animate={{ opacity: focusActive ? 0.95 : 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 64% 38% at 50% 60%, rgba(226, 168, 86, 0.085) 0%, transparent 72%)',
        }}
      />
    </div>
  );
}
