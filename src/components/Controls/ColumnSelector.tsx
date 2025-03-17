import React from "react";
import { ArrowBigDown } from "lucide-react";

interface ColumnSelectorProps {
  col: number;
  onClick: (col: number) => void;
  disabled: boolean;
}

export function ColumnSelector({
  col,
  onClick,
  disabled,
}: ColumnSelectorProps) {
  return (
    <button
      className="w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 
                 border border-gray-300 bg-gray-100 flex items-center justify-center 
                 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
      onClick={() => onClick(col)}
      disabled={disabled}
      aria-label={`Drop token in column ${col + 1}`}
    >
      <ArrowBigDown className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8" />
    </button>
  );
}
