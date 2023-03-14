import Vue from "vue";
import axios from "axios";
import { getMap } from "./store-map";

export const BASEMAP_PREFIX = "base_map_control";

if (!Vue.prototype.$_map_base_map_store) {
  Vue.prototype.$_map_base_map_store = new Vue.observable({});
}
if (!Vue.prototype.$_map_base_map_object) {
  Vue.prototype.$_map_base_map_object = {};
}

export function initMapBaseMap(mapId) {
  Vue.prototype.$_map_base_map_object[mapId] = {};
  Vue.set(Vue.prototype.$_map_base_map_store, mapId, {
    baseMaps: [],
    current_baseMaps: null,
    loading: false,
    sourceIds: [],
    layerIds: [],
    defaultBaseMap: ""
  });
}
export const removeBaseMap = (mapId) => {
  delete Vue.prototype.$_map_base_map_object[mapId];
  Vue.delete(Vue.prototype.$_map_base_map_store, mapId);
};

const getStoreMap = (id) => Vue.prototype.$_map_base_map_store[id] || {};
export const setBaseMaps = (mapId, baseMaps = []) => {
  getStoreMap(mapId).baseMaps = baseMaps;
  setBaseMapForMap(mapId, baseMaps[getIndexDefault(mapId)]);
};
export const baseMaps = (mapId) => getStoreMap(mapId).baseMaps;
export const getLoading = (mapId) => getStoreMap(mapId).loading;
export const getCurrentBaseMaps = (mapId) =>
  getStoreMap(mapId).current_baseMaps;
export const clearBaseMapForMap = (mapId) => {
  let store = getStoreMap(mapId);
  let map = getMap(mapId);
  if (!store || !map) return;
  for (const layerId of store.layerIds) {
    if (map.getLayer(layerId)) {
      map.removeLayer(layerId);
    }

    if (map.getSource(layerId)) {
      map.removeSource(layerId);
    }
  }

  for (const sourceId of store.sourceIds) {
    if (map.getSource(sourceId)) {
      map.removeSource(sourceId);
    }
  }

  store.layerIds = [];
  store.sourceIds = [];
};
export const setDefaultValueForMap = (mapId, titleMap) => {
  let store = getStoreMap(mapId);
  store.defaultBaseMap = titleMap;
};
export const setBaseMapForMap = async (mapId, item) => {
  if (!item) return;
  let store = getStoreMap(mapId);
  clearBaseMapForMap(mapId);
  store.current_baseMaps = item;
  store.loading = true;
  await getLoader(item.type)(mapId, item);
  store.loading = false;
};
function getLoader(type) {
  switch (type) {
    case "vector":
      return loadVector;
    case "raster":
      return loadRaster;
    default:
      throw new Error(`Not support ${type}`);
  }
}
async function loadVector(mapId, item) {
  let store = getStoreMap(mapId);
  let map = getMap(mapId);
  const res = await axios(item.links[0]);

  // Add sources
  for (const id in res.data.sources) {
    const sourceId = BASEMAP_PREFIX + id;

    map.addSource(sourceId, res.data.sources[id]);
    store.sourceIds.push(sourceId);
  }

  // Add layers
  const lowestLayerId = getLowestLayerId(map);
  for (const layer of res.data.layers) {
    const layerId = BASEMAP_PREFIX + layer.id;
    const sourceId = BASEMAP_PREFIX + layer.source;

    map.addLayer(
      Object.assign(layer, {
        id: layerId,
        source: sourceId,
        metadata: {
          hidden: true
        }
      }),
      lowestLayerId
    );
    store.layerIds.push(layerId);
  }
}
function loadRaster(mapId, item) {
  if (!item) throw new Error("Not found item");
  let map = getMap(mapId);
  let store = getStoreMap(mapId);

  let layerId = `${BASEMAP_PREFIX}-${item.id}-${item.title}-layer`;
  let sourceId = `${BASEMAP_PREFIX}-${item.id}-${item.title}-source`;
  map.addSource(sourceId, {
    type: "raster",
    tiles: item.links,
    maxzoom: item.maxzoom || 22,
    minzoom: item.minzoom || 0,
    tileSize: item.tileSize || 256
  });

  map.addLayer(
    {
      id: layerId,
      type: "raster",
      source: sourceId,
      metadata: {
        hidden: true
      }
    },
    getLowestLayerId(map)
  );
  store.sourceIds.push(sourceId);

  store.layerIds.push(layerId);
}
function getLowestLayerId(map) {
  const layers = map.getStyle().layers;

  return layers.length > 0 ? layers[0].id : null;
}
function getIndexDefault(mapId) {
  let store = getStoreMap(mapId);
  let defaultIndexBaseMap = store.baseMaps.findIndex(
    (b) => b.default || b.title === store.defaultBaseMap
  );
  return defaultIndexBaseMap < 0 ? 0 : defaultIndexBaseMap;
}
