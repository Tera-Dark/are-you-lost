export type MoodType = 'night' | 'rain' | 'tension' | 'memory' | 'dawn' | 'stillness';

export type SceneLocation =
  | 'subway'
  | 'alley'
  | 'room'
  | 'balcony'
  | 'store'
  | 'riverside'
  | 'dawn_bridge';

export type VisualCue =
  | 'default'
  | 'phone_glow'
  | 'calm_halo'
  | 'streetlight'
  | 'laptop_on'
  | 'laptop_off'
  | 'window_lights'
  | 'steam'
  | 'flight_mode'
  | 'sunrise';

export type PropEvent =
  | 'none'
  | 'msg_work'
  | 'msg_rent'
  | 'msg_mom'
  | 'sent_ok'
  | 'msg_boss_dm'
  | 'job_rejected'
  | 'draft_note'
  | 'bill_reminder'
  | 'msg_roommate'
  | 'msg_classmate'
  | 'msg_friend_call'
  | 'call_home_missed'
  | 'music_share'
  | 'msg_lin_resume'
  | 'flight_on'
  | 'alarm_set'
  | 'msg_mom_reply'
  | 'msg_self_note';

export type AnimationStyle =
  | 'fade-rise'
  | 'typewriter'
  | 'blur-focus'
  | 'whisper'
  | 'tremble'
  | 'title-card';

export type SfxType =
  | 'tick'
  | 'chime'
  | 'select'
  | 'turn'
  | 'bell'
  | 'ending'
  | 'hover'
  | 'emphasis'
  | 'circle'
  | 'buzz'
  | 'msg'
  | 'none';

export type EndingId =
  | 'ember'
  | 'beyond_glass'
  | 'quiet_shore'
  | 'southbound'
  | 'midnight_draft'
  | 'empty_seat';

export interface StoryBeat {
  id: string;
  text: string;
  act: string;
  speaker?: string;
  mood: MoodType;
  scene: SceneLocation;
  visual: VisualCue;
  prop: PropEvent;
  anim: AnimationStyle;
  sfx: SfxType;
  endingId?: EndingId;
}

export interface StoryChoice {
  index: number;
  text: string;
}

export interface HistoryEntry {
  id: string;
  kind: 'line' | 'choice' | 'act';
  text: string;
  speaker?: string;
}

export interface EndingMeta {
  id: EndingId;
  roman: string;
  title: string;
  englishTitle: string;
  epigraph: string;
  reflection: string;
  question: string;
}

export interface SavedJourney {
  inkStateJson: string;
  currentBeat: StoryBeat | null;
  history: HistoryEntry[];
  unlockedEndings: EndingId[];
  currentAct: string;
  currentMood: MoodType;
  currentScene: SceneLocation;
  currentVisual: VisualCue;
  updatedAt: number;
}
