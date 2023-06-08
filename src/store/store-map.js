import eventBus, { EVENTBUS_TYPE } from "@/utils/event-bus";

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
  eventBus.emit(EVENTBUS_TYPE.MAP.INIT, id);
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
  eventBus.emit(EVENTBUS_TYPE.MAP.DESTROY, id);
};
export const getMap = (id, cb = null) => {
  if (!id) return;
  let map = id;
  if (typeof id != "string") {
    id = map.id;
  }
  if (id && Vue.prototype.$_hungpv_map.object[id]) {
    map = Vue.prototype.$_hungpv_map.object[id];
  }
  if (!map) return;
  if (cb) {
    if (Array.isArray(map)) {
      map.forEach(cb);
    } else if (map) {
      cb(map);
    }
  }
  return map;
};

export const getStoreMap = (id) => Vue.prototype.$_hungpv_map.store[id] || {};

export default () => Vue.prototype.$_hungpv_map.store;

export const initForMap = (cb_init, cb_destroy) => {
  if (cb_init) {
    eventBus.on(EVENTBUS_TYPE.MAP.INIT, function (id) {
      cb_init(id);
    });
  }
  for (const key in Vue.prototype.$_hungpv_map.store) {
    if (Object.hasOwnProperty.call(Vue.prototype.$_hungpv_map.store, key)) {
      cb_init(key);
    }
  }
  if (cb_destroy)
    eventBus.on(EVENTBUS_TYPE.MAP.DESTROY, function (id) {
      cb_destroy(id);
    });
};
