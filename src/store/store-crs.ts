import { getStore as getMapStore, initStore } from "./store";

import Vue from "vue";
import { initForMap } from "./store-map";

export type CrsItem = {
  name: string;
  epsg: string | number;
  default?: boolean;
  unit: "degree" | "meter";
  proj4js?: string;
};
const KEY = "crs";
type Store = {
  crs: string | number;
  items: CrsItem[];
  item?: CrsItem;
};
initStore<Record<string, Store>>(KEY, () => ({}));

function initStoreForMap(mapId: string) {
  if (getMapStore(KEY)[mapId]) {
    return;
  }
  getMapStore(KEY)[mapId] = Vue.observable({
    crs: 4326,
    item: { name: "WGS 84", epsg: 4326, default: true, unit: "degree" },
    items: [
      { name: "WGS 84", epsg: 4326, default: true, unit: "degree" },
      {
        name: "VN-2000",
        epsg: 4756,
        unit: "degree",
        proj4js:
          "+proj=longlat +ellps=WGS84 +towgs84=-191.90441429,-39.30318279,-111.45032835,-0.00928836,0.01975479,-0.00427372,0.252906278 +no_defs +type=crs"
      }
    ]
  });
}
const removeStoreForMap = (mapId: string) => {
  delete getMapStore(KEY)[mapId];
};
function getStore(mapId: string): Store {
  return getMapStore(KEY)[mapId];
}

initForMap(initStoreForMap, removeStoreForMap);

export const getCrsItems = (mapId: string) => getStore(mapId).items;
export const getCrsItem = (mapId: string) => getStore(mapId).item;
export const setCrsItems = (mapId: string, items: CrsItem[]) =>
  (getStore(mapId).items = items);

export const setCrs = (mapId: string, crs: string) => {
  getStore(mapId).crs = crs;
  getStore(mapId).item = getStore(mapId).items.find((x) => x.epsg == crs);
};

export const getCrs = (mapId: string) => getStore(mapId).crs;
