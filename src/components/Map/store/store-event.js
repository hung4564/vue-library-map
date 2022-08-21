import { getMap } from "./store-map";

const LISTENER = {};
const LAYER_LISTENER = {};
export function initMapListener(mapId) {
  LISTENER[mapId] = {};
}
export function getMapListener(mapId, event) {
  if (!LISTENER[mapId][event]) {
    LISTENER[mapId][event] = {
      listener: [],
      listenerObject: {},
      currentListener: ""
    };
  }
  return LISTENER[mapId][event];
}
export const removeMapListener = (mapId) => {
  delete LISTENER[mapId];
};
export function checkListenerMap(mapId, event, eventId) {
  return getMapListener(mapId, event).currentListener == eventId;
}
export function checkHasListenerMap(mapId, event) {
  return !!getMapListener(mapId, event).currentListener;
}
export function addListenerLayerMap(mapId, event, layerId, cb) {
  let map = getMap(mapId);
  if (!LAYER_LISTENER[layerId]) {
    LAYER_LISTENER[layerId] = {};
  }
  LAYER_LISTENER[layerId][event] = (e) => {
    if (checkHasListenerMap(mapId, event)) {
      return;
    }
    cb(e);
  };
  map.on(event, layerId, LAYER_LISTENER[layerId][event]);
}
export function removeListenerLayerMap(mapId, event, layerId) {
  if (!LAYER_LISTENER[layerId] || LAYER_LISTENER[layerId][event]) {
    return;
  }
  let map = getMap(mapId);
  LAYER_LISTENER[layerId][event] = undefined;
  map.off(event, layerId, LAYER_LISTENER[layerId][event]);
}
export function addListenerMap(mapId, event, eventId, cb) {
  let mapListener = getMapListener(mapId, event);
  let map = getMap(mapId);
  mapListener.listener.unshift(eventId);
  mapListener.currentListener = eventId;
  mapListener.listenerObject[eventId] = (e) => {
    if (!checkListenerMap(mapId, event, eventId)) {
      return;
    }
    cb(e);
  };

  map.on(event, mapListener.listenerObject[eventId]);
}
export function removeListenerMap(mapId, event, eventId) {
  let mapListener = getMapListener(mapId, event);
  if (!mapListener.listener || mapListener.listener.length < 1) {
    return;
  }

  let map = getMap(mapId);
  let index = mapListener.listener.indexOf(eventId);
  if (index !== -1) {
    mapListener.listener.splice(index, 1);
    if (mapListener.listenerObject && mapListener.listenerObject[eventId]) {
      map.off(event, mapListener.listenerObject[eventId]);
      delete mapListener.listenerObject[eventId];
    }
  }
  if (mapListener.currentListener == eventId) {
    mapListener.currentListener =
      mapListener.listener.length > 0 ? mapListener.listener[0] : null;
  }
}

const CONTENTMENU_EVENT = {};
export function setContentMenuForLayerId(layerId, menus) {
  CONTENTMENU_EVENT[layerId] = menus;
}
export function getContentMenuForLayerId(layerId) {
  return CONTENTMENU_EVENT[layerId];
}

export function removeContentMenuForLayerId(layerId) {
  return (CONTENTMENU_EVENT[layerId] = undefined);
}
