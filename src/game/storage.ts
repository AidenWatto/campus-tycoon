import type { GameState, LeaderboardEntry, SaveSlot } from './types';

const SAVE_KEY = 'campus-tycoon-save';
const LEADERBOARD_KEY = 'campus-tycoon-leaderboard';

export function saveGame(state: GameState): void {
  try {
    const slot: SaveSlot = {
      id: 'slot-1',
      state,
      savedAt: new Date().toISOString(),
    };
    localStorage.setItem(SAVE_KEY, JSON.stringify(slot));
  } catch (e) {
    console.error('Failed to save game:', e);
  }
}

export function loadGame(): GameState | null {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return null;
    const slot: SaveSlot = JSON.parse(raw);
    return slot.state;
  } catch (e) {
    console.error('Failed to load game:', e);
    return null;
  }
}

export function hasSave(): boolean {
  try {
    return localStorage.getItem(SAVE_KEY) !== null;
  } catch {
    return false;
  }
}

export function deleteSave(): void {
  try {
    localStorage.removeItem(SAVE_KEY);
  } catch (e) {
    console.error('Failed to delete save:', e);
  }
}

export function getLeaderboard(): LeaderboardEntry[] {
  try {
    const raw = localStorage.getItem(LEADERBOARD_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as LeaderboardEntry[];
  } catch {
    return [];
  }
}

export function addToLeaderboard(entry: LeaderboardEntry): void {
  try {
    const board = getLeaderboard();
    board.push(entry);
    board.sort((a, b) => b.finalScore - a.finalScore);
    localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(board.slice(0, 20)));
  } catch (e) {
    console.error('Failed to update leaderboard:', e);
  }
}
