<template>
  <div class="card" :style="cardStyle" v-on="$listeners" v-bind="$attrs">
    <div>
      <slot />
    </div>
    <div class="card-arrow">
      <div class="card-arrow-top-left"></div>
      <div class="card-arrow-top-right"></div>
      <div class="card-arrow-bottom-left"></div>
      <div class="card-arrow-bottom-right"></div>
    </div>
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

<style scoped></style>
