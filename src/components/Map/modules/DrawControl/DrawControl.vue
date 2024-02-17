<script setup lang="ts">
import SvgIcon from "@jamescoyle/vue-icon";
import MapboxDraw, {
  DrawCreateEvent,
  DrawDeleteEvent,
  DrawUpdateEvent
} from "@mapbox/mapbox-gl-draw";
import ModuleContainer from "@components/Map/ModuleContainer.vue";
import { useMap } from "@components/Map/mixins/useMap";
import MapControlGroupButton from "@components/Map/control/MapControlGroupButton.vue";
import MapControlButton from "@components/Map/control/MapControlButton.vue";
import {
  mdiClose,
  mdiContentSave,
  mdiDeleteOutline,
  mdiPencil,
  mdiPlus
} from "@mdi/js";
import { computed, ref } from "vue";
import {
  initDrawControl,
  activateDraw,
  draw,
  setFeature,
  checkAndCallDone,
  getDrawIsActivated,
  getDrawIsRegisterId,
  saveDraw,
  cancelDraw,
  getDrawIsShow,
  getDrawAction,
  deactivateDraw
} from "@/store/store-draw";
import type { MapSimple } from "@/interface/map";
import { useEventMap } from "@/hooks/useEvent";
import { EventClick } from "@/model";
import { MapMouseEvent } from "mapbox-gl";
import eventBus from "@/utils/event-bus";
import { EVENTBUS_TYPE } from "@/utils/event-bus";
const { add: addEventClick, remove: removeEventClick } = useEventMap(
  new EventClick().setHandler(onMapClick)
);
let control = new MapboxDraw({
  displayControlsDefault: false,
  boxSelect: false
});
const { c_mapId } = useMap(
  (map: MapSimple) => {
    onSelectMethod("select");
    map.on("draw.create", onDrawCreated);
    map.on("draw.update", onDrawUpdated);
    map.on("draw.delete", onDrawDeleted);
    map.addControl(control);
  },
  (map: MapSimple) => {
    map.off("draw.create", onDrawCreated);
    map.off("draw.update", onDrawUpdated);
    map.off("draw.delete", onDrawDeleted);
    map.removeControl(control);
  }
);
function onDrawCreated(event: DrawCreateEvent) {
  for (const feature of event.features) {
    setFeature(c_mapId.value, "added", feature);
  }
  checkAndCallDone(c_mapId.value, register_id.value!);
  onSelectMethod("select");
}
function onDrawUpdated(event: DrawUpdateEvent) {
  for (const feature of event.features) {
    setFeature(c_mapId.value, "updated", feature);
  }
  checkAndCallDone(c_mapId.value, register_id.value!);
  onSelectMethod("select");
}
function onDrawDeleted(event: DrawDeleteEvent) {
  for (const feature of event.features) {
    setFeature(c_mapId.value, "deleted", feature);
  }
  checkAndCallDone(c_mapId.value, register_id.value!);
  onSelectMethod("select");
}
initDrawControl(c_mapId.value, control);
const path = {
  add: mdiPlus,
  delete: mdiDeleteOutline,
  update: mdiPencil,
  save: mdiContentSave,
  discard: mdiClose,
  close: mdiClose
};
const method = ref("");
function onSelectMethod(value: "select" | "delete" | "create") {
  removeEventClick();
  method.value = value;
  switch (value) {
    case "select":
    case "delete":
      addEventClick();
      break;
    default:
      break;
  }
}
const register_id = computed(() => {
  return getDrawIsRegisterId(c_mapId.value);
});
function onDraw(type: string) {
  activateDraw(c_mapId.value, register_id.value!);
  draw(c_mapId.value, register_id.value!, type);
}
const isActivated = computed(() => {
  return getDrawIsActivated(c_mapId.value);
});
const isShow = computed(() => {
  return getDrawIsShow(c_mapId.value);
});
const isDraw = computed(() => {
  return isActivated.value;
});
function onSave() {
  saveDraw(c_mapId.value, register_id.value!);
}
function onCancel() {
  cancelDraw(c_mapId.value);
}
function close() {
  deactivateDraw(c_mapId.value);
}
async function onMapClick(e: MapMouseEvent) {
  const action = getDrawAction(c_mapId.value);
  const features =
    (await (action.getFeatures &&
      action.getFeatures([e.lngLat.lng, e.lngLat.lat]))) || [];
  switch (method.value) {
    case "select": {
      const feature_ids = control?.add({ type: "FeatureCollection", features });
      if (feature_ids && feature_ids.length > 0) {
        activateDraw(c_mapId.value, register_id.value!);
        draw(c_mapId.value, register_id.value!, "direct_select", undefined, {
          featureId: feature_ids[0]
        });
      }
      break;
    }

    case "delete": {
      action.deleteFeatures && action.deleteFeatures(features);
      action.reset && action.reset();
      break;
    }
  }
}
eventBus.on(EVENTBUS_TYPE.DRAW.REMOVE, () => {
  onSelectMethod("select");
});
</script>
<template setup>
  <ModuleContainer v-bind="$attrs">
    <template #btn>
      <div class="d-flex button-custom-container" v-if="isShow">
        <MapControlGroupButton row v-if="isDraw">
          <MapControlButton @click="onCancel()">
            <SvgIcon :size="18" type="mdi" :path="path.discard" />
          </MapControlButton>
          <MapControlButton @click="onSave()">
            <SvgIcon :size="18" type="mdi" :path="path.save" />
          </MapControlButton>
        </MapControlGroupButton>
        <MapControlGroupButton row v-else>
          <MapControlButton @click="close()">
            <SvgIcon :size="18" type="mdi" :path="path.close" />
          </MapControlButton>
          <MapControlButton
            :active="method === 'create'"
            @click="
              onSelectMethod('create');
              onDraw('draw_polygon');
            "
          >
            <SvgIcon :size="18" type="mdi" :path="path.add" />
          </MapControlButton>
          <MapControlButton
            :active="method === 'select'"
            @click="onSelectMethod('select')"
          >
            <SvgIcon :size="18" type="mdi" :path="path.update" />
          </MapControlButton>
          <MapControlButton
            :active="method === 'delete'"
            @click="onSelectMethod('delete')"
          >
            <SvgIcon :size="18" type="mdi" :path="path.delete" />
          </MapControlButton>
        </MapControlGroupButton>
      </div>
      <div v-else></div>
    </template>
  </ModuleContainer>
</template>
<style scoped>
.d-flex {
  display: flex;
}
</style>
