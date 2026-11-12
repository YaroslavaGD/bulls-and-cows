import { loadMuted, saveMuted } from '../storage/settings.js';
const NOTES = [
    'c3',
    'd3',
    'e3',
    'f3',
    'g3',
    'a3',
    'b3',
    'c4',
    'd4',
    'e4',
    'f4',
    'g4',
    'a4',
    'b4',
    'c5',
    'd5',
    'e5',
    'frog',
];
const VOLUME = 0.35;
const context = new AudioContext();
const buffers = new Map();
let muted = loadMuted();
export const isMuted = () => muted;
export const setMuted = (value) => {
    muted = value;
    saveMuted(muted);
};
const loadNote = async (name) => {
    const response = await fetch(`./sounds/${name}.mp3`);
    const data = await response.arrayBuffer();
    buffers.set(name, await context.decodeAudioData(data));
};
export const loadSounds = async () => {
    await Promise.all(NOTES.map(loadNote));
};
const playNote = (name, volume = VOLUME) => {
    const buffer = buffers.get(name);
    if (muted || !buffer)
        return;
    void context.resume();
    const source = context.createBufferSource();
    const volumeNode = context.createGain();
    volumeNode.gain.value = volume;
    source.buffer = buffer;
    source.connect(volumeNode).connect(context.destination);
    source.start();
};
export const playDigit = (index) => playNote(NOTES[index]);
export const playError = () => playNote('frog', 0.2);
export const playMelody = (digits) => {
    digits.forEach((digit, position) => {
        setTimeout(() => playDigit(digit), 1000 + position * 180);
    });
};
