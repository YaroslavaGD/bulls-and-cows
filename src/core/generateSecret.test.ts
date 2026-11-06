import { describe, expect, it } from 'vitest';
import { generateSecret } from './generateSecret.js';
import { isValidGuess } from './isValidGuess.js';

describe('generateSecret', () => {
  it.each([
    { random: 0, length: 4, base: 10, expected: '0123' },
    { random: 0.99, length: 4, base: 10, expected: '9876' },
    { random: 0.99, length: 6, base: 16, expected: 'fedcba' },
  ])('builds $expected for length $length, base $base, random $random', ({ random, length, base, expected }) => {
    expect(generateSecret(length, base, () => random)).toBe(expected);
  });

  describe.each([0, 0.25, 0.5, 0.99])('with random = %s', (random) => {
    it.each([
      [2, 2],
      [4, 10],
      [6, 16],
    ])('returns a valid secret for length %i in base %i', (length, base) => {
      const secret = generateSecret(length, base, () => random);

      expect(isValidGuess(secret, length, base)).toBe(true);
    });
  });

  it('throws when length exceeds base', () => {
    expect(() => generateSecret(8, 2, () => 0)).toThrow(RangeError);
  });
});
