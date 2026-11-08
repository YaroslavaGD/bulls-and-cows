import type { RecordEntry } from '../storage/records.js';
import { el } from './dom.js';

const BASE_NAMES: Record<number, string> = {
  2: 'BIN',
  8: 'OCT',
  10: 'DEC',
  16: 'HEX',
};

export const renderRecords = (records: RecordEntry[]): HTMLElement => {
  return el(
    'ol',
    {},
    ...records.map((record) => {
      return el('li', {
        textContent: `${BASE_NAMES[record.base] ?? record.base} • ${record.length} цифр: ${record.attempts} попыток, ${Math.round(record.timeMs / 1000)} с`,
      });
    }),
  );
};
