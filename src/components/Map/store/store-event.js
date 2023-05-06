import Vue from "vue";
import { getMap } from "./store-map";

if (!Vue.prototype.$_map_event_store) {
  Vue.prototype.$_map_event_store = new Vue.observable({});
}
export function initMapListener(mapId) {
  Vue.prototype.$_map_event_store[mapId] = {};
}
export function getMapListener(mapId, event) {
  if (!Vue.prototype.$_map_event_store[mapId][event]) {
    Vue.prototype.$_map_event_store[mapId][event] = {
      items: [],
      listener: null
    };
  }
  return Vue.prototype.$_map_event_store[mapId][event];
}
export const removeMapListener = (mapId) => {
  delete Vue.prototype.$_map_event_store[mapId];
};
export function addListenerMap(mapId, eventId, cb, event = "click") {
  let mapListener = getMapListener(mapId, event);
  let map = getMap(mapId);
  let items = mapListener.items;
  items.unshift({ id: eventId, cb });
  mapListener.listener = (e) => {
    let first = items[0];
    if (first) first.cb(e);
  };
  map.on(event, mapListener.listener);
}
export function removeListenerMap(mapId, eventId, event = "click") {
  let mapListener = getMapListener(mapId, event);
  if (!mapListener) return;
  let items = mapListener.items;
  if (!items || items.length < 1) {
    return;
  }
  let index = items.findIndex((x) => x.id == eventId);
  if (index !== -1) {
    items.splice(index, 1);
  }
  if (!items || items.length < 1) {
    let map = getMap(mapId);
    map.off(event, mapListener.listener);
  }
}
