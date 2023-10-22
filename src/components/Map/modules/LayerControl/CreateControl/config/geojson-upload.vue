<template>
  <div class="map-row">
    <slot></slot>
    <div class="map-col-12">
      <input-select
        v-model="form.type"
        :items="items_type"
        :label="$map.trans('map.layer-control.field.type')"
      />
    </div>
    <div class="map-col-12">
      <input-file
        :label="$map.trans('map.layer-control.field.file')"
        accept=".json,.geojson"
        @change="onChangeFile"
      />
    </div>
    <div class="map-col-12" v-if="geojson_show">
      <inputTextArea :value="geojson_show" rows="4" readonly></inputTextArea>
    </div>
  </div>
</template>
<script setup>
import { useMap } from "@components/Map/mixins/useMap";
import { inputSelect, inputFile, inputTextArea } from "@/components/input";
import { computed, defineProps, defineEmits, ref } from "vue";
import { Reader } from "@/utils/GeojsonIO";
const props = defineProps({
  value: {}
});
const items_type = ["point", "line", "area"];
const emit = defineEmits(["input"]);
const geojson_show = ref(null);
const form = computed({
  get() {
    return props.value;
  },
  set(value) {
    emit("input", value);
  }
});
const { $map } = useMap();
function onChangeFile(file) {
  const reader = new Reader();
  reader.read(file).then((res) => {
    form.value.geojson = res;
    geojson_show.value = res ? JSON.stringify(res, null, 2) : "";
  });
}
</script>
<style></style>
