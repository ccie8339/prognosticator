<template>
  <v-container>
    <v-row>
      <v-col cols="6">
        <score-board v-if="currentGame != null" />
      </v-col>
      <v-col cols="12">
        <play-caster
          v-if="currentGame != null"
          :submitPlayCall="submitPlayCall"
        />
        <game-selector v-else :setSelectedGame="setSelectedGame" />
      </v-col>
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
    submitPlayCall: call => {
      console.log(call);
    }
  },
  computed: {
    ...mapGetters({
      currentGame: "getCurrentGame"
    })
  }
};
</script>
