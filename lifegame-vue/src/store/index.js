import Vue from "vue";
import Vuex from "vuex";

import { calcNextGeneration } from "@/scripts/lifegame.js";
import { generateRandomState } from "@/scripts/tool.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cellsStateArray: [[]]
  },
  mutations: {
    initCellsState(state) {
      state.cellsStateArray = [...Array(100)].map(() =>
        [...Array(100)].map(() => generateRandomState())
      );
    },
    nextGeneration(state) {
      state.cellsStateArray = calcNextGeneration(state.cellsStateArray);
    }
  },
  actions: {},
  modules: {}
});
