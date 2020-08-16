import React from "react";

export type Score = { name: string; score: number };
type Action =
  | {
      type: "addScoreboard";
      payload: { level: number; score: Score };
    }
  | { type: "createPlayer"; payload: { name: string } }
  | { type: "deletePlayer" };
type Dispatch = (action: Action) => void;
type State = { player: { name: string | null }; scoreboard: Score[][] };
type ScoreboardProvider = { children: React.ReactNode };

const ScoreboardStateContext = React.createContext<State | undefined>(
  undefined
);
const ScoreboardDispatchContext = React.createContext<Dispatch | undefined>(
  undefined
);
function scoreboardReducer(state: State, action: Action) {
  switch (action.type) {
    case "addScoreboard": {
      const cloneState = [...state.scoreboard];
      const prevListscore = cloneState[action.payload.level]
        ? cloneState[action.payload.level]
        : [];
      const newScoreList = [...prevListscore, action.payload.score].sort(
        ({ score: scoreA }, { score: scoreB }) => scoreB - scoreA
      );
      cloneState[action.payload.level] = newScoreList;

      return { ...state, scoreboard: cloneState };
    }
    case "createPlayer":
      return { ...state, player: { name: action.payload.name } };
    case "deletePlayer":
      return { ...state, player: { name: null } };
    default:
      return state;
  }
}
function ScoreboardProvider({ children }: ScoreboardProvider) {
  const [state, dispatch] = React.useReducer(scoreboardReducer, {
    scoreboard: [],
    player: { name: null },
  });
  return (
    <ScoreboardStateContext.Provider value={state}>
      <ScoreboardDispatchContext.Provider value={dispatch}>
        {children}
      </ScoreboardDispatchContext.Provider>
    </ScoreboardStateContext.Provider>
  );
}

function useGameState() {
  const context = React.useContext(ScoreboardStateContext);
  if (context === undefined) {
    throw new Error("useGameState must be used within a ScoreboradProvider");
  }
  return context;
}
function useGameDispatch() {
  const context = React.useContext(ScoreboardDispatchContext);
  if (context === undefined) {
    throw new Error("useGameDispatch must be used within a ScoreboradProvider");
  }
  return context;
}

export { ScoreboardProvider, useGameState, useGameDispatch };
