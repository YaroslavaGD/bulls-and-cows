const MUTED_KEY = 'summoning:muted';

export const loadMuted = (): boolean => {
  try {
    return localStorage.getItem(MUTED_KEY) === 'true';
  } catch {
    return false;
  }
};

export const saveMuted = (muted: boolean): void => {
  try {
    localStorage.setItem(MUTED_KEY, String(muted));
  } catch {
    // Storage may be disabled; the setting then lives until reload.
  }
};
