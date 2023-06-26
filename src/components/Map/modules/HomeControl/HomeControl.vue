<script setup>
import { mdiHome } from "@mdi/js";
import ModuleContainer from "@components/Map/ModuleContainer.vue";
import MapControlButton from "@components/Map/control/MapControlButton.vue";
import { useMap } from "@components/Map/mixins/useMap";
import { ref } from "vue";
import SvgIcon from "@jamescoyle/vue-icon";
const center = ref({
  lat: 0,
  lng: 0
});
const zoom = ref(0);
const { callMap, $map } = useMap(onInit);

function onGoHome() {
  callMap((map) => {
    map.setZoom(zoom.value);
    map.setCenter(center.value);
  });
}
function onInit(_map) {
  center.value = _map.getCenter();
  zoom.value = _map.getZoom();
}
</script>
<template>
  <ModuleContainer>
    <template #btn>
      <MapControlButton
        @click="onGoHome"
        :tooltip="$map.trans('map.home.title')"
      >
        <SvgIcon :size="18" type="mdi" :path="mdiHome" />
      </MapControlButton>
    </template>
    <slot />
  </ModuleContainer>
</template>
