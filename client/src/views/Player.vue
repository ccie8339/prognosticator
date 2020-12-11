<template>
  <v-container class="d-flex align-start mt-0 pa-1" justify="start" fill-height>
    <v-row v-if="currentGameStarted === true" class="d-flex">
      <v-col cols="3">
        <leader-board v-if="currentGame != null" />
      </v-col>
      <v-row fill-height>
        <v-col cols="12">
          <play-caster
            v-if="currentGame != null"
            :submitPlayCall="submitPlayCall"
            class="mx-auto"
          />
        </v-col>
      </v-row>
    </v-row>
    <v-row
      v-else-if="
        currentGame != undefined &&
        currentGame !== null &&
        currentGameStarted === false
      "
      class="fill-height align-center"
    >
      <v-col cols="12">
        <v-row class="mx-au justify-center">
          <game-lobby :currentGame="currentGame" />
        </v-row>
      </v-col>
    </v-row>
    <v-row class="mx-auto" v-else-if="currentGame === null" fill-height>
      <game-selector :setSelectedGame="setSelectedGame" />
    </v-row>
    <v-row v-else class="fill-height align-center">
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
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import GameSelector from "../components/GameSelector";
import GameLobby from "../components/GameLobby";
import PlayCaster from "../components/PlayCaster";
import LeaderBoard from "../components/LeaderBoard";
export default {
  data() {
    return {};
  },
  components: {
    GameSelector,
    GameLobby,
    PlayCaster,
    LeaderBoard,
  },
  methods: {
    ...mapActions({ setGameId: "setGameId" }),
    setSelectedGame(game) {
      this.setGameId(game);
    },
    submitPlayCall: (call) => {
      console.log(call);
    },
  },
  computed: {
    ...mapGetters({
      currentGame: "getCurrentGame",
      currentGameStarted: "getCurrentGameStarted",
    }),
  },
};
</script>
