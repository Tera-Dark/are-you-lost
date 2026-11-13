import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'motion/react';
import type { Story } from 'inkjs/full';
import { AmbientBackdrop } from './components/AmbientBackdrop';
import { ChoiceDeck } from './components/ChoiceDeck';
import { EndingScreen } from './components/EndingScreen';
import { HandDrawnStage } from './components/HandDrawnStage';
import { HistorySheet } from './components/HistorySheet';
import { KineticText, stripEmotionalMarkup } from './components/KineticText';
import { StageHeader } from './components/StageHeader';
import { StoryPropCard } from './components/StoryPropCard';
import { TitleScreen } from './components/TitleScreen';
import {
  advanceSingleBeat,
  appendHistory,
  clearActiveRunKeepEndings,
  createStoryInstance,
  getChoices,
  getEndingFromStory,
  loadSavedJourney,
  saveJourney,
  unlockEndingInStorage,
} from './engine/inkRunner';
import { soundEngine } from './engine/soundEngine';
import type {
  EndingId,
  HistoryEntry,
  MoodType,
  SceneLocation,
  StoryBeat,
  StoryChoice,
  VisualCue,
} from './types/narrative';

type ScreenPhase = 'title' | 'playing';

export default function App() {
  const savedInit = useRef(loadSavedJourney());
  const storyRef = useRef<Story | null>(null);
  const pointerDownPos = useRef<{ x: number; y: number } | null>(null);
  const shownPropBeatIdRef = useRef<string | null>(null);

  const [phase, setPhase] = useState<ScreenPhase>('title');
  const [currentBeat, setCurrentBeat] = useState<StoryBeat | null>(
    savedInit.current?.currentBeat ?? null
  );
  const [recentEchoes, setRecentEchoes] = useState<StoryBeat[]>([]);
  const [choices, setChoices] = useState<StoryChoice[]>([]);

  const rawParallaxX = useMotionValue(0);
  const rawParallaxY = useMotionValue(0);
  const parallaxX = useSpring(rawParallaxX, { stiffness: 120, damping: 24, mass: 0.6 });
  const parallaxY = useSpring(rawParallaxY, { stiffness: 120, damping: 24, mass: 0.6 });

  const [endingId, setEndingId] = useState<EndingId | undefined>(undefined);
  const [history, setHistory] = useState<HistoryEntry[]>(savedInit.current?.history ?? []);
  const [unlockedEndings, setUnlockedEndings] = useState<EndingId[]>(
    savedInit.current?.unlockedEndings ?? []
  );
  const [currentAct, setCurrentAct] = useState<string>(
    savedInit.current?.currentAct ?? '序幕 · 末班地铁'
  );
  const [currentMood, setCurrentMood] = useState<MoodType>(
    savedInit.current?.currentMood ?? 'rain'
  );
  const [currentScene, setCurrentScene] = useState<SceneLocation>(
    savedInit.current?.currentScene ?? 'subway'
  );
  const [currentVisual, setCurrentVisual] = useState<VisualCue>(
    savedInit.current?.currentVisual ?? 'default'
  );
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isAnimatingText, setIsAnimatingText] = useState<boolean>(false);
  const [forceCompleteText, setForceCompleteText] = useState<boolean>(false);
  const [propVisible, setPropVisible] = useState<boolean>(false);
  const [choicesReady, setChoicesReady] = useState<boolean>(false);
  const [sheetOpen, setSheetOpen] = useState<boolean>(false);
  const [sheetTab, setSheetTab] = useState<'log' | 'endings'>('log');
  const [restartPromptOpen, setRestartPromptOpen] = useState<boolean>(false);

  const hasSavedRun = Boolean(
    savedInit.current?.inkStateJson && savedInit.current?.currentBeat
  );

  const persistState = useCallback(
    (
      story: Story,
      beat: StoryBeat | null,
      nextHistory: HistoryEntry[],
      act: string,
      mood: MoodType,
      scene: SceneLocation,
      visual: VisualCue,
      endings: EndingId[]
    ) => {
      saveJourney({
        inkStateJson: story.state.ToJson() ?? '',
        currentBeat: beat,
        history: nextHistory,
        unlockedEndings: endings,
        currentAct: act,
        currentMood: mood,
        currentScene: scene,
        currentVisual: visual,
        updatedAt: Date.now(),
      });
    },
    []
  );

  const pullNextBeat = useCallback(
    (
      story: Story,
      prevAct: string,
      prevMood: MoodType,
      prevScene: SceneLocation,
      prevVisual: VisualCue,
      prevHistory: HistoryEntry[],
      prevBeat: StoryBeat | null
    ) => {
      const nextBeat = advanceSingleBeat(story, prevAct, prevMood, prevScene, prevVisual);
      if (nextBeat) {
        if (prevBeat && prevBeat.anim !== 'title-card') {
          setRecentEchoes((prev) => [...prev.slice(-1), prevBeat]);
        } else if (nextBeat.anim === 'title-card') {
          setRecentEchoes([]);
        }

        let updatedHistory = prevHistory;
        if (nextBeat.act !== prevAct) {
          updatedHistory = appendHistory(updatedHistory, {
            id: `act-${nextBeat.id}`,
            kind: 'act',
            text: nextBeat.act,
          });
        }
        updatedHistory = appendHistory(updatedHistory, {
          id: nextBeat.id,
          kind: 'line',
          text: nextBeat.text,
          speaker: nextBeat.speaker,
        });

        setCurrentBeat(nextBeat);
        setCurrentAct(nextBeat.act);
        setCurrentMood(nextBeat.mood);
        setCurrentScene(nextBeat.scene);
        setCurrentVisual(nextBeat.visual);
        setHistory(updatedHistory);
        setPropVisible(false);
        setForceCompleteText(false);
        setIsAnimatingText(true);

        soundEngine.setMood(nextBeat.mood);
        const hasCircleEmphasis = nextBeat.text.includes('@@');
        if (
          nextBeat.sfx !== 'tick' &&
          !(nextBeat.prop !== 'none' && nextBeat.sfx === 'msg') &&
          !(hasCircleEmphasis && nextBeat.sfx === 'emphasis')
        ) {
          soundEngine.playSfx(nextBeat.sfx);
        }

        const nextChoices = !story.canContinue ? getChoices(story) : [];
        setChoices(nextChoices);

        let resolvedEndings = unlockedEndings;
        if (!story.canContinue && nextChoices.length === 0) {
          const finalEnd = nextBeat.endingId ?? getEndingFromStory(story);
          if (finalEnd) {
            setEndingId(finalEnd);
            resolvedEndings = unlockEndingInStorage(finalEnd);
            setUnlockedEndings(resolvedEndings);
          }
        }

        persistState(
          story,
          nextBeat,
          updatedHistory,
          nextBeat.act,
          nextBeat.mood,
          nextBeat.scene,
          nextBeat.visual,
          resolvedEndings
        );
        return;
      }

      const nextChoices = getChoices(story);
      setChoices(nextChoices);
      if (nextChoices.length === 0) {
        const finalEnd = getEndingFromStory(story);
        if (finalEnd) {
          setEndingId(finalEnd);
          const resolvedEndings = unlockEndingInStorage(finalEnd);
          setUnlockedEndings(resolvedEndings);
        }
      }
    },
    [persistState, unlockedEndings]
  );

  const handleStartNew = useCallback(() => {
    const fresh = clearActiveRunKeepEndings();
    const story = createStoryInstance();
    storyRef.current = story;

    shownPropBeatIdRef.current = null;
    setRecentEchoes([]);
    setChoices([]);
    setEndingId(undefined);
    setHistory([]);
    setCurrentAct('序幕 · 末班地铁');
    setCurrentMood('rain');
    setCurrentScene('subway');
    setCurrentVisual('default');
    setPhase('playing');
    setRestartPromptOpen(false);

    soundEngine.unlockAndStart('rain');
    pullNextBeat(story, '序幕 · 末班地铁', 'rain', 'subway', 'default', fresh.history, null);
  }, [pullNextBeat]);

  const handleContinue = useCallback(() => {
    const saved = loadSavedJourney();
    if (!saved || !saved.inkStateJson) {
      handleStartNew();
      return;
    }

    const story = createStoryInstance(saved.inkStateJson);
    storyRef.current = story;

    setCurrentBeat(saved.currentBeat);
    setRecentEchoes([]);
    setHistory(saved.history);
    setUnlockedEndings(saved.unlockedEndings);
    setCurrentAct(saved.currentAct);
    setCurrentMood(saved.currentMood);
    setCurrentScene(saved.currentScene);
    setCurrentVisual(saved.currentVisual);
    setForceCompleteText(true);
    setIsAnimatingText(false);

    const pendingChoices = !story.canContinue ? getChoices(story) : [];
    setChoices(pendingChoices);
    if (!story.canContinue && pendingChoices.length === 0) {
      setEndingId(saved.currentBeat?.endingId ?? getEndingFromStory(story));
    } else {
      setEndingId(undefined);
    }

    setPhase('playing');
    soundEngine.unlockAndStart(saved.currentMood);
  }, [handleStartNew]);

  const handleStageTap = useCallback(() => {
    if (phase !== 'playing' || sheetOpen || restartPromptOpen) return;

    const waitingProp = Boolean(currentBeat && currentBeat.prop !== 'none' && !propVisible);
    if (isAnimatingText || waitingProp) {
      setForceCompleteText(true);
      setIsAnimatingText(false);
      if (waitingProp && currentBeat) {
        shownPropBeatIdRef.current = currentBeat.id;
        setPropVisible(true);
        if (currentBeat.sfx === 'msg') {
          soundEngine.playSfx('msg');
        }
      }
      return;
    }

    const story = storyRef.current;
    if (!story) return;

    if (story.canContinue) {
      pullNextBeat(
        story,
        currentAct,
        currentMood,
        currentScene,
        currentVisual,
        history,
        currentBeat
      );
    }
  }, [
    phase,
    sheetOpen,
    restartPromptOpen,
    isAnimatingText,
    propVisible,
    pullNextBeat,
    currentAct,
    currentMood,
    currentScene,
    currentVisual,
    history,
    currentBeat,
  ]);

  const handleSelectChoice = useCallback(
    (choice: StoryChoice) => {
      const story = storyRef.current;
      if (!story) return;

      soundEngine.playSfx('select');
      story.ChooseChoiceIndex(choice.index);

      const nextHistory = appendHistory(history, {
        id: `choice-${Date.now()}`,
        kind: 'choice',
        text: choice.text,
      });

      setChoices([]);
      setRecentEchoes([]);
      pullNextBeat(
        story,
        currentAct,
        currentMood,
        currentScene,
        currentVisual,
        nextHistory,
        null
      );
    },
    [history, currentAct, currentMood, currentScene, currentVisual, pullNextBeat]
  );

  const handleToggleMute = useCallback(() => {
    const muted = soundEngine.toggleMute();
    setIsMuted(muted);
  }, []);

  const handleRevealComplete = useCallback(() => {
    setIsAnimatingText(false);
  }, []);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (phase !== 'playing') return;
      const rect = e.currentTarget.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      rawParallaxX.set(nx * 10);
      rawParallaxY.set(ny * 6);
    },
    [phase, rawParallaxX, rawParallaxY]
  );

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (phase !== 'playing' || sheetOpen || restartPromptOpen) return;
      if (e.key === ' ' || e.key === 'Enter') {
        if (choices.length === 0 && !endingId) {
          e.preventDefault();
          handleStageTap();
        }
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [phase, sheetOpen, restartPromptOpen, choices.length, endingId, handleStageTap]);

  // Sync non-typewriter StoryPropCard arrival once per beat (never re-triggered by isAnimatingText)
  useEffect(() => {
    if (!currentBeat || currentBeat.prop === 'none') {
      setPropVisible(false);
      return;
    }
    if (currentBeat.anim === 'typewriter') return;
    if (shownPropBeatIdRef.current === currentBeat.id) return;

    if (forceCompleteText) {
      shownPropBeatIdRef.current = currentBeat.id;
      setPropVisible(true);
      return;
    }

    const timer = window.setTimeout(() => {
      if (shownPropBeatIdRef.current === currentBeat.id) return;
      shownPropBeatIdRef.current = currentBeat.id;
      setPropVisible(true);
      if (currentBeat.sfx === 'msg') {
        soundEngine.playSfx('msg');
      }
    }, 420);
    return () => window.clearTimeout(timer);
  }, [currentBeat, forceCompleteText]);

  // Sync typewriter StoryPropCard arrival right after typing finishes
  useEffect(() => {
    if (!currentBeat || currentBeat.prop === 'none') return;
    if (currentBeat.anim !== 'typewriter') return;
    if (shownPropBeatIdRef.current === currentBeat.id) return;

    if (forceCompleteText) {
      shownPropBeatIdRef.current = currentBeat.id;
      setPropVisible(true);
      return;
    }

    if (isAnimatingText) return;

    const timer = window.setTimeout(() => {
      if (shownPropBeatIdRef.current === currentBeat.id) return;
      shownPropBeatIdRef.current = currentBeat.id;
      setPropVisible(true);
      if (currentBeat.sfx === 'msg') {
        soundEngine.playSfx('msg');
      }
    }, 180);
    return () => window.clearTimeout(timer);
  }, [currentBeat, isAnimatingText, forceCompleteText]);

  // Brief reflective breath after a question finishes before presenting choices
  useEffect(() => {
    if (isAnimatingText || choices.length === 0 || Boolean(endingId)) {
      setChoicesReady(false);
      return;
    }
    if (forceCompleteText) {
      setChoicesReady(true);
      return;
    }
    const timer = window.setTimeout(() => {
      setChoicesReady(true);
    }, 320);
    return () => window.clearTimeout(timer);
  }, [isAnimatingText, choices.length, endingId, forceCompleteText]);

  const showChoices = choicesReady && choices.length > 0 && !endingId;
  const showEnding = !isAnimatingText && Boolean(endingId);
  const isTitleCard = currentBeat?.anim === 'title-card';
  const focusDimmed = Boolean(
    currentBeat && (currentBeat.text.includes('!!') || currentBeat.anim === 'whisper')
  );
  const waitingForProp = Boolean(currentBeat && currentBeat.prop !== 'none' && !propVisible);
  const waitingForChoices = !isAnimatingText && choices.length > 0 && !choicesReady && !endingId;

  const canAdvanceTap =
    phase === 'playing' &&
    !endingId &&
    !showChoices &&
    !waitingForChoices &&
    (isAnimatingText || waitingForProp || (storyRef.current?.canContinue ?? false));

  return (
    <div
      onPointerMove={handlePointerMove}
      className="relative min-h-dvh w-full text-[#EAE6DF] select-none overflow-hidden"
    >
      {/* Living mood-driven backdrop with breathing lamp glow & sunrise transition */}
      <AmbientBackdrop
        mood={currentMood}
        scene={currentScene}
        isTitle={phase === 'title'}
        focusActive={phase === 'playing' && focusDimmed && !isTitleCard}
      />
      {/* Subtle desktop theater side hairlines */}
      <div
        aria-hidden="true"
        className="hidden lg:block pointer-events-none fixed inset-y-0 left-1/2 -translate-x-[340px] w-px bg-gradient-to-b from-transparent via-white/[0.04] to-transparent z-[1]"
      />
      <div
        aria-hidden="true"
        className="hidden lg:block pointer-events-none fixed inset-y-0 left-1/2 translate-x-[340px] w-px bg-gradient-to-b from-transparent via-white/[0.04] to-transparent z-[1]"
      />

      {phase === 'title' ? (
        <TitleScreen
          hasSavedRun={hasSavedRun}
          unlockedEndings={unlockedEndings}
          onStartNew={handleStartNew}
          onContinue={handleContinue}
          onOpenArchive={() => {
            setSheetTab('endings');
            setSheetOpen(true);
          }}
        />
      ) : (
        <div
          className="relative z-10 flex min-h-dvh flex-col"
          onPointerDown={(e) => {
            pointerDownPos.current = { x: e.clientX, y: e.clientY };
          }}
          onPointerUp={(e) => {
            if (!pointerDownPos.current) return;
            const dx = Math.abs(e.clientX - pointerDownPos.current.x);
            const dy = Math.abs(e.clientY - pointerDownPos.current.y);
            pointerDownPos.current = null;
            if (dx < 10 && dy < 10 && !showChoices) {
              handleStageTap();
            }
          }}
        >
          <StageHeader
            currentAct={currentAct}
            isMuted={isMuted}
            onToggleMute={handleToggleMute}
            onOpenHistory={() => {
              setSheetTab('log');
              setSheetOpen(true);
            }}
            onRequestRestart={() => setRestartPromptOpen(true)}
          />

          <main className="mx-auto flex w-full max-w-[600px] flex-1 min-h-0 flex-col justify-between px-5 sm:px-6 py-3 sm:py-4 pb-safe">
            {/* Upper Atmospheric Hand-Drawn Sketch Stage (softly recedes during title cards & inner focus) */}
            {!showEnding && (
              <div className="w-full pt-1 pb-1 shrink-0">
                <HandDrawnStage
                  scene={currentScene}
                  mood={currentMood}
                  visual={currentVisual}
                  parallaxX={parallaxX}
                  parallaxY={parallaxY}
                  focusDimmed={focusDimmed}
                  isTitleCard={isTitleCard}
                />
              </div>
            )}

            {/* Primary Medium: Narrative Typography & Diegetic Props */}
            <div className="my-auto py-2 sm:py-3 space-y-4">
              {/* Previous line echo for literary continuity */}
              {!showEnding && !isTitleCard && recentEchoes.length > 0 && (
                <div className="space-y-3">
                  <AnimatePresence mode="popLayout">
                    {recentEchoes.map((echo) => (
                      <motion.p
                        key={`echo-${echo.id}`}
                        initial={{ opacity: 0.65 }}
                        animate={{ opacity: 0.6 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="font-serif-body text-[14px] sm:text-[15px] leading-[1.7] text-[#8E887E] font-light"
                      >
                        {stripEmotionalMarkup(echo.text)}
                      </motion.p>
                    ))}
                  </AnimatePresence>
                  <div className="w-6 h-px bg-white/[0.1]" />
                </div>
              )}

              {/* Active Kinetic Beat */}
              {currentBeat && !showEnding && (
                <div className="min-h-[84px] flex flex-col justify-center">
                  <KineticText
                    beat={currentBeat}
                    forceComplete={forceCompleteText}
                    onRevealComplete={handleRevealComplete}
                  />
                </div>
              )}

              {/* Diegetic Phone Notification / Story Prop Card (timed to surface after lead-in beat) */}
              {!showEnding && currentBeat && currentBeat.prop !== 'none' && propVisible && (
                <div className="pt-1">
                  <StoryPropCard prop={currentBeat.prop} />
                </div>
              )}

              {/* Ending Curtain Card */}
              {showEnding && endingId && (
                <>
                  {currentBeat && (
                    <div className="pb-2">
                      <KineticText
                        beat={currentBeat}
                        forceComplete={true}
                        onRevealComplete={handleRevealComplete}
                      />
                    </div>
                  )}
                  <EndingScreen
                    endingId={endingId}
                    unlockedCount={unlockedEndings.length}
                    onRestart={handleStartNew}
                    onOpenArchive={() => {
                      setSheetTab('endings');
                      setSheetOpen(true);
                    }}
                  />
                </>
              )}
            </div>

            {/* Bottom Thumb-Zone Choices or Tap-to-Advance */}
            <div className="min-h-[72px] flex flex-col justify-end pt-1 shrink-0">
              {showChoices ? (
                <ChoiceDeck choices={choices} onSelect={handleSelectChoice} />
              ) : canAdvanceTap ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.25, duration: 0.4 }}
                  className="flex flex-col items-center gap-1 py-2.5"
                >
                  <span className="font-sans-ui text-xs tracking-[0.18em] text-[#E2A856]/95">
                    {isAnimatingText ? '轻触显示全句' : '轻触继续'}
                  </span>
                </motion.div>
              ) : null}
            </div>
          </main>
        </div>
      )}

      {/* Memory Log & Endings Archive Sheet */}
      <HistorySheet
        key={sheetOpen ? sheetTab : 'closed'}
        isOpen={sheetOpen}
        initialTab={sheetTab}
        history={history}
        unlockedEndings={unlockedEndings}
        onClose={() => setSheetOpen(false)}
      />

      {/* Quiet In-App Restart Confirmation Sheet */}
      <AnimatePresence>
        {restartPromptOpen && (
          <div
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
            onClick={() => setRestartPromptOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80"
            />
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative z-10 w-full max-w-[440px] rounded-t-3xl sm:rounded-2xl bg-[#141418] border border-white/[0.08] p-6 pb-safe space-y-5"
            >
              <div className="space-y-2">
                <h3 className="font-serif-body text-lg text-[#EAE6DF]">
                  重新回到 23:40 的末班地铁吗？
                </h3>
                <p className="font-sans-ui text-xs leading-relaxed text-[#8A867E]">
                  当前的对话轨迹将被重置，但你已解锁的余韵结局会继续保留在图鉴中。
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setRestartPromptOpen(false)}
                  className="flex-1 min-h-[48px] rounded-xl border border-white/[0.1] text-[#EAE6DF]/85 font-sans-ui text-sm hover:border-white/25 transition-colors"
                >
                  留在当下
                </button>
                <button
                  type="button"
                  onClick={handleStartNew}
                  className="flex-1 min-h-[48px] rounded-xl bg-[#E2A856] text-[#0A0A0C] font-sans-ui text-sm font-medium hover:bg-[#eab86e] transition-colors"
                >
                  重新开始
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
