import { AMapLayer } from "./ALayer";
import { IMapSingleLayerOption } from "@/interface/datasource/map";
import { MapSimple } from "@/interface/map";
import SingleStyle from "@map/modules/StyleControl/style/single-style.vue";
import { copyByJson } from "@/utils";
import { updateLayer } from "@/components/Map/helper/layer";
export class MapSingleLayer extends AMapLayer {
  protected layer: any;
  constructor(info: IMapSingleLayerOption) {
    super(info);
    this.layer = info.layer;
    if (!this.layer.id) {
      this.layer.id = this._id;
    }
  }
  getBeforeId() {
    return this.layer.id;
  }
  getAllLayerIds() {
    return [this.layer.id];
  }
  addToMap(map: MapSimple, beforeId: string): void {
    if (!map.getLayer(this.layer.id)) {
      map.addLayer(this.layer, beforeId);
    }
  }
  removeFromMap(map: MapSimple): void {
    if (map.getLayer(this.layer.id)) {
      map.removeLayer(this.layer.id);
    }
  }
  moveLayer(map: MapSimple, beforeId: string): void {
    map.moveLayer(this.layer.id, beforeId);
  }
  toggleShow(map: MapSimple, show: boolean): void {
    map.setLayoutProperty(
      this.layer.id,
      "visibility",
      show ? "visible" : "none"
    );
  }
  setOpacity(map: MapSimple, opacity: number): void {
    const keyOpacity =
      this.layer.type == "symbol"
        ? `icon-opacity`
        : `${this.layer.type}-opacity`;

    map.setPaintProperty(this.layer.id, keyOpacity, opacity);
  }
  getValue() {
    return copyByJson(this.layer);
  }
  getComponentUpdate() {
    return SingleStyle;
  }
  updateValue(map: MapSimple, value: any) {
    updateLayer(map, this.layer, value);
  }
}
