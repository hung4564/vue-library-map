import EventBus, { EVENTBUS_TYPE } from "@/utils/event-bus";

import Vue from "vue";
import { createDefaultData } from "@/model/data";
import { createDefaultView } from "@/model/view";
import { getMap } from "./store-map";

if (!Vue.prototype.$_hungpv_map_layer_control_store_layers) {
  Vue.prototype.$_hungpv_map_layer_control_store_layers = {};
}
if (!Vue.prototype.$_hungpv_map_layer_control_store) {
  Vue.prototype.$_hungpv_map_layer_control_store = new Vue.observable({
    layers_view: []
  });
}
export function initLayerStore(mapId) {
  Vue.prototype.$_hungpv_map_layer_control_store_layers[mapId] = {};
  Vue.set(Vue.prototype.$_hungpv_map_layer_control_store, mapId, {
    layers_view: []
  });
}
export const removeLayerStore = (mapId) => {
  delete Vue.prototype.$_hungpv_map_layer_control_store_layers[mapId];
  Vue.delete(Vue.prototype.$_hungpv_map_layer_control_store, mapId);
};
function getDataStore(mapId) {
  if (!Vue.prototype.$_hungpv_map_layer_control_store_layers[mapId]) {
    Vue.prototype.$_hungpv_map_layer_control_store_layers[mapId] = {};
  }
  return Vue.prototype.$_hungpv_map_layer_control_store_layers[mapId];
}
function getStore(mapId) {
  if (!Vue.prototype.$_hungpv_map_layer_control_store[mapId]) {
    Vue.prototype.$_hungpv_map_layer_control_store[mapId] = {};
  }
  return Vue.prototype.$_hungpv_map_layer_control_store[mapId];
}
export const layersView = (mapId) => {
  return getStore(mapId).layers_view;
};
export function setLayersView(mapId, layers) {
  getStore(mapId).layers_view = layers;
}
export function createLayer(
  mapId,
  layer,
  { isLast = false, hidden = false } = {}
) {
  if (layer.metadata == null) {
    layer.metadata = {
      loading: false,
      bounds: null
    };
  }
  if (layer.metadata.loading == null) {
    layer.metadata.loading = false;
  }
  if (layer.metadata.bounds == null) {
    layer.metadata.bounds = null;
  }
  let createView = (info) => {
    return createDefaultView(info);
  };
  if (layer.createView) {
    createView = layer.createView;
  }
  let createData = (info) => {
    return new createDefaultData(info);
  };
  if (layer.createData) {
    createData = layer.createData;
  }
  let temp = createData(layer);
  getDataStore(mapId)[temp.id] = temp;

  layer.data_id = temp.id;
  layer.map_id = mapId;
  let layer_view = createView(layer);
  layer_view.data_id = temp.id;
  layer_view.map_id = mapId;
  temp.addView(layer_view);
  if (layer.views && layer.views.length > 0) temp.addView(...layer.views);
  getMap(mapId, (map) => {
    temp.addToMap(map);
  });
  if (!hidden) {
    let func_add = isLast ? "push" : "unshift";
    getStore(mapId).layers_view[func_add](layer_view);
    EventBus.emit(EVENTBUS_TYPE.MAP.SET_LAYER, layer_view);
  }
  return layer_view;
}

export function toggleLayerShow(mapId, layer_view) {
  let temp = getDataStore(mapId)[layer_view.data_id];
  if (!temp) return;
  getMap(mapId, (map) => {
    temp.toggleShow(map, layer_view.show);
  });
}
export function updateLayerSimple(mapId, layer) {
  let temp = getDataStore(mapId)[layer.data_id];
  if (!temp) return;
  getMap(mapId, (map) => {
    temp.toggleShow(map, layer.show);
    if (!layer.disabled_opacity) temp.setOpacity(map, layer.opacity);
  });
}
export function toggleShow(mapId, layer) {
  let temp = getDataStore(mapId)[layer.data_id];
  if (!temp) return;
  getMap(mapId, (map) => {
    temp.toggleShow(map, layer.show);
  });
}
export function updateLayerStyle(mapId, layer) {
  let temp = getDataStore(mapId)[layer.data_id];
  if (!temp) return;
  getMap(mapId, (map) => {
    temp.setStyle(map, layer.style);
  });
}

export function removeLayer(mapId, layer_view) {
  let temp = getDataStore(mapId)[layer_view.data_id];
  if (getStore(mapId) && getStore(mapId).layers_view)
    getStore(mapId).layers_view = getStore(mapId).layers_view.filter(
      (x) => x.id !== layer_view.id
    );
  getDataStore(mapId)[layer_view.data_id] = undefined;
  EventBus.emit(EVENTBUS_TYPE.MAP.REMOVE_LAYER, layer_view);
  if (!temp) return;

  getMap(mapId, (map) => {
    temp.removeFromMap(map);
  });
}
export function getLayerData(layer_view, cb) {
  let temp = getDataStore(layer_view.map_id)[layer_view.data_id];
  if (!temp) return;
  if (cb) {
    getMap(layer_view.map_id, (map) => {
      cb(map, temp);
    });
  }
  return temp;
}
