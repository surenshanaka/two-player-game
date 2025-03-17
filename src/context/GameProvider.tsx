import React, { useState, ReactNode, useCallback } from "react";
import { createEmptyBoard, isBoardFull, checkWinner } from "../utils/gameUtils";
import {
  PLAYER_RED,
  PLAYER_YELLOW,
  COLS,
  Board,
  Player,
  WinningCells,
} from "../utils/constants";
import { GameContext } from "./GameContext";

interface GameProviderProps {
  children: ReactNode;
}

export function GameProvider({ children }: GameProviderProps) {
  const [board, setBoard] = useState<Board>(createEmptyBoard());
  const [currentPlayer, setCurrentPlayer] = useState<Player>(PLAYER_RED);
  const [winner, setWinner] = useState<Player | null>(null);
  const [winningCells, setWinningCells] = useState<WinningCells>([]);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [isResetting, setIsResetting] = useState<boolean>(false);

  const handleColumnClick = (col: number): void => {
    if (gameOver || isResetting) return;

    // Find the lowest empty row in the selected column
    let row = 5; // ROWS - 1
    while (row >= 0 && board[row][col] !== null) {
      row--;
    }

    if (row < 0) return;

    // Create a copy of the board and update the cell
    const newBoard = board.map((row) => [...row]);
    newBoard[row][col] = currentPlayer;
    setBoard(newBoard);

    // Check for winner
    const winResult = checkWinner(newBoard, row, col);
    if (winResult) {
      setWinner(currentPlayer);
      setWinningCells(winResult);
      setGameOver(true);
      return;
    }

    // Check for draw
    if (isBoardFull(newBoard)) {
      setGameOver(true);
      return;
    }

    // Switch player
    setCurrentPlayer(currentPlayer === PLAYER_RED ? PLAYER_YELLOW : PLAYER_RED);
  };

  // Reset the game
  const resetGame = useCallback((): Promise<void> => {
    setIsResetting(true);

    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setBoard(createEmptyBoard());
        setCurrentPlayer(PLAYER_RED);
        setWinner(null);
        setWinningCells([]);
        setGameOver(false);
        setIsResetting(false);
        resolve();
      }, 300);
    });
  }, []);

  const isWinningCell = (row: number, col: number): boolean => {
    return winningCells.some(([r, c]) => r === row && c === col);
  };

  const isColumnFull = (board: Board, col: number): boolean => {
    return board[0][col] !== null;
  };

  return (
    <GameContext.Provider
      value={{
        board,
        currentPlayer,
        winner,
        gameOver,
        winningCells,
        isResetting,
        handleColumnClick,
        resetGame,
        isColumnFull,
        isWinningCell,
        COLS,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}
