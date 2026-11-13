import { useMemo } from 'react';
import { motion } from 'motion/react';
import rough from 'roughjs';
import { ENDINGS_META } from '../engine/inkRunner';
import type { EndingId } from '../types/narrative';

interface EndingScreenProps {
  endingId: EndingId;
  unlockedCount: number;
  onRestart: () => void;
  onOpenArchive: () => void;
}

export function EndingScreen({
  endingId,
  unlockedCount,
  onRestart,
  onOpenArchive,
}: EndingScreenProps) {
  const meta = ENDINGS_META[endingId];

  const framePaths = useMemo(() => {
    const gen = rough.generator({ options: { seed: 303 } });
    return gen.toPaths(
      gen.rectangle(3, 3, 354, 214, {
        stroke: 'rgba(226,168,86,0.4)',
        strokeWidth: 1.3,
        roughness: 1.8,
        bowing: 1.5,
      })
    );
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      className="w-full py-3 space-y-5"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="space-y-2">
        <div className="flex items-center gap-3 text-[#E2A856]/85">
          <span className="font-display text-xs tracking-[0.18em]">
            ENDING {meta.roman}
          </span>
          <span className="h-px flex-1 bg-white/[0.08]" />
          <span className="font-display text-xs tracking-wide text-[#8A867E]">
            {meta.englishTitle}
          </span>
        </div>

        <h2 className="font-serif-body text-2xl sm:text-[26px] font-normal tracking-[0.06em] text-[#EAE6DF]">
          {meta.title}
        </h2>
      </div>

      {/* Hand-drawn bordered reflection card */}
      <div className="relative p-5 bg-[#121216]/85 space-y-4">
        <svg
          viewBox="0 0 360 220"
          preserveAspectRatio="none"
          aria-hidden="true"
          className="absolute inset-0 w-full h-full pointer-events-none"
        >
          {framePaths.map((p, i) => (
            <motion.path
              key={i}
              d={p.d}
              stroke={p.stroke}
              strokeWidth={p.strokeWidth}
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.1, delay: 0.15 }}
            />
          ))}
        </svg>

        <p className="relative z-10 font-serif-body text-[15px] sm:text-base leading-[1.85] text-[#EAE6DF]/90 font-light">
          {meta.reflection}
        </p>

        <div className="relative z-10 h-px w-full bg-white/[0.08]" />

        <div className="relative z-10 space-y-1.5">
          <span className="block font-sans-ui text-[11px] tracking-[0.14em] text-[#E2A856]/80">
            留给你的一个问题
          </span>
          <p className="font-serif-body text-[15px] leading-[1.8] text-[#E2A856]/95 italic">
            “{meta.question}”
          </p>
        </div>
      </div>

      <div className="space-y-2.5 pt-1">
        <button
          type="button"
          onClick={onRestart}
          className="w-full min-h-[50px] rounded-xl bg-[#E2A856] text-[#0A0A0C] font-sans-ui text-sm font-medium tracking-[0.08em] hover:bg-[#eab86e] active:scale-[0.985] transition-all"
        >
          再走一次岔路
        </button>

        <button
          type="button"
          onClick={onOpenArchive}
          className="w-full min-h-[46px] rounded-xl bg-transparent border border-white/[0.1] text-[#EAE6DF]/85 font-sans-ui text-sm tracking-[0.05em] hover:border-white/25 active:scale-[0.985] transition-all tabular-nums"
        >
          查看余韵图鉴 · {unlockedCount} / 6
        </button>
      </div>
    </motion.section>
  );
}
