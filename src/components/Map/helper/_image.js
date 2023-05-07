import { getMap } from "../store/store-map";

function loadImage(map, link) {
  return new Promise(function (resolve, reject) {
    map.loadImage(link, function (error, image) {
      if (error) reject(error);
      resolve(image);
    });
  });
}
export async function createMapboxImageUrl(mapId, id, link, option) {
  let map = getMap(mapId);
  if (!map.hasImage(id)) {
    map.addImage(id, await loadImage(map, link), option);
  }

  return id;
}
export async function createMapboxImage(mapId, id, link) {
  let map = getMap(mapId);
  if (!map.hasImage(id)) {
    map.addImage(id, await createHTMLImageElement(link));
  }

  return id;
}
function createHTMLImageElement(link) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement("img");
    img.src = link;
    img.width = 24;
    img.height = 24;

    img.onload = resolve(img);
    img.onerror = reject;
  });
}
