import { createLayer, getLayerData } from "./store-datasource";

import { BaseMapLayer } from "@/model/data/custom/BaseMapLayer";
import { LayerBuild } from "@/model";
import Vue from "vue";
import { getMap } from "./store-map";

export const BASEMAP_PREFIX = "base_map_control";

if (!Vue.prototype.$_hungpv_map.base_map_store) {
  Vue.prototype.$_hungpv_map.base_map_store = new Vue.observable({});
}
if (!Vue.prototype.$_hungpv_map.base_map_object) {
  Vue.prototype.$_hungpv_map.base_map_object = {};
}

export function initMapBaseMap(mapId) {
  Vue.prototype.$_hungpv_map.base_map_object[mapId] = {};
  Vue.set(Vue.prototype.$_hungpv_map.base_map_store, mapId, {
    baseMaps: [],
    current_baseMaps: null,
    loading: false,
    defaultBaseMap: "",
    layer: null
  });
}
export const removeBaseMap = (mapId) => {
  delete Vue.prototype.$_hungpv_map.base_map_object[mapId];
  Vue.delete(Vue.prototype.$_hungpv_map.base_map_store, mapId);
};

const getStoreMap = (id) => Vue.prototype.$_hungpv_map.base_map_store[id] || {};
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
  store.current_baseMaps = item;
  store.loading = true;
  let map = getMap(mapId);
  let metadata = {
    loading: false
  };
  metadata.loading = true;
  if (!store.layer) {
    let layer = new LayerBuild();
    layer.disableDelete();
    layer
      .setInfo({
        name: "BaseMap",
        menus: []
      })
      .setMetadata(metadata)
      .setCreateData((info) => new BaseMapLayer(info));
    store.layer = createLayer(map.id, layer.build(), { hidden: true });
  }
  getLayerData(store.layer, async (map, layer) => {
    metadata.loading = true;
    layer.removeFromMap(map);
    await layer.setBaseMap(item);
    layer.addToMap(map, getLowestLayerId(map));
    store.loading = false;
    metadata.loading = false;
  });
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
    let layer = getLayerData(store.layer);
    layer.removeFromMap(map);
  });
}
function getLowestLayerId(map) {
  const layers = map.getStyle().layers;

  return layers.length > 0 ? layers[0].id : null;
}
