export const state = () => ({
  count: 0,
});

export const mutations = {
  increment(state: { count: number }) {
    state.count++;
  },
};
