import { mountWrapper } from "./vue-test-utils-wrapper";
import Vuex from "vuex";
import Index from "../pages/index.vue";

const store = new Vuex.Store({
  modules: {
    counter: {
      namespaced: true,
      state: {
        count: 0,
      },
      mutations: {
        increment(state: { count: number }) {
          state.count++;
        },
      },
    },
  },
});

test("mount component", async () => {
  expect(Index).toBeTruthy();

  const wrapper = await mountWrapper(Index, {
    globals: {
      plugins: [store],
      mocks: {
        $store: store,
      },
    },
  });

  expect(wrapper.text()).toContain("0");

  await wrapper.get("button").trigger("click");

  expect(wrapper.text()).toContain("1");
});
