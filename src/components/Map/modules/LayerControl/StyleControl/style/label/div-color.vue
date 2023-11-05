<template>
  <div
    :style="`
      border: 1px solid #ccc;
      width:20px ; height: 20px ; background-color: ${
        value || default_value || 'transparent'
      } ;
              border-radius: 5px `"
    :class="{ 'fill-canvas': !value && !default_value }"
  >
  </div>
</template>

<script>
export default {
  props: {
    value: { type: String },
    default_value: { type: String }
  },
  data: () => ({}),
  computed: {},
  methods: {}
};
</script>

<style scoped>
.fill-canvas {
  background-image: linear-gradient(-45deg, transparent 75%, #f4f7fb 0),
    linear-gradient(45deg, transparent 75%, #f4f7fb 0),
    linear-gradient(45deg, #f4f7fb 25%, transparent 0),
    linear-gradient(-45deg, #f4f7fb 25%, transparent 0);
  background-size: 12px 12px;
  background-position: 0 0, 0 -6px, 6px 0, -6px -6px;
  background-repeat: repeat;
}
</style>
