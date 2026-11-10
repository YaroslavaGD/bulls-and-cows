import { el } from './dom.js';
import { renderGameInput } from './game-input.js';
import { renderHistory } from './history-view.js';
export const renderGameScreen = (state, onSubmit, onNewGame, onShowRecords) => {
    const isWon = state.status === 'won';
    const baseNames = {
        2: 'BIN',
        8: 'OCT',
        10: 'DEC',
        16: 'HEX',
    };
    const header = el('header', { className: 'game__header' }, el('h1', {
        className: 'game__title',
        textContent: 'THE SUMMONING',
    }), el('p', {
        className: 'game__subtitle',
        textContent: `${baseNames[state.settings.base]} · ДЛИНА ${state.settings.length}`,
    }));
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
    const actions = el('div', { className: 'game__actions' }, newGame, records);
    const { stage, controls } = renderGameInput(state, onSubmit);
    const sidebar = el('aside', { className: 'game__sidebar' }, controls, renderHistory(state.history), ...(message ? [message] : []), actions);
    return el('main', { className: 'screen screen--game' }, header, stage, sidebar);
};
