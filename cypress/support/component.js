import { mount } from "cypress/vue";

import { VApp, VMain } from "vuetify/lib/components/index.mjs";
import { h, markRaw } from "vue";
import { createVuetify } from "vuetify";
import { mdi, aliases } from "vuetify/iconsets/mdi-svg";
import "@/main.scss";

// we should also include the "shared" resources so snackbars are visible, etc

const vuetify = createVuetify({
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: {
      mdi,
    },
  },
});

Cypress.on(
  "uncaught:exception",
  (err) => !err.message.includes("ResizeObserver")
);

Cypress.Commands.add("mount", (component) => {
  return mount(VApp, {
    global: {
      plugins: [vuetify],
      stubs: { transition: false, "transition-group": false },
    },
    slots: {
      default: () =>
        h(
          VMain,
          {},
          {
            default: () => [h(markRaw(component))],
          }
        ),
    },
  });
});

Cypress.Commands.add("selectItemInList", (itemTitle) =>
  cy.get(`.v-list .v-list-item-title:contains("${itemTitle}")`).first().click()
);
