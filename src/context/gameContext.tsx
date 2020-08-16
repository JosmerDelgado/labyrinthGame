import React from "react";
import { levels } from "../constants/levels";

export type Score = { name: string; score: number };
type Action =
  | {
      type: "addScoreboard";
      payload: { score: Score };
    }
  | { type: "createPlayer"; payload: { name: string } }
  | { type: "deletePlayer" }
  | { type: "levelUp" };
type Dispatch = (action: Action) => void;
type State = {
  player: { name: string | null; level: number };
  scoreboard: Score[][];
};
type GameProvider = { children: React.ReactNode };

const GameStateContext = React.createContext<State | undefined>(undefined);
const GameDispatchContext = React.createContext<Dispatch | undefined>(
  undefined
);
function gameReducer(state: State, action: Action) {
  switch (action.type) {
    case "addScoreboard": {
      const cloneState = [...state.scoreboard];
      const prevListscore = cloneState[state.player.level]
        ? cloneState[state.player.level]
        : [];
      const newScoreList = [...prevListscore, action.payload.score].sort(
        ({ score: scoreA }, { score: scoreB }) => scoreB - scoreA
      );
      cloneState[state.player.level] = newScoreList;

      return { ...state, scoreboard: cloneState };
    }
    case "createPlayer":
      return {
        ...state,
        player: { ...state.player, name: action.payload.name },
      };
    case "deletePlayer":
      return { ...state, player: { ...state.player, name: null } };
    case "levelUp":
      return {
        ...state,
        player: {
          ...state.player,
          level:
            levels.length > state.player.level + 1 ? state.player.level + 1 : 0,
        },
      };
    default:
      return state;
  }
}
function GameProvider({ children }: GameProvider) {
  const [state, dispatch] = React.useReducer(gameReducer, {
    scoreboard: [],
    player: { name: null, level: 0 },
  });
  return (
    <GameStateContext.Provider value={state}>
      <GameDispatchContext.Provider value={dispatch}>
        {children}
      </GameDispatchContext.Provider>
    </GameStateContext.Provider>
  );
}

function useGameState() {
  const context = React.useContext(GameStateContext);
  if (context === undefined) {
    throw new Error("useGameState must be used within a ScoreboradProvider");
  }
  return context;
}
function useGameDispatch() {
  const context = React.useContext(GameDispatchContext);
  if (context === undefined) {
    throw new Error("useGameDispatch must be used within a ScoreboradProvider");
  }
  return context;
}

export { GameProvider, useGameState, useGameDispatch };
