import Vue from "vue";
import { getMap } from "./store-map";
import { getUUIDv4 } from "@/utils";
if (!Vue.prototype.$_hungpv_map.event_store) {
  Vue.prototype.$_hungpv_map.event_store = {};
}
if (!Vue.prototype.$_hungpv_map.event_bind) {
  Vue.prototype.$_hungpv_map.event_bind = {};
}
export function initMapListener(mapId) {
  Vue.prototype.$_hungpv_map.event_store[mapId] = {};
  Vue.prototype.$_hungpv_map.event_bind[mapId] = {};
}
export const removeMapListener = (mapId) => {
  delete Vue.prototype.$_hungpv_map.event_store[mapId];
  delete Vue.prototype.$_hungpv_map.event_bind[mapId];
};
export function addListenerMap(mapId, event, cb) {
  let { name, handle } = cb;
  let uuid = getUUIDv4();
  let id = `event-${uuid}`;
  if (!handle) {
    name = `Event ${uuid}`;
    handle = cb;
  }
  let mapListener = getMapListener(mapId, event);
  let items = mapListener.items;
  items.unshift({ id, handle, name });
  let map = getMap(mapId);
  setMapEvent(map, event);
  return id;
}
export function removeListenerMap(mapId, event, eventId) {
  let mapListener = getMapListener(mapId, event);
  mapListener.items = mapListener.items.filter((x) => x.id !== eventId);
  let items = mapListener.items;
  if (!items || items.length == 0) {
    let map = getMap(mapId);
    removeMapEvent(map, event);
  }
  return eventId;
}
export function getMapListener(mapId, event) {
  if (!Vue.prototype.$_hungpv_map.event_store[mapId]) {
    Vue.prototype.$_hungpv_map.event_store[mapId] = {
      items: []
    };
  }
  if (!Vue.prototype.$_hungpv_map.event_store[mapId][event]) {
    Vue.prototype.$_hungpv_map.event_store[mapId][event] = {
      items: []
    };
  }
  return Vue.prototype.$_hungpv_map.event_store[mapId][event];
}
function setMapEvent(map, event) {
  let mapId = map.id;
  if (!Vue.prototype.$_hungpv_map.event_store[mapId]) {
    Vue.prototype.$_hungpv_map.event_store[mapId] = {};
  }
  if (!Vue.prototype.$_hungpv_map.event_bind[mapId][event]) {
    let handle = function (mapId, event, e) {
      let mapListener = getMapListener(mapId, event);
      let items = mapListener.items;
      let first_cb = items[0];
      if (!first_cb) return;
      first_cb.handle(e);
    };
    Vue.prototype.$_hungpv_map.event_bind[mapId][event] = handle.bind(
      null,
      map.id,
      event
    );
  }
  map.on(event, Vue.prototype.$_hungpv_map.event_bind[mapId][event]);
}
function removeMapEvent(map, event) {
  let mapId = map.id;
  if (
    Vue.prototype.$_hungpv_map.event_bind[mapId] &&
    Vue.prototype.$_hungpv_map.event_bind[mapId][event]
  )
    map.off(event, Vue.prototype.$_hungpv_map.event_bind[mapId][event]);
}
