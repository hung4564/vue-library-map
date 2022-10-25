<template>
  <div v-resize="onResize" class="full-height full-width">
    <portal-target multiple :name="draggableTo" />
  </div>
</template>

<script>
import PopupMixins from "./container-popup.mixins";
import SidebarMixins from "./container-sidebar.mixins";
import { getUUIDv4 } from "@utils";
import { PortalTarget } from "portal-vue";
import resize from "vue-resize-directive";
export default {
  directives: {
    resize
  },
  mixins: [PopupMixins, SidebarMixins],
  components: { PortalTarget },
  props: {
    mapId: { type: String },
    width: { type: Number },
    height: { type: Number },
    prefix: { type: String, default: "mapbox" }
  },
  data: () => ({
    parentHeight: 0,
    parentWidth: 0,
    dragId: ""
  }),
  created() {
    this.dragId = getUUIDv4();
  },
  mounted() {
    this.onResize();
    window.addEventListener("resize", this.onResize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  },

  computed: {
    draggableTo() {
      return `map-draggable-${this.mapId || this.dragId}`;
    },
    isMobile() {
      return this.parentWidth && this.parentWidth <= 600;
    }
  },
  provide() {
    const option = {};
    Object.defineProperty(option, "isMobile", {
      enumerable: true,
      get: () => this.isMobile
    });
    return {
      prefix: this.prefix,
      option
    };
  },
  methods: {}
};
</script>

<style scoped></style>
