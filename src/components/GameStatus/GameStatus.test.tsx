/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { describe, test, expect, beforeEach } from "vitest";
import { GameStatus } from "./GameStatus";
import { useGame } from "../../hooks";
import { PLAYER_RED, PLAYER_YELLOW } from "../../utils/constants";
import "@testing-library/jest-dom";

vi.mock("../../hooks", () => ({
  useGame: vi.fn(),
}));

describe("GameStatus Component", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  test("display current player turn when game is in progress", () => {
    (useGame as any).mockReturnValue({
      currentPlayer: PLAYER_RED,
      winner: null,
      gameOver: false,
    });

    render(<GameStatus />);

    expect(screen.getByText("Turn:")).toBeInTheDocument();

    expect(screen.getByText("red", { exact: false })).toBeInTheDocument();

    const tokenElement = screen.getByText("Turn:").nextElementSibling;
    expect(tokenElement).toHaveClass("bg-red-500");
  });

  test("display current player turn for yellow player", () => {
    (useGame as any).mockReturnValue({
      currentPlayer: PLAYER_YELLOW,
      winner: null,
      gameOver: false,
    });

    render(<GameStatus />);

    expect(screen.getByText("Turn:")).toBeInTheDocument();
    expect(screen.getByText("yellow", { exact: false })).toBeInTheDocument();

    const tokenElement = screen.getByText("Turn:").nextElementSibling;
    expect(tokenElement).toHaveClass("bg-yellow-400");
  });

  test("display winner when game is over with a winner", () => {
    (useGame as any).mockReturnValue({
      currentPlayer: PLAYER_YELLOW,
      winner: PLAYER_RED,
      gameOver: true,
    });

    render(<GameStatus />);

    expect(screen.getByText("Winner:")).toBeInTheDocument();
    expect(screen.getByText("red", { exact: false })).toBeInTheDocument();

    const tokenElement = screen.getByText("Winner:").nextElementSibling;
    expect(tokenElement).toHaveClass("bg-red-500");
  });

  test("shows draw message when game is over with no winner", () => {
    (useGame as any).mockReturnValue({
      currentPlayer: PLAYER_RED,
      winner: null,
      gameOver: true,
    });

    render(<GameStatus />);

    expect(screen.getByText("Draw!")).toBeInTheDocument();
    expect(screen.queryByText("Turn:")).not.toBeInTheDocument();
    expect(screen.queryByText("Winner:")).not.toBeInTheDocument();
  });
});
