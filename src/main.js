import "@/assets/sass/app.scss";

import App from "./AppCompare.vue";
import Vue from "vue";

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App)
}).$mount("#app");
