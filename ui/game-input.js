import { createDigitValidator } from '../core/createDigitValidator.js';
import { isValidGuess } from '../core/isValidGuess.js';
import { el } from './dom.js';
import { renderRitualCircle } from './ritual-circle.js';
export const renderGameInput = (state, onSubmit) => {
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
    const showError = (message) => {
        error.textContent = message;
    };
    const clearError = () => {
        error.textContent = '';
    };
    const hasDuplicateDigits = (value) => {
        const digits = [...value.toLowerCase()];
        return new Set(digits).size !== digits.length;
    };
    const isRepeatedGuess = (value) => state.history.some((entry) => entry.guess.toLowerCase() === value.toLowerCase());
    const canSubmit = (value) => isValidGuess(value, state.settings.length, state.settings.base) && !isRepeatedGuess(value);
    const hasInvalidDigits = (value) => [...value].some((digit) => !isDigit(digit));
    const validateInput = (value, hasInvalid) => {
        if (hasInvalid) {
            showError('Некоторые знаки не принадлежат выбранной системе.');
        }
        else if (hasDuplicateDigits(value)) {
            showError('Каждый знак может встречаться только один раз.');
        }
        else if (value.length < state.settings.length) {
            showError('Последовательность ещё не завершена.');
        }
        else if (isRepeatedGuess(value)) {
            showError('Эта комбинация уже встречалась. Попробуйте другую.');
        }
        else {
            clearError();
        }
    };
    const victoryGuess = isWon ? (state.history[state.history.length - 1]?.guess ?? '') : '';
    let circle;
    const updateInput = (value) => {
        const hasInvalid = hasInvalidDigits(value);
        input.value = [...value].filter(isDigit).join('').slice(0, state.settings.length);
        validateInput(input.value, hasInvalid);
        const next = renderRitualCircle(state.settings.base, input.value, handleDigitClick, isWon);
        circle.replaceWith(next);
        circle = next;
        button.disabled = isWon || !canSubmit(input.value);
    };
    const handleDigitClick = (digit) => {
        if (isWon)
            return;
        updateInput(input.value + digit);
    };
    circle = renderRitualCircle(state.settings.base, victoryGuess, handleDigitClick, isWon);
    const stage = el('div', { className: 'game__stage' }, ...(isWon
        ? [
            el('img', {
                className: 'game__demon',
                src: './images/demon.webp',
                alt: 'Призванный демон',
            }),
        ]
        : []), circle);
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
