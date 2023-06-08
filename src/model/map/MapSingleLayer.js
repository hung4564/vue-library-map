import { ALayer } from "./ALayer";
export class MapSingleLayer extends ALayer {
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
  }
  removeFromMap(map) {
    if (map.getLayer(this.id)) {
      map.removeLayer(this.id);
    }
    if (map.getSource(this.id)) {
      map.removeSource(this.id);
    }
  }
  moveLayer(map, beforeId) {
    map.moveLayer(this.id, beforeId);
  }
  toggleShow(map, show) {
    map.setLayoutProperty(
      this.layer.id,
      "visibility",
      show ? "visible" : "none"
    );
  }
  setOpacity(map, opacity) {
    let keyOpacity =
      this.type == "symbol" ? `icon-opacity` : `${this.type}-opacity`;

    map.setPaintProperty(this.id, keyOpacity, opacity);
  }
}
