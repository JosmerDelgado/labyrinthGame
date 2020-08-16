import React from "react";
import { Solution } from "./solution";
import { Login } from "./components/Login";
import { levels } from "./constants/levels";
import { useGameState } from "./context/gameContext";

function App() {
  const game = useGameState();

  return (
    <div>
      <Login />
      <Solution {...levels[game.player.level]} cellSize={30} />
    </div>
  );
}

export default App;
