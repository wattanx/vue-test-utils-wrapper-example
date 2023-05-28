import { mountWrapper } from "./vue-test-utils-wrapper";
import Hello from "../components/Hello.vue";

test("mount component", async () => {
  expect(Hello).toBeTruthy();

  // @ts-ignore
  const wrapper = await mountWrapper(Hello, {
    props: {
      count: 4,
    },
  });

  expect(wrapper.text()).toContain("4 x 2 = 8");
  expect(wrapper.html()).toMatchSnapshot();

  await wrapper.get("button").trigger("click");

  expect(wrapper.text()).toContain("4 x 3 = 12");

  await wrapper.get("button").trigger("click");

  expect(wrapper.text()).toContain("4 x 4 = 16");
});
