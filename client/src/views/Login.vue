<template>
  <v-container fill-height fluid>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-dialog v-model="loginError" max-width="35%">
          <template>
            <v-card>
              <v-card-title class="flex-d justify-center error--text"
                >There was an issue with your login</v-card-title
              >
              <v-card-text style="font-size: 17px" class="error--text">
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

        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Login to Play Prognosticator!</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-form v-model="valid">
              <v-text-field
                v-model="email"
                label="Email"
                name="email"
                prepend-icon="mdi-email"
                type="text"
              ></v-text-field>

              <v-text-field
                v-model="password"
                id="password"
                label="Password"
                name="password"
                prepend-icon="mdi-lock"
                type="password"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="login" color="primary">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapActions } from "vuex";
const axios = require("axios");
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
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
      loginError: false,
      validatingCredentials: true,
    };
  },
  methods: {
    ...mapActions({ setToken: "setToken", setUserId: "setUserId", setLogonId: "setLogonId", setPassword: "setPassword" }),
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
        if (response.status !== undefined && response.status === 201) {
          const token = response.data.accessToken;
          const userId = response.data.user.id;
          localStorage.token = token;
          localStorage.userId = userId;
          await this.setToken(token);
          await this.setUserId(userId);
          await this.setLogonId(this.email);
          await this.setPassword(this.password);
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
    },
    async verifyToken(userId, token) {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const response = await axios.get(
          `http://192.168.1.110:3030/users/${userId}`,
          config
        );
        if (response.status !== undefined && response.status === 200) {
          this.setToken(token);
          this.setUserId(userId);
          this.$router.push("/gridiron");
        } else {
          this.validatingCredentials = false;
        }
      } catch (error) {
        console.log(error)
        localStorage.userId = null;
        localStorage.token = null;
        this.validatingCredentials = false;
      }
    },
  },
  mounted() {
    // if (
    //   localStorage.token != undefined &&
    //   localStorage.token != null &&
    //   localStorage.userId != undefined &&
    //   localStorage.userId != null
    // ) {
    //   this.verifyToken(localStorage.userId, localStorage.token);
    // } else {
    //   // console.log("No Local Credentials")
    //   this.validatingCredentials = false;
    // }
  },
};
</script>
