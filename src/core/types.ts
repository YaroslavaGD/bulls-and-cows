export type GuessResult = {
  bulls: number;
  cows: number;
};

export type GameStatus = 'playing' | 'won';

export type HistoryEntry = GuessResult & { guess: string };

export type GameSettings = {
  length: number;
  base: number;
};

export type GameState = {
  settings: GameSettings;
  secret: string;
  history: HistoryEntry[];
  status: GameStatus;
  startedAt: number;
  finishedAt: number | null;
};

export type InputProblem = 'invalid-digits' | 'duplicate-digits' | 'incomplete' | 'repeated';
