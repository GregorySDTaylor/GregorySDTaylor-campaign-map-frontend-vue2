import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: true,
    themes: {
      dark: {
        primary: "#009688",
        secondary: "#ff9800",
        accent: "#ffeb3b",
        error: "#ff5722",
        warning: "#cddc39",
        info: "#607d8b",
        success: "#4caf50",
      },
    },
  },
});
