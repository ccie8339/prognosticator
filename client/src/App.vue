<template>
  <v-app>
    <v-main>
      <p v-if="!isAuthenticated">
        Not Authenticated
      </p>
      <p v-else>
        Authenticated
      </p>
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "App",
  components: {},
  data: () => ({
    //
  }),
  methods: {},
  computed: {
    ...mapGetters({ token: "token", isAuthenticated: "isAuthenticated" })
  }
};
</script>
