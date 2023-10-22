<template>
  <tr>
    <slot />
    <td style="min-width: 20px">
      <div class="btn-copy">
        <base-button @click="copyToClipboard(value)">
          <SvgIcon :path="path.copy" size="14" type="mdi" />
        </base-button>
      </div>
    </td>
  </tr>
</template>
<script setup>
import { defineProps } from "vue";
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiContentCopy } from "@mdi/js";
import baseButton from "@/components/base/base-button.vue";
import { copyToClipboard } from "@/utils/copyToClipboard";
defineProps({
  value: {}
});
const path = {
  copy: mdiContentCopy
};
</script>
<style scoped>
tr {
  padding: 0 16px;
}
tr .btn-copy {
  display: none;
}
tr:hover .btn-copy {
  display: block;
}
</style>
