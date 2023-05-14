function loadImage(map, link) {
  return new Promise(function (resolve, reject) {
    map.loadImage(link, function (error, image) {
      if (error) reject(error);
      resolve(image);
    });
  });
}
export async function createMapboxImageUrl(map, id, link, option) {
  if (!map.hasImage(id)) {
    map.addImage(id, await loadImage(map, link), option);
  }

  return id;
}
export async function createMapboxImage(map, id, link, option) {
  if (!map.hasImage(id)) {
    map.addImage(id, await createHTMLImageElement(link), option);
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
