import React, { useEffect, useState, useCallback, useMemo } from "react";
import "./Labyrinth.css";
import { Scoreboard } from "../../components/Scoreboard";
import { useGameDispatch, useGameState } from "../../context/gameContext";
import LabyrinthCell from "./LabyrinthCell";

export type Position = [/** row */ number, /** col */ number];

export interface Props {
  targetPosition: Position;
  availableCells: (0 | 1)[][];
  startingPosition: Position;
  level: string;
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
  level,
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
  const restartGame = () => {
    setCurrentPosition(startingPosition);
    setMoves(moveLimit);
  };
  useEffect(() => {
    restartGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [level]);
  const gameOver = useMemo(
    () =>
      moves === 0 ||
      (currentPosition[0] === targetPosition[0] &&
        currentPosition[1] === targetPosition[1]),
    [currentPosition, moves, targetPosition]
  );

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
      gameDispatch({
        type: "addScoreboard",
        payload: {
          score: { name: gameState.player.name || "UNKNOWN", score: moves },
        },
      });
      gameDispatch({ type: "levelUp" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameOver, currentPosition]);

  return (
    <div className={"container"}>
      <span>
        <h1> School Labrynth</h1>
        <h3>{`Level: ${level}`}</h3>
        <table className={"labyrinth_table"}>
          <tbody>
            {availableCells.map((row, indexRow) => (
              <tr key={indexRow}>
                {row.map((item, indexColumn) => {
                  const isStartingPosition =
                    xStartingPosition === indexRow &&
                    yStartingPosition === indexColumn;
                  const isTargetPosition =
                    xTargetPosition === indexRow &&
                    yTargetPosition === indexColumn;
                  return (
                    <LabyrinthCell
                      key={`${indexRow}${indexColumn}`}
                      indexRow={indexRow}
                      indexColumn={indexColumn}
                      currentPosition={currentPosition}
                      item={item}
                      isStartingPosition={isStartingPosition}
                      isTargetPosition={isTargetPosition}
                      shadow={shadow}
                    />
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
          {moves === 0 &&
            currentPosition[0] !== targetPosition[0] &&
            currentPosition[1] !== targetPosition[1] && (
              <div data-testid="lose-message" className={"lose-text"}>
                You lose
              </div>
            )}
          {currentPosition[0] === targetPosition[0] &&
            currentPosition[1] === targetPosition[1] && (
              <div data-testid="win-message" className={"win-text"}>
                You won
              </div>
            )}
          {gameOver && <button onClick={restartGame}>Restart</button>}
        </div>
        <Scoreboard />
      </span>
    </div>
  );
};

export default Labyrinth;
