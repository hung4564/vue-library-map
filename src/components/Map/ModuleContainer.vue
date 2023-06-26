<template>
  <div class="module__container">
    <portal
      v-if="controlVisible && $slots['btn']"
      :order="order"
      :selector="btnTo"
    >
      <slot name="btn" />
    </portal>
    <slot />
    <portal :selector="draggableTo" v-if="c_containerId">
      <slot v-bind="bindDrag" name="draggable" />
    </portal>
  </div>
</template>

<script setup>
import { Portal } from "@linusborg/vue-simple-portal";
import { computed, inject, defineProps } from "vue";

const props = defineProps({
  mapId: { type: String, default: "" },
  dragId: { type: String, default: "" },
  btnWidth: { type: Number, default: 40 },
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
});
let $map = inject("$map");
const c_containerId = computed(() => {
  return props.dragId || $map.dragId;
});
const c_mapId = computed(() => {
  return props.mapId || $map.id;
});

const draggableTo = computed(() => {
  return `#map-draggable-${c_mapId.value}`;
});
const btnTo = computed(() => {
  return `#${props.position}-${c_mapId.value}`;
});
const bindDrag = computed(() => {
  let bind = {};
  if (props.position.includes("left")) {
    bind.left = 18 + props.btnWidth;
  }
  if (props.position.includes("right")) {
    bind.right = 18 + props.btnWidth;
  }
  if (props.position.includes("top")) {
    bind.top = 10;
  }
  if (props.position.includes("bottom")) {
    bind.bottom = 10;
  }
  bind.containerId = c_containerId.value;
  return bind;
});
</script>

<style scoped>
.module__container {
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 0;
  pointer-events: none;
}

.module__container > *:not(.module__container) {
  pointer-events: all;
}
</style>
