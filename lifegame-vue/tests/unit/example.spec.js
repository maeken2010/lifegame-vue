import { shallowMount } from "@vue/test-utils";
import HelloWorld from "@/components/HelloWorld.vue";
import Cell from "@/components/Cell.vue";

describe("HelloWorld.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "new message";
    const wrapper = shallowMount(HelloWorld, {
      propsData: { msg }
    });
    expect(wrapper.text()).toMatch(msg);
  });
});

describe("Cell.vue", () => {
  it("死んでいるときは生きているClassではない", () => {
    const state = 0;
    const wrapper = shallowMount(Cell, {
      propsData: { state }
    });
    expect(wrapper.classes()).toContain("die");
    expect(wrapper.classes()).not.toContain("live");
  });
  it("生きているときは死んでいるClassではない", () => {
    const state = 1;
    const wrapper = shallowMount(Cell, {
      propsData: { state }
    });
    expect(wrapper.classes()).toContain("live");
    expect(wrapper.classes()).not.toContain("die");
  });
});
