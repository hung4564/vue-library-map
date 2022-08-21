<template>
  <button class="map-control-button" :style="bindStyle" v-on="$listeners">
    <span class="map-control-button__content">
      <slot />
    </span>
  </button>
</template>

<script>
export default {
  props: { height: { default: 32 }, width: { default: 32 } },
  computed: {
    bindStyle() {
      return { width: `${this.width}px`, height: `${this.height}px` };
    }
  }
};
</script>

<style lang="scss" scoped>
.map-control-button {
  cursor: pointer;
  border-style: none;
  background-color: #f5f5f5;
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
}
</style>
