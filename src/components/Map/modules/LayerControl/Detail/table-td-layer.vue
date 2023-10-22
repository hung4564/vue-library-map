<template>
  <TableTdCopy :value="value">
    <template v-if="!field.inline">
      <td style="min-width: 60px">
        {{ text }}
      </td>
      <td>
        {{ value }}
      </td>
    </template>
    <td colspan="2" v-else>
      <input-text-area readonly rows="10" v-model="value" :label="text" />
    </td>
  </TableTdCopy>
</template>
<script setup>
import { useMap } from "@components/Map/mixins/useMap";
import { inputTextArea } from "@/components/input";
import { computed, defineProps } from "vue";
import TableTdCopy from "./table-td-copy.vue";
import { getLayerFromView } from "@/helper/_layer";
const { $map } = useMap();
const props = defineProps({
  field: {},
  layer: {}
});
const layer = getLayerFromView(props.layer);
const value = computed(() =>
  props.field.value instanceof Function
    ? props.field.value(layer)
    : layer[props.field.value]
);
const text = computed(() => {
  if (props.field.trans) {
    return $map.trans(props.field.trans);
  }
  return props.field.text;
});
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
