import type { HistoryEntry } from '../core/types.js';
import { el } from './dom.js';

const renderScore = (iconSrc: string, count: number, hint: string): HTMLElement =>
  el(
    'span',
    { className: 'game__history-score', title: hint },
    el('img', { className: 'game__history-icon', src: iconSrc, alt: '' }),
    el('span', { textContent: String(count) }),
  );

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
          {
            className: 'game__history-entry',
            ariaLabel: `${entry.guess}: на месте ${entry.bulls}, не на месте ${entry.cows}`,
          },
          el('span', {
            className: 'game__history-guess',
            textContent: entry.guess,
          }),
          el(
            'span',
            { className: 'game__history-result' },
            renderScore('./images/bull2.webp', entry.bulls, 'Бык: знак на своём месте'),
            renderScore('./images/cow.webp', entry.cows, 'Корова: знак верный, но место чужое'),
          ),
        ),
      ),
    ),
  );
};
