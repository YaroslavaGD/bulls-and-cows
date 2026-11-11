import { createGame, submitGuess } from './core/gameState.js';
import { generateSecret } from './core/generateSecret.js';
import { isValidGuess } from './core/isValidGuess.js';
import { addRecord, loadRecords, saveRecords } from './storage/records.js';
import { focusGameInput } from './ui/game-input.js';
import { renderGameScreen } from './ui/game-screen.js';
import { renderMenuScreen } from './ui/menu-screen.js';
import { renderRecordsScreen } from './ui/records-screen.js';
let state = null; // null - menu, GameState - game
const startGame = (settings) => {
    state = createGame(settings, generateSecret(settings.length, settings.base), Date.now());
    render();
};
const backToMenu = () => {
    state = null;
    render();
};
const handleSubmit = (guess) => {
    if (!state)
        return;
    if (!isValidGuess(guess, state.settings.length, state.settings.base))
        return;
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
let isRecordsOpen = false;
const toggleRecords = () => {
    isRecordsOpen = !isRecordsOpen;
    render();
};
const render = () => {
    if (isRecordsOpen) {
        document.body.replaceChildren(renderRecordsScreen(loadRecords(), toggleRecords));
        return;
    }
    document.body.replaceChildren(state === null
        ? renderMenuScreen(startGame, toggleRecords)
        : renderGameScreen(state, handleSubmit, backToMenu, toggleRecords));
    focusGameInput();
};
render();
