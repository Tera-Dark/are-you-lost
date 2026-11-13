import { useMemo } from 'react';
import { motion } from 'motion/react';
import rough from 'roughjs';
import type { EndingId } from '../types/narrative';

interface TitleScreenProps {
  hasSavedRun: boolean;
  unlockedEndings: EndingId[];
  onStartNew: () => void;
  onContinue: () => void;
  onOpenArchive: () => void;
}

export function TitleScreen({
  hasSavedRun,
  unlockedEndings,
  onStartNew,
  onContinue,
  onOpenArchive,
}: TitleScreenProps) {
  const sketchPaths = useMemo(() => {
    const gen = rough.generator({ options: { seed: 108 } });
    return {
      horizon: gen.toPaths(
        gen.line(12, 130, 328, 130, { stroke: 'rgba(234,230,223,0.3)', strokeWidth: 1.3, roughness: 2.0 })
      ),
      lampPost: gen.toPaths(
        gen.line(258, 130, 258, 42, { stroke: 'rgba(234,230,223,0.42)', strokeWidth: 1.4, roughness: 1.7 })
      ),
      lampArc: gen.toPaths(
        gen.circle(258, 42, 16, {
          stroke: '#E2A856',
          strokeWidth: 1.5,
          roughness: 1.4,
          fill: 'rgba(226,168,86,0.4)',
          fillStyle: 'hachure',
          hachureGap: 3,
        })
      ),
      halo: gen.toPaths(
        gen.circle(258, 42, 54, { stroke: 'rgba(226,168,86,0.22)', strokeWidth: 1, roughness: 2.8 })
      ),
      figure: [
        ...gen.toPaths(gen.circle(196, 94, 13, { stroke: '#EAE6DF', strokeWidth: 1.4, roughness: 1.6 })),
        ...gen.toPaths(
          gen.polygon(
            [
              [189, 102],
              [203, 102],
              [207, 130],
              [186, 130],
            ],
            { stroke: '#EAE6DF', strokeWidth: 1.4, roughness: 1.8 }
          )
        ),
      ],
    };
  }, []);

  return (
    <main className="relative z-10 flex min-h-dvh flex-col justify-between px-6 py-9 pb-safe max-w-[600px] mx-auto">
      {/* Top quiet meta line */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9 }}
        className="flex items-center justify-between pt-safe"
      >
        <span className="font-display text-xs tracking-[0.18em] text-[#8A867E]">
          23:40 PM · LAST TRAIN
        </span>
        {unlockedEndings.length > 0 && (
          <button
            type="button"
            onClick={onOpenArchive}
            className="min-h-[44px] px-2 flex items-center font-sans-ui text-xs tracking-wide text-[#8A867E] hover:text-[#E2A856] transition-colors tabular-nums"
          >
            余韵图鉴 · {unlockedEndings.length} / 6
          </button>
        )}
      </motion.div>

      {/* Center hero typography + minimalist hand-drawn vignette */}
      <div className="my-auto py-8 space-y-6">
        <div className="w-full max-w-[340px]">
          <svg
            viewBox="0 0 340 148"
            className="w-full h-auto overflow-visible"
            aria-hidden="true"
          >
            {[
              ...sketchPaths.horizon,
              ...sketchPaths.lampPost,
              ...sketchPaths.lampArc,
              ...sketchPaths.halo,
              ...sketchPaths.figure,
            ].map((p, i) => (
              <motion.path
                key={i}
                d={p.d}
                stroke={p.stroke}
                strokeWidth={p.strokeWidth}
                fill={p.fill}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.1, delay: i * 0.08, ease: 'easeOut' }}
              />
            ))}
          </svg>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 14, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.0, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="font-display text-[clamp(2.75rem,9vw,4.25rem)] leading-[1.06] tracking-[-0.01em] font-normal text-[#EAE6DF] text-balance">
            Are you lost?
          </h1>
          <p className="mt-4 font-serif-body text-base sm:text-[17px] leading-[1.85] text-[#B8B2A6] max-w-[26rem] font-light">
            一场关于末班地铁、十平米出租屋与人生岔路的深夜对话。这里没有标准答案，只有你与自己的坦诚时刻。
          </p>
        </motion.div>
      </div>

      {/* Bottom thumb-zone action area */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.85, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-3"
      >
        {hasSavedRun ? (
          <>
            <button
              type="button"
              onClick={onContinue}
              className="w-full min-h-[52px] rounded-xl bg-[#E2A856] text-[#0A0A0C] font-sans-ui text-sm font-medium tracking-[0.08em] hover:bg-[#eab86e] active:scale-[0.985] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E2A856]/60"
            >
              继续夜行
            </button>
            <button
              type="button"
              onClick={onStartNew}
              className="w-full min-h-[48px] rounded-xl bg-[#141418]/85 border border-white/[0.12] text-[#EAE6DF]/90 font-sans-ui text-sm tracking-[0.06em] hover:border-white/30 hover:text-[#EAE6DF] active:scale-[0.985] transition-all"
            >
              重新踏入夜色
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={onStartNew}
            className="w-full min-h-[52px] rounded-xl bg-[#E2A856] text-[#0A0A0C] font-sans-ui text-sm font-medium tracking-[0.08em] hover:bg-[#eab86e] active:scale-[0.985] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E2A856]/60"
          >
            踏入夜色
          </button>
        )}

        <p className="pt-2 text-center font-sans-ui text-[11px] tracking-wide text-[#8A867E]/85">
          建议开启声音体验 · 轻触画布推进思考
        </p>
      </motion.div>
    </main>
  );
}
