export type RecordEntry = {
  length: number;
  base: number;
  attempts: number;
  timeMs: number;
  finishedAt: number;
};

const isRecordEntry = (value: unknown): value is RecordEntry => {
  if (typeof value !== 'object' || value === null) return false;

  return (
    'length' in value &&
    typeof value.length === 'number' &&
    'base' in value &&
    typeof value.base === 'number' &&
    'attempts' in value &&
    typeof value.attempts === 'number' &&
    'timeMs' in value &&
    typeof value.timeMs === 'number' &&
    'finishedAt' in value &&
    typeof value.finishedAt === 'number'
  );
};

const compareRecords = (a: RecordEntry, b: RecordEntry): number => a.attempts - b.attempts || a.timeMs - b.timeMs;

export const parseRecords = (raw: string | null): RecordEntry[] => {
  if (!raw) return [];

  try {
    const parsed: unknown = JSON.parse(raw);

    if (!Array.isArray(parsed)) return [];

    return parsed.filter(isRecordEntry);
  } catch {
    return [];
  }
};

export const addRecord = (records: RecordEntry[], entry: RecordEntry, limit: number): RecordEntry[] =>
  [...records, entry].sort(compareRecords).slice(0, limit);
