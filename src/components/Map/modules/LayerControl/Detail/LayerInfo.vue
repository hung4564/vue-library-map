<script>
export default {
  name: "detail-layer-info"
};
</script>

<script setup>
import { useMap } from "@components/Map/mixins/useMap";
import { DraggablePopup } from "@hungpv97/vue-library-draggable";
import { defineEmits, defineProps } from "vue";
import TableTdLayer from "./table-td-layer.vue";
const { $map } = useMap();
const emit = defineEmits(["close"]);
const props = defineProps({
  item: {},
  option: {
    default: () => ({
      fields: []
    })
  }
});
function onUpdateShow(val) {
  if (!val) {
    emit("close");
  }
}
</script>
<template>
  <DraggablePopup v-bind="$attrs" show @update:show="onUpdateShow" :width="400">
    <template #title>
      {{ $map.trans("map.layer-control.info.title") }}
    </template>
    <div class="table-show-info">
      <table>
        <tbody>
          <TableTdLayer
            :field="field"
            :layer="props.item"
            v-for="(field, i) in props.option.fields"
            :key="i"
          >
          </TableTdLayer>
        </tbody>
      </table>
    </div>
  </DraggablePopup>
</template>

<style>
.table-show-info table {
  line-height: 1.5;
  width: 100%;
  border-spacing: 0;
}
.table-show-info table > tbody > tr > td {
  font-size: 0.875rem;
  height: 48px;
  padding: 0 16px;
  word-break: break-all;
}
.table-show-info table > tbody > tr:not(:last-child) > td {
  border-bottom: thin solid hsla(0, 0%, 100%, 0.12);
}
.table-show-info table > tbody > tr:hover {
  background: #616161;
}
.table-show-info {
  max-width: 100%;
}
</style>

<style scoped>
.info-control-container {
  padding: 8px;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: auto;
}
</style>
