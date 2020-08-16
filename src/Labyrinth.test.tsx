import React from "react";
import { render, fireEvent } from "@testing-library/react";

import { Labyrinth } from "./solution/Labyrinth";
import { Props } from "./solution/Labyrinth/Labyrinth";
import { GameProvider } from "./context/gameContext";

describe("Labyrinth", () => {
  let props: Props;
  beforeEach(() => {
    props = {
      level: "test",
      targetPosition: [4, 4],
      availableCells: [
        [1, 1, 1, 1, 1],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [1, 1, 1, 0, 0],
        [0, 0, 1, 1, 1],
      ],
      startingPosition: [0, 0],
      moveLimit: 10,
      cellSize: 30,
    };
  });

  it("should win", () => {
    const { container, getByTestId, queryByTestId } = render(
      <GameProvider>
        <Labyrinth {...props} />
      </GameProvider>
    );
    fireEvent.keyDown(container, { key: "ArrowRight" });
    fireEvent.keyDown(container, { key: "ArrowRight" });
    fireEvent.keyDown(container, { key: "ArrowDown" });
    fireEvent.keyDown(container, { key: "ArrowDown" });
    fireEvent.keyDown(container, { key: "ArrowDown" });
    fireEvent.keyDown(container, { key: "ArrowDown" });
    fireEvent.keyDown(container, { key: "ArrowRight" });
    fireEvent.keyDown(container, { key: "ArrowRight" });
    expect(getByTestId("moves-message").textContent).toEqual("moves left 2");
    expect(queryByTestId("win-message")).toBeTruthy();
    expect(queryByTestId("lose-message")).not.toBeTruthy();
  });

  it("should lose", () => {
    const { container, getByTestId, queryByTestId } = render(
      <GameProvider>
        <Labyrinth {...props} moveLimit={2} />
      </GameProvider>
    );
    fireEvent.keyDown(container, { key: "ArrowRight" });
    fireEvent.keyDown(container, { key: "ArrowRight" });
    fireEvent.keyDown(container, { key: "LeftRight" });
    expect(getByTestId("moves-message").textContent).toEqual("moves left 0");
    expect(queryByTestId("win-message")).not.toBeTruthy();
    expect(queryByTestId("lose-message")).toBeTruthy();
  });
});
