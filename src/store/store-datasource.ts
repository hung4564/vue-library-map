import { EVENTBUS_TYPE, eventBus } from "@/utils/event-bus";
import { getMap, initForMap } from "./store-map";
import { getStore, initStore } from "./store";

import { Layer } from "../model/datasource";
import { MapSimple } from "@/interface/map";

const KEY = "datasource_layers";
initStore(KEY, () => ({}));

function initStoreForMap(mapId: string) {
  if (getStore(KEY)[mapId]) {
    return;
  }
  getStore(KEY)[mapId] = {};
}
const removeStoreForMap = (mapId: string) => {
  delete getStore(KEY)[mapId];
};
export async function addLayer(mapId: string, layer: Layer) {
  getStore(KEY)[mapId][layer.id] = layer;
  if (layer.canBuildForView("list")) {
    layer.runBuild("list");
    layer.getView("list").index = Object.keys(getStore(KEY)[mapId]).length;
  }
  if (layer.canBuildForView("map")) {
    layer.runBuild("map");
  }
  if (layer.canBuildForView("identify")) {
    layer.runBuild("identify");
  }
  getMap(mapId, async (map: MapSimple) => {
    layer.addToMap(map);
  });
  eventBus.emit(EVENTBUS_TYPE.MAP.SET_LAYER, layer);
  return layer;
}
export function removeLayer(mapId: string, layer: Layer) {
  const store_layers = getStore(KEY)[mapId];
  getMap(mapId, async (map: MapSimple) => {
    layer.removeFromMap(map);
  });
  delete store_layers[layer.id];
  eventBus.emit(EVENTBUS_TYPE.MAP.REMOVE_LAYER, layer);
}
export function getAllViewForKey(mapId: string, key: string) {
  const views = [];

  for (const layer_id in getStore(KEY)[mapId]) {
    const layer = getStore(KEY)[mapId][layer_id];
    if (layer.canBuildForView(key)) {
      const view = layer.getView(key);
      if (view) views.push(view);
    }
  }

  return views;
}

initForMap(initStoreForMap, removeStoreForMap);
