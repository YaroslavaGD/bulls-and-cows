const KEY = 'summoning:records';
const isRecordEntry = (value) => {
    if (typeof value !== 'object' || value === null)
        return false;
    return ('length' in value &&
        typeof value.length === 'number' &&
        'base' in value &&
        typeof value.base === 'number' &&
        'attempts' in value &&
        typeof value.attempts === 'number' &&
        'timeMs' in value &&
        typeof value.timeMs === 'number' &&
        'finishedAt' in value &&
        typeof value.finishedAt === 'number');
};
const compareRecords = (a, b) => a.attempts - b.attempts || a.timeMs - b.timeMs;
export const parseRecords = (raw) => {
    if (!raw)
        return [];
    try {
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed))
            return [];
        return parsed.filter(isRecordEntry);
    }
    catch {
        return [];
    }
};
export const addRecord = (records, entry, limit) => [...records, entry].sort(compareRecords).slice(0, limit);
export const loadRecords = () => parseRecords(localStorage.getItem(KEY));
export const saveRecords = (records) => {
    try {
        localStorage.setItem(KEY, JSON.stringify(records));
    }
    catch {
        // Storage may be full or disabled; losing a record must not crash the game.
    }
};
