import { ROWS, COLS, EMPTY, Board, WinningCells } from "./constants";

/**
 * Create an empty game board
 */
export const createEmptyBoard = (): Board => {
  return Array(ROWS)
    .fill(null)
    .map(() => Array(COLS).fill(EMPTY));
};

/**
 * Check if a column is full
 */
export const isColumnFull = (board: Board, col: number): boolean => {
  return board[0][col] !== EMPTY;
};

/**
 * Check if the board is full (draw)
 */
export const isBoardFull = (board: Board): boolean => {
  return board[0].every((cell) => cell !== EMPTY);
};

/**
 * Check for a winner after a move
 */
export const checkWinner = (
  board: Board,
  lastRow: number,
  lastCol: number
): WinningCells | null => {
  const directions = [
    [0, 1], // horizontal
    [1, 0], // vertical
    [1, 1], // diagonal /
    [1, -1], // diagonal \
  ];

  const player = board[lastRow][lastCol];
  if (player === EMPTY) return null;

  for (const [dx, dy] of directions) {
    const connectedCells: [number, number][] = [];

    // Check in both directions
    for (let i = -3; i <= 3; i++) {
      const r = lastRow + i * dx;
      const c = lastCol + i * dy;

      if (r >= 0 && r < ROWS && c >= 0 && c < COLS && board[r][c] === player) {
        connectedCells.push([r, c]);
      } else {
        // Reset connected cells if the sequence is broken
        if (connectedCells.length > 0 && i < 1) {
          connectedCells.length = 0;
        }
      }

      // Check if we have 4 connected cells
      if (connectedCells.length >= 4) {
        return connectedCells.slice(0, 4) as WinningCells;
      }
    }
  }

  return null;
};
