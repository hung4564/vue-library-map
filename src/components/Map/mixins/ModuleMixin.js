import ModuleContainer from "../ModuleContainer.vue";
import SvgIcon from "@jamescoyle/vue-icon";
import { getMap } from "@/store/store-map";

export default {
  components: { ModuleContainer, SvgIcon },
  props: {
    position: {
      type: String,
      default: "bottom-right",
      validator(value) {
        return (
          ["top-left", "top-right", "bottom-left", "bottom-right"].indexOf(
            value
          ) !== -1
        );
      }
    },

    controlVisible: {
      type: Boolean,
      default: true
    },
    order: {
      type: Number,
      default: 0
    }
  },

  data() {
    return {
      loaded: false
    };
  },

  watch: {},

  inject: ["getMap", "$map"],
  computed: {
    isLeft() {
      return this.position.includes("left");
    },
    isRight() {
      return this.position.includes("right");
    },
    isTop() {
      return this.position.includes("top");
    },
    isBottom() {
      return this.position.includes("bottom");
    },
    c_mapId() {
      return this.$map.id;
    },
    bindModule() {
      return {
        controlVisible: this.controlVisible,
        order: this.order,
        position: this.position,
        prefix: this.$map.prefix,
        dragId: this.$map.dragId
      };
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
