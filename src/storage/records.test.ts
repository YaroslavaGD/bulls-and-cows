import { describe, expect, it } from 'vitest';
import { addRecord, parseRecords } from './records.js';
import type { RecordEntry } from './records.js';

const makeRecord = (overrides: Partial<RecordEntry> = {}): RecordEntry => ({
  length: 4,
  base: 10,
  attempts: 5,
  timeMs: 30000,
  finishedAt: 1000,
  ...overrides,
});

describe('parseRecords', () => {
  it('returns an empty list for null', () => {
    expect(parseRecords(null)).toEqual([]);
  });

  it('returns an empty list for broken JSON', () => {
    expect(parseRecords('{oops')).toEqual([]);
  });

  it('returns an empty list when JSON is not an array', () => {
    expect(parseRecords('{"attempts":3}')).toEqual([]);
  });

  it('keeps valid records', () => {
    const records = [makeRecord(), makeRecord({ attempts: 7 })];

    expect(parseRecords(JSON.stringify(records))).toEqual(records);
  });

  it('drops items with the wrong shape', () => {
    const raw = JSON.stringify([makeRecord(), { attempts: '3' }, null, 42]);

    expect(parseRecords(raw)).toEqual([makeRecord()]);
  });
});

describe('addRecord', () => {
  it('sorts records by attempts', () => {
    const records = [makeRecord({ attempts: 5 }), makeRecord({ attempts: 3 })];
    const result = addRecord(records, makeRecord({ attempts: 4 }), 10);

    expect(result.map((record) => record.attempts)).toEqual([3, 4, 5]);
  });

  it('sorts by time when attempts are equal', () => {
    const records = [makeRecord({ timeMs: 50000 })];
    const result = addRecord(records, makeRecord({ timeMs: 20000 }), 10);

    expect(result.map((record) => record.timeMs)).toEqual([20000, 50000]);
  });

  it('keeps only the best records within the limit', () => {
    const records = [makeRecord({ attempts: 3 }), makeRecord({ attempts: 5 })];
    const result = addRecord(records, makeRecord({ attempts: 4 }), 2);

    expect(result.map((record) => record.attempts)).toEqual([3, 4]);
  });

  it('does not mutate the original list', () => {
    const records = [makeRecord({ attempts: 5 })];
    const result = addRecord(records, makeRecord({ attempts: 3 }), 10);

    expect(result).not.toBe(records);
    expect(records).toHaveLength(1);
  });
});
