import type { HistoryEntry } from '../core/types.js';
import { el } from './dom.js';

export const renderHistory = (history: HistoryEntry[]): HTMLElement => {
  return el(
    'section',
    { className: 'game__history' },
    el('h2', {
      className: 'game__history-title',
      textContent: 'ЖУРНАЛ РИТУАЛА',
    }),
    el(
      'ul',
      { className: 'game__history-list' },
      ...[...history].reverse().map((entry) =>
        el(
          'li',
          { className: 'game__history-entry' },
          el('span', {
            className: 'game__history-guess',
            textContent: entry.guess,
          }),
          el('span', {
            className: 'game__history-result',
            textContent: `${entry.bulls} B · ${entry.cows} C`,
          }),
        ),
      ),
    ),
  );
};
