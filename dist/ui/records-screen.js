import { el } from './dom.js';
import { renderRecords } from './records-view.js';
export const renderRecordsScreen = (records, onClose) => {
    const close = el('button', { type: 'button', textContent: 'ЗАКРЫТЬ' });
    close.addEventListener('click', onClose);
    return el('main', {}, el('h2', { textContent: 'Книга рекордов' }), renderRecords(records), close);
};
