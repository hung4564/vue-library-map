<template>
  <div class="module__container">
    <portal v-if="controlVisible && $slots['btn']" :order="order" :to="btnTo">
      <div>
        <slot name="btn" />
      </div>
    </portal>
    <slot />
    <portal :to="draggableTo">
      <slot v-bind="bindDrag" name="draggable" />
    </portal>
  </div>
</template>

<script>
import { Portal } from "portal-vue";
export default {
  components: { Portal },
  props: {
    prefix: { type: String, default: "mapbox" },
    btnWidth: { type: Number, default: 32 },
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
  computed: {
    btnTo() {
      return `${this.position}-${this.prefix}`;
    },
    draggableTo() {
      return `map-draggable-${this.prefix}`;
    },
    bindDrag() {
      let bind = {};
      if (this.position.includes("left")) {
        bind.left = 18 + this.btnWidth;
      }
      if (this.position.includes("right")) {
        bind.right = 18 + this.btnWidth;
      }
      if (this.position.includes("top")) {
        bind.top = 10;
      }
      if (this.position.includes("bottom")) {
        bind.bottom = 10;
      }
      return bind;
    }
  }
};
</script>

<style scoped>
.module__container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 800;
}

.module__container > *:not(.module__container) {
  pointer-events: all;
}
</style>
