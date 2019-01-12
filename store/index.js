import createPersistedState from "vuex-persistedstate";

export const state = () => ({});
export const mutations = {};
export const getters = {};
export const actions = {};

export const plugins = [
  createPersistedState({
    reducer: state => {
      delete state.content;
      return state;
    }
  })
];
