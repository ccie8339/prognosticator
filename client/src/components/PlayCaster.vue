<template>
  <v-container class="mx-auto">
    <v-row justify="center">
      <v-col cols="6">
        <v-card class="primary" shaped>
          <v-card-title
            class="flex-d justify-center white--text text-xl-h4 font-weight-bold"
            >Play Caster</v-card-title
          >
          <v-spacer />
          <v-card-actions>
            <v-row>
              <v-col cols="6">
                <v-row>
                  <v-col cols="12">
                    <v-row justify="center">
                      <v-btn
                        :text="!playCall.run"
                        medium
                        :class="
                          playCall.run ? buttonSelectedClass : buttonClass
                        "
                        :outlined="!playCall.run"
                        @click="
                          playCall.run = !playCall.run;
                          playCall.pass = false;
                        "
                        >RUN</v-btn
                      >
                    </v-row>
                  </v-col>
                  <v-col cols="4">
                    <v-row justify="center">
                      <v-btn
                        :text="!playCall.left"
                        medium
                        :class="
                          playCall.left ? buttonSelectedClass : buttonClass
                        "
                        :outlined="!playCall.left"
                        @click="
                          playCall.left = !playCall.left;
                          playCall.middle = false;
                          playCall.right = false;
                        "
                        :disabled="!playCall.run"
                        >LEFT</v-btn
                      >
                    </v-row>
                  </v-col>
                  <v-col cols="4">
                    <v-row justify="center">
                      <v-btn
                        :text="!playCall.middle"
                        medium
                        :class="
                          playCall.middle ? buttonSelectedClass : buttonClass
                        "
                        :outlined="!playCall.middle"
                        @click="
                          playCall.middle = !playCall.middle;
                          playCall.left = false;
                          playCall.right = false;
                        "
                        :disabled="!playCall.run"
                        >MIDDLE</v-btn
                      >
                    </v-row>
                  </v-col>
                  <v-col cols="4">
                    <v-row justify="center">
                      <v-btn
                        :text="!playCall.right"
                        medium
                        :class="
                          playCall.right ? buttonSelectedClass : buttonClass
                        "
                        :outlined="!playCall.right"
                        @click="
                          playCall.right = !playCall.right;
                          playCall.left = false;
                          playCall.middle = false;
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
                        :text="!playCall.pass"
                        medium
                        :class="
                          playCall.pass ? buttonSelectedClass : buttonClass
                        "
                        :outlined="!playCall.pass"
                        @click="
                          playCall.pass = !playCall.pass;
                          playCall.run = false;
                        "
                        >PASS</v-btn
                      >
                    </v-row>
                  </v-col>
                  <v-col cols="4">
                    <v-row justify="center">
                      <v-btn
                        :text="!playCall.short"
                        medium
                        :class="
                          playCall.short ? buttonSelectedClass : buttonClass
                        "
                        :outlined="!playCall.short"
                        @click="
                          playCall.short = !playCall.short;
                          playCall.medium = false;
                          playCall.long = false;
                        "
                        :disabled="!playCall.pass"
                        >SHORT</v-btn
                      >
                    </v-row>
                  </v-col>
                  <v-col cols="4">
                    <v-row justify="center">
                      <v-btn
                        :text="!playCall.medium"
                        medium
                        :class="
                          playCall.medium ? buttonSelectedClass : buttonClass
                        "
                        :outlined="!playCall.medium"
                        @click="
                          playCall.medium = !playCall.medium;
                          playCall.short = false;
                          playCall.long = false;
                        "
                        :disabled="!playCall.pass"
                        >MEDIUM</v-btn
                      >
                    </v-row>
                  </v-col>
                  <v-col cols="4">
                    <v-row justify="center">
                      <v-btn
                        :text="!playCall.long"
                        medium
                        :class="
                          playCall.long ? buttonSelectedClass : buttonClass
                        "
                        :outlined="!playCall.long"
                        @click="
                          playCall.long = !playCall.long;
                          playCall.medium = false;
                          playCall.short = false;
                        "
                        :disabled="!playCall.pass"
                        >LONG</v-btn
                      >
                    </v-row>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12">
                <v-row>
                  <v-col cols="6">
                    <v-row justify="center">
                      <v-btn
                        :text="!playCall.touchdown"
                        large
                        :class="
                          playCall.touchdown ? buttonSelectedClass : buttonClass
                        "
                        :outlined="!playCall.touchdown"
                        @click="playCall.touchdown = !playCall.touchdown"
                        >TOUCHDOWN</v-btn
                      >
                    </v-row>
                  </v-col>
                  <v-col cols="6">
                    <v-row justify="center">
                      <v-btn
                        :text="!playCall.turnover"
                        :class="
                          playCall.turnover ? buttonSelectedClass : buttonClass
                        "
                        :outlined="!playCall.turnover"
                        large
                        @click="playCall.turnover = !playCall.turnover"
                        >TURNOVER</v-btn
                      >
                    </v-row>
                  </v-col>
                </v-row>
              </v-col>
              <v-col rows="12">
                <v-row justify="space-around">
                  <v-btn medium class="text-lg-h6" @click="submitPlay" color="button">CALL!</v-btn>
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
import { mapGetters } from "vuex";
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
      buttonClass: "buttonText--text text-lg-h6",
      buttonSelectedClass: "buttonTextSelected--text",
      defaultPlayCall: null,
    };
  },
  computed: {
    ...mapGetters({currentGameStarted : "getCurrentGameStarted"})
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
.PlayCaster {
  background-color: blue;
}
</style>
