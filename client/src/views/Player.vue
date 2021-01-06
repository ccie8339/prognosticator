<template>
  <v-row class="fill-height">
    <v-container
      v-if="currentGameStarted == true"
      class="d-flex align-start mt-0 pa-1"
      justify="start"
      fill-height
    >
      <v-row>
        <v-col cols="3">
          <leader-board />
        </v-col>
        <v-row fill-height>
          <v-col cols="12">
            <score-board />
            <play-caster :submitPlayCall="submitPlayCall" class="mx-auto" />
          </v-col>
        </v-row>
      </v-row>
    </v-container>
    <v-container
      v-else-if="
        currentGame != undefined &&
        currentGame !== null &&
        currentGameStarted === false
      "
    >
      <v-row class="fill-height align-center">
        <v-col cols="12">
          <v-row class="mx-au justify-center">
            <game-lobby :currentGame="currentGame" />
          </v-row>
        </v-col>
      </v-row>
    </v-container>
    <v-container v-else-if="currentGame === null">
      <v-row class="mx-auto" fill-height>
        <game-selector :setSelectedGame="setSelectedGame" />
      </v-row>
    </v-container>
    <v-container v-else class="fill-height align-center">
      <v-row>
        <v-col cols="12">
          <v-row class="mx-auto justify-center" fluid>
            <v-progress-circular
              size="200"
              width="20"
              color="primary"
              indeterminate
            />
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-row>
</template>
<script>
import Vue from "vue";
import store from "../store";
import { mapGetters, mapActions } from "vuex";
import VueSocketIO from "vue-socket.io";
import GameSelector from "../components/GameSelector";
import GameLobby from "../components/GameLobby";
import PlayCaster from "../components/PlayCaster";
import LeaderBoard from "../components/LeaderBoard";
import ScoreBoard from "../components/ScoreBoard";


export default {
  data() {
    return {};
  },
  components: {
    GameSelector,
    GameLobby,
    PlayCaster,
    LeaderBoard,
    ScoreBoard,
  },
  methods: {
    ...mapActions({
      setGameId: "setGameId",
      setAvailableGames: "setAvailableGames",
      setUserId: "setUserId",
      setToken: "setToken",
    }),
    setSelectedGame(game) {
      this.setGameId(game);
    },
    submitPlayCall: (call) => {
      console.log(call);
    },
  },
  computed: {
    ...mapGetters({
      logonId: "logonId",
      password: "password",
      currentGame: "getCurrentGame",
      currentGameStarted: "getCurrentGameStarted",
    }),
  },
  mounted() {
    Vue.use(
      new VueSocketIO({
        debug: true,
        connection: "http://192.168.1.110:3030", //options object is Optional
        vuex: {
          store,
          actionPrefix: "SOCKET_",
          // mutationPrefix: "SOCKET_",
        },
      })
    );
    const token = localStorage.token;
    const userId = localStorage.userId;
    if (token != null && userId != null) {
      this.setUserId(userId);
      this.setToken(token);
      this.setAvailableGames();
    }
  },
};
</script>
