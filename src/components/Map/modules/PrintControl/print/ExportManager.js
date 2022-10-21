import maplibregl from "mapbox-gl";

export function exportCanvas(canvas, options) {
  return new Promise((resolve) => {
    let hidden_canv = document.createElement("canvas");
    hidden_canv.style.display = "none";
    let img = new Image();
    document.body.appendChild(hidden_canv);
    const { height, width, startX, startY } = options;

    img.onload = function () {
      hidden_canv.width = width;
      hidden_canv.height = height;
      let hidden_ctx = hidden_canv.getContext("2d");
      hidden_ctx.drawImage(
        img,
        startX, //Start Clipping
        startY, //Start Clipping
        width, //Clipping Width
        height, //Clipping Height
        0, //Place X
        0, //Place Y
        width, //Place Width
        height //Place Height
      );
      let data = hidden_canv.toDataURL("image/png");
      document.body.removeChild(hidden_canv);
      resolve(data);
    };
    img.src = canvas.toDataURL();
  });
}

export function exportMapbox(map) {
  const hidden = document.createElement("div");
  hidden.className = "hidden-map";
  document.body.appendChild(hidden);
  let canvas = map.getCanvas();
  const container = document.createElement("div");
  container.style.width = canvas.clientWidth + "px";
  container.style.height = canvas.clientHeight + "px";
  hidden.appendChild(container);
  const renderMap = new maplibregl.Map({
    container,
    center: map.getCenter(),
    zoom: map.getZoom(),
    bearing: map.getBearing(),
    pitch: map.getPitch(),
    interactive: false,
    preserveDrawingBuffer: true,
    fadeDuration: 0,
    attributionControl: false,
    // hack to read transfrom request callback function
    transformRequest: map._requestManager._transformRequestFn
  });
  const style = map.getStyle();
  if (style && style.sources) {
    const sources = style.sources;
    Object.keys(sources).forEach((name) => {
      const src = sources[name];
      Object.keys(src).forEach((key) => {
        // delete properties if value is undefined.
        // for instance, raster-dem might has undefined value in "url" and "bounds"
        if (!src[key]) delete src[key];
      });
    });
  }
  renderMap.setStyle(style);
  return new Promise((resolve) => {
    renderMap.once("idle", () => {
      const canvas = renderMap.getCanvas();

      resolve(canvas.toDataURL());
      renderMap.remove();
      hidden.parentNode?.removeChild(hidden);
    });
  });
}
