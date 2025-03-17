import { describe, test, expect } from "vitest";
import {
  createEmptyBoard,
  isColumnFull,
  isBoardFull,
  checkWinner,
} from "./gameUtils";
import { PLAYER_RED, PLAYER_YELLOW, EMPTY } from "./constants";

describe("createEmptyBoard", () => {
  test("should create a 6x7 empty board", () => {
    const board = createEmptyBoard();

    expect(board.length).toBe(6);
    expect(board[0].length).toBe(7);

    for (let row = 0; row < 6; row++) {
      for (let col = 0; col < 7; col++) {
        expect(board[row][col]).toBe(EMPTY);
      }
    }
  });
});

describe("isColumnFull", () => {
  test("should return false for an empty column", () => {
    const board = createEmptyBoard();
    expect(isColumnFull(board, 0)).toBe(false);
  });

  test("should return true for a full column", () => {
    const board = createEmptyBoard();
    for (let row = 5; row >= 0; row--) {
      board[row][0] = PLAYER_RED;
    }
    expect(isColumnFull(board, 0)).toBe(true);
  });

  test("should return false for a partially filled column", () => {
    const board = createEmptyBoard();
    board[5][0] = PLAYER_RED;
    board[4][0] = PLAYER_YELLOW;
    expect(isColumnFull(board, 0)).toBe(false);
  });
});

describe("isBoardFull", () => {
  test("should return false for an empty board", () => {
    const board = createEmptyBoard();
    expect(isBoardFull(board)).toBe(false);
  });

  test("should return true for a full board", () => {
    const board = createEmptyBoard();
    for (let row = 0; row < 6; row++) {
      for (let col = 0; col < 7; col++) {
        board[row][col] = row % 2 === 0 ? PLAYER_RED : PLAYER_YELLOW;
      }
    }
    expect(isBoardFull(board)).toBe(true);
  });

  test("should return false for a partially filled board", () => {
    const board = createEmptyBoard();
    board[5][0] = PLAYER_RED;
    board[5][1] = PLAYER_YELLOW;
    board[4][0] = PLAYER_RED;
    expect(isBoardFull(board)).toBe(false);
  });
});

describe("checkWinner", () => {
  test("should return null for an empty board", () => {
    const board = createEmptyBoard();
    expect(checkWinner(board, 0, 0)).toBe(null);
  });

  test("should detect horizontal win", () => {
    const board = createEmptyBoard();
    board[5][0] = PLAYER_RED;
    board[5][1] = PLAYER_RED;
    board[5][2] = PLAYER_RED;
    board[5][3] = PLAYER_RED;

    const result = checkWinner(board, 5, 3);
    expect(result).not.toBe(null);
    expect(result?.length).toBe(4);
    expect(result).toContainEqual([5, 0]);
    expect(result).toContainEqual([5, 1]);
    expect(result).toContainEqual([5, 2]);
    expect(result).toContainEqual([5, 3]);
  });

  test("should detect vertical win", () => {
    const board = createEmptyBoard();
    board[5][0] = PLAYER_YELLOW;
    board[4][0] = PLAYER_YELLOW;
    board[3][0] = PLAYER_YELLOW;
    board[2][0] = PLAYER_YELLOW;

    const result = checkWinner(board, 2, 0);
    expect(result).not.toBe(null);
    expect(result?.length).toBe(4);
    expect(result).toContainEqual([5, 0]);
    expect(result).toContainEqual([4, 0]);
    expect(result).toContainEqual([3, 0]);
    expect(result).toContainEqual([2, 0]);
  });

  test("should detect diagonal win (rising)", () => {
    const board = createEmptyBoard();
    board[5][0] = PLAYER_RED;
    board[4][1] = PLAYER_RED;
    board[3][2] = PLAYER_RED;
    board[2][3] = PLAYER_RED;

    const result = checkWinner(board, 2, 3);
    expect(result).not.toBe(null);
    expect(result?.length).toBe(4);
    expect(result).toContainEqual([5, 0]);
    expect(result).toContainEqual([4, 1]);
    expect(result).toContainEqual([3, 2]);
    expect(result).toContainEqual([2, 3]);
  });

  test("should detect diagonal win (falling)", () => {
    const board = createEmptyBoard();
    board[2][0] = PLAYER_YELLOW;
    board[3][1] = PLAYER_YELLOW;
    board[4][2] = PLAYER_YELLOW;
    board[5][3] = PLAYER_YELLOW;

    const result = checkWinner(board, 5, 3);
    expect(result).not.toBe(null);
    expect(result?.length).toBe(4);
    expect(result).toContainEqual([2, 0]);
    expect(result).toContainEqual([3, 1]);
    expect(result).toContainEqual([4, 2]);
    expect(result).toContainEqual([5, 3]);
  });

  test("should return null when no win is present", () => {
    const board = createEmptyBoard();
    board[5][0] = PLAYER_RED;
    board[5][1] = PLAYER_YELLOW;
    board[5][2] = PLAYER_RED;
    board[4][0] = PLAYER_YELLOW;
    board[4][1] = PLAYER_RED;

    expect(checkWinner(board, 4, 1)).toBe(null);
  });

  test("should detect win with more than 4 in a row", () => {
    const board = createEmptyBoard();
    board[5][0] = PLAYER_RED;
    board[5][1] = PLAYER_RED;
    board[5][2] = PLAYER_RED;
    board[5][3] = PLAYER_RED;
    board[5][4] = PLAYER_RED;

    const result = checkWinner(board, 5, 2);
    expect(result).not.toBe(null);
    expect(result?.length).toBe(4);
  });
});
