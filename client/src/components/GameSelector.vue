<template>
  <v-card
    v-if="availableGames.length > 0"
    class="mx-auto GameSelector"
    max-width="300"
  >
    <v-card-title> Available Games </v-card-title>
    <v-list rounded>
      <v-list-item-group active-class="SelectedGame">
        <v-list-item
          v-for="(game, i) in availableGames"
          :key="i"
          @click="selectedGame = game.id"
        >
          <v-list-item-content>
            <v-list-item-title
              v-text="game.visitingteam + ' @ ' + game.hometeam"
            />
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
    <v-card-actions>
      <v-btn @click="chooseGame">SELECT</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  props: [],
  data() {
    return {
      selectedGame: null
    };
  },
  methods: {
    ...mapActions({ joinGame: "joinGame" }),
    chooseGame() {
      this.joinGame(this.selectedGame);
    }
  },
  computed: {
    ...mapGetters({ availableGames: "getAvailableGames" })
  },
  // created() {
  //   this.setAvailableGames();
  // }
};
</script>
<style scoped>
.SelectedGame {
  color: red;
}
.GameSelector {
  background-color: blue;
  color: white;
}
</style>
