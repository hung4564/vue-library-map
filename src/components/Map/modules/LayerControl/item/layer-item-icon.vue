<template>
  <div>
    <SvgIcon
      size="14"
      type="mdi"
      :path="path.loading"
      class="spin"
      v-if="loading"
    />
    <SvgIcon size="14" type="mdi" :path="path.layer" v-else />
  </div>
</template>
<script setup>
import { mdiLayers, mdiLoading } from "@mdi/js";
import { defineProps } from "vue";
import SvgIcon from "@jamescoyle/vue-icon";
defineProps({
  loading: Boolean,
  item: {
    require: true,
    type: Object
  }
});
const path = {
  loading: mdiLoading,
  layer: mdiLayers
};
</script>
<style></style>
