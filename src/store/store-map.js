import { initLayerStore, removeLayerStore } from "./store-datasource";
import { initMapBaseMap, removeBaseMap } from "./store-baseMap";
import { initMapListener, removeMapListener } from "./store-event";

import Vue from "vue";

if (!Vue.prototype.$_hungpv_map) {
  Vue.prototype.$_hungpv_map = {};
}
if (!Vue.prototype.$_hungpv_map.store) {
  Vue.prototype.$_hungpv_map.store = {};
}
if (!Vue.prototype.$_hungpv_map.object) {
  Vue.prototype.$_hungpv_map.object = {};
}
export const setMap = (id, map) => {
  Vue.prototype.$_hungpv_map.object[id] = map;
  initMapListener(id);
  initMapBaseMap(id);
  initLayerStore(id);
  Vue.set(Vue.prototype.$_hungpv_map.store, id, {
    sidebar_count: { left_count: 0, right_count: 0 }
  });
};
export const setSideBarCount = (
  id,
  { left_count = 0, right_count = 0 } = {}
) => {
  let store = getStoreMap(id);
  if (!store) {
    return;
  }
  store.sidebar_count.left_count = left_count;
  store.sidebar_count.right_count = right_count;
};
export const getSideBarCount = (id) => {
  let store = getStoreMap(id);
  if (!store) {
    return;
  }
  return store.sidebar_count;
};
export const removeMap = (id) => {
  delete Vue.prototype.$_hungpv_map.object[id];
  Vue.delete(Vue.prototype.$_hungpv_map.store, id);
  removeBaseMap(id);
  removeMapListener(id);
  removeLayerStore(id);
};
export const getMap = (id, cb = null) => {
  let map = id;
  if (typeof id != "string") {
    id = map.id;
  }
  if (id && Vue.prototype.$_hungpv_map.object[id]) {
    map = Vue.prototype.$_hungpv_map.object[id];
  }
  if (cb) {
    if (Array.isArray(map)) {
      map.forEach(cb);
    } else {
      cb(map);
    }
  }
  return map;
};

export const getStoreMap = (id) => Vue.prototype.$_hungpv_map.store[id] || {};

export default () => Vue.prototype.$_hungpv_map.store;
