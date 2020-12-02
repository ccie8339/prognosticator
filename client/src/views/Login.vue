<template>
  <v-container fluid class="blue darken-4 mt-0 pt-0" fill-height>
    <v-row>
      <v-col cols="12" align-self="start" order="1" class="pt-1">
        <v-row class="d-flex justify-center">
          <v-col cols="4">
            <v-card>
              <v-card-text>
                <v-form v-model="valid" ref="loginForm">
                  <v-text-field v-model="email" label="Enter E-Mail Address" />
                  <v-text-field
                    v-model="password"
                    label="Enter Password"
                    type="password"
                  />
                  <v-layout class="d-flex justify-end">
                    <v-btn @click="login" class="blue darken-4 white--text"
                      >LOGIN</v-btn
                    >
                  </v-layout>
                </v-form>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
const axios = require("axios");
import { mapActions } from "vuex";
export default {
  data() {
    return {
      valid: false,
      email: null,
      password: null,
    };
  },
  methods: {
    ...mapActions({ setToken: "setToken" }),
    async login() {
      const body = {
        strategy: "local",
        email: this.email,
        password: this.password,
      };
      try {
        const response = await axios.post(
          "http://192.168.1.110:3030/authentication",
          body
        );
        const token = response.data.accessToken;
        this.setToken(token);
      } catch (error) {
        console.log("ERROR: ", error);
      }
    },
  },
};
</script>