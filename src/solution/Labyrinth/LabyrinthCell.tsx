import React, { FC } from "react";

interface LabyrinthCellProps {
  indexRow: number;
  indexColumn: number;
  currentPosition: [number, number];
  item: 0 | 1;
  isStartingPosition: boolean;
  isTargetPosition: boolean;
  shadow: boolean;
}

const LabyrinthCell: FC<LabyrinthCellProps> = ({
  indexRow,
  indexColumn,
  currentPosition,
  item,
  isStartingPosition,
  isTargetPosition,
  shadow,
}) => {
  const isCurrentPosition =
    currentPosition[0] === indexRow && currentPosition[1] === indexColumn;
  const visiblePosition =
    isTargetPosition ||
    isCurrentPosition ||
    (currentPosition[0] + 1 === indexRow &&
      currentPosition[1] + 1 === indexColumn) ||
    (currentPosition[0] - 1 === indexRow &&
      currentPosition[1] - 1 === indexColumn) ||
    (currentPosition[0] + 1 === indexRow &&
      currentPosition[1] - 1 === indexColumn) ||
    (currentPosition[0] - 1 === indexRow &&
      currentPosition[1] + 1 === indexColumn) ||
    (currentPosition[0] === indexRow &&
      currentPosition[1] + 1 === indexColumn) ||
    (currentPosition[0] === indexRow &&
      currentPosition[1] - 1 === indexColumn) ||
    (currentPosition[0] + 1 === indexRow &&
      currentPosition[1] === indexColumn) ||
    (currentPosition[0] - 1 === indexRow && currentPosition[1] === indexColumn);
  return (
    <td
      className={`cell ${isStartingPosition ? "start-position" : ""} ${
        isTargetPosition ? "target-position" : ""
      } ${
        item
          ? shadow
            ? visiblePosition
              ? "path"
              : "non-visible-position"
            : "path"
          : shadow
          ? visiblePosition
            ? "wall"
            : "non-visible-position"
          : "wall"
      } `}
      data-testid="cell"
    >
      {isCurrentPosition && (
        <>
          <div data-testid="position-ball" className={"position-ball"} />
        </>
      )}
    </td>
  );
};

export default LabyrinthCell;
