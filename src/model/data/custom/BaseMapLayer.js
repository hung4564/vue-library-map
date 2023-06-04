import { MultiLayer } from "../MultiLayer";

export const BASEMAP_PREFIX = "base_map_control";
export class BaseMapLayer extends MultiLayer {
  constructor(info) {
    super(info);
    delete this.layer;
    this.layers = [];
    this.source = {};
  }
  async setBaseMap(baseMap) {
    this._baseMap = baseMap;
    let { sources, layers } = await getLoader(baseMap.type)(baseMap);
    this.layers = layers;
    this.sources = sources;
  }
  addToMap(map, beforeId) {
    for (const source_id in this.sources) {
      if (Object.hasOwnProperty.call(this.sources, source_id)) {
        const source = this.sources[source_id];
        if (!map.getSource(source_id)) {
          map.addSource(source_id, source);
        }
      }
    }
    this.layers.forEach((layer) => {
      if (!map.getLayer(layer.id)) {
        map.addLayer(layer, beforeId);
      }
    });
    this.runViewWithNameFunction("addToMap", map, beforeId);
  }
  removeFromMap(map) {
    this.layers.forEach((layer) => {
      if (map.getLayer(layer.id)) {
        map.removeLayer(layer.id);
      }
    });
    for (const source_id in this.sources) {
      if (Object.hasOwnProperty.call(this.sources, source_id)) {
        if (map.getSource(source_id)) {
          map.removeSource(source_id);
        }
      }
    }
    this.runViewWithNameFunction("removeFromMap", map);
  }
}
function getLoader(type) {
  switch (type) {
    case "vector":
      return loadVector;
    case "raster":
      return loadRaster;
    case "no-basemap":
      return loadNoBaseMap;
    default:
      throw new Error(`Not support ${type}`);
  }
}

function loadNoBaseMap() {
  return { layers: [], sources: {} };
}
async function loadVector(item) {
  const res = await fetch(item.links[0]).then((res) => res.json());

  let layers = [];
  let sources = {};
  // Add sources
  for (const id in res.sources) {
    const sourceId = BASEMAP_PREFIX + id;
    sources[sourceId] = res.sources[id];
  }
  // Add layers
  for (const layer of res.layers) {
    const layerId = BASEMAP_PREFIX + layer.id;
    const sourceId = BASEMAP_PREFIX + layer.source;

    layers.push(
      Object.assign(layer, {
        id: layerId,
        source: sourceId
      })
    );
  }
  let glyphs = res.glyphs;
  let sprite = res.sprite;
  return { layers, sources, glyphs, sprite };
}
function loadRaster(item) {
  if (!item) throw new Error("Not found item");

  let layerId = `${BASEMAP_PREFIX}-layer`;
  let sourceId = `${BASEMAP_PREFIX}-source`;
  let sources = {};
  sources[sourceId] = {
    type: "raster",
    tiles: item.links,
    scheme: item.scheme || "xyz",
    maxzoom: item.maxzoom || 22,
    minzoom: item.minzoom || 0,
    tileSize: item.tileSize || 256
  };
  let layer = {
    id: layerId,
    type: "raster",
    source: sourceId
  };

  return { layers: [layer], sources };
}
