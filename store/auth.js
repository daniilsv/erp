export const state = () => ({
  userAuthToken: null,
  user: null
});

export const mutations = {
  authenticate(state, token) {
    state.userAuthToken = token;
  },
  setUser(state, user) {
    state.user = user;
  },
  logout(state) {
    state.userAuthToken = null;
  }
};
export const getters = {
  isAuthenticated(state) {
    return state.userAuthToken !== null;
  }
};
export const actions = {
  register({ commit }, { socket, user }) {
    return new Promise(function(success, reject) {
      socket.emit("auth.register", user, function(response) {
        console.log(response);
        if (response.error !== undefined) return reject(response.error);
        commit("authenticate", { token: response.success });
        router.replace({ path: "/" });
      });
    });
  },
  login({ commit }, { socket, user }) {
    return new Promise(function(success, reject) {
      socket.emit("auth.login", user, function(response) {
        if (response.error !== undefined) return reject(response.error);
        commit("authenticate", response.success.token);
        commit("setUser", response.success.user);
        success();
      });
    });
  },
  logout({ commit, state }, { socket }) {
    return new Promise(function(success, reject) {
      socket.emit("auth.logout", { token: state.userAuthToken });
      commit("logout");
      success();
    });
  }
};
