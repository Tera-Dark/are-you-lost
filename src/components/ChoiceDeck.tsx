import { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import rough from 'roughjs';
import { soundEngine } from '../engine/soundEngine';
import type { StoryChoice } from '../types/narrative';

interface ChoiceDeckProps {
  choices: StoryChoice[];
  onSelect: (choice: StoryChoice) => void;
}

export function ChoiceDeck({ choices, onSelect }: ChoiceDeckProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const boxPaths = useMemo(() => {
    const gen = rough.generator({ options: { seed: 77 } });
    const idle = gen.toPaths(
      gen.rectangle(3, 3, 314, 62, {
        stroke: 'rgba(234,230,223,0.36)',
        strokeWidth: 1.3,
        roughness: 1.8,
        bowing: 1.5,
      })
    );
    const active = gen.toPaths(
      gen.rectangle(3, 3, 314, 62, {
        stroke: '#E2A856',
        strokeWidth: 1.8,
        roughness: 2.0,
        bowing: 1.9,
      })
    );
    return { idle, active };
  }, []);

  if (choices.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className="w-full space-y-2.5 pt-2"
      onClick={(e) => e.stopPropagation()}
    >
      <p className="font-sans-ui text-[11px] tracking-[0.16em] text-[#8A867E] mb-2 px-1">
        在此刻落笔
      </p>
      {choices.map((choice, idx) => {
        const isActive = hoveredIdx === idx;
        const paths = isActive ? boxPaths.active : boxPaths.idle;

        return (
          <motion.button
            key={`${choice.index}-${choice.text.slice(0, 12)}`}
            type="button"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.06 + idx * 0.11, ease: [0.16, 1, 0.3, 1] }}
            onPointerEnter={() => {
              setHoveredIdx(idx);
              soundEngine.playSfx('hover');
            }}
            onPointerLeave={() => setHoveredIdx(null)}
            onFocus={() => setHoveredIdx(idx)}
            onBlur={() => setHoveredIdx(null)}
            onClick={() => onSelect(choice)}
            className="relative w-full min-h-[56px] text-left px-4 py-3.5 active:scale-[0.985] transition-transform focus-visible:outline-none flex items-start gap-3"
          >
            {/* Hand-drawn sketchy border */}
            <svg
              viewBox="0 0 320 68"
              preserveAspectRatio="none"
              aria-hidden="true"
              className="absolute inset-0 w-full h-full pointer-events-none"
            >
              {paths.map((p, pIdx) => (
                <motion.path
                  key={`${idx}-${isActive}-${pIdx}`}
                  d={p.d}
                  stroke={p.stroke}
                  strokeWidth={p.strokeWidth}
                  fill={isActive ? 'rgba(226,168,86,0.07)' : 'rgba(18,18,22,0.72)'}
                  initial={{ pathLength: 0.45, opacity: 0.6 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.45 }}
                />
              ))}
            </svg>

            <span
              className={`relative z-10 font-display text-sm pt-[2px] tabular-nums shrink-0 transition-colors ${
                isActive ? 'text-[#E2A856]' : 'text-[#8A867E]'
              }`}
            >
              0{idx + 1}
            </span>
            <span className="relative z-10 font-serif-body text-[15px] leading-[1.6] text-[#EAE6DF]">
              {choice.text}
            </span>
          </motion.button>
        );
      })}
    </motion.div>
  );
}
