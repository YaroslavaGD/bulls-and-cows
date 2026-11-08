import type { HistoryEntry } from '../core/types.js';
import { el } from './dom.js';

export const renderHistory = (history: HistoryEntry[]): HTMLElement => {
  return el(
    'ul',
    {},
    ...history.map((entry) => {
      return el('li', { textContent: `${entry.guess}: ${entry.bulls} bulls, ${entry.cows} cows` });
    }),
  );
};
