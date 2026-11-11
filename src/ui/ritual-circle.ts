import { el } from './dom.js';

const SVG_NS = 'http://www.w3.org/2000/svg';
const SIZE = 400;
const CENTER = SIZE / 2;
const RING_RADIUS = 180;

type Point = { x: number; y: number };

export const getNodePosition = (index: number, count: number): Point => {
  const angle = (index / count) * 2 * Math.PI - Math.PI / 2; // first - upp
  return {
    x: CENTER + RING_RADIUS * Math.cos(angle),
    y: CENTER + RING_RADIUS * Math.sin(angle),
  };
};

const createLine = (from: Point, to: Point, className: string): SVGLineElement => {
  const line = document.createElementNS(SVG_NS, 'line');
  line.setAttribute('class', className);
  line.setAttribute('x1', String(from.x));
  line.setAttribute('y1', String(from.y));
  line.setAttribute('x2', String(to.x));
  line.setAttribute('y2', String(to.y));
  line.setAttribute('pathLength', '1');
  return line;
};

const createRoute = (base: number, input: string, previousInput = ''): SVGSVGElement => {
  const toPositions = (value: string): Point[] =>
    [...value.toUpperCase()].map((char) => getNodePosition(parseInt(char, base), base));

  const positions = toPositions(input);
  const previousPositions = toPositions(previousInput);

  const upper = input.toUpperCase();
  const previousUpper = previousInput.toUpperCase();
  const isGrowing = upper.length === previousUpper.length + 1 && upper.startsWith(previousUpper);
  const isShrinking = previousUpper.length === upper.length + 1 && previousUpper.startsWith(upper);

  const lastIndex = positions.length - 2;

  const lines = positions.slice(1).map((to, index) => {
    const isNew = isGrowing && index === lastIndex;
    return createLine(positions[index], to, isNew ? 'ritual__line ritual__line--new' : 'ritual__line');
  });

  const [removedFrom, removedTo] = previousPositions.slice(-2);

  const removedLines =
    isShrinking && previousPositions.length >= 2
      ? [createLine(removedFrom, removedTo, 'ritual__line ritual__line--removing')]
      : [];

  const svg = document.createElementNS(SVG_NS, 'svg');

  svg.setAttribute('class', 'ritual__route');
  svg.setAttribute('viewBox', `0 0 ${SIZE} ${SIZE}`);

  svg.append(...lines, ...removedLines);

  return svg;
};

export const renderRitualCircle = (
  base: number,
  input: string,
  onDigitClick: (digit: string) => void,
  isVictory = false,
  previousInput = '',
): HTMLDivElement => {
  const activeDigits = [...input.toUpperCase()];
  const duplicateDigits = new Set(activeDigits.filter((digit, index) => activeDigits.indexOf(digit) !== index));

  const buttons = Array.from({ length: base }, (_, index) => {
    const digit = index.toString(base).toUpperCase();
    const position = getNodePosition(index, base);

    const button = el('button', {
      type: 'button',
      className: [
        'ritual__button',
        activeDigits.includes(digit) && 'ritual__button--active',
        duplicateDigits.has(digit) && 'ritual__button--duplicate',
      ]
        .filter(Boolean)
        .join(' '),
      textContent: digit,
    });

    button.style.left = `${(position.x / SIZE) * 100}%`;
    button.style.top = `${(position.y / SIZE) * 100}%`;

    button.addEventListener('click', () => onDigitClick(digit));

    return button;
  });

  const plane = el('div', { className: 'ritual__plane' }, createRoute(base, input, previousInput), ...buttons);

  return el(
    'div',
    {
      className: `ritual ${isVictory ? 'ritual--victory' : ''}`,
    },
    plane,
  );
};
