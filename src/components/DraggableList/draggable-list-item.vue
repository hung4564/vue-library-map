<template>
  <div class="draggale-item" :class="{ 'draggale-item-active': isSelected }">
    <div
      class="draggable-handle"
      v-if="!disabledDrag"
      :style="{
        background: item.color
      }"
    >
      <div class="draggable-handle__icon">
        <SvgIcon size="14" type="mdi" :path="path.draggable" />
      </div>
    </div>
    <div class="draggale-item__info">
      <slot />
    </div>
  </div>
</template>

<script>
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiArrowUpDown } from "@mdi/js";
export default {
  components: { SvgIcon },
  props: {
    isSelected: Boolean,
    disabledDrag: Boolean,
    item: { type: Object, default: () => ({}) }
  },
  computed: {
    path() {
      return { draggable: mdiArrowUpDown };
    }
  }
};
</script>

<style scoped lang="scss">
.draggale-item {
  outline: thin;
  box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14),
    0 1px 3px 0 rgba(0, 0, 0, 0.12);
  display: flex;
  width: 100%;
  position: relative;
  .draggable-handle {
    flex-grow: 0;
    background: var(--v-primary-base, #1a73e8);
  }
  .draggable-handle__icon {
    cursor: n-resize;
    color: #fff;
    width: 16px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .draggale-item__info {
    flex-grow: 1;
    padding: 8px;
    overflow: hidden;
    min-height: 30px;
  }
}
.draggale-item-active {
  outline: 2px solid var(--v-primary-base, #1a73e8);
}
</style>
<style scoped>
:deep(.v-slider.v-slider--horizontal) {
  min-height: 20px;
}
</style>
