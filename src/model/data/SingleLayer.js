import { ALayer } from "./ALayer";
export class SingleLayer extends ALayer {
  constructor(info) {
    super(info);
    this.layer = info.layer;
    if (!this.layer.id) {
      this.layer.id = this._id;
    }
  }
  getBeforeId() {
    return this.id;
  }
  addToMap(map, beforeId) {
    if (!map.getLayer(this.id)) {
      map.addLayer(this.layer, beforeId);
    }
    this.runViewWithNameFunction("addToMap", map, beforeId);
  }
  removeFromMap(map) {
    if (map.getLayer(this.id)) {
      map.removeLayer(this.id);
    }
    if (map.getSource(this.id)) {
      map.removeSource(this.id);
    }
    this.runViewWithNameFunction("removeFromMap", map);
  }
  moveLayer(map, beforeId) {
    map.moveLayer(this.id, beforeId);
    this.runViewWithNameFunction("moveLayer", map, beforeId);
  }
  toggleShow(map, show) {
    map.setLayoutProperty(
      this.layer.id,
      "visibility",
      show ? "visible" : "none"
    );
    this.runViewWithNameFunction("toggleShow", map, show);
  }
  setOpacity(map, opacity) {
    let keyOpacity =
      this.type == "symbol" ? `icon-opacity` : `${this.type}-opacity`;

    map.setPaintProperty(this.id, keyOpacity, opacity);
    this.runViewWithNameFunction("setOpacity", map, opacity);
  }
}
