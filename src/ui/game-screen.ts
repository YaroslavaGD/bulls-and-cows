import { createDigitValidator } from '../core/createDigitValidator.js';
import { isValidGuess } from '../core/isValidGuess.js';
import type { GameState } from '../core/types.js';
import { el } from './dom.js';
import { renderHistory } from './history-view.js';
import { renderRitualCircle } from './ritual-circle.js';

export const renderGameScreen = (
  state: GameState,
  onSubmit: (guess: string) => void,
  onNewGame: () => void,
  onShowRecords: () => void,
): HTMLElement => {
  const isDigit = createDigitValidator(state.settings.base);

  const input = el('input', {
    className: 'game__input',
    type: 'text',
    maxLength: state.settings.length,
  });

  const error = el('p', {
    className: 'game__error',
    textContent: '',
  });

  const showError = (message: string): void => {
    error.textContent = message;
  };

  const clearError = (): void => {
    error.textContent = '';
  };

  const hasDuplicateDigits = (value: string): boolean => {
    const digits = [...value.toLowerCase()];
    return new Set(digits).size !== digits.length;
  };

  const isRepeatedGuess = (value: string): boolean =>
    state.history.some((entry) => entry.guess.toLowerCase() === value.toLowerCase());

  const canSubmit = (value: string): boolean =>
    isValidGuess(value, state.settings.length, state.settings.base) && !isRepeatedGuess(value);

  const button = el('button', {
    type: 'button',
    className: 'button button--primary',
    textContent: 'ПОПЫТАТЬСЯ ПРИЗВАТЬ',
  });

  let circle: HTMLDivElement;

  const updateInput = (value: string): void => {
    input.value = [...value].filter(isDigit).join('').slice(0, state.settings.length);

    if (hasDuplicateDigits(input.value)) {
      showError('Каждый знак может встречаться только один раз.');
    } else if (isRepeatedGuess(input.value) && isValidGuess(input.value, state.settings.length, state.settings.base)) {
      showError('Эта комбинация уже встречалась. Попробуйте другую.');
    } else {
      clearError();
    }

    const next = renderRitualCircle(state.settings.base, input.value, (digit) => {
      updateInput(input.value + digit);
    });

    circle.replaceWith(next);
    circle = next;
    button.disabled = !canSubmit(input.value);
  };

  circle = renderRitualCircle(state.settings.base, '', (digit) => {
    updateInput(input.value + digit);
  });

  input.addEventListener('input', () => {
    updateInput(input.value);
  });

  button.addEventListener('click', () => {
    if (!isValidGuess(input.value, state.settings.length, state.settings.base)) {
      showError('Последовательность не завершена или содержит неверные знаки.');
      return;
    }

    if (isRepeatedGuess(input.value)) {
      showError('Эта комбинация уже встречалась. Попробуйте другую.');
      return;
    }

    clearError();
    onSubmit(input.value);
  });

  const isWon = state.status === 'won';
  input.disabled = isWon;
  button.disabled = isWon || !canSubmit(input.value);

  const message = isWon
    ? el('p', {
        textContent: `Победа! Попыток: ${state.history.length}, время: ${Math.round(((state.finishedAt ?? 0) - state.startedAt) / 1000)} c`,
      })
    : null;

  const newGame = el('button', {
    type: 'button',
    className: 'button button--secondary',
    textContent: 'НОВЫЙ ПРИЗЫВ',
  });
  newGame.addEventListener('click', onNewGame);

  const records = el('button', {
    type: 'button',
    className: 'button button--secondary',
    textContent: 'РЕКОРДЫ',
  });
  records.addEventListener('click', onShowRecords);

  return el(
    'main',
    { className: 'screen screen--game' },
    circle,
    input,
    error,
    button,
    renderHistory(state.history),
    ...(message ? [message] : []),
    newGame,
    records,
  );
};
