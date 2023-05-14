<template>
  <button
    class="map-control-button"
    :style="bindStyle"
    v-on="$listeners"
    :disabled="disabled"
    :class="{
      'map-control-button-active': active,
      'map-control-button-disabled': disabled
    }"
  >
    <span class="map-control-button__content">
      <SvgIcon
        :size="(height * 2) / 3"
        type="mdi"
        :path="path.loading"
        v-if="loading"
        class="spin"
      />
      <slot v-else />
    </span>
  </button>
</template>

<script>
import { mdiLoading } from "@mdi/js";
import SvgIcon from "@jamescoyle/vue-icon";
export default {
  components: { SvgIcon },
  props: {
    height: { default: 32 },
    width: { default: 32 },
    loading: Boolean,
    active: Boolean,
    disabled: Boolean
  },
  computed: {
    bindStyle() {
      return { width: `${this.width}px`, height: `${this.height}px` };
    },
    path() {
      return { loading: mdiLoading };
    }
  }
};
</script>

<style lang="scss" scoped>
.map-control-button {
  cursor: pointer;
  border-style: none;
  background-color: #ffffff;
  font-size: 0.625rem;
  align-items: center;
  border-radius: 4px;
  display: inline-flex;
  flex: 0 0 auto;
  font-weight: 500;
  letter-spacing: 0.0892857143em;
  justify-content: center;
  outline: 0;
  position: relative;
  text-decoration: none;
  text-indent: 0.0892857143em;
  text-transform: none;
  transition-duration: 0.28s;
  transition-property: box-shadow, transform, opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  user-select: none;
  vertical-align: middle;
  white-space: nowrap;
  border-radius: 50%;
  min-height: 0;
  min-width: 0;
  padding: 0;

  &__content {
    align-items: center;
    color: inherit;
    display: flex;
    flex: 1 0 auto;
    justify-content: inherit;
    line-height: normal;
    position: relative;
    transition: inherit;
    transition-property: opacity;
  }
  &-active {
    color: #004e98;
  }
  &-disabled {
    cursor: default;
    pointer-events: none;
    color: rgba(0, 0, 0, 0.25);
  }
}
.map-control-button:hover {
  background-color: #f5f5f5;
}
.spin {
  animation: 2s linear 0s infinite normal none running spin;
}
@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}
</style>
