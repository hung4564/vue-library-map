<script>
export default {
  name: "detail-geojson-info"
};
</script>

<script setup>
import { getLayerFromView } from "@/helper/_layer";
import { DraggablePopup } from "@hungpv97/vue-library-draggable";
import { computed, defineEmits, defineProps, ref } from "vue";
import { useMap } from "@components/Map/mixins/useMap";
import { inputTextArea } from "@/components/input";
import TableTdCopy from "./table-td-copy.vue";
const { $map } = useMap();
const emit = defineEmits(["close"]);
function onUpdateShow(val) {
  if (!val) {
    emit("close");
  }
}
const props = defineProps({
  item: {}
});

let layer = getLayerFromView(props.item);
const form = ref({
  name: layer.name,
  bounds: layer.metadata.bounds,
  geojson: JSON.stringify(layer.source.geojson, undefined, 2)
});
const bounds = computed(
  () =>
    form.value.bounds &&
    `${form.value.bounds[0]}, ${form.value.bounds[1]}, ${form.value.bounds[2]},${form.value.bounds[3]}`
);
</script>
<template lang="">
  <DraggablePopup v-bind="$attrs" show @update:show="onUpdateShow" :width="400">
    <template #title>
      {{ $map.trans("map.layer-control.info.title") }}
    </template>
    <div class="table-show-info">
      <table>
        <tbody>
          <TableTdCopy :value="form.name">
            <td style="min-width: 60px">
              {{ $map.trans("map.layer-control.field.name") }}
            </td>
            <td>
              {{ form.name }}
            </td>
          </TableTdCopy>
          <TableTdCopy :value="bounds">
            <td style="min-width: 60px">
              {{ $map.trans("map.layer-control.field.bound.title") }}
            </td>
            <td> {{ bounds }} </td>
          </TableTdCopy>
          <TableTdCopy :value="form.geojson">
            <td colspan="2">
              <input-text-area
                readonly
                rows="10"
                v-model="form.geojson"
                :label="$map.trans('map.layer-control.field.geojson')"
              />
            </td>
          </TableTdCopy>
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
