import { BookOpen, RotateCcw, Volume2, VolumeX } from 'lucide-react';

interface StageHeaderProps {
  currentAct: string;
  isMuted: boolean;
  onToggleMute: () => void;
  onOpenHistory: () => void;
  onRequestRestart: () => void;
}

export function StageHeader({
  currentAct,
  isMuted,
  onToggleMute,
  onOpenHistory,
  onRequestRestart,
}: StageHeaderProps) {
  return (
    <header className="relative z-20 w-full pt-safe">
      <div className="mx-auto flex h-[52px] max-w-[680px] items-center justify-between px-4 sm:px-6 border-b border-white/[0.06]">
        {/* Left: Quiet chapter label */}
        <div className="min-w-0 pr-3">
          <span className="font-display text-xs sm:text-sm tracking-[0.08em] text-[#8A867E] truncate block">
            {currentAct}
          </span>
        </div>

        {/* Right: Minimal 44x44 touch controls */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleMute();
            }}
            aria-label={isMuted ? '开启声音' : '静音'}
            title={isMuted ? '开启声音' : '静音'}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg text-[#8A867E] hover:text-[#EAE6DF] active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E2A856]"
          >
            {isMuted ? <VolumeX className="w-[18px] h-[18px]" strokeWidth={1.6} /> : <Volume2 className="w-[18px] h-[18px]" strokeWidth={1.6} />}
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenHistory();
            }}
            aria-label="记忆回溯"
            title="记忆回溯"
            className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg text-[#8A867E] hover:text-[#EAE6DF] active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E2A856]"
          >
            <BookOpen className="w-[18px] h-[18px]" strokeWidth={1.6} />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onRequestRestart();
            }}
            aria-label="重新开始"
            title="重新开始"
            className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg text-[#8A867E] hover:text-[#E2A856] active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E2A856]"
          >
            <RotateCcw className="w-[17px] h-[17px]" strokeWidth={1.6} />
          </button>
        </div>
      </div>
    </header>
  );
}
