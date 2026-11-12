const MUTED_KEY = 'summoning:muted';
export const loadMuted = () => {
    try {
        return localStorage.getItem(MUTED_KEY) === 'true';
    }
    catch {
        return false;
    }
};
export const saveMuted = (muted) => {
    try {
        localStorage.setItem(MUTED_KEY, String(muted));
    }
    catch {
        // Storage may be disabled; the setting then lives until reload.
    }
};
