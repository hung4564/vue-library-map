import { addListenerMap, removeListenerMap } from "../store/store-event";

import ModuleContainer from "../ModuleContainer.vue";

export default {
  components: { ModuleContainer },
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
    bindModule() {
      return {
        controlVisible: this.controlVisible,
        order: this.order,
        position: this.position,
        prefix: this.$map.id,
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
    if (this.onDestroy instanceof Function) {
      try {
        this.onDestroy();
      } catch (e) {
        console.error(e);
      }
    }
    this.map = null;
  },

  methods: {
    removeListenerMap(event, eventId) {
      removeListenerMap(this.$map.id, event, eventId);
    },
    addListenerMap(event, eventId, cb) {
      addListenerMap(this.$map.id, event, eventId, cb);
    },
    actionAfterMapLoaded(cb) {
      if (!this.map) {
        return this.$once("module-loaded", () => {
          cb();
        });
      }
      cb();
    },
    removeSource(sourceId) {
      if (this.map.getSource(sourceId)) {
        this.map.removeSource(sourceId);
      }
    },
    addLayer(layer, beforeId) {
      if (!this.map) {
        return this.$once("module-loaded", () => {
          this.addLayer(layer, beforeId);
        });
      }

      this.map.addLayer(layer, beforeId);
    },
    removeLayer(layerId) {
      if (!this.map) return;

      if (this.map.getLayer(layerId)) {
        this.map.removeLayer(layerId);
      }

      if (this.map.getSource(layerId)) {
        this.map.removeSource(layerId);
      }
    }
  }
};
