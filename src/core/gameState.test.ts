import { describe, expect, it } from 'vitest';
import { createGame, submitGuess } from './gameState.js';
import type { GameSettings, GameState } from './types.js';

const settings: GameSettings = { length: 4, base: 10 };
const secret = '1234';
const startGame = (): GameState => createGame(settings, secret, 1000);

describe('gameState', () => {
  describe('createGame', () => {
    it('starts a playing game with empty history', () => {
      expect(createGame(settings, secret, 1000)).toEqual({
        settings,
        secret,
        history: [],
        status: 'playing',
        startedAt: 1000,
        finishedAt: null,
      });
    });
  });

  describe('submitGuess', () => {
    it('adds a history entry with bulls and cows', () => {
      const next = submitGuess(startGame(), '1526', 1001);

      expect(next.history).toEqual([{ guess: '1526', bulls: 1, cows: 1 }]);
      expect(next.status).toBe('playing');
      expect(next.startedAt).toBe(1000);
    });

    it('marks the game as won when all digits are bulls', () => {
      const next = submitGuess(startGame(), '1234', 1002);

      expect(next.status).toBe('won');
      expect(next.finishedAt).toBe(1002);
    });

    it('does not add the same guess twice', () => {
      const once = submitGuess(startGame(), '1526', 1001);
      const twice = submitGuess(once, '1526', 1002);

      expect(twice.history).toHaveLength(1);
    });

    it('does not mutate the previous state', () => {
      const initial = startGame();
      const next = submitGuess(initial, '1526', 1001);

      expect(next).not.toBe(initial);
      expect(initial.history).toEqual([]);
    });

    it('ignores guesses after the game is won', () => {
      const won = submitGuess(startGame(), '1234', 1002);

      expect(submitGuess(won, '4321', 1003)).toEqual(won);
    });
  });
});
