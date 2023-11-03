import { AMapLayer } from "./ALayer";
import { IMapMultiLayerOption } from "@/interface/datasource/map";
import { MapSimple } from "@/interface/map";
import MultiStyle from "@map/modules/LayerControl/StyleControl/style/multi-style.vue";
import { copyByJson } from "@/utils";
import { updateLayer } from "@/components/Map/helper/layer";
export class MapMultiLayer extends AMapLayer {
  protected layers: any[];
  protected source: any;
  constructor(info: IMapMultiLayerOption) {
    super(info);
    this.layers = info.layers;
    this.source = info.source;
    this.layers.forEach((layer, id) => {
      if (!layer.id) {
        layer.id = `${this._id}-${id}`;
      }
    });
    if (this.source && !this.source.id) {
      this.source.id = this._id;
    }
    this.runAfterSetParent = () => {
      if (this.parent) {
        const view_source = this.parent.getSource();
        const source_id = view_source ? view_source.id : null;
        if (!this.source || !this.source.data) {
          this.source = {
            id: source_id,
            data: view_source.getMapboxSource()
          };
        }
      }
    };
  }
  getBeforeId() {
    return this.layers[0].id;
  }
  getAllLayerIds() {
    return this.layers.map((x) => x.id);
  }
  addToMap(map: MapSimple, beforeId: string): void {
    if (this.source && !map.getSource(this.source.id)) {
      map.addSource(this.source.id, this.source.data);
    }
    this.layers.forEach((layer) => {
      if (!map.getLayer(layer.id)) {
        if (!layer.source && this.source) {
          layer.source = this.source.id;
        }
        if (!layer.source && this.source.id) {
          layer.source = this.source.id;
        }
        map.addLayer(layer, beforeId);
      }
    });
  }
  removeFromMap(map: MapSimple): void {
    this.layers.forEach((layer) => {
      if (map.getLayer(layer.id)) {
        map.removeLayer(layer.id);
      }
    });
    if (this.source && map.getSource(this.source.id)) {
      map.removeSource(this.source.id);
    }
  }
  moveLayer(map: MapSimple, beforeId: string): void {
    this.layers.forEach((layer) => {
      if (map.getLayer(layer.id)) {
        map.moveLayer(layer.id, beforeId);
      }
    });
  }
  toggleShow(map: MapSimple, show: boolean): void {
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
  setOpacity(map: MapSimple, opacity: number): void {
    this.layers.forEach((layer) => {
      if (map.getLayer(layer.id)) {
        const keyOpacity =
          layer.type == "symbol" ? `icon-opacity` : `${layer.type}-opacity`;

        map.setPaintProperty(layer.id, keyOpacity, opacity);
      }
    });
  }
  getValue() {
    return copyByJson(this.layers);
  }
  getComponentUpdate() {
    return MultiStyle;
  }
  updateValue(map: MapSimple, value: any) {
    const { type, index } = value;
    let { layer } = value;
    switch (type) {
      case "update-one-layer":
        updateLayer(map, this.layers[index], layer);
        this.layers[index] = copyByJson(
          Object.assign({}, this.layers[index], layer)
        );
        break;
      case "add-one-layer":
        layer = Object.assign(
          {},
          {
            id: `${this._id}-${this.layers.length}`,
            source: this.source.id
          },
          layer
        );
        map.addLayer(layer);
        this.layers.push(layer);
        break;
      case "remove-one-layer":
        if (map.getLayer(layer.id)) map.removeLayer(layer.id);
        this.layers.splice(index, 1);

        break;

      default:
        break;
    }
  }
}
