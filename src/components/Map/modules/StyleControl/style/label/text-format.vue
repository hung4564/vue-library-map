<template>
  <div>{{ format(c_value || "0") }} </div>
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
  computed: {
    c_value() {
      if (this.value != null) {
        return this.value;
      }
      return this.default_value;
    }
  },
  methods: {}
};
</script>

<style scoped></style>
