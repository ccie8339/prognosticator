<template>
  <v-container>
    <v-row>
      <v-col cols="4">
        <v-card>
          <v-card-title class="flex-d justify-center">Play Caster</v-card-title>
          <v-spacer />
          <v-card-actions>
            <v-row>
              <v-col cols="6">
                <v-row>
                  <v-col cols="12">
                    <v-row justify="center">
                      <v-btn
                        @click="run = !run; pass = false"
                        :color="run ? 'primary' : 'secondary lighten-4'"
                        >RUN</v-btn
                      >
                    </v-row>
                  </v-col>
                  <v-col cols="4">
                    <v-row justify="center">
                      <v-btn @click="left = !left; middle = false; right=false;" :color="left ? 'primary' : 'secondary lighten-4'" :disabled="!run">LEFT</v-btn>
                    </v-row>
                  </v-col>
                  <v-col cols="4">
                    <v-row justify="center">
                      <v-btn @click="middle = !middle; left = false; right=false;" :color="middle ? 'primary' : 'secondary lighten-4'" :disabled="!run">MIDDLE</v-btn>
                    </v-row>
                  </v-col>
                  <v-col cols="4">
                    <v-row justify="center">
                      <v-btn @click="right = !right; left = false; middle=false;" :color="right ? 'primary' : 'secondary lighten-4'" :disabled="!run">RIGHT</v-btn>
                    </v-row>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="6">
                <v-row>
                  <v-col cols="12">
                    <v-row justify="center">
                      <v-btn
                        @click="pass = !pass; run = false"
                        :color="pass ? 'primary' : 'secondary lighten-4'"
                        >PASS</v-btn
                      >
                    </v-row>
                  </v-col>
                  <v-col cols="4">
                    <v-row justify="center">
                      <v-btn @click="short = !short; medium = false; long=false;" :color="short ? 'primary' : 'secondary lighten-4'" :disabled="!pass">SHORT</v-btn>
                    </v-row>
                  </v-col>
                  <v-col cols="4">
                    <v-row justify="center">
                      <v-btn @click="medium = !medium; short = false; long=false;" :color="medium ? 'primary' : 'secondary lighten-4'" :disabled="!pass">MEDIUM</v-btn>
                    </v-row>
                  </v-col>
                  <v-col cols="4">
                    <v-row justify="center">
                      <v-btn @click="long = !long; medium = false; short=false;" :color="long ? 'primary' : 'secondary lighten-4'" :disabled="!pass">LONG</v-btn>
                    </v-row>
                  </v-col>
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
  data() {
    return {
      run: false,
      pass: false,
      left: false,
      middle: false,
      right: false,
      short: false,
      medium: false,
      long: false
    };
  },
};
</script>
<style scoped>
button {
  width: 80px;
}
</style>