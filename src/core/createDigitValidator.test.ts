import { describe, expect, it } from 'vitest';
import { createDigitValidator } from './createDigitValidator.js';

describe('createDigitValidator', () => {
  it('returns a function', () => {
    const base = 2;
    const isDigit = createDigitValidator(base);

    expect(typeof isDigit).toBe('function');
  });

  it('keeps bases independent between validators', () => {
    const isBinDigit = createDigitValidator(2);
    const isDecDigit = createDigitValidator(10);

    expect(isBinDigit('5')).toBe(false);
    expect(isDecDigit('5')).toBe(true);
    expect(isBinDigit('5')).toBe(false);
  });

  describe('bin', () => {
    const isDigit = createDigitValidator(2);

    it.each(['0', '1'])('accepts %s', (char) => {
      expect(isDigit(char)).toBe(true);
    });

    it.each(['2', '9', 'a'])('rejects %s', (char) => {
      expect(isDigit(char)).toBe(false);
    });
  });

  describe('dec', () => {
    const isDigit = createDigitValidator(10);

    it.each(['0', '9'])('accepts %s', (char) => {
      expect(isDigit(char)).toBe(true);
    });

    it.each(['a'])('rejects %s', (char) => {
      expect(isDigit(char)).toBe(false);
    });
  });

  describe('oct', () => {
    const isDigit = createDigitValidator(8);

    it.each(['0', '7'])('accepts %s', (char) => {
      expect(isDigit(char)).toBe(true);
    });

    it.each(['8', 'a'])('rejects %s', (char) => {
      expect(isDigit(char)).toBe(false);
    });
  });

  describe('hex', () => {
    const isDigit = createDigitValidator(16);

    it.each(['a', 'A', 'f', 'F', '0'])('accepts %s', (char) => {
      expect(isDigit(char)).toBe(true);
    });

    it.each(['g', 'G', 'z'])('rejects %s', (char) => {
      expect(isDigit(char)).toBe(false);
    });
  });

  describe('invalid input', () => {
    const isDigit = createDigitValidator(2);

    it.each(['', '01', ' '])('rejects %j', (char) => {
      expect(isDigit(char)).toBe(false);
    });
  });
});
