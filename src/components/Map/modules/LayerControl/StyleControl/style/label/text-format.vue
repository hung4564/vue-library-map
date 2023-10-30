<template>
  <div>{{ format(value || default_value || "0") }} </div>
</template>

<script>
export default {
  props: {
    value: {},
    default_value: {},
    format: {
      default: () => () => ""
    }
  },
  data: () => ({}),
  computed: {},
  methods: {}
};
</script>

<style scoped></style>
