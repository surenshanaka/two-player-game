import React from "react";
import { CellValue, PLAYER_RED, PLAYER_YELLOW } from "../../utils/constants";

interface CellProps {
  value: CellValue;
}

export function Cell({ value }: CellProps) {
  let cellContent = null;

  if (value === PLAYER_RED || value === PLAYER_YELLOW) {
    cellContent = (
      <div
        className={`w-full h-full rounded-full ${
          value === PLAYER_RED ? "bg-red-500" : "bg-yellow-400"
        }`}
      />
    );
  }

  return (
    <div className="w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 border border-gray-300 flex items-center justify-center bg-white p-1 sm:p-1.5 md:p-2 rounded-sm">
      {cellContent}
    </div>
  );
}
