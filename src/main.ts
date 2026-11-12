import { loadSounds, playMelody } from './audio/sound.js';
import { createGame, submitGuess } from './core/gameState.js';
import { generateSecret } from './core/generateSecret.js';
import { isValidGuess } from './core/isValidGuess.js';
import type { GameSettings, GameState } from './core/types.js';
import { addRecord, loadRecords, saveRecords } from './storage/records.js';
import { focusGameInput } from './ui/game-input.js';
import { renderGameScreen } from './ui/game-screen.js';
import { renderMenuScreen } from './ui/menu-screen.js';
import { renderRecordsScreen } from './ui/records-screen.js';
import { renderSoundToggle } from './ui/sound-toggle.js';

loadSounds().catch(() => {
  // Game works without sounds
});

const soundToggle = renderSoundToggle();

let state: GameState | null = null; // null - menu, GameState - game

const startGame = (settings: GameSettings): void => {
  state = createGame(settings, generateSecret(settings.length, settings.base), Date.now());
  render();
};

const backToMenu = (): void => {
  state = null;
  render();
};

const handleSubmit = (guess: string): void => {
  if (!state) return;

  if (!isValidGuess(guess, state.settings.length, state.settings.base)) return;
  state = submitGuess(state, guess, Date.now());

  if (state.status === 'won' && state.finishedAt !== null) {
    const entry = {
      length: state.settings.length,
      base: state.settings.base,
      attempts: state.history.length,
      timeMs: state.finishedAt - state.startedAt,
      finishedAt: state.finishedAt,
    };
    const { settings } = state;
    saveRecords(addRecord(loadRecords(), entry, 10));
    playMelody([...guess].map((char) => parseInt(char, settings.base)));
  }

  render();
};

let isRecordsOpen = false;

const toggleRecords = (): void => {
  isRecordsOpen = !isRecordsOpen;
  render();
};

const render = (): void => {
  if (isRecordsOpen) {
    document.body.replaceChildren(renderRecordsScreen(loadRecords(), toggleRecords), soundToggle);
    return;
  }

  document.body.replaceChildren(
    state === null
      ? renderMenuScreen(startGame, toggleRecords)
      : renderGameScreen(state, handleSubmit, backToMenu, toggleRecords),
    soundToggle,
  );

  focusGameInput();
};

render();
