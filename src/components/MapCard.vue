<template>
  <div class="map-card" :style="cardStyle" v-on="$listeners">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    height: {},
    width: {}
  },
  data: () => ({}),
  computed: {
    cardStyle() {
      return { height: this.height, width: this.width };
    }
  },
  methods: {}
};
</script>

<style scoped>
.map-card {
  box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%),
    0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
  background-color: #ffffff;
  color: rgba(0, 0, 0, 0.87);
  border-width: thin;
  display: block;
  max-width: 100%;
  outline: none;
  text-decoration: none;
  transition-property: box-shadow, opacity;
  overflow-wrap: break-word;
  position: relative;
  white-space: normal;
  box-sizing: border-box;
}
.map-card > *:last-child {
  border-bottom-left-radius: inherit;
  border-bottom-right-radius: inherit;
}
.map-card > *:first-child {
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;
}
</style>
