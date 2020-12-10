<template>
  <v-container class="d-flex align-start mt-0 pa-1" justify="start" fill-height>
    <v-row class="d-flex">
      <v-col cols="3">
        <score-board v-if="currentGame != null" />
      </v-col>
      <v-row fill-height>
        <v-col cols="12">
          <play-caster
            v-if="currentGame != null"
            :submitPlayCall="submitPlayCall"
            class="mx-auto"
          />
          <game-selector v-else :setSelectedGame="setSelectedGame" />
        </v-col>
      </v-row>
    </v-row>
  </v-container>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import GameSelector from "../components/GameSelector";
import PlayCaster from "../components/PlayCaster";
import ScoreBoard from "../components/ScoreBoard";
export default {
  components: {
    GameSelector,
    PlayCaster,
    ScoreBoard
  },
  methods: {
    ...mapActions({ setGameId: "setGameId" }),
    setSelectedGame(game) {
      this.setGameId(game);
      // console.log(game);
    },
    submitPlayCall: (call) => {
      console.log(call);
    },
  },
  computed: {
    ...mapGetters({
      currentGame: "getCurrentGame",
    }),
  },
};
</script>
