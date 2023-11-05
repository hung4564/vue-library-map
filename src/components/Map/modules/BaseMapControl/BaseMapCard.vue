<template lang="">
  <div class="base-map-card">
    <div class="base-map-card__image">
      <map-image :src="current_baseMaps.thumbnail"> </map-image>
    </div>
    <div class="base-map-card__content">
      <div>
        {{ title || trans("map.basemap.title") }}
      </div>
      <div>
        <inputSelect
          :value="current_baseMaps"
          :items="c_baseMaps"
          returnObject
          itemText="title"
          itemValue="id"
          @input="onChangeBaseMap"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed, defineProps, ref } from "vue";
import MapImage from "../../../MapImage.vue";
import {
  baseMaps,
  getCurrentBaseMaps,
  setBaseMapForMap
} from "@/store/store-baseMap";
import { inputSelect } from "@/components/input";
import { useMap } from "../../mixins/useMap";
import eventBus, { EVENTBUS_TYPE } from "@/utils/event-bus";
const props = defineProps({
  mapId: { type: String, required: true },
  title: {
    type: String,
    default: ""
  }
});
const current_baseMaps = ref({});
const bindEventSetBaseMap = function ({ mapId, baseMap }) {
  if (props.mapId === mapId) {
    current_baseMaps.value = baseMap;
  }
};
const onInit = () => {
  bindEventSetBaseMap({
    mapId: props.mapId,
    baseMap: getCurrentBaseMaps(props.mapId)
  });
  eventBus.on(EVENTBUS_TYPE.MAP.SET_BASEMAP, bindEventSetBaseMap);
};
const onDestroy = () => {
  eventBus.off(EVENTBUS_TYPE.MAP.SET_BASEMAP, bindEventSetBaseMap);
};
const { trans } = useMap(onInit, onDestroy);
// const current_baseMaps = computed(() => {
//   return getCurrentBaseMaps(props.mapId);
// });
const c_baseMaps = computed(() => {
  return baseMaps(props.mapId);
});
const onChangeBaseMap = (base_map) => {
  setBaseMapForMap(props.mapId, base_map);
};
</script>
<style lang="scss" scoped>
.base-map-card {
  display: flex;
  padding: 10px;
  .base-map-card__image {
    width: 70px;
    height: 70px;
    flex-grow: 0;
    flex-shrink: 0;
  }
  .base-map-card__content {
    flex-grow: 1;
    padding: 4px 10px;
    & > *:not(:first-child) {
      padding-top: 4px;
    }
  }
}
</style>
