import { el } from './dom.js';
const BASE_NAMES = {
    2: 'BIN',
    8: 'OCT',
    10: 'DEC',
    16: 'HEX',
};
export const renderRecords = (records) => {
    return el('ol', {}, ...records.map((record) => {
        return el('li', {
            textContent: `${BASE_NAMES[record.base] ?? record.base} • ${record.length} цифр: ${record.attempts} попыток, ${Math.round(record.timeMs / 1000)} с`,
        });
    }));
};
