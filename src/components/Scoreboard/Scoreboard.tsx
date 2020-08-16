import React, { FC } from "react";
import "./Scoreboard.css";
import { useGameState } from "../../context/scoreboardContext";
import ScoreboardItem from "./ScoreboardItem";

const Scoreboard: FC = () => {
  const scoreboard = useGameState();
  return (
    <div>
      <h5>Scoreboard</h5>
      {!!scoreboard.scoreboard[0] &&
        scoreboard.scoreboard[0].map((score, index) => (
          <ScoreboardItem score={score} index={index + 1} />
        ))}
    </div>
  );
};

export default Scoreboard;
