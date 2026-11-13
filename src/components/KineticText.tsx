import { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'motion/react';
import rough from 'roughjs';
import { soundEngine } from '../engine/soundEngine';
import type { StoryBeat } from '../types/narrative';

interface KineticTextProps {
  beat: StoryBeat;
  forceComplete: boolean;
  onRevealComplete: () => void;
}

type SegmentKind = 'plain' | 'amber' | 'circle' | 'tremor' | 'whisper' | 'impact';

interface TextSegment {
  kind: SegmentKind;
  content: string;
}

interface TimedToken {
  text: string;
  delayMs: number;
}

interface TimedSegment {
  kind: SegmentKind;
  content: string;
  tokens: TimedToken[];
  startMs: number;
  endMs: number;
}

const SOFT_BREAK = new Set(['，', '、']);
const MEDIUM_BREAK = new Set(['：', '；']);
const STRONG_BREAK = new Set(['。', '！', '？', '—', '…']);
const ATTACH_PREV = new Set([
  '，',
  '。',
  '！',
  '？',
  '、',
  '：',
  '；',
  '…',
  '—',
  '”',
  '’',
  '」',
  '』',
  '）',
  ')',
  '.',
  ',',
  '!',
  '?',
]);
const ATTACH_NEXT = new Set(['“', '‘', '「', '『', '（', '(']);

function parseAnnotatedText(raw: string): TextSegment[] {
  const regex = /(!![\s\S]*?!!|\[\[[\s\S]*?\]\]|@@[\s\S]*?@@|%%[\s\S]*?%%|\(\([\s\S]*?\)\))/g;
  const parts = raw.split(regex);
  const result: TextSegment[] = [];

  for (const part of parts) {
    if (!part) continue;
    if (part.startsWith('!!') && part.endsWith('!!')) {
      const inner = part.slice(2, -2);
      const innerSegs = parseAnnotatedText(inner);
      for (const s of innerSegs) {
        result.push({
          kind: s.kind === 'plain' ? 'impact' : s.kind,
          content: s.content,
        });
      }
    } else if (part.startsWith('[[') && part.endsWith(']]')) {
      result.push({ kind: 'amber', content: part.slice(2, -2) });
    } else if (part.startsWith('@@') && part.endsWith('@@')) {
      result.push({ kind: 'circle', content: part.slice(2, -2) });
    } else if (part.startsWith('%%') && part.endsWith('%%')) {
      result.push({ kind: 'tremor', content: part.slice(2, -2) });
    } else if (part.startsWith('((') && part.endsWith('))')) {
      result.push({ kind: 'whisper', content: part.slice(2, -2) });
    } else {
      result.push({ kind: 'plain', content: part });
    }
  }
  return result;
}

export function stripEmotionalMarkup(raw: string): string {
  return raw
    .replace(/!!([\s\S]*?)!!/g, '$1')
    .replace(/\[\[([\s\S]*?)\]\]/g, '$1')
    .replace(/@@([\s\S]*?)@@/g, '$1')
    .replace(/%%([\s\S]*?)%%/g, '$1')
    .replace(/\(\(([\s\S]*?)\)\)/g, '$1');
}

function tokenizeKinsoku(text: string): string[] {
  // Keep ASCII/numeric groups intact so times/numbers don't split strangely
  const rawUnits = text.match(/[A-Za-z0-9.+:%-]+|./gu) ?? [];
  const merged: string[] = [];
  let pendingPrefix = '';

  for (const unit of rawUnits) {
    if (ATTACH_NEXT.has(unit)) {
      pendingPrefix += unit;
      continue;
    }
    const combined = pendingPrefix + unit;
    pendingPrefix = '';

    if (ATTACH_PREV.has(unit) && merged.length > 0 && !pendingPrefix) {
      merged[merged.length - 1] += combined;
    } else {
      merged.push(combined);
    }
  }

  if (pendingPrefix) {
    if (merged.length > 0) merged[merged.length - 1] += pendingPrefix;
    else merged.push(pendingPrefix);
  }

  return merged;
}

function buildTimedSegments(segments: TextSegment[], charStepMs: number): {
  timed: TimedSegment[];
  totalDurationMs: number;
  circleTriggerMs: number | null;
} {
  let cursorMs = 0;
  let circleTriggerMs: number | null = null;

  const timed: TimedSegment[] = segments.map((seg) => {
    const units = tokenizeKinsoku(seg.content);
    const segStart = cursorMs;
    const tokens: TimedToken[] = [];

    for (const u of units) {
      tokens.push({ text: u, delayMs: cursorMs });
      const charsCount = Math.max(1, Array.from(u).length);
      let step = charsCount === 1 ? charStepMs : Math.round(charStepMs * Math.min(3, charsCount * 0.72));

      // Gentle rhythmic punctuation pause
      for (const ch of Array.from(u)) {
        if (STRONG_BREAK.has(ch)) {
          step += 190;
          break;
        }
        if (MEDIUM_BREAK.has(ch)) {
          step += 130;
          break;
        }
        if (SOFT_BREAK.has(ch)) {
          step += 95;
          break;
        }
      }
      cursorMs += step;
    }

    const segEnd = cursorMs;
    if (seg.kind === 'circle' && circleTriggerMs === null) {
      circleTriggerMs = Math.max(0, segEnd - 60);
    }

    return {
      kind: seg.kind,
      content: seg.content,
      tokens,
      startMs: segStart,
      endMs: segEnd,
    };
  });

  return {
    timed,
    totalDurationMs: cursorMs + 280,
    circleTriggerMs,
  };
}

function useAnnotationStrokes() {
  return useMemo(() => {
    const gen = rough.generator({ options: { seed: 19 } });
    const underline = gen.toPaths(
      gen.line(2, 6, 218, 5, {
        stroke: '#E2A856',
        strokeWidth: 2.3,
        roughness: 2.0,
        bowing: 2.1,
      })
    );
    // Wider ellipse so the circled text sits cleanly inside without clipping edges
    const oval = gen.toPaths(
      gen.ellipse(110, 23, 216, 42, {
        stroke: '#E8B161',
        strokeWidth: 2.1,
        roughness: 1.85,
        bowing: 1.5,
      })
    );
    return { underline, oval };
  }, []);
}

export function KineticText({ beat, forceComplete, onRevealComplete }: KineticTextProps) {
  const strokes = useAnnotationStrokes();
  const segments = useMemo(() => parseAnnotatedText(beat.text), [beat.text]);
  const plainLength = useMemo(
    () => segments.reduce((acc, s) => acc + s.content.length, 0),
    [segments]
  );

  const charStepMs =
    beat.anim === 'whisper'
      ? 52
      : beat.anim === 'blur-focus'
        ? 48
        : 44;

  const { timed, totalDurationMs, circleTriggerMs } = useMemo(
    () => buildTimedSegments(segments, charStepMs),
    [segments, charStepMs]
  );

  const isImpactBeat = beat.text.includes('!!');
  const completedRef = useRef(false);
  const circleSoundBeatRef = useRef<string | null>(null);

  const [visibleChars, setVisibleChars] = useState(
    beat.anim === 'typewriter' && !forceComplete ? 0 : plainLength
  );

  // Synced completion timer & typewriter cadence
  useEffect(() => {
    completedRef.current = false;

    const finishOnce = () => {
      if (completedRef.current) return;
      completedRef.current = true;
      onRevealComplete();
    };

    if (forceComplete) {
      setVisibleChars(plainLength);
      finishOnce();
      return;
    }

    if (beat.anim === 'title-card') {
      const timer = window.setTimeout(finishOnce, 1050);
      return () => window.clearTimeout(timer);
    }

    if (beat.anim !== 'typewriter') {
      const timer = window.setTimeout(finishOnce, totalDurationMs);
      return () => window.clearTimeout(timer);
    }

    setVisibleChars(0);
    const plainText = segments.map((s) => s.content).join('');
    let index = 0;
    let timeoutId = 0;

    const step = () => {
      index += 1;
      setVisibleChars(index);
      const ch = plainText[index - 1] ?? '';

      if (index % 2 === 1 && beat.sfx === 'tick') {
        soundEngine.playSfx('tick');
      }

      if (index >= plainLength) {
        finishOnce();
        return;
      }

      let delay = 44;
      if ('，、'.includes(ch)) delay = 155;
      else if ('。！？…—'.includes(ch)) delay = 250;

      timeoutId = window.setTimeout(step, delay);
    };

    timeoutId = window.setTimeout(step, 45);
    return () => window.clearTimeout(timeoutId);
  }, [
    beat.id,
    beat.anim,
    beat.sfx,
    plainLength,
    segments,
    totalDurationMs,
    forceComplete,
    onRevealComplete,
  ]);

  // Dedicated synced SFX right when the circled emphasis draws
  useEffect(() => {
    if (circleTriggerMs === null) return;
    if (circleSoundBeatRef.current === beat.id) return;

    if (forceComplete) {
      circleSoundBeatRef.current = beat.id;
      soundEngine.playSfx('circle');
      return;
    }

    const timer = window.setTimeout(() => {
      if (circleSoundBeatRef.current === beat.id) return;
      circleSoundBeatRef.current = beat.id;
      soundEngine.playSfx('circle');
    }, circleTriggerMs);

    return () => window.clearTimeout(timer);
  }, [beat.id, circleTriggerMs, forceComplete]);

  const renderTokens = (tokens: TimedToken[], keyPrefix: string) => {
    if (forceComplete) {
      return tokens.map((t, idx) => <Fragment key={`${keyPrefix}-${idx}`}>{t.text}</Fragment>);
    }
    return tokens.map((t, idx) => (
      <span
        key={`${keyPrefix}-${idx}`}
        className="char-reveal"
        style={{ animationDelay: `${t.delayMs}ms` }}
      >
        {t.text}
      </span>
    ));
  };

  const renderTypewriterSegments = (limit: number) => {
    let consumed = 0;

    return segments.map((seg, segIdx) => {
      if (consumed >= limit) return null;
      const available = Math.max(0, limit - consumed);
      const slice = seg.content.slice(0, available);
      const isComplete = available >= seg.content.length;
      consumed += seg.content.length;
      if (!slice) return null;

      if (seg.kind === 'amber') {
        const useInlineRoughUnderline = seg.content.length <= 14;
        return (
          <span
            key={`tw-${segIdx}`}
            className={`relative inline text-[#E8B161] font-medium ${
              !useInlineRoughUnderline
                ? 'underline decoration-[#E2A856]/70 decoration-[1.5px] underline-offset-[6px]'
                : ''
            }`}
          >
            <span>{slice}</span>
            {useInlineRoughUnderline && isComplete && (
              <svg
                viewBox="0 0 220 11"
                preserveAspectRatio="none"
                aria-hidden="true"
                className="absolute left-0 -bottom-1 w-full h-[8px] overflow-visible pointer-events-none"
              >
                {strokes.underline.map((p, i) => (
                  <motion.path
                    key={i}
                    d={p.d}
                    stroke={p.stroke}
                    strokeWidth={p.strokeWidth}
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.65, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                  />
                ))}
              </svg>
            )}
          </span>
        );
      }

      if (seg.kind === 'whisper') {
        return (
          <span key={`tw-${segIdx}`} className="text-[#DCD6CA] italic font-light tracking-[0.03em]">
            {slice}
          </span>
        );
      }

      if (seg.kind === 'tremor') {
        return (
          <span
            key={`tw-${segIdx}`}
            className="text-[#F3EFE8] underline decoration-[#E2A856]/55 decoration-wavy underline-offset-[6px]"
          >
            {slice}
          </span>
        );
      }

      if (seg.kind === 'impact') {
        return (
          <span key={`tw-${segIdx}`} className="text-[#FAF7F2] font-normal">
            {slice}
          </span>
        );
      }

      return <Fragment key={`tw-${segIdx}`}>{slice}</Fragment>;
    });
  };

  // Cinematic film chapter intertitle
  if (beat.anim === 'title-card') {
    const clean = stripEmotionalMarkup(beat.text);
    const parts = clean.split(' · ').map((p) => p.trim()).filter(Boolean);
    const hasStructuredParts = parts.length >= 3;
    const chapterMeta = hasStructuredParts ? `${parts[0]} · ${parts[1]}` : '';
    const chapterPlace = hasStructuredParts ? parts.slice(2).join(' · ') : clean;

    return (
      <div key={beat.id} className="py-8 sm:py-10 text-center space-y-4">
        {chapterMeta && (
          <motion.p
            initial={forceComplete ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: forceComplete ? 0.15 : 0.65, delay: forceComplete ? 0 : 0.06 }}
            className="font-display text-xs sm:text-sm tracking-[0.26em] text-[#E2A856]/85 tabular-nums"
          >
            {chapterMeta}
          </motion.p>
        )}

        <motion.div
          initial={forceComplete ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0.4 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{
            duration: forceComplete ? 0.15 : 0.85,
            delay: forceComplete ? 0 : 0.24,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="mx-auto h-px w-14 origin-center bg-[#E2A856]/65"
        />

        <motion.h2
          initial={forceComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: forceComplete ? 0.15 : 0.8,
            delay: forceComplete ? 0 : 0.4,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="font-serif-body text-2xl sm:text-[28px] font-normal tracking-[0.18em] text-[#F5F1EA] text-balance"
        >
          {chapterPlace}
        </motion.h2>
      </div>
    );
  }

  const baseSizeClass = isImpactBeat
    ? 'text-[19px] sm:text-[21px] leading-[1.92]'
    : 'text-[17.5px] sm:text-[18.5px] leading-[1.92]';

  if (beat.anim === 'typewriter') {
    const isTyping = visibleChars < plainLength;
    return (
      <p className={`font-serif-body ${baseSizeClass} tracking-[0.02em] text-[#F3EFE8]`}>
        {renderTypewriterSegments(visibleChars)}
        {isTyping && (
          <span
            aria-hidden="true"
            className="inline-block w-[2px] h-[1.05em] ml-1 align-middle bg-[#E2A856]"
          />
        )}
      </p>
    );
  }

  const bodyColorClass =
    beat.anim === 'whisper'
      ? 'text-[#E3DDD2] italic font-light'
      : 'text-[#F3EFE8]';

  return (
    <motion.p
      key={beat.id}
      animate={
        beat.anim === 'tremble' && !forceComplete
          ? { x: [0, -1.5, 1.5, -1, 0] }
          : undefined
      }
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className={`font-serif-body ${baseSizeClass} tracking-[0.02em] ${bodyColorClass}`}
    >
      {timed.map((seg, segIdx) => {
        const strokeDelaySec = forceComplete ? 0 : Math.max(0, seg.endMs - 60) / 1000;

        if (seg.kind === 'amber') {
          const useInlineRoughUnderline = seg.content.length <= 14;
          return (
            <span
              key={`${beat.id}-seg-${segIdx}`}
              className={`relative inline text-[#E8B161] font-medium ${
                !useInlineRoughUnderline
                  ? 'underline decoration-[#E2A856]/75 decoration-[1.5px] underline-offset-[6px]'
                  : ''
              }`}
            >
              {renderTokens(seg.tokens, `${beat.id}-a-${segIdx}`)}
              {useInlineRoughUnderline && (
                <svg
                  viewBox="0 0 220 11"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                  className="absolute left-0 -bottom-1 w-full h-[8px] overflow-visible pointer-events-none"
                >
                  {strokes.underline.map((p, i) => (
                    <motion.path
                      key={i}
                      d={p.d}
                      stroke={p.stroke}
                      strokeWidth={p.strokeWidth}
                      fill="none"
                      initial={forceComplete ? { pathLength: 1 } : { pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{
                        duration: forceComplete ? 0.15 : 0.7,
                        delay: strokeDelaySec,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    />
                  ))}
                </svg>
              )}
            </span>
          );
        }

        if (seg.kind === 'circle') {
          return (
            <motion.span
              key={`${beat.id}-seg-${segIdx}`}
              animate={
                forceComplete
                  ? { scale: 1 }
                  : { scale: [1, 1.028, 1] }
              }
              transition={{
                duration: 0.75,
                delay: strokeDelaySec,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative inline-block px-3.5 py-0.5 mx-0.5 text-[#F7C778] font-medium"
            >
              {/* Soft warm amber glow blooming behind the circled question */}
              <motion.span
                aria-hidden="true"
                initial={forceComplete ? { opacity: 0.45, scale: 1 } : { opacity: 0, scale: 0.9 }}
                animate={{
                  opacity: forceComplete ? 0.45 : [0, 0.85, 0.45],
                  scale: forceComplete ? 1 : [0.92, 1.04, 1],
                }}
                transition={{
                  duration: forceComplete ? 0.2 : 1.25,
                  delay: strokeDelaySec,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="pointer-events-none absolute inset-x-1 inset-y-0.5 rounded-full bg-[#E2A856]/15 blur-[6px]"
              />

              <span className="relative z-10">
                {renderTokens(seg.tokens, `${beat.id}-c-${segIdx}`)}
              </span>

              {/* Hand-drawn amber oval framing the question cleanly */}
              <svg
                viewBox="0 0 220 46"
                preserveAspectRatio="none"
                aria-hidden="true"
                className="absolute -inset-x-1.5 -inset-y-1 w-[calc(100%+12px)] h-[calc(100%+8px)] overflow-visible pointer-events-none z-10"
              >
                {strokes.oval.map((p, i) => (
                  <motion.path
                    key={i}
                    d={p.d}
                    stroke={p.stroke}
                    strokeWidth={p.strokeWidth}
                    fill="none"
                    initial={forceComplete ? { pathLength: 1 } : { pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{
                      duration: forceComplete ? 0.15 : 0.95,
                      delay: strokeDelaySec,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  />
                ))}
              </svg>
            </motion.span>
          );
        }

        if (seg.kind === 'tremor') {
          return (
            <motion.span
              key={`${beat.id}-seg-${segIdx}`}
              animate={forceComplete ? undefined : { x: [0, -1.2, 1.2, -0.8, 0] }}
              transition={{ duration: 0.45, delay: strokeDelaySec, ease: 'easeOut' }}
              className="inline-block text-[#F3EFE8] underline decoration-[#E2A856]/55 decoration-wavy underline-offset-[6px]"
            >
              {renderTokens(seg.tokens, `${beat.id}-t-${segIdx}`)}
            </motion.span>
          );
        }

        if (seg.kind === 'whisper') {
          return (
            <span
              key={`${beat.id}-seg-${segIdx}`}
              className="text-[#DCD6CA] italic font-light tracking-[0.03em]"
            >
              {renderTokens(seg.tokens, `${beat.id}-w-${segIdx}`)}
            </span>
          );
        }

        if (seg.kind === 'impact') {
          return (
            <span key={`${beat.id}-seg-${segIdx}`} className="text-[#FAF7F2] font-normal">
              {renderTokens(seg.tokens, `${beat.id}-i-${segIdx}`)}
            </span>
          );
        }

        return (
          <Fragment key={`${beat.id}-seg-${segIdx}`}>
            {renderTokens(seg.tokens, `${beat.id}-p-${segIdx}`)}
          </Fragment>
        );
      })}
    </motion.p>
  );
}
