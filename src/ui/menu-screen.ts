import { countPossibleSecrets } from '../core/countPossibleSecrets.js';
import type { GameSettings } from '../core/types.js';
import { el } from './dom.js';

const BASES = [
  { name: 'BIN', base: 2 },
  { name: 'OCT', base: 8 },
  { name: 'DEC', base: 10 },
  { name: 'HEX', base: 16 },
];

const LENGTHS = [2, 3, 4, 5, 6];

export const renderMenuScreen = (onStart: (settings: GameSettings) => void, onShowRecords: () => void): HTMLElement => {
  const title = el('h1', {
    className: 'menu__title',
    textContent: 'THE SUMMONING',
  });

  const baseLabel = el('p', {
    className: 'menu__label',
    textContent: 'ЯЗЫК ПРИЗЫВА',
  });

  const baseOptions = el(
    'div',
    { className: 'menu__base-options' },
    ...BASES.map(({ name }) =>
      el('span', {
        className: 'menu__option',
        textContent: name,
      }),
    ),
  );

  const baseSlider = el('input', {
    className: 'menu__base-slider',
    type: 'range',
    min: '0',
    max: '3',
    step: '1',
    value: '2',
  });

  const lengthLabel = el('p', {
    className: 'menu__label',
    textContent: 'ЧИСЛО ЗНАКОВ',
  });

  const lengthOptions = el(
    'div',
    { className: 'menu__length-options' },
    ...LENGTHS.map((length) =>
      el('span', {
        className: 'menu__option',
        textContent: String(length),
      }),
    ),
  );

  const lengthSlider = el('input', {
    className: 'menu__length-slider',
    type: 'range',
    min: '0',
    max: '4',
    step: '1',
    value: '2',
  });

  const infoNumber = el('span', { className: 'menu__count-value' });
  const infoLabel = el('span', { className: 'menu__count-label', textContent: 'ВОЗМОЖНЫХ СИМВОЛОВ ПРИЗЫВА' });
  const info = el(
    'p',
    {
      className: 'menu__count',
    },
    infoLabel,
    infoNumber,
  );

  const updateSliderProgress = (slider: HTMLInputElement): void => {
    const min = Number(slider.min);
    const max = Number(slider.max);
    const value = Number(slider.value);

    const progress = max === min ? 0 : ((value - min) / (max - min)) * 100;

    slider.style.setProperty('--progress', `${progress}%`);
  };

  const update = (): void => {
    const base = BASES[Number(baseSlider.value)].base;
    const maxLengthIndex = Math.min(base, 6) - 2;
    lengthSlider.max = String(maxLengthIndex);

    if (Number(lengthSlider.value) > maxLengthIndex) {
      lengthSlider.value = String(maxLengthIndex);
    }

    const length = LENGTHS[Number(lengthSlider.value)];

    baseOptions.querySelectorAll('.menu__option').forEach((option, index) => {
      option.classList.toggle('is-active', index === Number(baseSlider.value));
    });

    lengthOptions.querySelectorAll('.menu__option').forEach((option, index) => {
      option.classList.toggle('is-active', index === Number(lengthSlider.value));
    });

    infoNumber.textContent = `${countPossibleSecrets(Number(length), base)}`;
    updateSliderProgress(baseSlider);
    updateSliderProgress(lengthSlider);
  };

  baseOptions.querySelectorAll('.menu__option').forEach((option, index) => {
    option.addEventListener('click', () => {
      baseSlider.value = String(index);
      update();
    });
  });

  lengthOptions.querySelectorAll('.menu__option').forEach((option, index) => {
    option.addEventListener('click', () => {
      if (index > Number(lengthSlider.max)) return;

      lengthSlider.value = String(index);
      update();
    });
  });

  baseSlider.addEventListener('input', update);
  lengthSlider.addEventListener('input', update);
  update();

  const start = el('button', {
    type: 'button',
    className: 'button button--primary',
    textContent: 'НАЧАТЬ ПРИЗЫВ',
  });

  start.addEventListener('click', () => {
    const length = LENGTHS[Number(lengthSlider.value)];
    const base = BASES[Number(baseSlider.value)].base;

    onStart({ length: length, base: base });
  });

  const records = el('button', {
    type: 'button',
    className: 'button button--secondary',
    textContent: 'КНИГА РЕКОРДОВ',
  });
  records.addEventListener('click', onShowRecords);

  const baseGroup = el('div', { className: 'menu__group' }, baseLabel, baseOptions, baseSlider);

  const lengthGroup = el('div', { className: 'menu__group' }, lengthLabel, lengthOptions, lengthSlider);

  const menuGroup = el('div', { className: 'menu__group-wrap' }, baseGroup, lengthGroup);

  const actions = el('div', { className: 'menu__actions' }, start, records);

  return el('main', { className: 'screen screen--menu' }, title, menuGroup, info, actions);
};
