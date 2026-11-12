import { loadMuted, saveMuted } from '../storage/settings.js';

const NOTES = ['c3', 'd3', 'e3', 'f3', 'g3', 'a3', 'b3', 'c4', 'd4', 'e4', 'f4', 'g4', 'a4', 'b4', 'c5', 'd5', 'e5'];
const VOLUME = 0.35;

const context = new AudioContext();
const buffers = new Map<string, AudioBuffer>();

let muted = loadMuted();

export const isMuted = (): boolean => muted;

export const setMuted = (value: boolean): void => {
  muted = value;
  saveMuted(muted);
};

const loadNote = async (name: string): Promise<void> => {
  const response = await fetch(`./sounds/${name}.mp3`);
  const data = await response.arrayBuffer();
  buffers.set(name, await context.decodeAudioData(data));
};

export const loadSounds = async (): Promise<void> => {
  await Promise.all(NOTES.map(loadNote));
};

export const playDigit = (index: number): void => {
  const buffer = buffers.get(NOTES[index]);
  if (muted || !buffer) return;

  void context.resume();
  const source = context.createBufferSource();
  const volumeNode = context.createGain();
  volumeNode.gain.value = VOLUME;
  source.buffer = buffer;
  source.connect(volumeNode).connect(context.destination);
  source.start();
};
