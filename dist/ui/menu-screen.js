import { countPossibleSecrets } from '../core/countPossibleSecrets.js';
import { el } from './dom.js';
const BASES = [
    { name: 'BIN', base: 2 },
    { name: 'OCT', base: 8 },
    { name: 'DEC', base: 10 },
    { name: 'HEX', base: 16 },
];
const LENGTHS = [2, 3, 4, 5, 6];
export const renderMenuScreen = (onStart, onShowRecords) => {
    const baseSelect = el('select', {}, ...BASES.map(({ name, base }) => el('option', {
        value: String(base),
        textContent: name,
    })));
    baseSelect.value = '10';
    const lengthSelect = el('select', {}, ...LENGTHS.map((length) => el('option', {
        value: String(length),
        textContent: String(length),
    })));
    lengthSelect.value = '4';
    const info = el('p');
    const update = () => {
        const base = Number(baseSelect.value);
        [...lengthSelect.options].forEach((option) => {
            option.disabled = Number(option.value) > base;
        });
        if (Number(lengthSelect.value) > base)
            lengthSelect.value = '2';
        info.textContent = `Возможных комбинаций: ${countPossibleSecrets(Number(lengthSelect.value), base)}`;
    };
    baseSelect.addEventListener('change', update);
    lengthSelect.addEventListener('change', update);
    update();
    const start = el('button', {
        type: 'button',
        textContent: 'НАЧАТЬ ПРИЗЫВ',
    });
    start.addEventListener('click', () => {
        onStart({ length: Number(lengthSelect.value), base: Number(baseSelect.value) });
    });
    const records = el('button', { type: 'button', textContent: 'РЕКОРДЫ' });
    records.addEventListener('click', onShowRecords);
    return el('main', {}, baseSelect, lengthSelect, info, start, records);
};
