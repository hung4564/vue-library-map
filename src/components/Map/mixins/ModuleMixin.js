import ModuleContainer from "../ModuleContainer.vue";
import SvgIcon from "@jamescoyle/vue-icon";
import { getMap } from "@/store/store-map";

export default {
  components: { ModuleContainer, SvgIcon },

  data() {
    return {
      loaded: false
    };
  },

  inject: ["getMap", "$map", "formatCoordinate"],
  computed: {
    c_mapId() {
      return this.$map.id;
    }
  },

  mounted() {
    this.$once("module-loaded", () => {
      this.loaded = true;
    });

    this.$on("module-failed", () => {
      this.loaded = false;
    });

    this.getMap(async (map) => {
      this.map = map;
      // Revoke event
      if (this.onInit instanceof Function) {
        const command = this.onInit();

        if (command instanceof Promise) {
          try {
            await command;
          } catch (error) {
            this.$emit("module-failed");
            throw error;
          }
        }
      }

      this.$emit("module-loaded");
    });
  },

  destroyed() {
    try {
      if (this.onDestroy instanceof Function) {
        this.onDestroy();
      }
    } finally {
      this.map = null;
    }
  },

  methods: {
    actionAfterMapLoaded(cb) {
      if (!this.c_mapId) {
        return this.$once("module-loaded", () => {
          cb();
        });
      }
      cb();
    },
    callMap(cb) {
      if (!this.c_mapId) return;
      getMap(this.c_mapId, cb);
    }
  }
};
