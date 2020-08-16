import React, { useEffect, useState, useCallback, useMemo } from "react";
import "./Labyrinth.css";
import { Scoreboard } from "../../components/Scoreboard";
import { useGameDispatch, useGameState } from "../../context/scoreboardContext";

export type Position = [/** row */ number, /** col */ number];

export interface Props {
  targetPosition: Position;
  availableCells: (0 | 1)[][];
  startingPosition: Position;
  moveLimit?: number;
  cellSize?: number;
  shadow?: boolean;
  visibleCells?: number;
}

const keyPressedObject: {
  [key: string]: { addRow: number; addColumn: number } | undefined;
} = {
  ArrowDown: { addRow: 1, addColumn: 0 },
  ArrowLeft: { addRow: 0, addColumn: -1 },
  ArrowUp: { addRow: -1, addColumn: 0 },
  ArrowRight: { addRow: 0, addColumn: 1 },
};

const Labyrinth = ({
  targetPosition,
  availableCells,
  startingPosition,
  moveLimit,
  cellSize,
  shadow,
  visibleCells,
}: Props) => {
  const [currentPosition, setCurrentPosition] = useState(startingPosition);
  const [moves, setMoves] = useState(moveLimit);
  const [xTargetPosition, yTargetPosition] = targetPosition;
  const [xStartingPosition, yStartingPosition] = startingPosition;
  const gameDispatch = useGameDispatch();
  const gameState = useGameState();
  const gameOver = useMemo(
    () =>
      moves === 0 ||
      (currentPosition[0] === targetPosition[0] &&
        currentPosition[1] === targetPosition[1]),
    [currentPosition, moves, targetPosition]
  );
  const restartGame = () => {
    setCurrentPosition(startingPosition);
    setMoves(moveLimit);
  };
  const handleKeyPress = useCallback(
    (event: { key: string }) => {
      const keyPressed = keyPressedObject[event.key];
      if (keyPressed) {
        const row = currentPosition[0] + keyPressed.addRow;
        const column = currentPosition[1] + keyPressed.addColumn;

        if (
          !gameOver &&
          row >= 0 &&
          column >= 0 &&
          row <= availableCells.length - 1 &&
          column <= availableCells[row].length - 1 &&
          availableCells[row][column]
        ) {
          setMoves(moves - 1);
          setCurrentPosition([row, column]);
        }
      }
    },
    [availableCells, currentPosition, gameOver, moves]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress, false);
    return () => {
      document.removeEventListener("keydown", handleKeyPress, false);
    };
  }, [handleKeyPress]);

  useEffect(() => {
    if (
      currentPosition[0] === targetPosition[0] &&
      currentPosition[1] === targetPosition[1] &&
      gameOver
    ) {
      console.log("HELLO");
      gameDispatch({
        type: "addScoreboard",
        payload: {
          level: 0,
          score: { name: gameState.player.name || "UNKNOWN", score: moves },
        },
      });
    }
  }, [gameOver]);

  return (
    <div className={"container"}>
      <span>
        <table className={"labyrinth_table"}>
          <tbody>
            {availableCells.map((row, indexRow) => (
              <tr key={indexRow}>
                {row.map((item, index) => {
                  const isStartingPosition =
                    xStartingPosition === indexRow &&
                    yStartingPosition === index;
                  const isTargetPosition =
                    xTargetPosition === indexRow && yTargetPosition === index;
                  const isCurrentPosition =
                    currentPosition[0] === indexRow &&
                    currentPosition[1] === index;
                  const visiblePosition =
                    isTargetPosition ||
                    isCurrentPosition ||
                    (currentPosition[0] + 1 === indexRow &&
                      currentPosition[1] + 1 === index) ||
                    (currentPosition[0] - 1 === indexRow &&
                      currentPosition[1] - 1 === index) ||
                    (currentPosition[0] + 1 === indexRow &&
                      currentPosition[1] - 1 === index) ||
                    (currentPosition[0] - 1 === indexRow &&
                      currentPosition[1] + 1 === index) ||
                    (currentPosition[0] === indexRow &&
                      currentPosition[1] + 1 === index) ||
                    (currentPosition[0] === indexRow &&
                      currentPosition[1] - 1 === index) ||
                    (currentPosition[0] + 1 === indexRow &&
                      currentPosition[1] === index) ||
                    (currentPosition[0] - 1 === indexRow &&
                      currentPosition[1] === index);
                  return (
                    <td
                      key={index}
                      className={`cell ${
                        isStartingPosition ? "start-position" : ""
                      } ${
                        item
                          ? visiblePosition
                            ? ""
                            : "non-visible-position"
                          : visiblePosition
                          ? "wall"
                          : "non-visible-position"
                      } ${isTargetPosition ? "target-position" : ""}`}
                      data-testid="cell"
                    >
                      {isCurrentPosition && (
                        <>
                          <div
                            data-testid="position-ball"
                            className={"position-ball"}
                          />
                        </>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
        <div data-testid="moves-message" className={"moves-message"}>
          moves left {moves}
        </div>
        <div className={"game-over-container"}>
          {moves === 0 && <div data-testid="lose-message">You lose</div>}
          {currentPosition[0] === targetPosition[0] &&
            currentPosition[1] === targetPosition[1] && (
              <div data-testid="win-message">You won</div>
            )}
          {gameOver && <button onClick={restartGame}>Restart</button>}
        </div>
        <Scoreboard />
      </span>
    </div>
  );
};

export default Labyrinth;
