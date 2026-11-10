import { createDigitValidator } from '../core/createDigitValidator.js';
import { isValidGuess } from '../core/isValidGuess.js';
import type { GameState } from '../core/types.js';
import { el } from './dom.js';
import { renderRitualCircle } from './ritual-circle.js';

export const renderGameInput = (
  state: GameState,
  onSubmit: (guess: string) => void,
): { stage: HTMLDivElement; controls: HTMLDivElement } => {
  const isDigit = createDigitValidator(state.settings.base);
  const isWon = state.status === 'won';

  const input = el('input', {
    className: 'game__input',
    type: 'text',
    maxLength: state.settings.length,
    disabled: isWon,
  });

  const error = el('p', {
    className: 'game__error',
    textContent: '',
  });

  const button = el('button', {
    type: 'button',
    className: 'button button--primary',
    textContent: 'ПОПЫТАТЬСЯ ПРИЗВАТЬ',
    disabled: true,
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

  const hasInvalidDigits = (value: string): boolean => [...value].some((digit) => !isDigit(digit));

  const validateInput = (value: string, hasInvalid: boolean): void => {
    if (hasInvalid) {
      showError('Некоторые знаки не принадлежат выбранной системе.');
    } else if (hasDuplicateDigits(value)) {
      showError('Каждый знак может встречаться только один раз.');
    } else if (value.length < state.settings.length) {
      showError('Последовательность ещё не завершена.');
    } else if (isRepeatedGuess(value)) {
      showError('Эта комбинация уже встречалась. Попробуйте другую.');
    } else {
      clearError();
    }
  };

  let circle: HTMLDivElement;

  const updateInput = (value: string): void => {
    const hasInvalid = hasInvalidDigits(value);

    input.value = [...value].filter(isDigit).join('').slice(0, state.settings.length);

    validateInput(input.value, hasInvalid);

    const next = renderRitualCircle(
      state.settings.base,
      input.value,
      (digit) => {
        updateInput(input.value + digit);
      },
      isWon,
    );

    circle.replaceWith(next);
    circle = next;

    button.disabled = isWon || !canSubmit(input.value);
  };

  circle = renderRitualCircle(
    state.settings.base,
    '',
    (digit) => {
      updateInput(input.value + digit);
    },
    isWon,
  );

  const stage = el(
    'div',
    { className: 'game__stage' },
    ...(isWon
      ? [
          el('img', {
            className: 'game__demon',
            src: './dist/images/demon.webp',
            alt: 'Призванный демон',
          }),
        ]
      : []),
    circle,
  );

  input.addEventListener('input', () => {
    updateInput(input.value);
  });

  button.addEventListener('click', () => {
    if (!canSubmit(input.value)) {
      validateInput(input.value, false);
      return;
    }

    clearError();
    onSubmit(input.value);
  });

  button.disabled = isWon || !canSubmit(input.value);

  const controls = el('div', { className: 'game__controls' }, input, error, button);

  return { stage, controls };
};
