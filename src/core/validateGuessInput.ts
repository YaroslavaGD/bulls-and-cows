import type { HistoryEntry } from './types.js';

export type InputProblem = 'invalid-digits' | 'duplicate-digits' | 'incomplete' | 'repeated';

type ValidationContext = {
  length: number;
  isDigit: (char: string) => boolean;
  history: HistoryEntry[];
};

export const findInputProblem = (_value: string, _context: ValidationContext): InputProblem | null => {
  throw new Error('Not implemented');
};
