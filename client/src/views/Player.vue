<template>
  <v-container>
    <v-row>
      <v-col cols="6">
        <score-board />
      </v-col>
      <v-col cols="12">
        <play-caster :submitPlayCall="submitPlayCall" />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import PlayCaster from "../components/PlayCaster";
import ScoreBoard from "../components/ScoreBoard";
export default {
  components: {
    PlayCaster,
    ScoreBoard,
  },
  methods: {
    submitPlayCall: (call) => {
      console.log(call);
    },
  },
};
</script>