<template>
  <div class="d-block full-width full-height">
    <v-skeleton-loader v-if="type" :type="type"></v-skeleton-loader>
    <div v-else class="d-flex justify-center align-center">
      <loading-component></loading-component>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    type: { type: String }
  },
  data: () => ({}),
  computed: {},
  methods: {}
};
</script>

<style scoped></style>
