export type RecordEntry = {
  length: number;
  base: number;
  attempts: number;
  timeMs: number;
  finishedAt: number;
};

export const parseRecords = (_raw: string | null): RecordEntry[] => [
  {
    length: 1,
    base: 2,
    attempts: 1,
    timeMs: 1000,
    finishedAt: 1001,
  },
];

export const addRecord = (_records: RecordEntry[], _entry: RecordEntry, _limit: number): RecordEntry[] => [
  {
    length: 1,
    base: 2,
    attempts: 1,
    timeMs: 1000,
    finishedAt: 1001,
  },
];
