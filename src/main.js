import { createApp } from "vue";
import App from "./App.vue";

import { createVuetify } from "vuetify";
import { mdi, aliases } from "vuetify/iconsets/mdi-svg";
import "@/main.scss";

const vuetify = createVuetify({
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: {
      mdi,
    },
  },
});

createApp(App).use(vuetify).mount("#app");
