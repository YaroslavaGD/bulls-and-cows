type CountSecrets = (length: number, base: number) => number;

export const memoize = (fn: CountSecrets): CountSecrets => {
  const cache = new Map<string, number>();

  return (length: number, base: number) => {
    const key = `${length},${base}`;
    const cached = cache.get(key);
    if (cached !== undefined) return cached;

    const result = fn(length, base);
    cache.set(key, result);
    return result;
  };
};
export const countPossibleSecrets: CountSecrets = memoize((length, base) => {
  if (length > base) return 0;
  if (length === 0) return 1;

  return base * countPossibleSecrets(length - 1, base - 1);
});
