import EventBus, { EVENTBUS_TYPE } from "@/utils/event-bus";

import Vue from "vue";
import { createDefaultViewInMap } from "@/model/map";
import {
  convertToCompareViewInList,
  convertToSingleViewInList,
  createDefaultCompareViewInList,
  createDefaultViewInList
} from "@/model/list";
import { getMap, initForMap } from "./store-map";
import { Layer } from "@/model/Layer";
if (!Vue.prototype.$_hungpv_map.layer_control_store_layers) {
  Vue.prototype.$_hungpv_map.layer_control_store_layers = {};
}
if (!Vue.prototype.$_hungpv_map.layer_control_store) {
  Vue.prototype.$_hungpv_map.layer_control_store = new Vue.observable({});
}
export function initLayerStore(mapId) {
  if (!Vue.prototype.$_hungpv_map.layer_control_store_layers[mapId])
    Vue.prototype.$_hungpv_map.layer_control_store_layers[mapId] = {};
  if (!Vue.prototype.$_hungpv_map.layer_control_store[mapId])
    Vue.set(Vue.prototype.$_hungpv_map.layer_control_store, mapId, {
      layers_view: []
    });
}
export const removeLayerStore = (mapId) => {
  delete Vue.prototype.$_hungpv_map.layer_control_store_layers[mapId];
  Vue.delete(Vue.prototype.$_hungpv_map.layer_control_store, mapId);
};
function getDataStore(mapId) {
  if (!Vue.prototype.$_hungpv_map.layer_control_store_layers[mapId]) {
    Vue.prototype.$_hungpv_map.layer_control_store_layers[mapId] = {};
  }
  return Vue.prototype.$_hungpv_map.layer_control_store_layers[mapId];
}
function getStore(mapId) {
  if (!Vue.prototype.$_hungpv_map.layer_control_store[mapId]) {
    Vue.prototype.$_hungpv_map.layer_control_store[mapId] = {};
  }
  return Vue.prototype.$_hungpv_map.layer_control_store[mapId];
}
export const layersView = (mapId) => {
  return getStore(mapId).layers_view;
};
export function setLayersView(mapId, layers) {
  getStore(mapId).layers_view = layers;
}

export function setLayerDataForStore(mapId, dataId, layer) {
  getDataStore(mapId)[dataId] = layer;
}

export function getLayerDataForStore(mapId, dataId) {
  return getDataStore(mapId)[dataId];
}

export function createLayer(
  mapId,
  info,
  { isLast = false, hidden = false, disableAddToMap = false } = {}
) {
  if (info.metadata == null) {
    info.metadata = {
      loading: false,
      bounds: null
    };
  }
  if (info.metadata.loading == null) {
    info.metadata.loading = false;
  }
  if (info.metadata.bounds == null) {
    info.metadata.bounds = null;
  }
  let createViewInList = (info) => {
    return createDefaultViewInList(info);
  };
  let map = getMap(mapId);
  if (map && map.length > 1) {
    createViewInList = (info) => {
      return new createDefaultCompareViewInList(info, map);
    };
  }

  let createViewInMap = (info) => {
    return new createDefaultViewInMap(info);
  };

  if (info.createViewInMap) {
    createViewInMap = info.createViewInMap;
  }
  let view_in_list = createViewInList(info);
  let view_in_map = createViewInMap(info);
  let layer = new Layer();
  layer.addView(view_in_list, view_in_map);
  if (info.views) {
    layer.addView(...layer.views);
  }
  setLayerDataForStore(mapId, layer.id, layer);

  layer.setMapId(mapId);
  if (!disableAddToMap)
    getMap(mapId, (map) => {
      layer.addToMap(map);
    });

  if (!hidden) {
    let func_add = isLast ? "push" : "unshift";
    getStore(mapId).layers_view[func_add](view_in_list);
    EventBus.emit(EVENTBUS_TYPE.MAP.SET_LAYER, view_in_list);
  }

  return view_in_list;
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
  let temp = getLayerDataForStore(layer_view.map_id, layer_view.data_id);
  if (!temp) return;
  if (cb) {
    let promises = [];
    getMap(layer_view.map_id, (map, index) => {
      promises.push(cb(map, temp, index));
    });
    return Promise.all(promises);
  }
  return temp;
}

initForMap(initLayerStore, removeLayerStore);
EventBus.on(EVENTBUS_TYPE.MAP.COMPARE, function ({ map_id, is_compare }) {
  let layers = getDataStore(map_id);
  let layer_views = layersView(map_id);
  if (is_compare) {
    let maps = getMap(map_id);

    setLayersView(
      map_id,
      layer_views.map((layer) => convertToCompareViewInList(layer, maps))
    );
    for (const [, layer] of Object.entries(layers)) {
      if (layer.map_id === map_id) {
        maps.forEach((map) => {
          if (!layer.isHasMapId(map.id)) {
            layer.addToMap(map);
          }
        });
      }
    }
  } else {
    setLayersView(
      map_id,
      layer_views.map((layer) => convertToSingleViewInList(layer))
    );
  }
  EventBus.emit(EVENTBUS_TYPE.MAP.UPDATE_LAYERS, map_id);
});
