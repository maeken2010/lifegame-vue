import { shallowMount } from "@vue/test-utils";
import Cell from "@/components/Cell.vue";

describe("Cell.vue", () => {
  it("死んでいるときは生きているClassではない", () => {
    const state = false;
    const wrapper = shallowMount(Cell, {
      propsData: { state }
    });
    expect(wrapper.classes()).toContain("dead");
    expect(wrapper.classes()).not.toContain("alive");
  });
  it("生きているときは死んでいるClassではない", () => {
    const state = true;
    const wrapper = shallowMount(Cell, {
      propsData: { state }
    });
    expect(wrapper.classes()).toContain("alive");
    expect(wrapper.classes()).not.toContain("dead");
  });
});
