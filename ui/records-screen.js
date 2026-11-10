import { el } from './dom.js';
import { renderRecords } from './records-view.js';
export const renderRecordsScreen = (records, onClose) => {
    const close = el('button', {
        type: 'button',
        className: 'button button--secondary records__close',
        textContent: 'ВЕРНУТЬСЯ',
    });
    close.addEventListener('click', onClose);
    const header = el('header', { className: 'records__header' }, el('p', {
        className: 'records__eyebrow',
        textContent: 'THE SUMMONING',
    }), el('h1', {
        className: 'records__title',
        textContent: 'КНИГА РЕКОРДОВ',
    }), el('p', {
        className: 'records__subtitle',
        textContent: 'Летопись завершённых призывов',
    }));
    const content = el('section', { className: 'records__panel' }, el('h2', {
        className: 'records__section-title',
        textContent: 'ЗАПИСИ',
    }), renderRecords(records));
    return el('main', { className: 'screen screen--records' }, header, content, close);
};
