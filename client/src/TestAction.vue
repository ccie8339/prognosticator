<template>
  <v-app>
    <v-main>
      <p v-if="!isAuthenticated">Not Authenticated</p>
      <p v-else>Authenticated</p>
      <ul v-if="getGames.length > 0 && getPlayId === null">
        <li v-for="game in getGames" :key="game.id" @click="setGameId(game.id)">
          {{ game.visitingteam }} @ {{ game.hometeam }}
        </li>
      </ul>
      <div v-else-if="getPlayId !== null">
        <button @click="playCall.type = 'run'">Run</button>
        <button @click="playCall.type = 'pass'">Pass</button>
        <button
          @click="playCall.direction = 'left'"
          v-if="playCall.type == 'run'"
        >
          LEFT
        </button>
        <button
          @click="playCall.direction = 'middle'"
          v-if="playCall.type == 'run'"
        >
          MIDDLE
        </button>
        <button
          @click="playCall.direction = 'right'"
          v-if="playCall.type == 'run'"
        >
          RIGHT
        </button>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
const axios = require("axios");
export default {
  name: "App",
  components: {},
  data: () => ({
    playCall: {
      type: null,
      direction: null,
      depth: null,
      touchdown: false,
      turnover: false
    }
  }),
  methods: {
    ...mapActions({ setGames: "setGames", setGameId: "setGameId" }),
    setPlayType(type) {
      this.playCall.type = type;
    }
  },
  computed: {
    ...mapGetters({
      token: "token",
      isAuthenticated: "isAuthenticated",
      getGames: "getGames",
      getPlayId: "getPlayId"
    })
  },
  async mounted() {
    const config = {
      headers: {
        authorization: `Bearer ${this.token}`
      }
    };
    try {
      const response = await axios.get(
        "http://192.168.1.110:3030/activegames",
        config
      );
      this.setGames(response.data.data);
    } catch (Exception) {
      console.log("ERROR: ", Exception);
    }
  }
};
</script>
