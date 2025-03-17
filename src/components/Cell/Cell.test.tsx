import React from "react";
import { render, cleanup } from "@testing-library/react";
import { Cell } from "../../components/Cell";
import { PLAYER_RED, PLAYER_YELLOW } from "../../utils/constants";
import { describe, test, expect, afterEach } from "vitest";

describe("Cell Component", () => {
  afterEach(() => {
    cleanup();
  });

  test("render an empty cell when value is null", () => {
    const { container } = render(<Cell value={null} />);
    expect(container).toBeDefined();
  });

  test("render a red token when value is red", () => {
    const { container } = render(<Cell value={PLAYER_RED} />);
    const hasRedElement = container.innerHTML.includes("red");
    expect(hasRedElement).toBe(true);
  });

  test("render a yellow token when value is yellow", () => {
    const { container } = render(<Cell value={PLAYER_YELLOW} />);
    const hasYellowElement = container.innerHTML.includes("yellow");
    expect(hasYellowElement).toBe(true);
  });
});
