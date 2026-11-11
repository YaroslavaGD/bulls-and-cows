import type { RecordEntry } from '../storage/records.js';
import { el } from './dom.js';

const BASE_NAMES: Record<number, string> = {
  2: 'BIN',
  8: 'OCT',
  10: 'DEC',
  16: 'HEX',
};

export const renderRecords = (records: RecordEntry[]): HTMLElement => {
  if (records.length === 0) {
    return el('p', {
      className: 'records__empty',
      textContent: 'Книга пока пуста. Первый призыв ещё впереди.',
    });
  }

  return el(
    'ol',
    { className: 'records__list' },
    ...records.map((record, index) => {
      const details = el(
        'div',
        { className: 'records__details' },
        el('span', {
          className: 'records__base',
          textContent: BASE_NAMES[record.base] ?? String(record.base),
        }),
        el('span', {
          className: 'records__detail',
          textContent: `знаков: ${record.length}`,
        }),
        el('span', {
          className: 'records__detail',
          textContent: `попыток: ${record.attempts}`,
        }),
        el('span', {
          className: 'records__detail',
          textContent: `${Math.round(record.timeMs / 1000)} с`,
        }),
      );

      return el(
        'li',
        {
          className: `records__item${index === 0 ? ' records__item--best' : ''}`,
        },
        el('span', {
          className: 'records__rank',
          textContent: String(index + 1).padStart(2, '0'),
        }),
        details,
      );
    }),
  );
};
