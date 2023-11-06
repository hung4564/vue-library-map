import { getMap, initForMap } from "./store-map";
import { getStore, initStore } from "./store";

import { IconItem } from "@/interface/image";
import { Map as Mapbox } from "mapbox-gl";
import { cache } from "./cache";

const KEY = "images";
initStore(KEY, () => ({}));

function initStoreForMap(mapId: string) {
  if (getStore(KEY)[mapId]) {
    return;
  }
  getStore(KEY)[mapId] = {
    images: {},
    images_convert: {},
    sprite: {}
  };
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
  getStore(KEY)[mapId].images[key] = {
    path: image_url,
    id: key,
    name: key,
    is_sprite: false,
    category: "custom"
  };
  const promises = getMap(mapId, async (map: Mapbox) =>
    addImageForMap(map, key, image_url, option)
  );
  updateImagesList(mapId);
  return promises;
}
function addImageForMap(
  map: Mapbox,
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
function updateImagesList(mapId: string) {
  getStore(KEY)[mapId].images_convert = {
    ...convertListToTree(getStore(KEY)[mapId].images || {}),
    ...convertListToTree(getStore(KEY)[mapId].sprite || {})
  };
}
export function setSprite(mapId: string, spriteUrl: string) {
  let promise = cache.fetch(spriteUrl) as Promise<[HTMLImageElement, any]>;

  if (!promise) {
    promise = Promise.all([
      loadImage(`${spriteUrl}.png`),
      loadJson(`${spriteUrl}.json`)
    ]);
    cache.add(spriteUrl, promise);
  }
  promise.then(([image, json]) => {
    const res = setIconSprite({
      image,
      json
    });
    getStore(KEY)[mapId].sprite = res;
    updateImagesList(mapId);
  });
  return () => {
    cache.release(spriteUrl);
  };
}
function setIconSprite({
  image,
  json
}: {
  image: HTMLImageElement;
  json: any;
}): Record<string, IconItem> {
  const res: Record<string, IconItem> = {};
  if (image) {
    Object.keys(json).forEach((key) => {
      res[key] = {
        ...json[key],
        id: key,
        name: key,
        category: "sprite",
        is_sprite: true
      };
      res[key].path = extractPartOfImage(image, json[key]);
    });
  }
  return res;
}
function loadImage(url: string) {
  return loadImageViaTag(url);
}
function loadImageViaTag(url: string): Promise<HTMLImageElement> {
  const promise = new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      resolve(img);
    };
    img.onerror = (e) => {
      reject(e);
    };
    img.src = url;
  });
  return promise;
}
function loadJson(url: string): Promise<any> {
  return fetch(url).then((res) => res.json());
}
export function extractPartOfImage(
  img: HTMLImageElement,
  {
    x,
    y,
    width,
    height
  }: { x: number; y: number; width: number; height: number },
  dpi = 1
) {
  const el = document.createElement("canvas");
  el.width = width * dpi;
  el.height = height * dpi;
  const ctx = el.getContext("2d");
  if (!ctx) {
    return undefined;
  }
  ctx.drawImage(
    img,
    x * dpi,
    y * dpi,
    width * dpi,
    height * dpi,
    0,
    0,
    width * dpi,
    height * dpi
  );
  return el.toDataURL();
}
const convertListToTree = (items: Record<string, IconItem>) => {
  return Object.keys(items).reduce(
    (acc, key) => convertListItemToTreeItem(acc, items[key]),
    {}
  );
};
const convertListItemToTreeItem = (
  acc: Record<
    string,
    {
      id: string;
      name: string;
      children: IconItem[];
    }
  >,
  cur: IconItem
) => {
  if (!cur.category) {
    cur.category = { id: "other", name: "other" };
  } else {
    cur.category =
      typeof cur.category == "string"
        ? { id: cur.category, name: cur.category }
        : cur.category;
  }
  const id = cur.category.id || cur.category.name;
  if (!acc[id]) {
    acc[id] = {
      ...cur.category,
      children: []
    };
  }
  acc[id].children.push(cur);
  return acc;
};

export function getImages(mapId: string) {
  return getStore(KEY)[mapId].images_convert;
}
