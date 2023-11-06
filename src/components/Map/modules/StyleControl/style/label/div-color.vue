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
