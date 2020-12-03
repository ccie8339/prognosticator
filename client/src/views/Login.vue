<template>
  <v-container fluid class="blue darken-4 mt-0 pt-0" fill-height>
    <v-row>
      <v-col cols="12" align-self="start" order="1" class="pt-1">
        <v-row class="d-flex justify-center">
          <v-col cols="4">
            <v-dialog v-model="loginError" max-width="35%">
              <template>
                <v-card>
                  <v-card-title class="flex-d justify-center red--text"
                    >There was an issue with your login</v-card-title
                  >
                  <v-card-text style="font-size: 17px" class="red--text">
                    {{ loginErrorMessage }}
                  </v-card-text>
                  <v-card-actions class="d-flex justify-end">
                    <v-spacer />
                    <v-btn
                      @click="
                        loginErrorMessage = null;
                        loginError = false;
                      "
                      class="red white--text"
                      >OK</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </template>
            </v-dialog>
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
import { mapActions } from "vuex";
const axios = require("axios");
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response.status === 401) {
      const response = { data: { status: 401 } };
      return response;
    }
    return error;
  }
);
export default {
  data() {
    return {
      valid: false,
      email: null,
      password: null,
      loginErrorMessage: null,
      loginError: false
    };
  },
  methods: {
    ...mapActions({ setToken: "setToken" }),
    async login() {
      const body = {
        strategy: "local",
        email: this.email,
        password: this.password
      };
      try {
        const response = await axios.post(
          "http://192.168.1.110:3030/authentication",
          body
        );
        console.log(response);
        if (
          response.status !== undefined &&
          response.status === 201
        ) {
          const token = response.data.accessToken;
          this.setToken(token);
          console.log("Got Here", this.$router);
          this.$router.push("/gridiron");
        } else if (
          response.data.status !== undefined &&
          response.data.status === 401
        ) {
          this.loginErrorMessage = "Wrong EMail or Password Provided";
          this.loginError = true;
        }
      } catch (error) {
        console.log("ERROR: ", error);
      }
    }
  }
};
</script>
