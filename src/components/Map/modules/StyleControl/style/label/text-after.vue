<template>
  <div>{{ value || default_value || "0" }} {{ tab.unit || "" }}</div>
</template>

<script>
export default {
  props: {
    value: {},
    default_value: {},
    tab: {
      default: () => ({})
    }
  },
  data: () => ({}),
  computed: {},
  methods: {}
};
</script>

<style scoped></style>
