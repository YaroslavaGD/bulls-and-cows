export const createDigitValidator =
  (base: number) =>
  (char: string): boolean =>
    char.length === 1 && !isNaN(parseInt(char, base));
