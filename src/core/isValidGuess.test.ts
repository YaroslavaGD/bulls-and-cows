import { describe, expect, it } from 'vitest';
import { isValidGuess } from './isValidGuess.js';

describe('isValidGuess', () => {
  describe('accepts', () => {
    it('a guess with unique digits of the right length', () => {
      expect(isValidGuess('1234', 4, 10)).toBe(true);
    });

    it('a guess with a leading zero', () => {
      expect(isValidGuess('0123', 4, 10)).toBe(true);
    });

    it('hex digits in mixed case', () => {
      expect(isValidGuess('aB3f', 4, 16)).toBe(true);
    });
  });

  describe('rejects', () => {
    it('a guess shorter than the secret length', () => {
      expect(isValidGuess('123', 4, 10)).toBe(false);
    });

    it('a guess longer than the secret length', () => {
      expect(isValidGuess('12345', 4, 10)).toBe(false);
    });

    it('a guess with the character outside the base', () => {
      expect(isValidGuess('a123', 4, 10)).toBe(false);
    });

    it('a guess with repeated digits', () => {
      expect(isValidGuess('1123', 4, 10)).toBe(false);
    });

    it('a guess that repeats a hex digit in different case', () => {
      expect(isValidGuess('aA12', 4, 16)).toBe(false);
    });

    it('an empty guess', () => {
      expect(isValidGuess('', 4, 10)).toBe(false);
    });
  });
});
