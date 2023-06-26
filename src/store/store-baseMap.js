import { EVENTBUS_TYPE, eventBus, store } from "@hungpv97/vue-map-store";
import { getMap, initForMap } from "./store-map";

import { BaseMapLayer } from "@/components/Map/modules/BaseMapControl/model";

store.initStore("base_map_store", () => ({}));
initForCompare();
function initForCompare() {
  eventBus.on(EVENTBUS_TYPE.MAP.COMPARE, function ({ map_id, is_compare }) {
    if (!is_compare) {
      return;
    }
    let maps = getMap(map_id);
    if (Array.isArray(maps)) {
      let storeBaseMap = getStoreMap(map_id);
      let baseMap =
        storeBaseMap.current_baseMaps || baseMaps[getIndexDefault(map_id)];

      for (let index = 0; index < maps.length; index++) {
        const element = maps[index];
        setBaseMapForMap(element.id, baseMap);
      }
    }
  });
}
export function initMapBaseMap(mapId) {
  if (store.getStore().base_map_store[mapId]) {
    return;
  }
  let maps = getMap(mapId);
  store.getStore().base_map_store[mapId] =
    Array.isArray(maps) && maps.length > 0
      ? {
          baseMaps: [],
          is_compare: true
        }
      : {
          baseMaps: [],
          current_baseMaps: null,
          loading: false,
          defaultBaseMap: "",
          layer: null
        };
}
export const removeBaseMap = (mapId) => {
  delete store.getStore().base_map_store[mapId];
};

const getStoreMap = (id) => store.getStore().base_map_store[id] || {};
export const setBaseMaps = (mapId, baseMaps = []) => {
  getStoreMap(mapId).baseMaps = baseMaps;
  setBaseMapForMap(mapId, baseMaps[getIndexDefault(mapId)]);
};
export const baseMaps = (mapId) => getStoreMap(mapId).baseMaps;
export const getLoading = (mapId) => getStoreMap(mapId).loading;
export const getCurrentBaseMaps = (mapId) =>
  getStoreMap(mapId).current_baseMaps;

export const setDefaultValueForMap = (mapId, titleMap) => {
  let store = getStoreMap(mapId);
  store.defaultBaseMap = titleMap;
};
export const setBaseMapForMap = async (mapId, item) => {
  if (!item) return;
  let store = getStoreMap(mapId);
  if (store.loading) return;
  store.current_baseMaps = item;
  store.loading = true;
  let metadata = {
    loading: false
  };
  metadata.loading = true;
  if (!store.layer) {
    store.layer = new BaseMapLayer();
  }
  metadata.loading = true;

  eventBus.emit(EVENTBUS_TYPE.MAP.SET_BASEMAP, { mapId, baseMap: item });
  await getMap(mapId, async (map) => {
    await store.layer.removeFromMap(map);
  });
  await store.layer.setBaseMap(item);
  await getMap(mapId, async (map) => {
    store.layer.addToMap(map, getLowestLayerId(map));
  });
  store.loading = false;
  metadata.loading = false;
};
function getIndexDefault(mapId) {
  let store = getStoreMap(mapId);
  let defaultIndexBaseMap = store.baseMaps.findIndex(
    (b) => b.default || b.title === store.defaultBaseMap
  );
  return defaultIndexBaseMap < 0 ? 0 : defaultIndexBaseMap;
}
export function clearBaseMapForMap(mapId) {
  let store = getStoreMap(mapId);
  if (!store.layer) {
    return;
  }
  getMap(mapId, (map) => {
    store.layer.removeFromMap(map);
  });
}
function getLowestLayerId(map) {
  const layers = map.getStyle().layers;

  return layers.length > 0 ? layers[0].id : null;
}

initForMap(initMapBaseMap, removeBaseMap);
