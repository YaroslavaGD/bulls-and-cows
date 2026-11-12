import { createDigitValidator } from './createDigitValidator.js';

export const isValidGuess = (guess: string, length: number, base: number): boolean => {
  const isDigit = createDigitValidator(base);
  const digits = [...guess.toLowerCase()];

  const hasRightLength = digits.length === length;
  const hasOnlyValidDigits = digits.every(isDigit);
  const hasNoRepeats = new Set(digits).size === digits.length;

  return hasRightLength && hasOnlyValidDigits && hasNoRepeats;
};
