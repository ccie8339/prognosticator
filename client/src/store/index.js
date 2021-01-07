import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
// import router from "../router";
// import VueSocketIO from "vue-socket.io";

Vue.use(Vuex);

const getGames = async token => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
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
const joinGame = async (token, userId, gameId) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    },
  };
  const body = {
    gameId: gameId,
    userId: userId
  };
  try {
    const response = await axios.post(
      "http://192.168.1.110:3030/joinedgames",
      body,
      config,
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
const getJoinedGame = async (token, userId) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    },
  };
  let body = {
    userId: userId
  };
  try {
    let response = await axios.get(
      "http://192.168.1.110:3030/joinedgames",
      body,
      config,
    );
    if (response.data.total == 1) {
      const game = response.data.data[0];
      return game.gameId;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}

export default new Vuex.Store({
  state: {
    userId: null,
    logonId: null,
    password: null,
    // eslint-disable-next-line
    token: null,
    currentGame: null,
    currentGameStarted: false,
    socketAuthenticated: false,
    playId: null,
    playCall: null,
    score: 0,
    availableGames: [],
    scoreBoard: [
      {
        rank: 2,
        name: "John Doe",
        score: 350
      },
      {
        rank: 1,
        name: "John Smith",
        score: 750
      },
      {
        rank: 3,
        name: "Not Me",
        score: 225
      }
    ]
  },
  mutations: {
    setUserId(state, userId) {
      state.userId = userId;
    },
    setLogonId(state, logonId) {
      state.logonId = logonId;
    },
    setPassword(state, password) {
      state.password = password;
    },
    setToken(state, token) {
      state.token = token;
      state.authenticated = true;
    },
    setSocketAuthenticated(state) {
      state.socketAuthenticated = true;
    },
    setCurrentGame(state, gameId) {
      // setActiveGame(state.token, state.userId, gameId);
      state.currentGame = gameId;
    },
    setCurrentGameStarted(state, isGameStarted) {
      state.currentGameStarted = isGameStarted;
    },
    requestPlayCall(state, playId) {
      state.playId = playId;
      state.playCall = null;
    },
    setAvailableGames(state, games) {
      state.availableGames = [...games];
    }
  },
  actions: {
    async setAvailableGames({ state, commit }) {
      commit("setAvailableGames", []);
      const availableGames = await getGames(state.token);
      commit("setAvailableGames", availableGames);
    },
    setUserId({ commit }, userId) {
      commit("setUserId", userId);
    },
    setLogonId({ commit }, logonId) {
      commit("setLogonId", logonId);
    },
    setPassword({ commit }, password) {
      commit("setPassword", password);
    },
    setToken({ commit }, token) {
      commit("setToken", token);
    },
    async joinGame({state, commit}, gameId) {
      console.log("Joining Game", gameId);
      const response = await joinGame(state.token, state.userId, gameId);
      if (response !== null) {
        commit("setCurrentGame", response.gameId);
      }
      // console.log(response);
    },
    SOCKET_connect({ state, commit }) {
      if (state.logonId !== null && state.password !== null) {
        Vue.prototype.$socket.emit(
          "create",
          "authentication",
          {
            strategy: "local",
            email: state.logonId,
            password: state.password
          },
          async function (error) {
            if (error) {
              console.log("Error Authenticating: ", error);
            } else {
              commit("setSocketAuthenticated");
              const joinedGame = await getJoinedGame(state.token, state.userId);
              if (joinedGame !== null) {
                commit("setCurrentGame", joinedGame);
                state.availableGames.forEach(game => {
                  if (game.id === joinedGame) {
                    commit("setCurrentGameStarted", true);
                  }
                })
              }
            }
          }
        );
      } else {
        // router.push("/");
      }
    },
    "SOCKET_activegames created"({ commit }, data) {
      commit("setAvailableGames", []);
      commit("setAvailableGames", data.games);
    },
    "SOCKET_plays created"({ state, commit }, data) {
      switch (data.message) {
        case "REQUEST_PLAYCALL":
          if (data.gameId == state.gameId) {
            commit("requestPlayCall", data.playId);
          }
          break;
      }
    },
    "SOCKET_activegames patched"({state, commit}, data) {
      if (data.gameId === state.currentGame && data.started == true) {
        commit("setCurrentGameStarted", true);
      }
    },
    // setGameId({ commit }, gameId) {
    //   commit("setGameId", gameId);
    //   commit("setCurrentGameStarted", false);
    // },
    setGames({ commit }, games) {
      commit("setGames", games);
    }
  },
  modules: {},
  getters: {
    logonId: state => state.logonId,
    password: state => state.password,
    isAuthenticated: state => state.authenticated,
    token: state => state.token,
    playCall: state => state.playCall,
    getAvailableGames: state => state.availableGames,
    getPlayId: state => state.playId,
    getScoreBoard: state => state.scoreBoard,
    getCurrentGame: state => {
      let currentGame = null
      state.availableGames.map(game => {
        if (game.id === state.currentGame) {
          currentGame = game;
        }
      })
      return currentGame;
    },
    getCurrentGameStarted: state => state.currentGameStarted
  }
});
