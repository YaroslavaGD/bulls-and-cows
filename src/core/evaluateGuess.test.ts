import { describe, expect, it } from 'vitest';
import { evaluateGuess } from './evaluateGuess.js';

describe('evaluateGuess', () => {
  it.each([
    ['1234', '1234', 4, 0],
    ['1234', '4321', 0, 4],
    ['1234', '1567', 1, 0],
    ['1234', '1325', 1, 2],
    ['1234', '5678', 0, 0],
    ['ab12', 'AB12', 4, 0],
  ])('%s vs %s gives %i bulls and %i cows', (secret, guess, expectedBulls, expectedCows) => {
    const { bulls, cows } = evaluateGuess(secret, guess);

    expect(bulls).toBe(expectedBulls);
    expect(cows).toBe(expectedCows);
  });
});
