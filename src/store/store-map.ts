import eventBus, { EVENTBUS_TYPE } from "@/utils/event-bus";
import { getStore, initStore } from "./store";

import { MapSimple } from "../interface/map";

initStore("store", () => ({}));
initStore("object", () => ({}));

const MAP_STORE = getStore("store");
const MAP_OBJECT_STORE = getStore("object");
const CALL_WHEN_MAP_INIT: Function[] = [];
const CALL_WHEN_MAP_DESTROY: Function[] = [];
export const setMap = (id: string, map: MapSimple) => {
  MAP_OBJECT_STORE[id] = map;
  eventBus.emit(EVENTBUS_TYPE.MAP.INIT, id);
  MAP_STORE[id] = {
    sidebar_count: { left_count: 0, right_count: 0 }
  };
};
export const getStoreMap = (id: string) => MAP_STORE[id] || {};
export const setSideBarCount = (
  id: string,
  { left_count = 0, right_count = 0 } = {}
) => {
  const store = getStoreMap(id);
  if (!store) {
    return;
  }
  store.sidebar_count.left_count = left_count;
  store.sidebar_count.right_count = right_count;
};
export const getSideBarCount = (id: string) => {
  const store = getStoreMap(id);
  if (!store) {
    return;
  }
  return store.sidebar_count;
};
export const removeMap = (id: string) => {
  delete MAP_OBJECT_STORE[id];
  delete MAP_STORE[id];
  delete getStore("store")[id];
  eventBus.emit(EVENTBUS_TYPE.MAP.DESTROY, id);
};
export const getMap = (id: string | MapSimple, cb?: Function) => {
  if (!id) return;
  let map = id;
  if (typeof id !== "string") {
    id = (map as MapSimple).id;
  }
  if (id && MAP_OBJECT_STORE[id]) {
    map = MAP_OBJECT_STORE[id];
  }
  if (!map) return;
  if (cb) {
    if (Array.isArray(map)) {
      const promises: Promise<any>[] = [];
      map.forEach((x) => {
        promises.push(cb(x));
      });

      return Promise.all(promises);
    } else if (map) {
      return cb(map);
    }
  }
  return map;
};

export const initForMap = (cb_init: Function, cb_destroy: Function) => {
  if (cb_init) {
    CALL_WHEN_MAP_INIT.push(cb_init);
  }
  if (cb_destroy) {
    CALL_WHEN_MAP_DESTROY.push(cb_destroy);
  }

  for (const key in MAP_STORE) {
    if (Object.hasOwnProperty.call(MAP_STORE, key)) {
      cb_init(key);
    }
  }
};

eventBus.on(EVENTBUS_TYPE.MAP.DESTROY, (id: string) => {
  CALL_WHEN_MAP_DESTROY.forEach((cb) => {
    cb(id);
  });
});

eventBus.on(EVENTBUS_TYPE.MAP.INIT, (id: string) => {
  CALL_WHEN_MAP_INIT.forEach((cb) => {
    cb(id);
  });
});
