export const ROWS = 6;
export const COLS = 7;
export const EMPTY = null;
export const PLAYER_RED = "red";
export const PLAYER_YELLOW = "yellow";

export type Player = typeof PLAYER_RED | typeof PLAYER_YELLOW;
export type CellValue = Player | null;
export type Board = CellValue[][];
export type WinningCells = [number, number][];
