<script setup>
import { useMap } from "@/components/Map/mixins/useMap";
import FileSaver from "file-saver";
import { lineString, point, polygon } from "@turf/helpers";
import { computed, defineProps, defineEmits } from "vue";
import {
  mdiCrosshairsGps,
  mdiDeleteOutline,
  mdiDownloadOutline,
  mdiPlus,
  mdiUploadOutline
} from "@mdi/js";
import SvgIcon from "@jamescoyle/vue-icon";
const props = defineProps({
  value: {
    type: Array,
    default: () => [[0, 0]]
  },
  maxLength: { type: Number, default: 0 }
});
const path = {
  add: mdiPlus,
  fillBound: mdiCrosshairsGps,
  delete: mdiDeleteOutline,
  download: mdiDownloadOutline,
  upload: mdiUploadOutline
};
const emit = defineEmits(["input", "click:remove", "click:fillbound"]);
const model = computed({
  get() {
    return props.value;
  },
  set(value) {
    emit("input", value);
  }
});
const { $map } = useMap();

const submit = (value) => {
  emit("input", value);
};
const onAddItem = () => {
  model.push([null, null]);
};
const onUpdatePathItem = () => {
  submit(model);
};
const onDeleteItem = (index) => {
  model.splice(index, 1);
  emit("click:remove", index);
  submit(model);
};
const convertGeometry = (coordinates) => {
  if (!coordinates || !coordinates.length) {
    return;
  }
  if (coordinates.length == 1) {
    return point(coordinates[0]);
  }
  if (coordinates.length == 2) {
    return lineString(coordinates);
  }
  return polygon([[...coordinates, coordinates[0]]]);
};
const onDownload = () => {
  let geojson = {
    type: "FeatureCollection",
    features: [convertGeometry(model.value)]
  };
  const blob = new window.Blob([JSON.stringify(geojson)], {
    type: "text/plain;charset=utf-8"
  });

  FileSaver.saveAs(blob, "geojson.json");
};
const onFlyTo = () => {
  emit("click:fillbound", convertGeometry(model.value));
};
const isCanAdd = computed(() => {
  return props.maxLength || props.value.length < props.maxLength;
});
</script>
<template>
  <div class="field-container">
    <div class="label-container">
      <div class="label-field">
        {{ $map.trans("map.measurement.setting.field.data") }}
      </div>
      <div>
        <button
          @click="onFlyTo"
          :disabled="!model || model.length < 1"
          class="setting-button"
          :title="$map.trans('map.measurement.action.fly-to')"
        >
          <SvgIcon
            :size="16"
            type="mdi"
            :path="path.fillBound"
            :title="$map.trans('map.measurement.action.download')"
          />
        </button>
        <button
          @click="onDownload"
          class="setting-button"
          :disabled="!model || model.length < 1"
        >
          <SvgIcon
            :size="16"
            type="mdi"
            :path="path.download"
            :title="$map.trans('map.measurement.action.add-point')"
          />
        </button>
        <button @click="onAddItem" class="setting-button" v-if="isCanAdd">
          <SvgIcon :size="16" type="mdi" :path="path.add" />
        </button>
      </div>
    </div>
    <div class="geometry-list-container">
      <div
        class="geometry-list-item"
        v-for="(item, index) in model"
        :key="index"
      >
        <div> #{{ index + 1 }} </div>
        <div class="">
          <input
            class="setting-input"
            v-model="model[index][0]"
            type="number"
            step="any"
            @change="onUpdatePathItem(index)"
          />
        </div>
        <div class="">
          <input
            class="setting-input"
            v-model="model[index][1]"
            type="number"
            step="any"
            @change="onUpdatePathItem(index)"
          />
        </div>
        <div class="">
          <button @click="onDeleteItem(index)" class="setting-button">
            <SvgIcon :size="16" type="mdi" :path="path.delete" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.label-container {
  display: flex;
}
.label-container .label-field {
  flex-grow: 1;
}
.geometry-list-item {
  display: flex;
  align-items: center;
  margin-right: -4px;
  margin-left: -4px;
}
.geometry-list-item > div {
  padding: 4px;
  color: inherit;
  background-color: transparent;
}
.setting-button {
  background-color: transparent;
  color: #fff;
  position: relative;
  cursor: pointer;
  display: inline-flex;
  overflow: hidden;
  vertical-align: middle;
  box-shadow: none;
  background-color: transparent;
  border: none;
  border-radius: 50%;
  height: 24px;
  width: 24px;
  line-height: 24px;
  align-items: center;
  justify-content: center;
  color: inherit;
}
.setting-input {
  padding: 8px;
  display: block;
  border: none;
  border-bottom: 1px solid #ccc;
  color: inherit;
  width: 100%;
  background-color: transparent;
}
button:disabled,
button[disabled] {
  opacity: 0.3;
  cursor: not-allowed;
  pointer-events: none;
}
</style>
