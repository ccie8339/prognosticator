import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      dark: {
        primary: "#ffffff",
        error: "#ff0000"
      },
      light: {
        primary: "#013369",
        error: "#ff0000",
        football: "#ff0000",
        button: "#d30104"
      }
    }
  }
});
