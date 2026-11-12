export const findInputProblem = (value, { length, isDigit, history }) => {
    const digits = [...value.toLowerCase()];
    if (digits.some((digit) => !isDigit(digit)))
        return 'invalid-digits';
    if (new Set(digits).size !== digits.length)
        return 'duplicate-digits';
    if (digits.length < length)
        return 'incomplete';
    if (history.some((entry) => entry.guess.toLowerCase() === value.toLowerCase()))
        return 'repeated';
    return null;
};
