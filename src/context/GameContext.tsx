import { createContext } from "react";
import { Board, Player, WinningCells } from "../utils/constants";

export interface GameContextType {
  board: Board;
  currentPlayer: Player;
  winner: Player | null;
  gameOver: boolean;
  winningCells: WinningCells;
  isResetting: boolean;
  handleColumnClick: (col: number) => void;
  resetGame: () => Promise<void>;
  isColumnFull: (board: Board, col: number) => boolean;
  isWinningCell: (row: number, col: number) => boolean;
  COLS: number;
}

export const GameContext = createContext<GameContextType | undefined>(
  undefined
);
