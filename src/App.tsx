import React, { useState } from "react";
import { Solution } from "./solution";
import { useGameDispatch, useGameState } from "./context/scoreboardContext";

function App() {
  const [name, setName] = useState("");
  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const scoreboardDispatch = useGameDispatch();
  const game = useGameState();

  const handleLoginLogout = () => {
    if (!!game.player.name) {
      scoreboardDispatch({ type: "deletePlayer" });
    } else {
      scoreboardDispatch({ type: "createPlayer", payload: { name } });
    }
  };
  return (
    <div>
      {!!game.player.name ? (
        game.player.name
      ) : (
        <input onChange={handleChangeName} />
      )}
      <button onClick={handleLoginLogout}>
        {!!game.player.name ? "Logout" : "Login"}
      </button>
      <Solution
        targetPosition={[6, 9]}
        availableCells={[
          [1, 1, 1, 1, 1, 0, 0, 1, 1, 1],
          [0, 0, 1, 0, 1, 1, 1, 1, 0, 0],
          [0, 0, 1, 0, 1, 0, 0, 1, 0, 0],
          [1, 1, 1, 0, 0, 0, 1, 1, 0, 0],
          [1, 0, 1, 0, 1, 0, 0, 1, 1, 1],
          [1, 0, 1, 1, 1, 0, 0, 1, 0, 1],
          [0, 0, 1, 0, 1, 0, 0, 1, 0, 1],
          [0, 0, 1, 0, 1, 1, 0, 1, 0, 0],
          [0, 0, 1, 0, 1, 0, 0, 1, 1, 1],
        ]}
        startingPosition={[4, 4]}
        moveLimit={25}
        cellSize={30}
      />
    </div>
  );
}

export default App;
