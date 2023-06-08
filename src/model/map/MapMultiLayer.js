import { ALayer } from "./ALayer";

export class MapMultiLayer extends ALayer {
  constructor(info) {
    super(info);
    this.layers = info.layers;
    this.source = info.source;
  }
  getBeforeId() {
    return this.layers[0].id;
  }
  addToMap(map, beforeId) {
    if (!map.getSource(this.source.id)) {
      map.addSource(this.source.id, this.source.data);
    }
    this.layers.forEach((layer) => {
      if (!map.getLayer(layer.id)) {
        map.addLayer(layer, beforeId);
      }
    });
  }
  removeFromMap(map) {
    this.layers.forEach((layer) => {
      if (map.getLayer(layer.id)) {
        map.removeLayer(layer.id);
      }
    });
    if (map.getSource(this.source.id)) {
      map.removeSource(this.source.id);
    }
  }
  moveLayer(map, beforeId) {
    this.layers.forEach((layer) => {
      if (map.getLayer(layer.id)) {
        map.moveLayer(layer.id, beforeId);
      }
    });
  }
  toggleShow(map, show) {
    this.layers.forEach((layer) => {
      if (map.getLayer(layer.id)) {
        map.setLayoutProperty(
          layer.id,
          "visibility",
          show ? "visible" : "none"
        );
      }
    });
  }
  setOpacity(map, opacity) {
    this.layers.forEach((layer) => {
      if (map.getLayer(layer.id)) {
        let keyOpacity =
          layer.type == "symbol" ? `icon-opacity` : `${layer.type}-opacity`;

        map.setPaintProperty(layer.id, keyOpacity, opacity);
      }
    });
  }
}