import { createDigitValidator } from '../core/createDigitValidator.js';
import type { GameState } from '../core/types.js';
import type { RecordEntry } from '../storage/records.js';
import { el } from './dom.js';
import { renderHistory } from './history-view.js';
import { renderRecords } from './records-view.js';

export const renderGameScreen = (
  state: GameState,
  onSubmit: (guess: string) => void,
  records: RecordEntry[],
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
    textContent: 'submit',
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

  return el(
    'main',
    {},
    input,
    button,
    renderHistory(state.history),
    ...(message ? [message] : []),
    renderRecords(records),
  );
};
