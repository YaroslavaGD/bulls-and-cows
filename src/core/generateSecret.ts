export const generateSecret = (length: number, base: number, random: () => number = Math.random): string => {
  if (length > base) {
    throw new RangeError(`length (${length}) cannot exceed base (${base})`);
  }

  const allDigits = Array.from({ length: base }, (_, i) => i.toString(base));

  const pickDigits = (digits: string[], remaining: number): string => {
    if (remaining === 0) return '';

    const index = Math.floor(random() * digits.length);
    const rest = digits.filter((_, i) => i !== index);

    return digits[index] + pickDigits(rest, remaining - 1);
  };

  return pickDigits(allDigits, length);
};
