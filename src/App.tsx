import React from "react";
import { GameProvider } from "./context";
import { Board } from "./components/Board";
import { GameStatus } from "./components/GameStatus";
import { GameControls } from "./components/Controls";

const App: React.FC = () => {
  return (
    <GameProvider>
      <div className="flex flex-col items-center justify-center p-4">
        <h1 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold mb-6">
          Two player game
        </h1>
        <GameStatus />
        <GameControls />
        <Board />
      </div>
    </GameProvider>
  );
};

export default App;
