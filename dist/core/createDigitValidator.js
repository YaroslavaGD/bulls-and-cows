export const createDigitValidator = (base) => (char) => char.length === 1 && !isNaN(parseInt(char, base));
