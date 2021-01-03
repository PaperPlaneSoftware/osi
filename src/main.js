// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import mavonEditor from "mavon-editor";
import DefaultLayout from "~/layouts/Default.vue";

import "~/assets/styles/custom.scss";
import "../node_modules/mavon-editor/dist/css/index.css";

export default function(Vue, { router, head, isClient }) {
  // Install BootstrapVue
  Vue.use(BootstrapVue);
  // Optionally install the BootstrapVue icon components plugin
  Vue.use(IconsPlugin);

  // Mavon editor
  Vue.use(mavonEditor);

  // Set default layout as a global component
  Vue.component("Layout", DefaultLayout);
}
