// Web Audio API procedural Andean ambient soundscape (wind, warm drone, gentle river whisper)
class AndeanAmbientSoundscape {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private masterGain: GainNode | null = null;
  private noiseNode: AudioBufferSourceNode | null = null;
  private droneOsc1: OscillatorNode | null = null;
  private droneOsc2: OscillatorNode | null = null;
  private lfo: OscillatorNode | null = null;
  private listeners: ((playing: boolean) => void)[] = [];

  public init() {
    if (typeof window === 'undefined') return;
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!this.ctx && AudioContextClass) {
      this.ctx = new AudioContextClass();
    }
  }

  public subscribe(fn: (playing: boolean) => void): () => void {
    this.listeners.push(fn);
    fn(this.isPlaying);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== fn);
    };
  }

  private notify() {
    this.listeners.forEach((fn) => {
      try { fn(this.isPlaying); } catch (e) { /* ignore */ }
    });
  }

  public async toggle(): Promise<boolean> {
    if (!this.ctx) {
      this.init();
    }
    if (!this.ctx) return false;

    if (this.ctx.state === 'suspended') {
      await this.ctx.resume();
    }

    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public autoStart() {
    if (!this.ctx) this.init();
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') {
      this.ctx.resume().then(() => {
        if (!this.isPlaying) this.start();
      }).catch(() => {});
    } else {
      if (!this.isPlaying) this.start();
    }
  }

  private start() {
    if (!this.ctx) return;

    try {
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      this.masterGain.gain.exponentialRampToValueAtTime(0.18, this.ctx.currentTime + 2.5);
      this.masterGain.connect(this.ctx.destination);

      // 1. Wind noise (Pink/Brown noise filter)
      const bufferSize = this.ctx.sampleRate * 2;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.04;
        b6 = white * 0.115926;
      }

      this.noiseNode = this.ctx.createBufferSource();
      this.noiseNode.buffer = noiseBuffer;
      this.noiseNode.loop = true;

      // Filter for wind gust effect
      const windFilter = this.ctx.createBiquadFilter();
      windFilter.type = 'bandpass';
      windFilter.frequency.setValueAtTime(320, this.ctx.currentTime);
      windFilter.Q.setValueAtTime(1.8, this.ctx.currentTime);

      // LFO for slow breathing wind gusts
      this.lfo = this.ctx.createOscillator();
      this.lfo.frequency.setValueAtTime(0.15, this.ctx.currentTime); // 0.15 Hz = 6-7 second wave
      const lfoGain = this.ctx.createGain();
      lfoGain.gain.setValueAtTime(140, this.ctx.currentTime);
      this.lfo.connect(lfoGain);
      lfoGain.connect(windFilter.frequency);
      this.lfo.start();

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.7, this.ctx.currentTime);
      this.noiseNode.connect(windFilter);
      windFilter.connect(noiseGain);
      noiseGain.connect(this.masterGain);
      this.noiseNode.start();

      // 2. Sacred Andean Drone (Pentatonic Inca frequency 144Hz & 216Hz - D3 / A3 harmonic)
      this.droneOsc1 = this.ctx.createOscillator();
      this.droneOsc1.type = 'sine';
      this.droneOsc1.frequency.setValueAtTime(144, this.ctx.currentTime); // D3 root note

      this.droneOsc2 = this.ctx.createOscillator();
      this.droneOsc2.type = 'triangle';
      this.droneOsc2.frequency.setValueAtTime(216, this.ctx.currentTime); // A3 fifth harmonic

      const droneGain = this.ctx.createGain();
      droneGain.gain.setValueAtTime(0.045, this.ctx.currentTime);

      this.droneOsc1.connect(droneGain);
      this.droneOsc2.connect(droneGain);
      droneGain.connect(this.masterGain);

      this.droneOsc1.start();
      this.droneOsc2.start();

      this.isPlaying = true;
      this.notify();
    } catch (e) {
      console.warn('Web Audio Ambient error:', e);
      this.isPlaying = false;
      this.notify();
    }
  }

  public stop() {
    if (!this.ctx || !this.masterGain) {
      this.isPlaying = false;
      this.notify();
      return;
    }
    try {
      this.masterGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.8);
      setTimeout(() => {
        try {
          this.noiseNode?.stop();
          this.droneOsc1?.stop();
          this.droneOsc2?.stop();
          this.lfo?.stop();
          this.noiseNode?.disconnect();
          this.droneOsc1?.disconnect();
          this.droneOsc2?.disconnect();
          this.lfo?.disconnect();
        } catch {
          // ignore
        }
        this.isPlaying = false;
        this.notify();
      }, 900);
    } catch {
      this.isPlaying = false;
      this.notify();
    }
  }

  public playFluteNote(frequency: number = 432, durationSec: number = 2) {
    if (!this.ctx) this.init();
    if (!this.ctx) return;
    try {
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(frequency, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.12, this.ctx.currentTime + 0.3);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + durationSec);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + durationSec + 0.1);
    } catch {
      // ignore
    }
  }

  public startDrone() {
    if (!this.isPlaying) {
      this.start();
    }
  }

  public stopDrone() {
    if (this.isPlaying) {
      this.stop();
    }
  }
}

export const andeanAudio = new AndeanAmbientSoundscape();
export const audioSynthesizer = andeanAudio;
