<template>
  <v-container>
    <play-caster :submitPlayCall="submitPlayCall" />
  </v-container>
</template>
<script>
import PlayCaster from "../components/PlayCaster";
export default {
  components: {
    PlayCaster,
  },
  methods: {
    submitPlayCall: (call) => {
      console.log(call);
    }
  }
};
</script>