import type { GameSettings, GameState } from './types.js';

export const createGame = (settings: GameSettings, secret: string, _now: number): GameState => ({
  settings,
  secret,
  history: [],
  status: 'playing',
  startedAt: 0,
  finishedAt: null,
});

export const submitGuess = (state: GameState, _guess: string, _now: number): GameState => state;
