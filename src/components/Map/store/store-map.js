import { initMapBaseMap, removeBaseMap } from "./store-baseMap";
import { initMapListener, removeMapListener } from "./store-event";

import Vue from "vue";

if (!Vue.prototype.$_map_store) {
  Vue.prototype.$_map_store = new Vue.observable({});
}
if (!Vue.prototype.$_map_object) {
  Vue.prototype.$_map_object = {};
}
export const setMap = (id, map) => {
  Vue.prototype.$_map_object[id] = map;
  initMapListener(id);
  initMapBaseMap(id);
  Vue.set(Vue.prototype.$_map_store, id, {
    sources: [],
    layers: []
  });
};
export const removeMap = (id) => {
  delete Vue.prototype.$_map_object[id];
  Vue.delete(Vue.prototype.$_map_store, id);
  removeBaseMap(id);
  removeMapListener(id);
};
export const getMap = (id) => {
  if (typeof id != "string") return id;
  return Vue.prototype.$_map_object[id] || {};
};

export const getStoreMap = (id) => Vue.prototype.$_map_store[id] || {};

//style

export const getSources = (mapId) => getStoreMap(mapId).sources;

export const getSource = (mapId, sourceId) => {
  return getSources(mapId).find((x) => x.id == sourceId);
};

export const addSource = (mapId, source) => {
  getSources(mapId).unshift(source);
};
export const updateSource = (mapId, source) => {
  let sources = getSources(mapId);
  let index = sources.findIndex((x) => x.id == source.id);
  if (index < 0) return;
  // state.sources[index] = source;
  Vue.set(Vue.prototype.$_map_store[mapId].sources, index, source);
};
export const setSources = (mapId, sources) => {
  Vue.set(Vue.prototype.$_map_store[mapId], "sources", sources);
};
export const removeSource = (mapId, source) => {
  let sources = getSources(mapId);
  let index = sources.findIndex((x) => x.id == source.id);
  if (index < 0) return;
  source = sources[index];
  source.removeFromMap(getMap(mapId));
  sources.splice(index, 1);
};
export const getLayerIdShow = (mapId) =>
  getLayers(mapId)
    .filter(
      (layer) =>
        !layer.style.layout ||
        !layer.style.layout.visibility ||
        layer.style.layout.visibility == "visible"
    )
    .map((x) => x.id);
export const getLayers = (mapId) => getStoreMap(mapId).layers;
export const getLayer = (mapId, layerID) => {
  return getLayers(mapId).find((x) => x.id == layerID);
};
export const addLayers = (mapId, layers) => {
  layers = layers.concat(getLayers(mapId));
  setLayers(mapId, layers);
};

export const setLayers = (mapId, layers) => {
  layers
    .slice()
    .reverse()
    .forEach((item) => item.addToMap(getMap(mapId)));
  Vue.set(Vue.prototype.$_map_store[mapId], "layers", layers);
};
export const removeLayer = (mapId, layer) => {
  let layers = getLayers(mapId);
  let index = layers.findIndex((x) => x.id == layer.id);
  if (index < 0) return;
  layer = layers[index];
  layer.removeFromMap(getMap(mapId));
  layers.splice(index, 1);
};

export default () => Vue.prototype.$_map_store;
