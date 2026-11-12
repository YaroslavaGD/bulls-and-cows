import type { HistoryEntry } from './types.js';

export type InputProblem = 'invalid-digits' | 'duplicate-digits' | 'incomplete' | 'repeated';

type ValidationContext = {
  length: number;
  isDigit: (char: string) => boolean;
  history: HistoryEntry[];
};

export const findInputProblem = (
  value: string,
  { length, isDigit, history }: ValidationContext,
): InputProblem | null => {
  const digits = [...value.toLowerCase()];
  if (digits.some((digit) => !isDigit(digit))) return 'invalid-digits';

  if (new Set(digits).size !== digits.length) return 'duplicate-digits';

  if (digits.length < length) return 'incomplete';

  if (history.some((entry) => entry.guess.toLowerCase() === value.toLowerCase())) return 'repeated';

  return null;
};
