import Vuex from "vuex";
import { shallowMount, mount, createLocalVue } from "@vue/test-utils";

import Cell from "@/components/Cell.vue";
import Board from "@/components/Board.vue";

import mutations from "@/store/mutations";
import state from "@/store/state";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("Cell.vue", () => {
  let store;
  beforeEach(() => {
    store = new Vuex.Store({
      state,
      mutations
    });
  });
  const factory = ({ props }) => {
    return shallowMount(Cell, {
      propsData: props,
      store,
      localVue
    });
  };

  it("死んでいるときは生きているClassではない", () => {
    const state = false;
    const wrapper = factory({ props: { state } });
    expect(wrapper.classes()).toContain("dead");
    expect(wrapper.classes()).not.toContain("alive");
  });
  it("生きているときは死んでいるClassではない", () => {
    const state = true;
    const wrapper = factory({ props: { state } });
    expect(wrapper.classes()).toContain("alive");
    expect(wrapper.classes()).not.toContain("dead");
  });
});

describe("Board.vue", () => {
  let store;
  let wrapper;
  beforeEach(() => {
    store = new Vuex.Store({
      state,
      mutations
    });
    wrapper = mount(Board, { store, localVue });
  });
  it("Cellを持っている", () => {
    expect(wrapper.contains(Cell)).toBe(true);
  });
  it("Boardのデフォルトの大きさは100x100", () => {
    const cellArray = wrapper.findAll(Cell);
    expect(cellArray).toHaveLength(100 * 100);
  });
  it("Cellは押すと色が反転する", () => {
    store = new Vuex.Store({
      state,
      mutations: {
        ...mutations,
        initCellsState(state) {
          state.cellsStateArray = [[false]];
        }
      }
    });
    wrapper = mount(Board, {
      store,
      localVue
    });
    console.log(wrapper);
    const wrappedCellComponent = wrapper.find(Cell);
    wrappedCellComponent.trigger("click");
    expect(wrappedCellComponent.classes()).toContain("alive");
    wrappedCellComponent.trigger("click");
    expect(wrappedCellComponent.classes()).toContain("dead");
  });
  describe("generation buttonについて", () => {
    it("generation buttonを持っている", () => {
      expect(wrapper.contains("button.generation")).toBe(true);
    });
    const stateTest = (testStates, expectState) => {
      store = new Vuex.Store({
        state,
        mutations: {
          initCellsState(state) {
            state.cellsStateArray = testStates;
          },
          nextGeneration: mutations.nextGeneration
        }
      });
      wrapper = mount(Board, {
        store,
        localVue
      });

      wrapper.find("button.generation").trigger("click");
      expect(store.state.cellsStateArray[1][1]).toBe(expectState);
    };
    describe("generation buttonを押したら世代が進む", () => {
      it("過密は死", () => {
        const dieStates = [
          [true, true, true],
          [true, true, false],
          [false, false, false]
        ];
        stateTest(dieStates, false);
      });
      it("誕生は生", () => {
        const liveStates = [
          [true, true, false],
          [true, false, false],
          [false, false, false]
        ];
        stateTest(liveStates, true);
        const liveStates2 = [
          [true, true, false],
          [false, false, false],
          [false, false, false]
        ];
        stateTest(liveStates2, false);
      });
      it("生存は生", () => {
        const liveStates = [
          [true, false, false],
          [true, true, false],
          [false, false, false]
        ];
        stateTest(liveStates, true);
      });
      it("過疎は死", () => {
        const liveStates = [
          [false, false, false],
          [true, true, false],
          [false, false, false]
        ];
        stateTest(liveStates, false);
      });
    });
  });
});
