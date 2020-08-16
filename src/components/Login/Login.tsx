import React, { useState } from "react";
import { useGameDispatch, useGameState } from "../../context/gameContext";
import "./Login.css";

const Login = () => {
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
    <div className={"login-container"}>
      {!!game.player.name ? (
        game.player.name
      ) : (
        <input onChange={handleChangeName} />
      )}
      <button onClick={handleLoginLogout}>
        {!!game.player.name ? "Logout" : "Login"}
      </button>
    </div>
  );
};

export default Login;
