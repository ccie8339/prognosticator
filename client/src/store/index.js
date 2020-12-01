import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // eslint-disable-next-line
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6ImFjY2VzcyJ9.eyJpYXQiOjE2MDY1MDkzNzcsImV4cCI6MTYwOTEwMTM3NywiYXVkIjoiaHR0cHM6Ly95b3VyZG9tYWluLmNvbSIsImlzcyI6ImZlYXRoZXJzIiwic3ViIjoiYWIyMTlhYzAtNGVjMS00OWJmLWFhM2ItZTBhNTliOTQ1NTQ4IiwianRpIjoiNzFmNzE3OGYtOGU3OS00ZWRiLTgyMzUtMzg1ZDFjNjI1Yjk5In0.99j9w1yBHZg1FHi6FXwd56zCmk6ZXF3-Trspc1V29ng",
    gameID: "e561a143-3bd1-46ac-ae13-25ea68270a5a",
    authenticated: false,
    lastPlay: null,
    score: 0
  },
  mutations: {
    setAuthenticated(state) {
      state.authenticated = true;
    },
    updatePlay(state, playData) {
      state.lastPlay = {

        play : playData.play
      }
    }
  },
  actions: {
    SOCKET_connect({ commit }) {
      Vue.prototype.$socket.emit(
        "create",
        "authentication",
        {
          strategy: "local",
          email: "admin@local.com",
          password: "changeme"
        },
        function(error) {
          if (error) {
            console.log("Error Authenticating: ", error);
          } else {
            // console.log("Logged In", error, authResult);
            commit("setAuthenticated");
          }
        }
      );
    },
    "SOCKET_plays created"(state, data) {
      console.log("New Play Received: ", data.play);
    }
  },
  modules: {},
  getters: {
    isAuthenticated: state => state.authenticated,
    token: state => state.token,
    lastPlay: state => state.lastPlay
  }
});
