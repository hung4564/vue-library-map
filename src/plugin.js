import { Portal, PortalTarget } from "portal-vue";

import resize from "vue-resize-directive";

export default {
  install(Vue) {
    Vue.directive("resize", resize);
    Vue.mixin({
      computed: {
        isMobile() {
          return false;
        }
      },
      methods: {
        $t(key) {
          return key;
        }
      }
    });
    Vue.component("Portal", Portal);

    Vue.component("PortalTarget", PortalTarget);
  }
};
