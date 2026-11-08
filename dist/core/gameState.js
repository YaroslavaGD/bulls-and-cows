import { evaluateGuess } from './evaluateGuess.js';
export const createGame = (settings, secret, now) => ({
    settings,
    secret,
    history: [],
    status: 'playing',
    startedAt: now,
    finishedAt: null,
});
export const submitGuess = (state, guess, now) => {
    const isRepeat = state.history.some((entry) => entry.guess.toLowerCase() === guess.toLowerCase());
    if (state.status === 'won' || isRepeat)
        return state;
    const entry = { ...evaluateGuess(state.secret, guess), guess };
    const isWon = entry.bulls === state.settings.length;
    return {
        ...state,
        history: [...state.history, entry],
        status: isWon ? 'won' : 'playing',
        finishedAt: isWon ? now : null,
    };
};
