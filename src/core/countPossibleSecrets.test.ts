import { describe, expect, it } from 'vitest';
import { countPossibleSecrets } from './countPossibleSecrets.js';

describe('countPossibleSecrets', () => {
  it.each([
    [0, 10, 1],
    [1, 2, 2],
    [1, 10, 10],
    [2, 2, 2],
    [2, 10, 90],
    [3, 3, 6],
    [4, 10, 5040],
    [6, 16, 5765760],
  ])('counts secrets for length %i in base %i: %i', (length, base, expected) => {
    expect(countPossibleSecrets(length, base)).toBe(expected);
  });

  it('returns 0 when length exceeds base', () => {
    expect(countPossibleSecrets(6, 2)).toBe(0);
  });

  it('returns the same result on repeated calls', () => {
    expect(countPossibleSecrets(4, 10)).toBe(countPossibleSecrets(4, 10));
  });
});
