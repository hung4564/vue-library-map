import { initMapBaseMap, removeBaseMap } from "./store-baseMap";
import { initMapListener, removeMapListener } from "./store-event";

import Vue from "vue";

if (!Vue.prototype.$_map_store) {
  Vue.prototype.$_map_store = {};
}
if (!Vue.prototype.$_map_object) {
  Vue.prototype.$_map_object = {};
}
export const setMap = (id, map) => {
  Vue.prototype.$_map_object[id] = map;
  initMapListener(id);
  initMapBaseMap(id);
  Vue.set(Vue.prototype.$_map_store, id, {
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

export default () => Vue.prototype.$_map_store;
