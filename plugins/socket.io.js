import Vue from "vue";
import io from "socket.io-client";
import VueSocketIO from "vue-socket.io-extended";

let socket;
export default ({ store }) => {
  return new Promise(function(success, reject) {
    if (socket === undefined && process.browser) {
      socket = io("http://localhost:11011", {
        transports: ["websocket"]
      });
      let timer = setTimeout(function() {
        success({ error: true });
        console.log("cancelled");
      }, 2000);
      socket.on("connect", function() {
        if (store.getters["auth/isAuthenticated"]) {
          clearTimeout(timer);
          socket.emit(
            "auth.token",
            { token: store.state.auth.userAuthToken },
            function(_) {
              if (_.error !== undefined) success({ error: _.error });
              if (_.success !== undefined) {
                store.commit("auth/setUser", _.success);
                success({ error: false });
              }
            }
          );
        }
      });

      Vue.use(VueSocketIO, socket, { store });
    }
  });
};
