import { createGame, submitGuess } from './core/gameState.js';
import { generateSecret } from './core/generateSecret.js';
import { isValidGuess } from './core/isValidGuess.js';
import { addRecord, loadRecords, saveRecords } from './storage/records.js';
import { renderGameScreen } from './ui/game-screen.js';
import { renderMenuScreen } from './ui/menu-screen.js';

const settings = { length: 4, base: 10 };

let state = createGame(settings, generateSecret(settings.length, settings.base), Date.now());

const handleSubmit = (guess: string): void => {
  if (!isValidGuess(guess, settings.length, settings.base)) return;
  state = submitGuess(state, guess, Date.now());

  if (state.status === 'won' && state.finishedAt !== null) {
    const entry = {
      length: state.settings.length,
      base: state.settings.base,
      attempts: state.history.length,
      timeMs: state.finishedAt - state.startedAt,
      finishedAt: state.finishedAt,
    };

    saveRecords(addRecord(loadRecords(), entry, 10));
  }

  render();
};
const render = (): void => {
  document.body.replaceChildren(renderGameScreen(state, handleSubmit, loadRecords()));
};

document.body.replaceChildren(renderMenuScreen((settings) => document.body.append(JSON.stringify(settings))));
