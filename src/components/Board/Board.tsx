import React, { useState, useEffect } from "react";
import { useGame } from "../../hooks/useGame";
import { Cell } from "../Cell";
import { Loader2 } from "lucide-react";

interface BoardProps {
  initialLoadingState?: boolean;
}

export function Board({ initialLoadingState }: BoardProps) {
  const { board, winner, isWinningCell, gameOver } = useGame();
  const [isLoading, setIsLoading] = useState<boolean>(
    initialLoadingState !== undefined ? initialLoadingState : false
  );
  const [previousGameOver, setPreviousGameOver] = useState<boolean>(gameOver);

  useEffect(() => {
    if (previousGameOver && !gameOver) {
      setIsLoading(true);

      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1000);

      return () => clearTimeout(timer);
    }

    setPreviousGameOver(gameOver);
  }, [gameOver, previousGameOver]);

  if (isLoading) {
    return (
      <div
        className="bg-blue-500 p-2 sm:p-3 md:p-4 rounded-lg shadow-lg flex items-center justify-center w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto"
        style={{
          aspectRatio: `${board[0].length} / ${board.length}`,
        }}
        data-testid="loading-state"
      >
        <div className="flex flex-col items-center justify-center text-white">
          <Loader2 className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 animate-spin mb-2 sm:mb-3 md:mb-4" />
          <div className="text-sm sm:text-base md:text-xl font-medium">
            Loading new game...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="bg-blue-500 p-2 sm:p-3 md:p-4 rounded-lg shadow-lg mx-auto"
      data-testid="board-grid"
    >
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center">
          {row.map((cell, colIndex) => {
            const winning = winner && isWinningCell(rowIndex, colIndex);

            return (
              <div
                key={colIndex}
                className={
                  winning
                    ? "p-1 sm:p-1.5 md:p-2 animate-pulse"
                    : "p-1 sm:p-1.5 md:p-2"
                }
                data-winning={winning ? "true" : "false"}
              >
                <Cell value={cell} />
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
