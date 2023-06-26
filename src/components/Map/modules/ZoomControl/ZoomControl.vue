<template>
  <ModuleContainer>
    <template #btn>
      <MapControlGroupButton>
        <MapControlButton
          v-if="showCompass"
          :title="$map.trans('map.action.navigation-control-reset-bearing')"
          @click="onResetBearing"
        >
          <svg
            height="22"
            :style="{ transform: transform }"
            viewBox="0 0 24 24"
            width="22"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g fill="none" fill-rule="evenodd">
              <path d="M0 0h24v24H0z"></path>
              <path d="M12 3l4 8H8z" fill="#f44336"></path>
              <path d="M12 21l-4-8h8z" fill="#9E9E9E"></path>
            </g>
          </svg>
        </MapControlButton>
        <MapControlButton
          v-if="showZoom"
          :title="$map.trans('map.action.navigation-control-zoom-in')"
          @click="onZoomIn"
        >
          <SvgIcon :size="18" type="mdi" :path="path.plus" />
        </MapControlButton>
        <MapControlButton
          v-if="showZoom"
          :title="$map.trans('map.action.navigation-control-zoom-out')"
          @click="onZoomOut"
        >
          <SvgIcon :size="18" type="mdi" :path="path.minus" />
        </MapControlButton>
      </MapControlGroupButton>
    </template>
    <slot />
  </ModuleContainer>
</template>

<script setup>
import { mdiPlus, mdiMinus } from "@mdi/js";
import SvgIcon from "@jamescoyle/vue-icon";
import ModuleContainer from "@components/Map/ModuleContainer.vue";
import MapControlButton from "@components/Map/control/MapControlButton.vue";
import MapControlGroupButton from "@/components/Map/control/MapControlGroupButton.vue";
import { useMap } from "@components/Map/mixins/useMap";
import { ref, defineProps } from "vue";
const path = {
  plus: mdiPlus,
  minus: mdiMinus
};
const props = defineProps({
  showCompass: { type: Boolean, default: true },
  showZoom: { type: Boolean, default: true }
});
const transform = ref("rotate(0deg)");
const { callMap, $map } = useMap(onInit, onDestroy);
let bindSyncRotate = null;
function onInit(_map) {
  bindSyncRotate = syncRotate.bind(null, _map);
  _map.on("rotate", bindSyncRotate);
}
function onDestroy(_map) {
  _map.off("rotate", bindSyncRotate);
}
function onZoomIn(e) {
  callMap((map) => {
    map.zoomIn({}, { originalEvent: e });
  });
}
function onZoomOut(e) {
  callMap((map) => {
    map.zoomOut({}, { originalEvent: e });
  });
}
function onResetBearing() {
  callMap((map) => {
    map.easeTo({ bearing: 0, pitch: 0 });
  });
}
function syncRotate(_map) {
  const angle = _map.getBearing() * -1;
  transform.value = `rotate(${angle}deg)`;
}
</script>
