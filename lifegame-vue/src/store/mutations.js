import { calcNextGeneration } from "@/scripts/lifegame.js";
import { generateRandomState } from "@/scripts/tool.js";

export default {
  initCellsState(state) {
    state.cellsStateArray = [...Array(100)].map(() =>
      [...Array(100)].map(() => generateRandomState())
    );
  },
  nextGeneration(state) {
    state.cellsStateArray = calcNextGeneration(state.cellsStateArray);
  },
  changeCell(state, { n, m }) {
    let newState = state.cellsStateArray.slice();
    newState[n][m] = !state.cellsStateArray[n][m];
    state.cellsStateArray = newState;
  }
};
