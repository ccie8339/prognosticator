<template>
  <v-alert border="left" color="primary" class="white--text text-xl-h4">
    <v-row class="justify-center">Week {{ currentGame.gameweek }} alert!</v-row>
    <v-row class="justify-middle pa-4">
      The {{ currentGame.visitingteam }} @ {{ currentGame.hometeam }} game has
      not been started yet.
    </v-row>
  </v-alert>
</template>
<script>
export default {
  props: ["currentGame"],
};
</script>
