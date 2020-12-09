<template>
  <v-container>
    <v-row>
      <v-col cols="6">
        <v-card class="gradient">
          <v-card-title class="flex-d justify-center">Play Caster</v-card-title>
          <v-spacer />
          <v-card-actions>
            <v-row>
              <v-col cols="6">
                <v-row>
                  <v-col cols="12">
                    <v-row justify="center">
                      <v-btn
                        medium
                        outlined
                        @click="
                          playCall.run = !playCall.run;
                          playCall.pass = false;
                        "
                        :color="
                          playCall.run ? 'football' : 'football lighten-4'
                        "
                        >RUN</v-btn
                      >
                    </v-row>
                  </v-col>
                  <v-col cols="4">
                    <v-row justify="center">
                      <v-btn
                      outlined
                        medium
                        @click="
                          playCall.left = !playCall.left;
                          playCall.middle = false;
                          playCall.right = false;
                        "
                        :color="
                          playCall.left ? 'football' : 'football lighten-4'
                        "
                        :disabled="!playCall.run"
                        >LEFT</v-btn
                      >
                    </v-row>
                  </v-col>
                  <v-col cols="4">
                    <v-row justify="center">
                      <v-btn
                      outlined
                        medium
                        @click="
                          playCall.middle = !playCall.middle;
                          playCall.left = false;
                          playCall.right = false;
                        "
                        :color="
                          playCall.middle ? 'football' : 'football lighten-4'
                        "
                        :disabled="!playCall.run"
                        >MIDDLE</v-btn
                      >
                    </v-row>
                  </v-col>
                  <v-col cols="4">
                    <v-row justify="center">
                      <v-btn
                      outlined
                        medium
                        @click="
                          playCall.right = !playCall.right;
                          playCall.left = false;
                          playCall.middle = false;
                        "
                        :color="
                          playCall.right ? 'football' : 'football lighten-4'
                        "
                        :disabled="!playCall.run"
                        >RIGHT</v-btn
                      >
                    </v-row>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="6">
                <v-row>
                  <v-col cols="12">
                    <v-row justify="center">
                      <v-btn
                        medium
                        @click="
                          playCall.pass = !playCall.pass;
                          playCall.run = false;
                        "
                        :color="
                          playCall.pass ? 'football' : 'football lighten-4'
                        "
                        >PASS</v-btn
                      >
                    </v-row>
                  </v-col>
                  <v-col cols="4">
                    <v-row justify="center">
                      <v-btn
                        medium
                        @click="
                          playCall.short = !playCall.short;
                          playCall.medium = false;
                          playCall.long = false;
                        "
                        :color="
                          playCall.short ? 'football' : 'football lighten-4'
                        "
                        :disabled="!playCall.pass"
                        >SHORT</v-btn
                      >
                    </v-row>
                  </v-col>
                  <v-col cols="4">
                    <v-row justify="center">
                      <v-btn
                        medium
                        @click="
                          playCall.medium = !playCall.medium;
                          playCall.short = false;
                          playCall.long = false;
                        "
                        :color="
                          playCall.medium ? 'football' : 'football lighten-4'
                        "
                        :disabled="!playCall.pass"
                        >MEDIUM</v-btn
                      >
                    </v-row>
                  </v-col>
                  <v-col cols="4">
                    <v-row justify="center">
                      <v-btn
                        medium
                        @click="
                          playCall.long = !playCall.long;
                          playCall.medium = false;
                          playCall.short = false;
                        "
                        :color="
                          playCall.long ? 'football' : 'football lighten-4'
                        "
                        :disabled="!playCall.pass"
                        >LONG</v-btn
                      >
                    </v-row>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12">
                <v-row justify="space-around">
                  <v-btn
                    large
                    @click="playCall.touchdown = !playCall.touchdown"
                    :color="
                      playCall.touchdown ? 'football' : 'football lighten-4'
                    "
                    >TOUCHDOWN</v-btn
                  >
                  <v-btn
                    large
                    @click="playCall.turnover = !playCall.turnover"
                    :color="
                      playCall.turnover ? 'football' : 'football lighten-4'
                    "
                    >TURNOVER</v-btn
                  >
                </v-row>
              </v-col>
              <v-col rows="12">
                <v-row justify="space-around">
                  <v-btn medium @click="submitPlay" color="football"
                    >CALL!</v-btn
                  >
                </v-row>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  props: ["submitPlayCall"],
  data() {
    return {
      playCall: {
        run: false,
        pass: false,
        left: false,
        middle: false,
        right: false,
        short: false,
        medium: false,
        long: false,
        touchdown: false,
        turnover: false,
      },
      defaultPlayCall: null,
    };
  },
  methods: {
    submitPlay() {
      let play = "";
      if (this.playCall.run) {
        play += "RU";
        if (this.playCall.left) {
          play += "LE";
        } else if (this.playCall.middle) {
          play += "MI";
        } else if (this.playCall.right) {
          play += "RI";
        }
      } else if (this.playCall.pass) {
        play += "PA";
        if (this.short) {
          play += "SH";
        } else if (this.playCall.medium) {
          play += "ME";
        } else if (this.playCall.long) {
          play += "LO";
        }
      }
      if (this.playCall.touchdown) {
        play += "TD";
      }
      if (this.playCall.turnover) {
        play += "TO";
      }
      this.submitPlayCall(play);
      this.playCall = { ...this.defaultPlayCall };
    },
  },
  created() {
    this.defaultPlayCall = { ...this.playCall };
  },
};
</script>
<style scoped>
/* button {
  width: 110px;
} */
.gradient {
  background: linear-gradient(#09da1a, #0a5010);
}
</style>