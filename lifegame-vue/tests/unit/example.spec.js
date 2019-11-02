import { shallowMount, mount } from "@vue/test-utils";
import Cell from "@/components/Cell.vue";
import Board from "@/components/Board.vue";

describe("Cell.vue", () => {
  const factory = ({ props }) => {
    return shallowMount(Cell, {
      propsData: props
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
  let wrapper;
  beforeEach(() => {
    wrapper = mount(Board, {});
  });
  it("Cellを持っている", () => {
    expect(wrapper.contains(Cell)).toBe(true);
  });
  it("Boardのデフォルトの大きさは100x100", () => {
    const cellArray = wrapper.findAll(Cell);
    expect(cellArray).toHaveLength(100 * 100);
  });
});
