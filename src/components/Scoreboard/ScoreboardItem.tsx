import React, { FC } from "react";
import { Score } from "../../context/gameContext";

interface ScoreboardItemProps {
  index: number;
  score: Score;
}

const ScoreboardItem: FC<ScoreboardItemProps> = ({ score, index }) => {
  return (
    <div>
      <span className={"cell-scores"}>
        <span>
          {index}.- {score.name}
        </span>
        <span>{score.score}</span>
      </span>
    </div>
  );
};

export default ScoreboardItem;
