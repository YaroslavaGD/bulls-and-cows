import { isMuted, setMuted } from '../audio/sound.js';
import { el } from './dom.js';
const getLabel = () => (isMuted() ? 'ЗВУК: ВЫКЛ' : 'ЗВУК: ВКЛ');
export const renderSoundToggle = () => {
    const button = el('button', {
        type: 'button',
        className: 'button button--secondary sound-toggle',
        textContent: getLabel(),
    });
    button.addEventListener('click', () => {
        setMuted(!isMuted());
        button.textContent = getLabel();
    });
    return button;
};
