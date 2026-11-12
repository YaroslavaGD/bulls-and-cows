import { playDigit, playError } from '../audio/sound.js';
import { createDigitValidator } from '../core/createDigitValidator.js';
import { isValidGuess } from '../core/isValidGuess.js';
import { findInputProblem } from '../core/validateGuessInput.js';
import { el } from './dom.js';
import { renderRitualCircle } from './ritual-circle.js';
const MESSAGES = {
    'invalid-digits': 'Некоторые знаки не принадлежат выбранной системе.',
    'duplicate-digits': 'Каждый знак может встречаться только один раз.',
    incomplete: 'Последовательность ещё не завершена.',
    repeated: 'Эту последовательность вы уже пробовали.',
};
export const focusGameInput = () => {
    document.querySelector('.game__input')?.focus();
};
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
    const isRepeatedGuess = (value) => state.history.some((entry) => entry.guess.toLowerCase() === value.toLowerCase());
    const canSubmit = (value) => isValidGuess(value, state.settings.length, state.settings.base) && !isRepeatedGuess(value);
    const validateInput = (value) => {
        const problem = findInputProblem(value, {
            length: state.settings.length,
            isDigit,
            history: state.history,
        });
        if (problem === null) {
            clearError();
            return;
        }
        showError(MESSAGES[problem]);
        if (problem !== 'incomplete')
            showFrog();
    };
    const victoryGuess = isWon ? (state.history[state.history.length - 1]?.guess ?? '') : '';
    let circle;
    let previousValue = '';
    const updateInput = (value) => {
        validateInput(value);
        input.value = [...value].filter(isDigit).join('').slice(0, state.settings.length);
        const isGrowing = input.value.length > previousValue.length;
        if (!isWon && isGrowing) {
            playDigit(parseInt(input.value.slice(-1), state.settings.base));
        }
        const next = renderRitualCircle(state.settings.base, input.value, handleDigitClick, isWon, previousValue);
        previousValue = input.value;
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
    const frog = el('img', { className: 'game__frog', src: './images/frog.webp', alt: '' });
    const showFrog = () => {
        frog.classList.remove('is-visible');
        void frog.offsetWidth; // перезапуск анимации
        frog.classList.add('is-visible');
        playError();
    };
    const demon = el('img', {
        className: 'game__demon',
        src: './images/demon2.webp',
        alt: 'Призванный демон',
    });
    const stage = el('div', { className: 'game__stage' }, ...(isWon ? [demon] : [frog]), circle);
    const trySubmit = () => {
        if (!canSubmit(input.value)) {
            validateInput(input.value);
            return;
        }
        clearError();
        onSubmit(input.value);
    };
    input.addEventListener('input', () => {
        updateInput(input.value);
    });
    input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter')
            trySubmit();
    });
    button.addEventListener('click', trySubmit);
    button.disabled = isWon || !canSubmit(input.value);
    const controls = el('div', { className: 'game__controls' }, input, error, button);
    return { stage, controls };
};
