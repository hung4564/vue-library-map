<template>
  <div
    :style="`
      border: 1px solid #ccc;
      width:20px ; height: 20px ; background-color: ${
        value || default_value || '#000000'
      } ;
              border-radius: 5px `"
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

<style scoped></style>
