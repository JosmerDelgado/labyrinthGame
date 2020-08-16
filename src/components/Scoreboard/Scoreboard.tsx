import React, { FC } from "react";
import "./Scoreboard.css";
import { useGameState } from "../../context/gameContext";
import ScoreboardItem from "./ScoreboardItem";

const Scoreboard: FC = () => {
  const game = useGameState();
  return (
    <div>
      <h5>Scoreboard</h5>
      {!!game.scoreboard[game.player.level] &&
        game.scoreboard[game.player.level].map((score, index) => (
          <ScoreboardItem score={score} index={index + 1} />
        ))}
    </div>
  );
};

export default Scoreboard;
