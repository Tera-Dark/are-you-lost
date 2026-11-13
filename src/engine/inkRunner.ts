import { Compiler, Story } from 'inkjs/full';
import storySource from '../story/areYouLost.ink?raw';
import type {
  AnimationStyle,
  EndingId,
  EndingMeta,
  HistoryEntry,
  MoodType,
  PropEvent,
  SavedJourney,
  SceneLocation,
  SfxType,
  StoryBeat,
  StoryChoice,
  VisualCue,
} from '../types/narrative';

const STORAGE_KEY = 'are_you_lost_sketch_v4';
const LEGACY_STORAGE_KEY = 'are_you_lost_sketch_v3';

export const ENDINGS_META: Record<EndingId, EndingMeta> = {
  ember: {
    id: 'ember',
    roman: 'I',
    title: '自己亮起的那盏灯',
    englishTitle: 'Your Own Light',
    epigraph:
      '迷茫不会一夜消失，但只要开始为自己留出那一小时的光，你就不再只是被生活推着走的人。',
    reflection:
      '下周一依然要早起挤地铁，依然有交不完的方案与生活账单。但你把一直攥在别人手里的“评价尺子”抽了回来，不再把所有力气都用来证明自己符合标准。',
    question: '如果每天只把最清醒的一小时留给自己，你最想用来做什么？',
  },
  beyond_glass: {
    id: 'beyond_glass',
    roman: 'II',
    title: '推开阳台的窗',
    englishTitle: 'Open the Window',
    epigraph:
      '推开那扇逞强的窗户，早风虽然还有点凉，但身后终于有了真实的人间灯火。',
    reflection:
      '长久以来，你以为必须先变得“足够成功”才配打电话回家、才敢把脆弱摊开。今夜你试着承认自己的疲惫，发现愿意接住你的人，远比你以为的更近。',
    question: '上一次不加修饰地对亲近的人说“我最近其实有点累”，是什么时候？',
  },
  quiet_shore: {
    id: 'quiet_shore',
    roman: 'III',
    title: '按自己的时区走路',
    englishTitle: 'Your Own Timezone',
    epigraph:
      '允许自己按照自己的时区慢慢发芽，从来不是退缩，而是清醒的开始。',
    reflection:
      '关掉那些不断制造恐慌的信息流之后，二十多岁的天并没有塌下来。你开始接受“普通且诚实地生活”本身就有尊严，先睡个好觉，再慢慢决定下一站。',
    question: '如果不再看同龄人的进度条，你现在最想放慢哪一件事？',
  },
  southbound: {
    id: 'southbound',
    roman: 'IV',
    title: '一张单程的换乘票',
    englishTitle: 'A Ticket Elsewhere',
    epigraph:
      '离开不是失败，而是在算清自己真正想要的日子之后，替自己重新买一张去往晴天的车票。',
    reflection:
      '你终于把房租、通勤、父母的年纪和自己的健康放在同一张纸上算明白。换一座能看见日落的城市，不代表放弃理想，只是拒绝继续把人生典当给无效消耗。',
    question: '如果可以重新选一座生活五年的城市，你最看重它给你什么？',
  },
  midnight_draft: {
    id: 'midnight_draft',
    roman: 'V',
    title: '凌晨四点的未完稿',
    englishTitle: 'The Unfinished Draft',
    epigraph:
      '允许自己在“安稳过日子”和“笨拙地做点热爱”之间同时走两条路，本身就是成年人最温柔的叛逆。',
    reflection:
      '你不再强迫自己非得“裸辞孤注一掷”才算勇敢。把白天的工位当成替自己遮风挡雨的屋檐，把深夜和周末的一点心气，悄悄留给那份没写完的手记。',
    question: '哪怕一时还不能靠它吃饭，哪一件小事值得你再坚持半年？',
  },
  empty_seat: {
    id: 'empty_seat',
    roman: 'VI',
    title: '早高峰的靠窗位',
    englishTitle: 'Morning Commute',
    epigraph:
      '玻璃倒影里的我，悄悄记住了昨晚凌晨两点那个还没彻底睡着的问题。',
    reflection:
      '你选了熟悉而稳妥的秩序——按时打卡、按时发薪、不让身边的人操心。这不是懦弱，只是往后在某个疲惫的加班夜，别忘了昨晚心底那一点微小的追问。',
    question: '如果现在的“稳妥”是一场不得不进行的等待，你打算用它换取什么？',
  },
};

const VALID_MOODS: MoodType[] = ['night', 'rain', 'tension', 'memory', 'dawn', 'stillness'];
const VALID_SCENES: SceneLocation[] = [
  'subway',
  'alley',
  'room',
  'balcony',
  'store',
  'riverside',
  'dawn_bridge',
];
const VALID_VISUALS: VisualCue[] = [
  'default',
  'phone_glow',
  'calm_halo',
  'streetlight',
  'laptop_on',
  'laptop_off',
  'window_lights',
  'steam',
  'flight_mode',
  'sunrise',
];
const VALID_PROPS: PropEvent[] = [
  'none',
  'msg_work',
  'msg_rent',
  'msg_mom',
  'sent_ok',
  'msg_boss_dm',
  'job_rejected',
  'draft_note',
  'bill_reminder',
  'msg_roommate',
  'msg_classmate',
  'msg_friend_call',
  'call_home_missed',
  'music_share',
  'msg_lin_resume',
  'flight_on',
  'alarm_set',
  'msg_mom_reply',
  'msg_self_note',
];
const VALID_ANIMS: AnimationStyle[] = [
  'fade-rise',
  'typewriter',
  'blur-focus',
  'whisper',
  'tremble',
  'title-card',
];
const VALID_SFX: SfxType[] = [
  'tick',
  'chime',
  'select',
  'turn',
  'bell',
  'ending',
  'hover',
  'emphasis',
  'circle',
  'buzz',
  'msg',
  'none',
];
const VALID_ENDINGS: EndingId[] = [
  'ember',
  'beyond_glass',
  'quiet_shore',
  'southbound',
  'midnight_draft',
  'empty_seat',
];

let cachedCompiledJson: string | null = null;

function getCompiledStoryJson(): string {
  if (!cachedCompiledJson) {
    const compiler = new Compiler(storySource);
    const compiled = compiler.Compile();
    cachedCompiledJson = compiled.ToJson() ?? '';
  }
  return cachedCompiledJson;
}

export function createStoryInstance(savedStateJson?: string): Story {
  const story = new Story(getCompiledStoryJson());
  if (savedStateJson) {
    story.state.LoadJson(savedStateJson);
  }
  return story;
}

export function parseStoryTags(
  rawTags: string[],
  fallbackAct: string,
  fallbackMood: MoodType,
  fallbackScene: SceneLocation,
  fallbackVisual: VisualCue
): {
  act: string;
  mood: MoodType;
  scene: SceneLocation;
  visual: VisualCue;
  prop: PropEvent;
  anim: AnimationStyle;
  sfx: SfxType;
  speaker?: string;
  endingId?: EndingId;
} {
  let act = fallbackAct;
  let mood = fallbackMood;
  let scene = fallbackScene;
  let visual = fallbackVisual;
  let prop: PropEvent = 'none';
  let anim: AnimationStyle = 'fade-rise';
  let sfx: SfxType = 'none';
  let speaker: string | undefined;
  let endingId: EndingId | undefined;

  for (const tag of rawTags) {
    const colonIdx = tag.indexOf(':');
    if (colonIdx === -1) continue;
    const key = tag.slice(0, colonIdx).trim().toLowerCase();
    const val = tag.slice(colonIdx + 1).trim();

    if (key === 'act' && val) {
      act = val;
    } else if (key === 'mood' && VALID_MOODS.includes(val as MoodType)) {
      mood = val as MoodType;
    } else if (key === 'scene' && VALID_SCENES.includes(val as SceneLocation)) {
      scene = val as SceneLocation;
    } else if (key === 'visual' && VALID_VISUALS.includes(val as VisualCue)) {
      visual = val as VisualCue;
    } else if (key === 'prop' && VALID_PROPS.includes(val as PropEvent)) {
      prop = val as PropEvent;
    } else if (key === 'anim' && VALID_ANIMS.includes(val as AnimationStyle)) {
      anim = val as AnimationStyle;
    } else if (key === 'sfx' && VALID_SFX.includes(val as SfxType)) {
      sfx = val as SfxType;
    } else if (key === 'speaker' && val) {
      speaker = val;
    } else if (key === 'ending' && VALID_ENDINGS.includes(val as EndingId)) {
      endingId = val as EndingId;
    }
  }

  return { act, mood, scene, visual, prop, anim, sfx, speaker, endingId };
}

export function advanceSingleBeat(
  story: Story,
  currentAct: string,
  currentMood: MoodType,
  currentScene: SceneLocation,
  currentVisual: VisualCue
): StoryBeat | null {
  while (story.canContinue) {
    const rawText = story.Continue()?.trim() ?? '';
    const tags = story.currentTags ?? [];
    if (!rawText) {
      continue;
    }
    const parsed = parseStoryTags(tags, currentAct, currentMood, currentScene, currentVisual);
    return {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      text: rawText,
      act: parsed.act,
      speaker: parsed.speaker,
      mood: parsed.mood,
      scene: parsed.scene,
      visual: parsed.visual,
      prop: parsed.prop,
      anim: parsed.anim,
      sfx: parsed.sfx,
      endingId: parsed.endingId,
    };
  }
  return null;
}

export function getChoices(story: Story): StoryChoice[] {
  return story.currentChoices.map((choice, idx) => ({
    index: idx,
    text: choice.text.trim(),
  }));
}

export function getEndingFromStory(story: Story): EndingId | undefined {
  const val = story.variablesState['ending_id'];
  if (typeof val === 'string' && VALID_ENDINGS.includes(val as EndingId)) {
    return val as EndingId;
  }
  return undefined;
}

export function loadSavedJourney(): SavedJourney | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // Migrate unlocked endings from legacy save without loading incompatible ink state
      const legacyRaw = localStorage.getItem(LEGACY_STORAGE_KEY);
      if (legacyRaw) {
        const legacy = JSON.parse(legacyRaw) as { unlockedEndings?: EndingId[] };
        const migratedEndings = Array.isArray(legacy?.unlockedEndings)
          ? legacy.unlockedEndings.filter((e) => VALID_ENDINGS.includes(e))
          : [];
        if (migratedEndings.length > 0) {
          return {
            inkStateJson: '',
            currentBeat: null,
            history: [],
            unlockedEndings: migratedEndings,
            currentAct: '序幕 · 末班地铁',
            currentMood: 'rain',
            currentScene: 'subway',
            currentVisual: 'default',
            updatedAt: Date.now(),
          };
        }
      }
      return null;
    }
    const parsed = JSON.parse(raw) as SavedJourney;
    if (!parsed || typeof parsed !== 'object') return null;
    return {
      inkStateJson: parsed.inkStateJson || '',
      currentBeat: parsed.currentBeat ?? null,
      history: Array.isArray(parsed.history) ? parsed.history : [],
      unlockedEndings: Array.isArray(parsed.unlockedEndings)
        ? parsed.unlockedEndings.filter((e) => VALID_ENDINGS.includes(e))
        : [],
      currentAct: parsed.currentAct || '序幕 · 末班地铁',
      currentMood: VALID_MOODS.includes(parsed.currentMood) ? parsed.currentMood : 'rain',
      currentScene: VALID_SCENES.includes(parsed.currentScene) ? parsed.currentScene : 'subway',
      currentVisual: VALID_VISUALS.includes(parsed.currentVisual) ? parsed.currentVisual : 'default',
      updatedAt: parsed.updatedAt || Date.now(),
    };
  } catch {
    return null;
  }
}

export function saveJourney(payload: SavedJourney): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch {
    // Ignore storage quota errors
  }
}

export function unlockEndingInStorage(endingId: EndingId): EndingId[] {
  const existing = loadSavedJourney();
  const currentSet = new Set<EndingId>(existing?.unlockedEndings ?? []);
  currentSet.add(endingId);
  const updated = Array.from(currentSet);
  if (existing) {
    saveJourney({ ...existing, unlockedEndings: updated });
  } else {
    saveJourney({
      inkStateJson: '',
      currentBeat: null,
      history: [],
      unlockedEndings: updated,
      currentAct: '序幕 · 末班地铁',
      currentMood: 'rain',
      currentScene: 'subway',
      currentVisual: 'default',
      updatedAt: Date.now(),
    });
  }
  return updated;
}

export function clearActiveRunKeepEndings(): SavedJourney {
  const existing = loadSavedJourney();
  const unlocked = existing?.unlockedEndings ?? [];
  const fresh: SavedJourney = {
    inkStateJson: '',
    currentBeat: null,
    history: [],
    unlockedEndings: unlocked,
    currentAct: '序幕 · 末班地铁',
    currentMood: 'rain',
    currentScene: 'subway',
    currentVisual: 'default',
    updatedAt: Date.now(),
  };
  saveJourney(fresh);
  return fresh;
}

export function appendHistory(history: HistoryEntry[], entry: HistoryEntry): HistoryEntry[] {
  return [...history.slice(-180), entry];
}
