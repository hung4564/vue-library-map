import { computed, inject, onMounted, onUnmounted } from "vue";

import { getMap } from "@/store/store-map";

export const useMap = (onInit, onDestroy) => {
  let $map = inject("$map");
  let i_dragId = inject("dragId");
  let i_getMap = inject("getMap");
  let c_mapId = computed(() => $map.id);
  let bindModule = computed(() => ({
    mapId: c_mapId.value,
    dragId: i_dragId.value
  }));
  onMounted(() => {
    i_getMap(async (_map) => {
      if (onInit instanceof Function) {
        await onInit(_map);
      }
    });
  });
  onUnmounted(async () => {
    if (onDestroy instanceof Function) {
      getMap(c_mapId.value, onDestroy);
    }
  });
  function callMap(cb) {
    getMap(c_mapId.value, cb);
  }
  return {
    c_mapId,
    bindModule,
    callMap,
    $map,
    trans: $map.trans
  };
};
