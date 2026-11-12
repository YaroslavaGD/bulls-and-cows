import { isMuted, setMuted } from '../audio/sound.js';
import { el } from './dom.js';

const getLabel = (): string => (isMuted() ? 'ЗВУК: ВЫКЛ' : 'ЗВУК: ВКЛ');

export const renderSoundToggle = (): HTMLButtonElement => {
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
