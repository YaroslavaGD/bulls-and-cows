export const evaluateGuess = (secret, guess) => {
    const secretDigits = [...secret.toLowerCase()];
    const guessDigits = [...guess.toLowerCase()];
    const bulls = guessDigits.filter((digit, i) => digit === secretDigits[i]).length;
    // Digits in a secret are unique, each shared digit is counted once.
    const commonDigits = guessDigits.filter((digit) => secretDigits.includes(digit)).length;
    return { bulls, cows: commonDigits - bulls };
};
