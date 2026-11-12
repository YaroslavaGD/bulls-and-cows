import type { GameState } from '../core/types.js';
import { el } from './dom.js';
import { renderGameActions } from './game-actions.js';
import { renderGameInput } from './game-input.js';
import { renderHistory } from './history-view.js';
import { renderVictoryPanel } from './victory-view.js';

export const renderGameScreen = (
  state: GameState,
  onSubmit: (guess: string) => void,
  onNewGame: () => void,
  onShowRecords: () => void,
): HTMLElement => {
  const isWon = state.status === 'won';

  const baseNames: Record<number, string> = {
    2: 'BIN',
    8: 'OCT',
    10: 'DEC',
    16: 'HEX',
  };

  const header = el(
    'header',
    { className: 'game__header' },
    el('h1', {
      className: 'game__title',
      textContent: 'THE SUMMONING',
    }),
    el('p', {
      className: 'game__subtitle',
      textContent: `${baseNames[state.settings.base]} · ЗНАКОВ: ${state.settings.length}`,
    }),
  );

  const actions = renderGameActions(onNewGame, onShowRecords);

  const { stage, controls } = renderGameInput(state, onSubmit);

  const sidebarGame = el('aside', { className: 'game__sidebar' }, controls, renderHistory(state.history), actions);

  const sidebar = isWon ? renderVictoryPanel(state, onNewGame, onShowRecords) : sidebarGame;

  return el('main', { className: 'screen screen--game' }, header, stage, sidebar);
};
