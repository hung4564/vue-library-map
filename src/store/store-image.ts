import { getMap, initForMap } from "./store-map";
import { getStore, initStore } from "./store";

import { Map } from "mapbox-gl";

const KEY = "images";
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

initForMap(initStoreForMap, removeStoreForMap);

export async function addImage(
  mapId: string,
  key: string,
  image_url: string,
  option: any = {}
) {
  getStore(KEY)[mapId][key] = image_url;
  const promises = getMap(mapId, async (map: Map) =>
    addImageForMap(map, key, image_url, option)
  );
  return promises;
}
export function addImageForMap(
  map: Map,
  key: string,
  url: string,
  option: any = {}
) {
  return new Promise((resolve, reject) => {
    map.loadImage(url, (error: any, image: any) => {
      if (error) reject(error);
      if (!map.hasImage(key)) map.addImage(key, image, option);
      resolve(true);
    });
  });
}
