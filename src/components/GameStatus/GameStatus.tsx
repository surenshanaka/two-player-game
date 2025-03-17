import React from "react";
import { useGame } from "../../hooks";
import { PLAYER_RED } from "../../utils/constants";

export function GameStatus() {
  const { currentPlayer, winner, gameOver } = useGame();

  return (
    <div className="mb-2 sm:mb-3 md:mb-4 flex items-center justify-center">
      {!gameOver ? (
        <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
          <div className="text-sm sm:text-base md:text-lg lg:text-xl font-medium">
            Turn:
          </div>
          <div
            className={`w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 rounded-full ${
              currentPlayer === PLAYER_RED ? "bg-red-500" : "bg-yellow-400"
            }`}
          />
          <div className="text-sm sm:text-base md:text-lg lg:text-xl font-medium capitalize">
            {currentPlayer}
          </div>
        </div>
      ) : winner ? (
        <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
          <div className="text-sm sm:text-base md:text-lg lg:text-xl font-medium">
            Winner:
          </div>
          <div
            className={`w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 rounded-full ${
              winner === PLAYER_RED ? "bg-red-500" : "bg-yellow-400"
            }`}
          />
          <div className="text-sm sm:text-base md:text-lg lg:text-xl font-medium capitalize">
            {winner}
          </div>
        </div>
      ) : (
        <div className="text-sm sm:text-base md:text-lg lg:text-xl font-medium">
          Draw!
        </div>
      )}
    </div>
  );
}
