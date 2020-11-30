import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VueSocketIO from "vue-socket.io";

Vue.use(
  new VueSocketIO(
    {
      debug: true,
      connection: "http://192.168.1.110:3030",
      vuex: {
        store,
        // actionPrefix: "SOCKET_"
        mutationPrefix: "SOCKET_"
      }
    } //Optional options
  )
);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
