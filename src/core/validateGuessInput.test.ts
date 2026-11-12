import { describe, expect, it } from 'vitest';
import type { HistoryEntry } from './types.js';
import { findInputProblem } from './validateGuessInput.js';

const isDecimal = (char: string): boolean => /^[0-9]$/.test(char);

const createContext = (history: HistoryEntry[] = []) => ({
  length: 4,
  isDigit: isDecimal,
  history,
});

describe('findInputProblem', () => {
  it('reports characters outside the base', () => {
    expect(findInputProblem('12a4', createContext())).toBe('invalid-digits');
  });

  it('reports characters outside the base before duplicates', () => {
    expect(findInputProblem('11x', createContext())).toBe('invalid-digits');
  });

  it('reports repeated digits', () => {
    expect(findInputProblem('1123', createContext())).toBe('duplicate-digits');
  });

  it('reports an unfinished guess', () => {
    expect(findInputProblem('123', createContext())).toBe('incomplete');
  });

  it('treats an empty input as unfinished', () => {
    expect(findInputProblem('', createContext())).toBe('incomplete');
  });

  it('reports a guess that was already tried', () => {
    const history: HistoryEntry[] = [{ guess: '1234', bulls: 0, cows: 2 }];

    expect(findInputProblem('1234', createContext(history))).toBe('repeated');
  });

  it('ignores letter case when looking for repeated guesses', () => {
    const history: HistoryEntry[] = [{ guess: 'ABC1', bulls: 1, cows: 0 }];
    const hexContext = { ...createContext(history), isDigit: (char: string) => /^[0-9a-f]$/.test(char) };

    expect(findInputProblem('abc1', hexContext)).toBe('repeated');
  });

  it('returns null for a valid new guess', () => {
    expect(findInputProblem('1234', createContext())).toBeNull();
  });
});
