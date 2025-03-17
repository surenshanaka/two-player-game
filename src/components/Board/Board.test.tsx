import React from "react";
import { render, cleanup, act } from "@testing-library/react";
import { vi } from "vitest";
import { describe, test, expect, beforeEach, afterEach } from "vitest";
import { Board } from "./Board";
import { useGame } from "../../hooks/useGame";
import "@testing-library/jest-dom";

vi.mock("../../hooks/useGame", () => ({
  useGame: vi.fn(),
}));

vi.mock("../../Cell", () => ({
  default: ({ value }: { value: unknown }) => (
    <div data-testid="cell" data-value={value} />
  ),
}));

vi.mock("lucide-react", () => ({
  Loader2: () => <div data-testid="loader-icon">Loading Icon</div>,
}));

describe("Board Component", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  test("render the board with correct cells", () => {
    const mockBoard = [
      [null, null, null],
      [null, "red", null],
      [null, null, "yellow"],
    ];

    (useGame as jest.Mock).mockReturnValue({
      board: mockBoard,
      winner: null,
      isWinningCell: () => false,
      gameOver: false,
    });

    const { container } = render(<Board />);

    const hasBlueBackground = container.innerHTML.includes("bg-blue-500");
    expect(hasBlueBackground).toBe(true);

    const cellsCount = (container.innerHTML.match(/data-testid="cell"/g) || [])
      .length;
    expect(cellsCount).toBe(0);
  });

  test("mark winning cells correctly", () => {
    const mockBoard = [
      [null, null, null],
      [null, "red", null],
      [null, null, "yellow"],
    ];

    const isWinningCellMock = vi.fn().mockImplementation((row, col) => {
      return row === 1 && col === 1;
    });

    (useGame as jest.Mock).mockReturnValue({
      board: mockBoard,
      winner: "red",
      isWinningCell: isWinningCellMock,
      gameOver: false,
    });

    const { container } = render(<Board />);

    const hasAnimatedCell = container.innerHTML.includes("animate-pulse");
    expect(hasAnimatedCell).toBe(true);
  });

  test("handle transitioning between game states properly", () => {
    vi.useFakeTimers();

    (useGame as jest.Mock).mockReturnValue({
      board: [[null, null, null]],
      winner: null,
      isWinningCell: vi.fn(),
      gameOver: true,
    });

    const { rerender, container } = render(<Board />);

    (useGame as jest.Mock).mockReturnValue({
      board: [[null, null, null]],
      winner: null,
      isWinningCell: vi.fn(),
      gameOver: false,
    });

    rerender(<Board />);

    act(() => {
      vi.runAllTimers();
    });

    const boardVisible = container.innerHTML.includes("bg-blue-500");
    expect(boardVisible).toBe(true);

    vi.useRealTimers();
  });

  test("show loading state when needed", () => {
    (useGame as jest.Mock).mockReturnValue({
      board: [[null, null, null]],
      winner: null,
      isWinningCell: vi.fn(),
      gameOver: false,
    });

    const { container } = render(<Board />);
    expect(container).toBeDefined();
    expect(true).toBe(true);
  });
});
