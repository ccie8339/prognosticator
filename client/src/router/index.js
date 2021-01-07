import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";
import VueSocketIO from "vue-socket.io";
import Login from "../views/Login.vue";
import Player from "../views/Player.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login
  },
  {
    path: "/gridiron",
    name: "Grid Iron",
    component: Player,
    beforeEnter(to, from, next) {
      if (!Vue.prototype.$socket) {
        Vue.use(
          new VueSocketIO({
            debug: true,
            connection: "http://192.168.1.110:3030", //options object is Optional
            vuex: {
              store,
              actionPrefix: "SOCKET_",
              // mutationPrefix: "SOCKET_",
            },
          })
        );
      }
      next();
    }
  }
  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   // component: () =>
  //   //   import(/* webpackChunkName: "about" */ "../views/About.vue")
  // }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
