import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { ENDINGS_META } from '../engine/inkRunner';
import { stripEmotionalMarkup } from './KineticText';
import type { EndingId, HistoryEntry } from '../types/narrative';

interface HistorySheetProps {
  isOpen: boolean;
  initialTab?: 'log' | 'endings';
  history: HistoryEntry[];
  unlockedEndings: EndingId[];
  onClose: () => void;
}

const ALL_ENDING_IDS: EndingId[] = [
  'ember',
  'beyond_glass',
  'quiet_shore',
  'southbound',
  'midnight_draft',
  'empty_seat',
];

export function HistorySheet({
  isOpen,
  initialTab = 'log',
  history,
  unlockedEndings,
  onClose,
}: HistorySheetProps) {
  const [activeTab, setActiveTab] = useState<'log' | 'endings'>(initialTab);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center sm:items-center"
          onClick={onClose}
        >
          {/* Backdrop without backdrop-blur over WebGL */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="absolute inset-0 bg-black/80"
          />

          {/* Bottom Sheet / Centered Modal on larger screens */}
          <motion.div
            initial={{ y: '100%', opacity: 0.6 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0.6 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative z-10 w-full max-w-[600px] max-h-[82vh] flex flex-col rounded-t-3xl sm:rounded-2xl bg-[#141418] border border-white/[0.08] overflow-hidden"
          >
            {/* Mobile drag handle */}
            <div className="sm:hidden pt-3 pb-1 flex justify-center">
              <div className="w-10 h-1 rounded-full bg-white/15" />
            </div>

            {/* Header with segmented tabs */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/[0.07]">
              <div className="flex items-center gap-1 p-1 rounded-lg bg-[#0A0A0C]">
                <button
                  type="button"
                  onClick={() => setActiveTab('log')}
                  className={`min-h-[36px] px-3.5 py-1.5 rounded-md font-sans-ui text-xs tracking-wide transition-colors whitespace-nowrap shrink-0 ${
                    activeTab === 'log'
                      ? 'bg-[#1F1E24] text-[#EAE6DF]'
                      : 'text-[#8A867E] hover:text-[#EAE6DF]'
                  }`}
                >
                  记忆回溯
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('endings')}
                  className={`min-h-[36px] px-3.5 py-1.5 rounded-md font-sans-ui text-xs tracking-wide transition-colors whitespace-nowrap shrink-0 tabular-nums ${
                    activeTab === 'endings'
                      ? 'bg-[#1F1E24] text-[#EAE6DF]'
                      : 'text-[#8A867E] hover:text-[#EAE6DF]'
                  }`}
                >
                  余韵图鉴 · {unlockedEndings.length}/6
                </button>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="关闭抽屉"
                className="min-h-[44px] min-w-[44px] -mr-2 flex items-center justify-center rounded-lg text-[#8A867E] hover:text-[#EAE6DF] transition-colors"
              >
                <X className="w-[18px] h-[18px]" strokeWidth={1.6} />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto obsidian-scroll px-5 py-5 pb-safe">
              {activeTab === 'log' ? (
                history.length === 0 ? (
                  <p className="py-12 text-center font-serif-body text-sm text-[#8A867E]">
                    夜色刚刚开始，还没有留下回响。
                  </p>
                ) : (
                  <div className="space-y-4">
                    {history.map((item) => {
                      if (item.kind === 'act') {
                        return (
                          <div key={item.id} className="pt-3 pb-1 border-b border-white/[0.06]">
                            <span className="font-display text-xs tracking-[0.12em] text-[#E2A856]/80">
                              {item.text}
                            </span>
                          </div>
                        );
                      }
                      if (item.kind === 'choice') {
                        return (
                          <div
                            key={item.id}
                            className="py-2.5 px-3.5 rounded-lg bg-[#0A0A0C]/60 border border-[#E2A856]/25"
                          >
                            <span className="block font-sans-ui text-[11px] text-[#E2A856]/75 mb-1">
                              我的选择
                            </span>
                            <p className="font-serif-body text-sm leading-relaxed text-[#EAE6DF]">
                              {item.text}
                            </p>
                          </div>
                        );
                      }
                      return (
                        <p
                          key={item.id}
                          className="font-serif-body text-[15px] leading-[1.8] text-[#EAE6DF]/80 font-light"
                        >
                          {stripEmotionalMarkup(item.text)}
                        </p>
                      );
                    })}
                  </div>
                )
              ) : (
                <div className="space-y-3">
                  {ALL_ENDING_IDS.map((id) => {
                    const meta = ENDINGS_META[id];
                    const unlocked = unlockedEndings.includes(id);
                    return (
                      <div
                        key={id}
                        className={`p-4 rounded-xl border ${
                          unlocked
                            ? 'bg-[#0A0A0C]/70 border-white/[0.09]'
                            : 'bg-[#0A0A0C]/35 border-white/[0.04]'
                        }`}
                      >
                        <div className="flex items-baseline justify-between gap-3 mb-1.5">
                          <div className="flex items-baseline gap-2.5">
                            <span className="font-display text-sm text-[#E2A856]/80">
                              {meta.roman}.
                            </span>
                            <h3 className="font-serif-body text-base text-[#EAE6DF]">
                              {unlocked ? meta.title : '未抵达的岔路'}
                            </h3>
                          </div>
                          <span className="font-display text-xs text-[#8A867E]">
                            {unlocked ? meta.englishTitle : 'Unexplored'}
                          </span>
                        </div>
                        <p className="font-serif-body text-[13px] leading-relaxed text-[#8A867E]">
                          {unlocked
                            ? meta.epigraph
                            : '夜色尚未走到这一端。或许在下一次犹豫时，你会做出不同的决定。'}
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
