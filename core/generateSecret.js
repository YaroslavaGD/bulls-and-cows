export const generateSecret = (length, base, random = Math.random) => {
    if (length > base) {
        throw new RangeError(`length (${length}) cannot exceed base (${base})`);
    }
    const allDigits = Array.from({ length: base }, (_, i) => i.toString(base));
    const pickDigits = (digits, remaining) => {
        if (remaining === 0)
            return '';
        const index = Math.floor(random() * digits.length);
        const rest = digits.filter((_, i) => i !== index);
        return digits[index] + pickDigits(rest, remaining - 1);
    };
    return pickDigits(allDigits, length);
};
