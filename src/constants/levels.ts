import { Position } from "../solution/Labyrinth/Labyrinth";

type Level = {
  targetPosition: Position;
  availableCells: (0 | 1)[][];
  startingPosition: Position;
  moveLimit?: number;
  cellSize?: number;
  shadow?: boolean;
  visibleCells?: number;
  level: string;
};

export const levels: Level[] = [
  {
    level: "First",
    targetPosition: [6, 9],
    availableCells: [
      [1, 1, 1, 1, 1, 0, 0, 1, 1, 1],
      [0, 0, 1, 0, 1, 1, 1, 1, 0, 0],
      [0, 0, 1, 0, 1, 0, 0, 1, 0, 0],
      [1, 1, 1, 0, 0, 0, 1, 1, 0, 0],
      [1, 0, 1, 0, 1, 0, 0, 1, 1, 1],
      [1, 0, 1, 1, 1, 0, 0, 1, 0, 1],
      [0, 0, 1, 0, 1, 0, 0, 1, 0, 1],
      [0, 0, 1, 0, 1, 1, 0, 1, 0, 0],
      [0, 0, 1, 0, 1, 0, 0, 1, 1, 1],
    ],
    startingPosition: [4, 4],
    moveLimit: 25,
  },
  {
    level: "The second",

    targetPosition: [8, 9],
    availableCells: [
      [1, 1, 1, 1, 1, 0, 0, 1, 1, 1],
      [0, 0, 1, 0, 1, 1, 1, 1, 0, 0],
      [0, 0, 1, 0, 1, 0, 0, 1, 0, 0],
      [1, 1, 1, 0, 0, 0, 1, 1, 0, 0],
      [1, 0, 1, 0, 1, 0, 0, 1, 1, 1],
      [1, 0, 1, 1, 1, 0, 0, 1, 0, 1],
      [0, 0, 1, 0, 1, 0, 0, 1, 0, 1],
      [0, 0, 1, 0, 1, 1, 0, 1, 0, 0],
      [0, 0, 1, 0, 1, 0, 0, 1, 1, 1],
    ],
    startingPosition: [4, 4],
    moveLimit: 25,
    shadow: true,
  },
  {
    level: "Third",

    targetPosition: [6, 9],
    availableCells: [
      [1, 1, 1, 1, 1, 0, 0, 1, 1, 1],
      [0, 0, 1, 0, 1, 1, 1, 1, 0, 0],
      [0, 0, 1, 0, 1, 0, 0, 1, 0, 0],
      [1, 1, 1, 0, 0, 0, 1, 1, 0, 0],
      [1, 0, 1, 0, 1, 0, 0, 1, 1, 1],
      [1, 0, 1, 1, 1, 0, 0, 1, 0, 1],
      [0, 0, 1, 0, 1, 0, 0, 1, 0, 1],
      [0, 0, 1, 0, 1, 1, 0, 1, 0, 0],
      [0, 0, 1, 0, 1, 0, 0, 1, 1, 1],
    ],
    startingPosition: [4, 4],
    moveLimit: 25,
    shadow: true,
  },
];
