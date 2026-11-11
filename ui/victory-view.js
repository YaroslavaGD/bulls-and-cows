import { el } from './dom.js';
import { renderGameActions } from './game-actions.js';
export const renderVictoryPanel = (state, onNewGame, onShowRecords) => {
    const text = `ПЕЧАТЬ\u00a0ВОССТАНОВЛЕНА`;
    const result = `Попыток: ${state.history.length}, время: ${Math.round(((state.finishedAt ?? 0) - state.startedAt) / 1000)} с`;
    const resultP = el('p', { className: 'victory__result', textContent: result });
    const header = el('h2', {
        className: 'victory-header',
        ariaLabel: 'Печать восстановлена',
    }, ...[...text].map((char, index) => {
        const victoryChar = el('span', { className: 'victory__char', textContent: char, ariaHidden: 'true' });
        victoryChar.style.setProperty('--i', String(index));
        return victoryChar;
    }));
    const actions = renderGameActions(onNewGame, onShowRecords, 'game__actions game__actions--victory');
    const sidebarVictory = el('aside', { className: 'game__sidebar' }, header, resultP, actions);
    return sidebarVictory;
};
