import type { MoodType, SfxType } from '../types/narrative';

interface MoodHarmony {
  rootFreq: number;
  intervalRatios: number[];
  filterFreq: number;
  noiseGain: number;
  chords: number[][];
  melodyPool: number[];
  noteIntervalMs: [number, number];
}

const MOOD_HARMONIES: Record<MoodType, MoodHarmony> = {
  rain: {
    rootFreq: 110.0,
    intervalRatios: [1, 1.5, 2.25],
    filterFreq: 480,
    noiseGain: 0.036,
    // Dm9 / Bbmaj7 sparse nocturnal raindrops
    chords: [
      [146.83, 220.0, 261.63, 329.63],
      [116.54, 174.61, 220.0, 293.66],
    ],
    melodyPool: [440.0, 523.25, 587.33, 659.25, 392.0],
    noteIntervalMs: [2100, 3400],
  },
  night: {
    rootFreq: 110.0,
    intervalRatios: [1, 1.5, 2.0],
    filterFreq: 420,
    noiseGain: 0.014,
    // Am9 / Fmaj7 deep quiet midnight
    chords: [
      [110.0, 164.81, 246.94, 261.63],
      [174.61, 220.0, 261.63, 329.63],
    ],
    melodyPool: [329.63, 392.0, 440.0, 493.88, 523.25],
    noteIntervalMs: [2300, 3600],
  },
  tension: {
    rootFreq: 103.83,
    intervalRatios: [1, 1.414, 1.887],
    filterFreq: 340,
    noiseGain: 0.018,
    // Muted low pulse, minor 2nd / suspended tension
    chords: [
      [130.81, 196.0, 207.65, 293.66],
      [116.54, 174.61, 207.65, 261.63],
    ],
    melodyPool: [311.13, 349.23, 392.0, 415.3],
    noteIntervalMs: [1750, 2650],
  },
  memory: {
    rootFreq: 130.81,
    intervalRatios: [1, 1.25, 1.5, 1.875],
    filterFreq: 640,
    noiseGain: 0.011,
    // Warm Cmaj7 -> Fmaj7 -> Am7 nostalgic warmth
    chords: [
      [130.81, 196.0, 246.94, 329.63],
      [174.61, 220.0, 261.63, 329.63],
      [110.0, 164.81, 220.0, 293.66],
    ],
    melodyPool: [392.0, 440.0, 493.88, 523.25, 587.33, 659.25],
    noteIntervalMs: [1950, 3100],
  },
  stillness: {
    rootFreq: 123.47,
    intervalRatios: [1, 1.5, 2.0],
    filterFreq: 490,
    noiseGain: 0.008,
    // Spacious Esus2 / Bsus4 river stillness
    chords: [
      [123.47, 185.0, 246.94, 329.63],
      [164.81, 246.94, 293.66, 369.99],
    ],
    melodyPool: [369.99, 440.0, 493.88, 587.33],
    noteIntervalMs: [2500, 3900],
  },
  dawn: {
    rootFreq: 146.83,
    intervalRatios: [1, 1.5, 2.0, 2.5],
    filterFreq: 860,
    noiseGain: 0.009,
    // Warm Dmaj9 -> Gmaj7 -> A6 hopeful sunrise
    chords: [
      [146.83, 220.0, 277.18, 329.63],
      [196.0, 246.94, 293.66, 369.99],
      [110.0, 164.81, 220.0, 277.18],
    ],
    melodyPool: [440.0, 493.88, 554.37, 587.33, 659.25, 739.99],
    noteIntervalMs: [1850, 2950],
  },
};

class SoundEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private musicBus: GainNode | null = null;
  private droneGain: GainNode | null = null;
  private droneFilter: BiquadFilterNode | null = null;
  private droneOscs: OscillatorNode[] = [];
  private noiseGain: GainNode | null = null;
  private noiseBuffer: AudioBuffer | null = null;
  private musicTimer: number | null = null;
  private chordStep = 0;
  private phraseStep = 0;

  private isMuted = false;
  private isStarted = false;
  private currentMood: MoodType = 'night';
  private lastTickTime = 0;
  private lastHoverTime = 0;
  private lastCircleTime = 0;

  private ensureContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return null;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      void this.ctx.resume();
    }
    return this.ctx;
  }

  public unlockAndStart(initialMood: MoodType = 'night'): void {
    const ctx = this.ensureContext();
    if (!ctx) return;

    if (!this.isStarted) {
      const compressor = ctx.createDynamicsCompressor();
      compressor.threshold.setValueAtTime(-16, ctx.currentTime);
      compressor.knee.setValueAtTime(18, ctx.currentTime);
      compressor.ratio.setValueAtTime(3.5, ctx.currentTime);
      compressor.attack.setValueAtTime(0.015, ctx.currentTime);
      compressor.release.setValueAtTime(0.25, ctx.currentTime);

      this.masterGain = ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.78, ctx.currentTime);
      compressor.connect(this.masterGain);
      this.masterGain.connect(ctx.destination);

      // Ambient Felt-Piano Music Bus + Lush Tape Echo Loop
      this.musicBus = ctx.createGain();
      this.musicBus.gain.setValueAtTime(0.68, ctx.currentTime);
      this.musicBus.connect(compressor);

      const delay = ctx.createDelay(1.0);
      delay.delayTime.setValueAtTime(0.42, ctx.currentTime);
      const delayFilter = ctx.createBiquadFilter();
      delayFilter.type = 'lowpass';
      delayFilter.frequency.setValueAtTime(1250, ctx.currentTime);
      const feedback = ctx.createGain();
      feedback.gain.setValueAtTime(0.32, ctx.currentTime);
      const wetGain = ctx.createGain();
      wetGain.gain.setValueAtTime(0.34, ctx.currentTime);

      this.musicBus.connect(delay);
      delay.connect(delayFilter);
      delayFilter.connect(feedback);
      feedback.connect(delay);
      delayFilter.connect(wetGain);
      wetGain.connect(compressor);

      // Deep Breathing Drone Pad
      this.droneFilter = ctx.createBiquadFilter();
      this.droneFilter.type = 'lowpass';
      this.droneFilter.frequency.setValueAtTime(
        MOOD_HARMONIES[initialMood].filterFreq,
        ctx.currentTime
      );
      this.droneFilter.Q.setValueAtTime(0.65, ctx.currentTime);

      this.droneGain = ctx.createGain();
      this.droneGain.gain.setValueAtTime(0.0001, ctx.currentTime);
      this.droneGain.gain.exponentialRampToValueAtTime(0.11, ctx.currentTime + 2.6);

      this.droneFilter.connect(this.droneGain);
      this.droneGain.connect(compressor);

      const harmony = MOOD_HARMONIES[initialMood];
      this.droneOscs = [0, 1, 2].map((idx) => {
        const osc = ctx.createOscillator();
        const voiceGain = ctx.createGain();
        osc.type = idx === 0 ? 'sine' : 'triangle';
        const ratio = harmony.intervalRatios[idx % harmony.intervalRatios.length];
        osc.frequency.setValueAtTime(harmony.rootFreq * ratio, ctx.currentTime);
        osc.detune.setValueAtTime((idx - 1) * 4.5, ctx.currentTime);
        voiceGain.gain.setValueAtTime(idx === 0 ? 0.48 : 0.2, ctx.currentTime);
        osc.connect(voiceGain);
        voiceGain.connect(this.droneFilter!);
        osc.start();
        return osc;
      });

      // Soft Pink Noise for Rain / Night Air + Paper Sweep Reuse
      const bufferSize = ctx.sampleRate * 3;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let b0 = 0,
        b1 = 0,
        b2 = 0,
        b3 = 0,
        b4 = 0,
        b5 = 0,
        b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.969 * b2 + white * 0.153852;
        b3 = 0.8665 * b3 + white * 0.3104856;
        b4 = 0.55 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.016898;
        output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.04;
        b6 = white * 0.115926;
      }
      this.noiseBuffer = noiseBuffer;

      const noiseSource = ctx.createBufferSource();
      noiseSource.buffer = noiseBuffer;
      noiseSource.loop = true;

      const noiseFilter = ctx.createBiquadFilter();
      noiseFilter.type = 'bandpass';
      noiseFilter.frequency.setValueAtTime(920, ctx.currentTime);
      noiseFilter.Q.setValueAtTime(0.55, ctx.currentTime);

      this.noiseGain = ctx.createGain();
      this.noiseGain.gain.setValueAtTime(harmony.noiseGain, ctx.currentTime);

      noiseSource.connect(noiseFilter);
      noiseFilter.connect(this.noiseGain);
      this.noiseGain.connect(compressor);
      noiseSource.start();

      this.isStarted = true;
      this.scheduleNextMusicNote(400);
    }

    this.setMood(initialMood);
  }

  private playFeltPianoNote(
    freq: number,
    velocity: number,
    decaySec: number,
    offsetSec = 0
  ): void {
    if (!this.ctx || !this.musicBus || this.isMuted) return;
    const now = this.ctx.currentTime + offsetSec;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(Math.min(1800, freq * 3.4), now);
    filter.frequency.exponentialRampToValueAtTime(Math.max(240, freq * 1.3), now + decaySec * 0.65);

    const env = this.ctx.createGain();
    env.gain.setValueAtTime(0.0001, now);
    env.gain.linearRampToValueAtTime(velocity, now + 0.024);
    env.gain.exponentialRampToValueAtTime(0.0001, now + decaySec);

    const fundamental = this.ctx.createOscillator();
    fundamental.type = 'sine';
    fundamental.frequency.setValueAtTime(freq, now);

    const overtone = this.ctx.createOscillator();
    overtone.type = 'triangle';
    overtone.frequency.setValueAtTime(freq * 2, now);
    const overtoneGain = this.ctx.createGain();
    overtoneGain.gain.setValueAtTime(0.14, now);

    fundamental.connect(filter);
    overtone.connect(overtoneGain);
    overtoneGain.connect(filter);
    filter.connect(env);
    env.connect(this.musicBus);

    fundamental.start(now);
    overtone.start(now);
    fundamental.stop(now + decaySec + 0.08);
    overtone.stop(now + decaySec + 0.08);
  }

  private scheduleNextMusicNote(initialDelayMs?: number): void {
    if (this.musicTimer !== null) {
      window.clearTimeout(this.musicTimer);
      this.musicTimer = null;
    }
    if (!this.isStarted) return;

    const harmony = MOOD_HARMONIES[this.currentMood];
    const [minMs, maxMs] = harmony.noteIntervalMs;
    const waitMs =
      initialDelayMs ?? Math.round(minMs + Math.random() * (maxMs - minMs));

    this.musicTimer = window.setTimeout(() => {
      if (this.ctx && this.isStarted && !this.isMuted) {
        const currentHarmony = MOOD_HARMONIES[this.currentMood];
        const chord = currentHarmony.chords[this.chordStep % currentHarmony.chords.length];

        // Every 4 steps, softly voice a warm arpeggiated chord foundation
        if (this.phraseStep % 4 === 0) {
          this.playFeltPianoNote(chord[0], 0.068, 3.8, 0);
          this.playFeltPianoNote(chord[1], 0.044, 3.4, 0.18);
          this.playFeltPianoNote(chord[2], 0.036, 3.1, 0.38);
          this.chordStep += 1;
        } else {
          // Sparse single felt-piano melody reflection
          const pool = currentHarmony.melodyPool;
          const noteFreq = pool[(this.phraseStep * 2 + Math.floor(Math.random() * 2)) % pool.length];
          this.playFeltPianoNote(noteFreq, 0.048, 3.0, 0);
          if (Math.random() > 0.55) {
            const harmonicPartner = chord[2 + (this.phraseStep % 2)] ?? chord[1];
            this.playFeltPianoNote(harmonicPartner, 0.028, 2.6, 0.42);
          }
        }
        this.phraseStep += 1;
      }
      this.scheduleNextMusicNote();
    }, waitMs);
  }

  public setMood(mood: MoodType): void {
    const changed = this.currentMood !== mood;
    this.currentMood = mood;
    if (!this.ctx || !this.isStarted || !this.droneFilter || !this.noiseGain) return;

    const now = this.ctx.currentTime;
    const harmony = MOOD_HARMONIES[mood];

    this.droneFilter.frequency.cancelScheduledValues(now);
    this.droneFilter.frequency.setValueAtTime(this.droneFilter.frequency.value, now);
    this.droneFilter.frequency.exponentialRampToValueAtTime(harmony.filterFreq, now + 2.4);

    this.noiseGain.gain.cancelScheduledValues(now);
    this.noiseGain.gain.setValueAtTime(Math.max(0.001, this.noiseGain.gain.value), now);
    this.noiseGain.gain.linearRampToValueAtTime(harmony.noiseGain, now + 2.2);

    this.droneOscs.forEach((osc, idx) => {
      const ratio = harmony.intervalRatios[idx % harmony.intervalRatios.length];
      osc.frequency.cancelScheduledValues(now);
      osc.frequency.setValueAtTime(osc.frequency.value, now);
      osc.frequency.exponentialRampToValueAtTime(harmony.rootFreq * ratio, now + 2.5);
    });

    if (changed) {
      this.chordStep = 0;
      this.phraseStep = 0;
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.ctx && this.masterGain) {
      const now = this.ctx.currentTime;
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
      this.masterGain.gain.linearRampToValueAtTime(this.isMuted ? 0 : 0.78, now + 0.25);
    }
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public playSfx(type: SfxType): void {
    if (type === 'none' || this.isMuted) return;
    const ctx = this.ensureContext();
    if (!ctx || !this.masterGain) return;

    const now = ctx.currentTime;

    if (type === 'tick') {
      if (now - this.lastTickTime < 0.055) return;
      this.lastTickTime = now;

      // Soft warm muted typewriter felt tap
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(340 + Math.random() * 60, now);
      osc.frequency.exponentialRampToValueAtTime(140, now + 0.024);

      gain.gain.setValueAtTime(0.022, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.026);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(now);
      osc.stop(now + 0.03);
      return;
    }

    if (type === 'circle') {
      // Dedicated emphasis SFX for circled questions: graphite pen sweep + resonant amber bell
      if (now - this.lastCircleTime < 0.35) return;
      this.lastCircleTime = now;

      if (this.noiseBuffer) {
        const penSrc = ctx.createBufferSource();
        penSrc.buffer = this.noiseBuffer;
        const penFilter = ctx.createBiquadFilter();
        penFilter.type = 'bandpass';
        penFilter.frequency.setValueAtTime(1650, now);
        penFilter.frequency.exponentialRampToValueAtTime(780, now + 0.42);
        penFilter.Q.setValueAtTime(1.8, now);

        const penGain = ctx.createGain();
        penGain.gain.setValueAtTime(0.0001, now);
        penGain.gain.linearRampToValueAtTime(0.11, now + 0.06);
        penGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.44);

        penSrc.connect(penFilter);
        penFilter.connect(penGain);
        penGain.connect(this.masterGain);
        penSrc.start(now);
        penSrc.stop(now + 0.48);
      }

      const harmony = MOOD_HARMONIES[this.currentMood];
      const root = harmony.rootFreq * 2;
      this.playFeltPianoNote(root, 0.075, 2.8, 0.04);
      this.playFeltPianoNote(root * 1.5, 0.055, 2.6, 0.14);
      this.playFeltPianoNote(root * 3, 0.034, 2.4, 0.24);
      return;
    }

    if (type === 'buzz') {
      // Realistic pocket phone triple vibration buzz
      [0, 0.15, 0.3].forEach((offset) => {
        const osc = ctx.createOscillator();
        const over = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        over.type = 'sine';
        osc.frequency.setValueAtTime(98, now + offset);
        over.frequency.setValueAtTime(196, now + offset);

        gain.gain.setValueAtTime(0.0001, now + offset);
        gain.gain.linearRampToValueAtTime(0.072, now + offset + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + offset + 0.088);

        osc.connect(gain);
        over.connect(gain);
        gain.connect(this.masterGain!);
        osc.start(now + offset);
        over.start(now + offset);
        osc.stop(now + offset + 0.095);
        over.stop(now + offset + 0.095);
      });
      return;
    }

    if (type === 'msg') {
      // Clean nocturnal double chime routed with subtle space
      [783.99, 1046.5].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);
        gain.gain.setValueAtTime(0.0001, now + idx * 0.08);
        gain.gain.linearRampToValueAtTime(0.036, now + idx * 0.08 + 0.014);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 0.38);
        osc.connect(gain);
        gain.connect(this.musicBus ?? this.masterGain!);
        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.42);
      });
      return;
    }

    if (type === 'hover') {
      if (now - this.lastHoverTime < 0.14) return;
      this.lastHoverTime = now;

      const base = MOOD_HARMONIES[this.currentMood].rootFreq * 4;
      this.playFeltPianoNote(base, 0.022, 0.65, 0);
      return;
    }

    if (type === 'emphasis') {
      const root = MOOD_HARMONIES[this.currentMood].rootFreq * 2;
      this.playFeltPianoNote(root, 0.062, 2.7, 0);
      this.playFeltPianoNote(root * 1.5, 0.036, 2.5, 0.08);
      return;
    }

    if (type === 'turn') {
      // Quiet paper page turn + soft low breath
      if (this.noiseBuffer) {
        const pageSrc = ctx.createBufferSource();
        pageSrc.buffer = this.noiseBuffer;
        const pageFilter = ctx.createBiquadFilter();
        pageFilter.type = 'bandpass';
        pageFilter.frequency.setValueAtTime(1100, now);
        pageFilter.Q.setValueAtTime(1.1, now);
        const pageGain = ctx.createGain();
        pageGain.gain.setValueAtTime(0.0001, now);
        pageGain.gain.linearRampToValueAtTime(0.045, now + 0.03);
        pageGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.14);
        pageSrc.connect(pageFilter);
        pageFilter.connect(pageGain);
        pageGain.connect(this.masterGain);
        pageSrc.start(now);
        pageSrc.stop(now + 0.16);
      }
      return;
    }

    if (type === 'select') {
      const low = ctx.createOscillator();
      const lowGain = ctx.createGain();
      low.type = 'sine';
      low.frequency.setValueAtTime(132, now);
      low.frequency.exponentialRampToValueAtTime(58, now + 0.24);
      lowGain.gain.setValueAtTime(0.11, now);
      lowGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.26);
      low.connect(lowGain);
      lowGain.connect(this.masterGain);
      low.start(now);
      low.stop(now + 0.28);

      const base = MOOD_HARMONIES[this.currentMood].rootFreq * 3;
      this.playFeltPianoNote(base, 0.055, 1.5, 0.02);
      return;
    }

    if (type === 'chime') {
      const root = MOOD_HARMONIES[this.currentMood].rootFreq * 4;
      this.playFeltPianoNote(root, 0.045, 2.2, 0);
      this.playFeltPianoNote(root * 1.5, 0.034, 2.0, 0.12);
      return;
    }

    if (type === 'bell') {
      const partials = [1, 2.0, 2.756];
      const fundamental = 293.66;
      partials.forEach((ratio, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(fundamental * ratio, now);
        const amp = 0.045 / (idx + 1);
        gain.gain.setValueAtTime(amp, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.8 / (idx + 0.7));
        osc.connect(gain);
        gain.connect(this.musicBus ?? this.masterGain!);
        osc.start(now);
        osc.stop(now + 3.0);
      });
      return;
    }

    if (type === 'ending') {
      const chord = [220, 277.18, 329.63, 440, 554.37];
      chord.forEach((f, idx) => {
        this.playFeltPianoNote(f, 0.048, 4.4, idx * 0.16);
      });
    }
  }
}

export const soundEngine = new SoundEngine();
