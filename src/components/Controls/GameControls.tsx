import React from "react";
import { useGame } from "../../hooks/";
import { ColumnSelector } from "./ColumnSelector";

export function GameControls() {
  const { COLS, handleColumnClick, isColumnFull, board, gameOver, resetGame } =
    useGame();

  return (
    <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto">
      <div className="flex justify-center mb-1 sm:mb-1.5 md:mb-2">
        {Array(COLS)
          .fill(null)
          .map((_, col) => (
            <div key={col} className="p-1 sm:p-1.5 md:p-2">
              <ColumnSelector
                col={col}
                onClick={handleColumnClick}
                disabled={isColumnFull(board, col) || gameOver}
              />
            </div>
          ))}
      </div>

      {gameOver && (
        <div className="flex justify-center">
          <button
            className="mt-3 sm:mt-4 md:mt-6 mb-2 sm:mb-3 md:mb-4 
                      px-3 sm:px-4 md:px-6 py-1 sm:py-1.5 md:py-2 
                      bg-blue-500 text-white rounded hover:bg-blue-600 
                      text-sm sm:text-base md:text-lg font-medium"
            onClick={resetGame}
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}
