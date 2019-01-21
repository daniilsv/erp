import { set, toggle } from "~/assets/utils";

export const state = () => ({
  drawer: true,
  fab: null,
  title: ""
});
export const mutations = {
  setDrawer: set("drawer"),
  toggleDrawer: toggle("drawer"),
  setTitle: set("title"),
  setFab: set("fab")
};
export const getters = {};
export const actions = {};
