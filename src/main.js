import "@mdi/font/css/materialdesignicons.css";
import "@/assets/sass/app.scss";

import App from "./App.vue";
import Vue from "vue";

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App)
}).$mount("#app");
