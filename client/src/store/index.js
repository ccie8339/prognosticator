import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

const getGames = async token => {
  const config = {
    headers: {
      authorization: `Bearer ${token}`
    }
  };
  try {
    const response = await axios.get(
      "http://192.168.1.110:3030/activegames",
      config
    );
    return response.data.data;
  } catch (Exception) {
    console.log(Exception);
  }
};

export default new Vuex.Store({
  state: {
    // eslint-disable-next-line
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6ImFjY2VzcyJ9.eyJpYXQiOjE2MDY4NTQ1OTIsImV4cCI6MTYwOTQ0NjU5MiwiYXVkIjoiaHR0cHM6Ly95b3VyZG9tYWluLmNvbSIsImlzcyI6IlByb2dub3N0aWNhdG9yIFRoZSBHYW1lIiwic3ViIjoiZjNjZDNjZDctZmE2Mi00Y2Y4LTk3YjUtY2RlZmMwMmU1ZmI3IiwianRpIjoiM2U2MTI5NmEtOTAxMi00NDRmLWJhODYtMDNlMjg2M2I1ZjNmIn0.79n909Q3bPnQrkT_ScD9O4yLheSeqAW9-xU_NsuE_5I",
    gameId: null,
    authenticated: false,
    playId: null,
    playCall: null,
    score: 0,
    games: []
  },
  mutations: {
    setAuthenticated(state) {
      state.authenticated = true;
    },
    setGameId(state, gameId) {
      state.gameId = gameId;
    },
    requestPlayCall(state, playId) {
      state.playId = playId;
      state.playCall = null;
    },
    setGames(state, games) {
      state.games = [...games];
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
    "SOCKET_plays created"({ state, commit }, data) {
      switch (data.message) {
        case "REQUEST_PLAYCALL":
          if (data.gameId == state.gameId) {
            commit("requestPlayCall", data.playId);
          }
          break;
        case "NEW_GAME_AVAILABLE": {
          const newGames = getGames(state.token);
          commit("setGames", newGames);
          break;
        }
      }
    },
    setGameId({ commit }, gameId) {
      commit("setGameId", gameId);
    },
    setGames({ commit }, games) {
      commit("setGames", games);
    }
  },
  modules: {},
  getters: {
    isAuthenticated: state => state.authenticated,
    token: state => state.token,
    playCall: state => state.playCall,
    getGames: state => state.games,
    getPlayId: state => state.playId
  }
});
