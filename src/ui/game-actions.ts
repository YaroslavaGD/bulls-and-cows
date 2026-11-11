import { el } from './dom.js';

export const renderGameActions = (
  onNewGame: () => void,
  onShowRecords: () => void,
  className = 'game__actions',
): HTMLElement => {
  const newGame = el('button', {
    type: 'button',
    className: 'button button--secondary',
    textContent: 'НОВЫЙ ПРИЗЫВ',
  });
  newGame.addEventListener('click', onNewGame);

  const records = el('button', {
    type: 'button',
    className: 'button button--secondary',
    textContent: 'КНИГА РЕКОРДОВ',
  });
  records.addEventListener('click', onShowRecords);

  const actions = el('div', { className: className }, newGame, records);

  return actions;
};
