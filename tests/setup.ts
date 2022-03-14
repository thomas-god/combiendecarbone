import Vue from "vue";
import Vuetify from "vuetify";
import "@testing-library/jest-dom";
import { render } from "@testing-library/vue";

Vue.use(Vuetify);
Vue.config.productionTip = false;

export const renderWithVuetify = (component: any, options: any, callback?: any) => {
  const root = document.createElement("div");
  root.setAttribute("data-app", "true");

  return render(
    component,
    {
      container: document.body.appendChild(root),
      // for Vuetify components that use the $vuetify instance property
      vuetify: new Vuetify(),
      ...options,
    },
    callback
  );
};
