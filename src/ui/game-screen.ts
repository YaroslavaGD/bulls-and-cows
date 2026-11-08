import { createDigitValidator } from '../core/createDigitValidator.js';
import type { GameState } from '../core/types.js';
import { el } from './dom.js';
import { renderHistory } from './history-view.js';

export const renderGameScreen = (
  state: GameState,
  onSubmit: (guess: string) => void,
  onNewGame: () => void,
  onShowRecords: () => void,
): HTMLElement => {
  const isDigit = createDigitValidator(state.settings.base);

  const input = el('input', {
    type: 'text',
    maxLength: state.settings.length,
  });

  input.addEventListener('input', () => {
    input.value = [...input.value].filter(isDigit).join('');
  });

  const button = el('button', {
    type: 'button',
    textContent: 'Попытаться призвать',
  });
  button.addEventListener('click', () => onSubmit(input.value));

  const isWon = state.status === 'won';
  input.disabled = isWon;
  button.disabled = isWon;

  const message = isWon
    ? el('p', {
        textContent: `Победа! Попыток: ${state.history.length}, время: ${Math.round(((state.finishedAt ?? 0) - state.startedAt) / 1000)} c`,
      })
    : null;

  const newGame = el('button', {
    type: 'button',
    textContent: 'НОВЫЙ ПРИЗЫВ',
  });
  newGame.addEventListener('click', onNewGame);

  const records = el('button', { type: 'button', textContent: 'РЕКОРДЫ' });
  records.addEventListener('click', onShowRecords);

  return el('main', {}, input, button, renderHistory(state.history), ...(message ? [message] : []), newGame, records);
};
