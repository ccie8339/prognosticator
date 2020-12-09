<template>
  <v-container>
    <v-row>
      <v-col cols="4">
        <v-card>
          <v-card-title class="flex-d justify-center">SCOREBOARD</v-card-title>
          <v-card-text>
            <ul>
              <li
                v-for="score in getScoreBoard"
                :key="score.rank"
                style="list-style-type: none"
              >
                {{ score.name }} {{ score.score }}
              </li>
            </ul>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["getScoreBoard"])
  }
};
</script>
