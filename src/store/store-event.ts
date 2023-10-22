import eventBus, { EVENTBUS_TYPE } from "@/utils/event-bus";
import { getStore as getMapStore, initStore } from "./store";

import { IEvent } from "../interface/event";
import { initForMap } from "./store-map";

const KEY = "datasource_events";
type Store = {
  items: IEvent[];
  current: { [key: string]: IEvent };
};
initStore<{ [key: string]: Store }>(KEY, () => ({}));
initForMap(initStoreForMap, removeStoreForMap);
function getStore(mapId: string): Store {
  return getMapStore(KEY)[mapId];
}
function initStoreForMap(mapId: string) {
  if (getMapStore(KEY)[mapId]) {
    return;
  }
  getMapStore(KEY)[mapId] = { current: {}, items: [] };
}
function removeStoreForMap(mapId: string) {
  delete getMapStore(KEY)[mapId];
}
export function addListenerMap(mapId: string, event: IEvent) {
  getMapStore(KEY)[mapId].items.unshift(event);
  eventBus.emit(EVENTBUS_TYPE.EVENT.ADD, event);
  return event.id;
}
export function removeListenerMap(mapId: string, event: IEvent) {
  if (
    !getStore(mapId) ||
    !getStore(mapId).items ||
    getStore(mapId).items.length < 1
  ) {
    return;
  }
  const events = getStore(mapId).items;
  const event_index = events.findIndex((x: any) => x.id === event.id);
  if (event_index < 0) {
    return;
  }
  getStore(mapId).items.splice(event_index, 1);
  eventBus.emit(EVENTBUS_TYPE.EVENT.REMOVE, event);
}
export function getListenerMap(mapId: string, event: string) {
  let listeners = getStore(mapId).items || [];
  if (event) {
    listeners = listeners.filter((x: IEvent) => x.event_map_type === event);
  }
  return listeners;
}
export function setCurrentEvent(
  mapId: string,
  event_map_type: string,
  event: IEvent
) {
  getStore(mapId).current[event_map_type] = event;
  eventBus.emit(EVENTBUS_TYPE.EVENT.UPDATE_CURRENT);
}

export function getCurrentEvent(mapId: string, event_map_type: string) {
  return getStore(mapId).current[event_map_type];
}
